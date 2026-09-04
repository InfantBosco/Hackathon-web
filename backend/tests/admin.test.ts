import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { buildApp } from '../src/app.js';
import { parseAndValidateAdminCsv, seedAdmins } from '../prisma/seed-admin.js';

describe('Phase 7 — Admin Backend & Administrative Management Master Test Suite', () => {
  let app: FastifyInstance;
  let prisma: PrismaClient;

  let adminToken: string;
  let userToken: string;
  let adminUserId: string;
  let normalUserId: string;

  beforeAll(async () => {
    app = buildApp();
    await app.ready();
    prisma = app.prisma;

    // 1. Run Admin Seed
    await seedAdmins(prisma);

    // 2. Admin Login via Name
    const adminLoginRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: {
        email: 'Jason',
        password: 'jasonnexus',
      },
    });

    expect(adminLoginRes.statusCode).toBe(200);
    const adminLoginData = JSON.parse(adminLoginRes.body);
    adminToken = adminLoginData.data.token;
    adminUserId = adminLoginData.data.user.id;
    expect(adminLoginData.data.user.role).toBe('ADMIN');

    // 3. Create normal user for authorization tests if not existing
    const existingNormalUser = await prisma.user.findUnique({
      where: { email: 'normal.user.admin.test@example.com' },
    });

    if (!existingNormalUser) {
      const signupRes = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/signup',
        payload: {
          name: 'Normal User',
          email: 'normal.user.admin.test@example.com',
          password: 'Password123!',
          confirmPassword: 'Password123!',
        },
      });

      expect(signupRes.statusCode).toBe(201);
      const signupData = JSON.parse(signupRes.body);
      normalUserId = signupData.data.id;

      await prisma.user.update({
        where: { id: normalUserId },
        data: { emailVerified: true },
      });
    } else {
      normalUserId = existingNormalUser.id;
    }

    // Login as normal user
    const userLoginRes = await app.inject({
      method: 'POST',
      url: '/api/v1/auth/login',
      payload: {
        email: 'normal.user.admin.test@example.com',
        password: 'Password123!',
      },
    });

    expect(userLoginRes.statusCode).toBe(200);
    const userLoginData = JSON.parse(userLoginRes.body);
    userToken = userLoginData.data.token;
    expect(userLoginData.data.user.role).toBe('USER');
  }, 60000);

  afterAll(async () => {
    await app.close();
  });

  describe('Section 1: Admin CSV Validation & Seeding', () => {
    it('should validate valid CSV content with 15 records', () => {
      const csvContent = `Name,Password,Designation
Admin1,pass1,Pres
Admin2,pass2,VP
Admin3,pass3,Sec
Admin4,pass4,Treas
Admin5,pass5,Media
Admin6,pass6,Ops
Admin7,pass7,Tech
Admin8,pass8,Creative
Admin9,pass9,Event
Admin10,pass10,Engagement
Admin11,pass11,Engagement2
Admin12,pass12,Treas2
Admin13,pass13,Tech2
Admin14,pass14,Logistics
Admin15,pass15,Sponsorship`;

      const records = parseAndValidateAdminCsv(csvContent);
      expect(records.length).toBe(15);
      expect(records[0].name).toBe('Admin1');
    });

    it('should throw error when CSV record count is not 15', () => {
      const csvContent = `Name,Password,Designation\nAdmin1,pass1,Pres`;
      expect(() => parseAndValidateAdminCsv(csvContent)).toThrow('Expected exactly 15 administrator records');
    });

    it('should throw error on missing CSV header', () => {
      const csvContent = `InvalidHeader,Pass,Role\nAdmin1,pass1,Pres`;
      expect(() => parseAndValidateAdminCsv(csvContent)).toThrow('Missing required headers');
    });

    it('should throw error on duplicate admin names', () => {
      const csvLines = ['Name,Password,Designation'];
      for (let i = 0; i < 15; i++) {
        csvLines.push(`Jason,pass${i},Role${i}`);
      }
      expect(() => parseAndValidateAdminCsv(csvLines.join('\n'))).toThrow('Duplicate admin name');
    });
  });

  describe('Section 2: Admin Authentication & Name/Email Login', () => {
    it('should allow admin login using Email address', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        payload: {
          email: 'jason@hacknex.in',
          password: 'jasonnexus',
        },
      });

      expect(res.statusCode).toBe(200);
      const data = JSON.parse(res.body);
      expect(data.data.user.role).toBe('ADMIN');
      expect(data.data.user.name).toBe('Jason');
    });

    it('should allow admin login using case-insensitive Name', async () => {
      const res = await app.inject({
        method: 'POST',
        url: '/api/v1/auth/login',
        payload: {
          email: 'infant bosco',
          password: 'bosconexus',
        },
      });

      expect(res.statusCode).toBe(200);
      const data = JSON.parse(res.body);
      expect(data.data.user.role).toBe('ADMIN');
      expect(data.data.user.name).toBe('Infant Bosco');
    });
  });

  describe('Section 3: Server-Side Authorization Pipeline (401 / 403 / 200)', () => {
    it('should return 401 Unauthorized when unauthenticated request accesses admin API', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/dashboard',
      });

      expect(res.statusCode).toBe(401);
      const body = JSON.parse(res.body);
      expect(body.error.code).toBe('AUTHENTICATION_ERROR');
    });

    it('should return 403 Forbidden when normal participant accesses admin API', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/dashboard',
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      });

      expect(res.statusCode).toBe(403);
      const body = JSON.parse(res.body);
      expect(body.error.code).toBe('AUTHORIZATION_ERROR');
    });

    it('should return 200 OK when authenticated admin accesses admin API', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/dashboard',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body);
      expect(body.data.metrics).toBeDefined();
      expect(body.data.metrics.totalUsers).toBeGreaterThanOrEqual(15);
    });
  });

  describe('Section 4: Read-Only Admin APIs (Teams, Participants, Registrations, Payments)', () => {
    it('GET /api/v1/admin/teams - should return paginated teams list', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/teams?page=1&limit=10',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body);
      expect(body.data.data).toBeDefined();
      expect(body.data.pagination).toBeDefined();
      expect(body.data.pagination.page).toBe(1);
    });

    it('GET /api/v1/admin/participants - should return paginated participants list', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/participants?page=1&limit=10',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body);
      expect(body.data.data).toBeDefined();
      expect(body.data.pagination).toBeDefined();
    });

    it('GET /api/v1/admin/registrations - should return paginated registrations list', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/registrations?page=1&limit=10',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body);
      expect(body.data.data).toBeDefined();
    });

    it('GET /api/v1/admin/payments - should return paginated payments list', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/payments?page=1&limit=10',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(res.statusCode).toBe(200);
      const body = JSON.parse(res.body);
      expect(body.data.data).toBeDefined();
    });

    it('should return 404 for invalid resource ID in team details', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/teams/invalid-uuid-00000000-0000',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(res.statusCode).toBe(404);
      const body = JSON.parse(res.body);
      expect(body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('Section 5: Sensitive Data Exclusion & Mutation Prevention', () => {
    it('should never expose password hashes or verification tokens in dashboard or user queries', async () => {
      const res = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/teams',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      const bodyStr = res.body;
      expect(bodyStr).not.toContain('password');
      expect(bodyStr).not.toContain('passwordHash');
      expect(bodyStr).not.toContain('token');
    });

    it('should enforce zero mutation - non-GET endpoints on /admin must return 404', async () => {
      const postRes = await app.inject({
        method: 'POST',
        url: '/api/v1/admin/participants',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
        payload: { name: 'Attempted Mutation' },
      });

      expect(postRes.statusCode).toBe(404);

      const deleteRes = await app.inject({
        method: 'DELETE',
        url: '/api/v1/admin/teams/some-id',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(deleteRes.statusCode).toBe(404);
    });
  });
});
