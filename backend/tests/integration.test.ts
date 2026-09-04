import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { FastifyInstance } from 'fastify';
import { FoodPreference, PaymentStatus, RegistrationStatus, TeamStatus } from '@prisma/client';
import { buildApp } from '../src/app.js';
import { settings } from '../src/config/settings.js';
import { TeamService } from '../src/services/team.service.js';
import { ParticipantService } from '../src/services/participant.service.js';
import { RegistrationService } from '../src/services/registration.service.js';
import { PaymentService } from '../src/services/payment.service.js';
import { ValidationService } from '../src/services/validation.service.js';
import { normalizeTeamName, normalizeEmail } from '../src/utils/normalization.js';
import {
  ConflictError,
  ValidationError,
  PaymentAmountError,
  AuthorizationError,
  NotFoundError,
  InvalidStateError,
} from '../src/core/errors.js';

describe('Phase 1–3 Master Integration & End-to-End Verification Suite', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  // A. Environment & Configuration Loading Verification
  describe('A. Environment & Configuration Verification', () => {
    it('should load environment variables and default configuration cleanly', () => {
      expect(settings.APP_NAME).toBe('HackNEX 2026 API Backend');
      expect(settings.PORT).toBeTypeOf('number');
      expect(settings.HOST).toBeTypeOf('string');
      expect(Array.isArray(settings.CORS_ORIGINS)).toBe(true);
      expect(settings.DATABASE_URL).toBeDefined();
      expect(settings.DIRECT_URL).toBeDefined();
    });
  });

  // B. Backend Startup, Health, & API Documentation Verification
  describe('B. Backend Startup, Health, & OpenAPI Verification', () => {
    it('GET /health should return 200 OK with healthy status payload', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health',
      });
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload);
      expect(body.success).toBe(true);
      expect(body.data.status).toBe('healthy');
      expect(body.data.service).toBeDefined();
    });

    it('GET /health/ready should return 200 OK with readiness payload', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/health/ready',
      });
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload);
      expect(body.success).toBe(true);
      expect(body.data.status).toBe('ready');
    });

    it('GET /docs should serve interactive Swagger UI documentation', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/docs/',
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
    });

    it('GET /docs/json should serve OpenAPI JSON schema specification', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/docs/json',
      });
      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.payload);
      expect(body.openapi).toBeDefined();
      expect(body.info.title).toBe('HackNEX 2026 API Backend');
    });
  });

  // C. Master End-to-End Workflow & Business Rules Verification (Mocked Prisma Store for Offline Determinism)
  describe('C. Master End-to-End Workflow & Business Rules Verification', () => {
    let mockPrisma: any;
    let teamService: TeamService;
    let participantService: ParticipantService;
    let registrationService: RegistrationService;
    let paymentService: PaymentService;

    const captainUserId = 'usr-uuid-captain-alpha-001';
    const captainBUserId = 'usr-uuid-captain-beta-002';
    const teamId = 'team-uuid-hacknex-001';
    const regId = 'reg-uuid-hacknex-001';
    const paymentId = 'pay-uuid-hacknex-001';

    beforeEach(() => {
      const usersStore = new Map<string, any>([
        [captainUserId, { id: captainUserId, name: 'Captain Alpha', email: 'captain.alpha@example.com' }],
        [captainBUserId, { id: captainBUserId, name: 'Captain Beta', email: 'captain.beta@example.com' }],
      ]);

      const teamsStore = new Map<string, any>();
      const participantsStore = new Map<string, any>();
      const registrationsStore = new Map<string, any>();
      const paymentsStore = new Map<string, any>();

      const buildTeamObject = (tId: string) => {
        const team = teamsStore.get(tId);
        if (!team) return null;
        const parts = Array.from(participantsStore.values()).filter((p) => p.teamId === tId);
        const reg = Array.from(registrationsStore.values()).find((r) => r.teamId === tId);
        const pays = reg ? Array.from(paymentsStore.values()).filter((p) => p.registrationId === reg.id) : [];
        return {
          ...team,
          captain: usersStore.get(team.captainUserId),
          participants: parts,
          registration: reg ? { ...reg, payments: pays } : null,
        };
      };

      const buildRegistrationObject = (rId: string) => {
        const reg = Array.from(registrationsStore.values()).find((r) => r.id === rId || r.registrationId === rId);
        if (!reg) return null;
        const teamObj = buildTeamObject(reg.teamId);
        const pays = Array.from(paymentsStore.values()).filter((p) => p.registrationId === reg.id);
        return {
          ...reg,
          team: teamObj,
          payments: pays,
        };
      };

      mockPrisma = {
        user: {
          findUnique: async ({ where }: any) => usersStore.get(where.id) || null,
        },
        team: {
          findUnique: async ({ where }: any) => {
            if (where.id) return teamsStore.get(where.id) || null;
            if (where.captainUserId) {
              return Array.from(teamsStore.values()).find((t) => t.captainUserId === where.captainUserId) || null;
            }
            return null;
          },
          findFirst: async ({ where }: any) => {
            if (where.OR) {
              return Array.from(teamsStore.values()).find(
                (t) => t.teamName === where.OR[0].teamName || t.normalizedTeamName === where.OR[1].normalizedTeamName
              ) || null;
            }
            return null;
          },
          create: async ({ data }: any) => {
            const team = { id: teamId, ...data, createdAt: new Date(), updatedAt: new Date() };
            teamsStore.set(teamId, team);
            return team;
          },
          update: async ({ where, data }: any) => {
            const existing = teamsStore.get(where.id);
            const updated = { ...existing, ...data, updatedAt: new Date() };
            teamsStore.set(where.id, updated);
            return updated;
          },
        },
        participant: {
          findUnique: async ({ where }: any) => {
            if (where.email) {
              return Array.from(participantsStore.values()).find((p) => p.email === where.email) || null;
            }
            if (where.id) return participantsStore.get(where.id) || null;
            return null;
          },
          findMany: async ({ where }: any) => {
            return Array.from(participantsStore.values()).filter((p) => p.teamId === where.teamId);
          },
          create: async ({ data }: any) => {
            const pId = `part-uuid-${participantsStore.size + 1}`;
            const part = { id: pId, ...data, createdAt: new Date(), updatedAt: new Date() };
            participantsStore.set(pId, part);
            return part;
          },
          delete: async ({ where }: any) => {
            participantsStore.delete(where.id);
          },
        },
        registration: {
          findUnique: async ({ where, include }: any) => {
            let reg: any = null;
            if (where.teamId) {
              reg = Array.from(registrationsStore.values()).find((r) => r.teamId === where.teamId) || null;
            } else if (where.registrationId) {
              reg = Array.from(registrationsStore.values()).find((r) => r.registrationId === where.registrationId) || null;
            }
            if (!reg) return null;
            if (include) return buildRegistrationObject(reg.id);
            return reg;
          },
          count: async () => registrationsStore.size,
          upsert: async ({ where, update, create }: any) => {
            const existing = Array.from(registrationsStore.values()).find((r) => r.teamId === where.teamId);
            if (existing) {
              const updated = { ...existing, ...update, updatedAt: new Date() };
              registrationsStore.set(existing.id, updated);
              return updated;
            }
            const reg = { id: regId, ...create, createdAt: new Date(), updatedAt: new Date() };
            registrationsStore.set(regId, reg);
            return reg;
          },
          update: async ({ where, data }: any) => {
            const existing = registrationsStore.get(where.id);
            const updated = { ...existing, ...data, updatedAt: new Date() };
            registrationsStore.set(where.id, updated);
            return updated;
          },
        },
        payment: {
          findUnique: async ({ where, include }: any) => {
            let pay: any = null;
            if (where.transactionId) {
              pay = Array.from(paymentsStore.values()).find((p) => p.transactionId === where.transactionId) || null;
            } else if (where.id) {
              pay = paymentsStore.get(where.id) || null;
            }
            if (!pay) return null;
            if (include) {
              return {
                ...pay,
                registration: buildRegistrationObject(pay.registrationId),
              };
            }
            return pay;
          },
          create: async ({ data }: any) => {
            const pay = { id: paymentId, ...data, createdAt: new Date(), updatedAt: new Date() };
            paymentsStore.set(paymentId, pay);
            return pay;
          },
          update: async ({ where, data }: any) => {
            const existing = paymentsStore.get(where.id);
            const updated = { ...existing, ...data, updatedAt: new Date() };
            paymentsStore.set(where.id, updated);
            return updated;
          },
        },
        $transaction: async (fn: any) => fn(mockPrisma),
      };

      teamService = new TeamService(mockPrisma);
      teamService.getTeamById = async (tId: string) => buildTeamObject(tId) as any;

      participantService = new ParticipantService(mockPrisma, teamService);
      registrationService = new RegistrationService(mockPrisma, teamService);
      paymentService = new PaymentService(mockPrisma, teamService);
    });

    // 1. Team Normalization & Creation Test
    it('D. Team Creation & Name Normalization: Should create team and reject duplicate normalized name', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: '   Code   Titans  ',
        captainDetails: {
          name: 'Captain Alpha',
          email: 'captain.alpha@example.com',
          phone: '9876543210',
          college: 'Karunya Institute',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      expect(team.teamName).toBe('Code   Titans');
      expect(team.normalizedTeamName).toBe('code titans');

      // Attempting to create duplicate normalized team "CODE TITANS" must be REJECTED
      await expect(
        teamService.createTeam({
          captainUserId: captainBUserId,
          teamName: 'CODE TITANS',
          captainDetails: {
            name: 'Captain Beta',
            email: 'captain.beta@example.com',
            phone: '9876543211',
            college: 'Karunya Institute',
            department: 'ECE',
            yearOfStudy: '4',
            foodPreference: FoodPreference.NON_VEG,
          },
        })
      ).rejects.toThrow(ConflictError);
    });

    // 2. Participant Management, Email Normalization & Count Rules
    it('E. Participant Management: Captain has userId, members 2,3,4 have userId = NULL, duplicate email rejected, 5th member rejected', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Team Cyber',
        captainDetails: {
          name: 'Captain Cyber',
          email: 'captain.cyber@example.com',
          phone: '9876543210',
          college: 'Karunya Institute',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      // Add Member 2
      const m2 = await participantService.addParticipant({
        teamId: team.id,
        requesterUserId: captainUserId,
        name: 'Member 2',
        email: '  MEMBER2.CYBER@EXAMPLE.COM  ',
        phone: '9876543212',
        college: 'Karunya Institute',
        department: 'CSE',
        yearOfStudy: '3',
        foodPreference: FoodPreference.NON_VEG,
      });

      expect(m2.userId).toBeNull(); // Non-captain participant userId MUST be NULL
      expect(m2.email).toBe('member2.cyber@example.com'); // Email MUST be normalized to lowercase
      expect(m2.isCaptain).toBe(false);

      // Duplicate participant email attempt (when team has < 4 members) must be REJECTED with ConflictError
      await expect(
        participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: 'Duplicate Member',
          email: 'member2.cyber@example.com', // Already added above
          phone: '9876543299',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '2',
          foodPreference: FoodPreference.VEG,
        })
      ).rejects.toThrow(ConflictError);

      // Add Members 3 and 4
      for (let i = 3; i <= 4; i++) {
        await participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: `Member ${i}`,
          email: `member${i}.cyber@example.com`,
          phone: `987654321${i}`,
          college: 'Karunya Institute',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.NON_VEG,
        });
      }

      // Verify Captain participant has userId
      const teamDetails = await teamService.getTeamById(team.id);
      expect(teamDetails.participants.length).toBe(4);
      const captainParticipant = teamDetails.participants.find((p) => p.isCaptain);
      expect(captainParticipant?.userId).toBe(captainUserId);

      // Attempting 5th participant must be REJECTED
      await expect(
        participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: 'Member Five',
          email: 'member5.cyber@example.com',
          phone: '9876543215',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '1',
          foodPreference: FoodPreference.VEG,
        })
      ).rejects.toThrow(ValidationError);
    });

    // 3. Registration Submission & Incomplete Team Protection
    it('F. Registration Submission: Incomplete team rejected, complete 4-member team succeeds', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Team Incomplete',
        captainDetails: {
          name: 'Captain Incomplete',
          email: 'captain.inc@example.com',
          phone: '9876543210',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      // Team has only 1 participant -> Submission REJECTED
      await expect(
        registrationService.createOrSubmitRegistration(team.id, captainUserId)
      ).rejects.toThrow(ValidationError);

      // Add 3 members to reach 4
      for (let i = 2; i <= 4; i++) {
        await participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: `Member ${i}`,
          email: `member${i}.inc@example.com`,
          phone: `987654321${i}`,
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        });
      }

      // Submission with 4 members -> READY_FOR_PAYMENT
      const reg = await registrationService.createOrSubmitRegistration(team.id, captainUserId);
      expect(reg.status).toBe(RegistrationStatus.READY_FOR_PAYMENT);
      expect(reg.registrationId).toContain('HNX-2026-');
    });

    // 4. Critical Fee Calculation & Payment Verification (₹600 x 4 = ₹2,400)
    it('G. Fee Calculation & Payment: Calculates ₹2,400 for 4 members, rejects ₹600 attempt', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Team Fee Check',
        captainDetails: {
          name: 'Captain Fee',
          email: 'captain.fee@example.com',
          phone: '9876543210',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      for (let i = 2; i <= 4; i++) {
        await participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: `Member ${i}`,
          email: `member${i}.fee@example.com`,
          phone: `987654321${i}`,
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        });
      }

      const reg = await registrationService.createOrSubmitRegistration(team.id, captainUserId);

      // Initiate Payment -> Authoritative calculation ₹2,400 (₹600 x 4)
      const payment = await paymentService.initiatePayment({
        registrationId: reg.registrationId,
        requesterUserId: captainUserId,
      });

      expect(payment.amount).toBe(2400); // Must store ₹2,400 TOTAL
      expect(payment.currency).toBe('INR');

      // Test validatePaymentAmount rejects ₹600 total for 4 members
      expect(() => ValidationService.validatePaymentAmount(4, 600)).toThrow(PaymentAmountError);
      expect(() => ValidationService.validatePaymentAmount(4, 1800)).toThrow(PaymentAmountError);
      expect(() => ValidationService.validatePaymentAmount(4, 2400)).not.toThrow();

      // Transactional Confirmation
      const result = await paymentService.verifyPaymentTransaction({
        paymentId: payment.id,
        transactionId: 'KARUNYA-TXN-VERIFIED-777',
        providerReference: 'REF-777',
      });

      expect(result.isConfirmed).toBe(true);
      expect(result.payment.status).toBe(PaymentStatus.VERIFIED);

      // Verify updated Team & Registration status in DB
      const updatedTeam = await teamService.getTeamById(team.id);
      expect(updatedTeam.status).toBe(TeamStatus.CONFIRMED);
      expect(updatedTeam.registration?.status).toBe(RegistrationStatus.CONFIRMED);
      expect(updatedTeam.registration?.confirmedAt).not.toBeNull();

      // Repeat verification request -> Idempotent handling without error
      const repeatResult = await paymentService.verifyPaymentTransaction({
        paymentId: payment.id,
        transactionId: 'KARUNYA-TXN-VERIFIED-777',
      });
      expect(repeatResult.isConfirmed).toBe(true);

      // Duplicate transactionId for another payment -> REJECTED
      await expect(
        paymentService.verifyPaymentTransaction({
          paymentId: 'other-payment-id',
          transactionId: 'KARUNYA-TXN-VERIFIED-777',
        })
      ).rejects.toThrow(ConflictError);
    });

    // 5. Transaction Rollback & State Isolation Verification
    it('H. Transaction Rollback & State Isolation: Failed confirmation rolls back cleanly', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Team Rollback',
        captainDetails: {
          name: 'Captain Rollback',
          email: 'captain.rb@example.com',
          phone: '9876543210',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      for (let i = 2; i <= 4; i++) {
        await participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: `Member ${i}`,
          email: `member${i}.rb@example.com`,
          phone: `987654321${i}`,
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        });
      }

      const reg = await registrationService.createOrSubmitRegistration(team.id, captainUserId);
      const payment = await paymentService.initiatePayment({
        registrationId: reg.registrationId,
        requesterUserId: captainUserId,
      });

      // Tamper payment amount in payment object to simulate payment amount mismatch error during verification
      payment.amount = 500; // Invalid amount (expected 2400)

      await expect(
        paymentService.verifyPaymentTransaction({
          paymentId: payment.id,
          transactionId: 'KARUNYA-TXN-FAILED-000',
        })
      ).rejects.toThrow(PaymentAmountError);

      // Verify that database state remains unchanged at PAYMENT_PENDING (no inconsistent partial confirmation)
      const teamCheck = await teamService.getTeamById(team.id);
      expect(teamCheck.status).toBe(TeamStatus.PAYMENT_PENDING);
      expect(teamCheck.registration?.status).toBe(RegistrationStatus.PAYMENT_PENDING);
    });

    // 6. Server-Side Authorization Isolation Test
    it('I. Security & Authorization: Captain B cannot modify or access Captain A team', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Team Alpha Auth',
        captainDetails: {
          name: 'Captain A',
          email: 'captain.a@example.com',
          phone: '9876543210',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      // Captain B attempts to add participant to Captain A's team -> REJECTED
      await expect(
        participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainBUserId, // Unauthorized user
          name: 'Malicious Member',
          email: 'malicious@example.com',
          phone: '9876543299',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '1',
          foodPreference: FoodPreference.VEG,
        })
      ).rejects.toThrow(AuthorizationError);
    });
  });
});
