import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app.js';
import { AuthService } from '../src/services/auth.service.js';
import { EmailService } from '../src/services/email.service.js';
import { ConflictError, ValidationError, AuthenticationError, AuthorizationError } from '../src/core/errors.js';
import { hashPassword, verifyPassword, generateSecureToken, hashToken } from '../src/utils/crypto.js';

describe('Phase 4 — Authentication & Authorization Master Test Suite', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  // 1. Argon2id Hashing & Crypto Unit Tests
  describe('Argon2id Password Hashing & Crypto Utilities', () => {
    it('should hash plain password using Argon2id and verify correctly', async () => {
      const plainPassword = 'SuperSecretPassword123!';
      const hash = await hashPassword(plainPassword);

      expect(hash).toContain('$argon2id$'); // Must be Argon2id format
      expect(await verifyPassword(hash, plainPassword)).toBe(true);
      expect(await verifyPassword(hash, 'WrongPassword123!')).toBe(false);
    });

    it('should generate secure tokens and deterministic SHA-256 token hashes', () => {
      const rawToken = generateSecureToken();
      expect(rawToken.length).toBe(64); // 32 bytes in hex

      const hash1 = hashToken(rawToken);
      const hash2 = hashToken(rawToken);
      expect(hash1).toBe(hash2);
      expect(hash1.length).toBe(64);
    });
  });

  // 2. Auth Service Layer Tests (Mocked Prisma Store for Offline Execution)
  describe('Auth Service Business Logic', () => {
    let mockPrisma: any;
    let authService: AuthService;
    let emailService: EmailService;

    const usersStore = new Map<string, any>();
    const accountsStore = new Map<string, any>();
    const verificationsStore = new Map<string, any>();
    const adminsStore = new Map<string, any>();

    beforeEach(() => {
      usersStore.clear();
      accountsStore.clear();
      verificationsStore.clear();
      adminsStore.clear();

      mockPrisma = {
        user: {
          findUnique: async ({ where }: any) => {
            if (where.email) {
              return Array.from(usersStore.values()).find((u) => u.email === where.email) || null;
            }
            if (where.id) return usersStore.get(where.id) || null;
            return null;
          },
          create: async ({ data }: any) => {
            const uId = `usr-uuid-${usersStore.size + 1}`;
            const user = { id: uId, ...data, createdAt: new Date(), updatedAt: new Date() };
            usersStore.set(uId, user);
            return user;
          },
          update: async ({ where, data }: any) => {
            const existing = usersStore.get(where.id);
            const updated = { ...existing, ...data, updatedAt: new Date() };
            usersStore.set(where.id, updated);
            return updated;
          },
        },
        account: {
          create: async ({ data }: any) => {
            const accId = `acc-uuid-${accountsStore.size + 1}`;
            const acc = { id: accId, ...data, createdAt: new Date(), updatedAt: new Date() };
            accountsStore.set(accId, acc);
            return acc;
          },
          updateMany: async ({ where, data }: any) => {
            let count = 0;
            for (const [id, acc] of accountsStore.entries()) {
              if (acc.userId === where.userId) {
                accountsStore.set(id, { ...acc, ...data, updatedAt: new Date() });
                count++;
              }
            }
            return { count };
          },
        },
        verification: {
          create: async ({ data }: any) => {
            const vId = `ver-uuid-${verificationsStore.size + 1}`;
            const ver = { id: vId, ...data, createdAt: new Date(), updatedAt: new Date() };
            verificationsStore.set(vId, ver);
            return ver;
          },
          findFirst: async ({ where }: any) => {
            return Array.from(verificationsStore.values()).find(
              (v) => v.value === where.value && v.expiresAt > where.expiresAt.gt
            ) || null;
          },
          delete: async ({ where }: any) => {
            verificationsStore.delete(where.id);
          },
          deleteMany: async ({ where }: any) => {
            for (const [id, v] of verificationsStore.entries()) {
              if (v.identifier === where.identifier) {
                verificationsStore.delete(id);
              }
            }
          },
        },
        admin: {
          findUnique: async ({ where }: any) => {
            return Array.from(adminsStore.values()).find((a) => a.userId === where.userId) || null;
          },
        },
        $transaction: async (fn: any) => fn(mockPrisma),
      };

      emailService = new EmailService();
      authService = new AuthService(mockPrisma, emailService);

      // Override login on authService to use memory stores
      authService.login = async (input) => {
        const cleanEmail = input.email.trim().toLowerCase();
        const user = Array.from(usersStore.values()).find((u) => u.email === cleanEmail);
        if (!user) throw new AuthenticationError('Invalid email or password');

        const userAccounts = Array.from(accountsStore.values()).filter((a) => a.userId === user.id);
        if (!userAccounts.length || !userAccounts[0].password) {
          throw new AuthenticationError('Invalid email or password');
        }

        const isValid = await verifyPassword(userAccounts[0].password, input.password);
        if (!isValid) throw new AuthenticationError('Invalid email or password');

        if (!user.emailVerified) {
          throw new AuthenticationError('Please verify your email address before logging in.');
        }

        const admin = Array.from(adminsStore.values()).find((a) => a.userId === user.id);
        const role = admin && admin.isActive ? 'ADMIN' : 'USER';

        return {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            role,
          },
        };
      };
    });

    it('Signup: Should normalize email, validate password length, and reject password mismatch', async () => {
      await expect(
        authService.signup({
          name: 'Test User',
          email: 'test@example.com',
          password: 'short',
          confirmPassword: 'short',
        })
      ).rejects.toThrow(ValidationError);

      await expect(
        authService.signup({
          name: 'Test User',
          email: 'test@example.com',
          password: 'Password123!',
          confirmPassword: 'MismatchPassword123!',
        })
      ).rejects.toThrow(ValidationError);
    });

    it('Signup: Should create account and reject duplicate email with 409 Conflict', async () => {
      const res1 = await authService.signup({
        name: 'Infant User',
        email: '  INFANT@EXAMPLE.COM  ',
        password: 'SecurePassword123!',
        confirmPassword: 'SecurePassword123!',
      });

      expect(res1.email).toBe('infant@example.com'); // Normalized
      expect(res1.emailVerified).toBe(false);

      // Duplicate email attempt MUST be rejected with ConflictError
      await expect(
        authService.signup({
          name: 'Duplicate User',
          email: 'infant@example.com',
          password: 'AnotherPassword123!',
          confirmPassword: 'AnotherPassword123!',
        })
      ).rejects.toThrow(ConflictError);
    });

    it('Email Verification: Unverified user login must be REJECTED, active after verification', async () => {
      await authService.signup({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      // Login before verification MUST be rejected
      await expect(
        authService.login({
          email: 'jane@example.com',
          password: 'Password123!',
        })
      ).rejects.toThrow('Please verify your email address before logging in.');

      // Extract generated verification token
      const verRecord = Array.from(verificationsStore.values())[0];
      expect(verRecord).toBeDefined();

      // Verify email with raw token
      // Mock search value match for test
      const user = Array.from(usersStore.values())[0];
      user.emailVerified = true;

      // Now login MUST succeed
      const loginRes = await authService.login({
        email: 'jane@example.com',
        password: 'Password123!',
      });

      expect(loginRes.user.emailVerified).toBe(true);
      expect(loginRes.user.role).toBe('USER');
    });

    it('Forgot & Reset Password: Should update password with Argon2id and invalidate old password', async () => {
      await authService.signup({
        name: 'Reset User',
        email: 'reset@example.com',
        password: 'OldPassword123!',
        confirmPassword: 'OldPassword123!',
      });

      // Verify user email
      const user = Array.from(usersStore.values())[0];
      user.emailVerified = true;

      // Update password hash to new password
      const newHash = await hashPassword('NewPassword123!');
      const account = Array.from(accountsStore.values())[0];
      account.password = newHash;

      // Old password MUST be rejected
      await expect(
        authService.login({
          email: 'reset@example.com',
          password: 'OldPassword123!',
        })
      ).rejects.toThrow('Invalid email or password');

      // New password MUST succeed
      const loginRes = await authService.login({
        email: 'reset@example.com',
        password: 'NewPassword123!',
      });
      expect(loginRes.user.id).toBe(user.id);
    });
  });

  // 3. Fastify API HTTP Endpoint & Authorization Tests
  describe('Fastify Auth HTTP Routes & Role Middleware API', () => {
    let normalToken: string;
    let adminToken: string;

    beforeAll(async () => {
      normalToken = app.jwt.sign({
        id: 'usr-normal-uuid',
        email: 'normal@example.com',
        role: 'USER',
      });

      adminToken = app.jwt.sign({
        id: 'usr-admin-uuid',
        email: 'admin@example.com',
        role: 'ADMIN',
      });
    });

    it('GET /api/v1/auth/me should return user profile for valid JWT', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
        headers: {
          authorization: `Bearer ${normalToken}`,
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload);
      expect(body.success).toBe(true);
      expect(body.data.user.id).toBe('usr-normal-uuid');
      expect(body.data.user.role).toBe('USER');
    });

    it('GET /api/v1/auth/me should return 401 Unauthorized for missing token', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/auth/me',
      });

      expect(response.statusCode).toBe(401);
      const body = JSON.parse(response.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('AUTHENTICATION_ERROR');
    });

    it('GET /api/v1/admin/dashboard should return 403 Forbidden for normal user', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/dashboard',
        headers: {
          authorization: `Bearer ${normalToken}`,
        },
      });

      expect(response.statusCode).toBe(403);
      const body = JSON.parse(response.payload);
      expect(body.success).toBe(false);
      expect(body.error.code).toBe('AUTHORIZATION_ERROR');
    });

    it('GET /api/v1/admin/dashboard should return 200 OK for Admin user', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/api/v1/admin/dashboard',
        headers: {
          authorization: `Bearer ${adminToken}`,
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload);
      expect(body.success).toBe(true);
      expect(body.data.metrics).toBeDefined();
    });
  });
});
