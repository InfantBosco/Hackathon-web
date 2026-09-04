import { describe, it, expect, beforeEach } from 'vitest';
import { FoodPreference, PaymentStatus, RegistrationStatus, TeamStatus } from '@prisma/client';
import { TeamService } from '../src/services/team.service.js';
import { ParticipantService } from '../src/services/participant.service.js';
import { RegistrationService } from '../src/services/registration.service.js';
import { PaymentService } from '../src/services/payment.service.js';
import { ValidationService } from '../src/services/validation.service.js';
import { normalizeTeamName } from '../src/utils/normalization.js';
import { ConflictError, ValidationError, PaymentAmountError, AuthorizationError } from '../src/core/errors.js';

describe('Phase 3 — Core Workflow & Business Logic Test Suite', () => {

  // 1. Fee Calculation & Amount Validation Rules
  describe('Fee Calculation & Amount Rules', () => {
    it('should calculate ₹600 for 1 participant and ₹2,400 for 4 participants', () => {
      expect(ValidationService.calculateRegistrationFee(1)).toBe(600);
      expect(ValidationService.calculateRegistrationFee(4)).toBe(2400);
    });

    it('should validate payment amount ₹2,400 for 4 participants and reject ₹600 total', () => {
      expect(() => ValidationService.validatePaymentAmount(4, 2400)).not.toThrow();
      expect(() => ValidationService.validatePaymentAmount(4, 600)).toThrow(PaymentAmountError);
      expect(() => ValidationService.validatePaymentAmount(4, 1000)).toThrow(PaymentAmountError);
    });

    it('should reject team registration submission if participant count is not 4', () => {
      expect(() => ValidationService.validateTeamSizeForRegistration(1)).toThrow(ValidationError);
      expect(() => ValidationService.validateTeamSizeForRegistration(3)).toThrow(ValidationError);
      expect(() => ValidationService.validateTeamSizeForRegistration(5)).toThrow(ValidationError);
      expect(() => ValidationService.validateTeamSizeForRegistration(4)).not.toThrow();
    });
  });

  // 2. Team Name Normalization Tests
  describe('Team Name Normalization', () => {
    it('should normalize leading/trailing whitespace, uppercase, and repeated spaces', () => {
      expect(normalizeTeamName('   Code   Titans  ')).toBe('code titans');
      expect(normalizeTeamName('CODE TITANS')).toBe('code titans');
      expect(normalizeTeamName('code titans')).toBe('code titans');
    });
  });

  // 3. Service Layer Business Logic & Transactional Confirmation Tests
  describe('Mocked Prisma Service Layer End-to-End Workflow', () => {
    let mockPrisma: any;
    let teamService: TeamService;
    let participantService: ParticipantService;
    let registrationService: RegistrationService;
    let paymentService: PaymentService;

    const captainUserId = 'usr-uuid-captain-001';
    const teamId = 'team-uuid-alpha-001';
    const regId = 'reg-uuid-001';
    const paymentId = 'pay-uuid-001';

    beforeEach(() => {
      const usersStore = new Map<string, any>([
        [captainUserId, { id: captainUserId, name: 'Captain User', email: 'captain@example.com' }],
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
            if (include) {
              return buildRegistrationObject(reg.id);
            }
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

      // Wire up service layer with mock Prisma client
      teamService = new TeamService(mockPrisma);
      teamService.getTeamById = async (tId: string) => buildTeamObject(tId) as any;

      participantService = new ParticipantService(mockPrisma, teamService);
      registrationService = new RegistrationService(mockPrisma, teamService);
      paymentService = new PaymentService(mockPrisma, teamService);
    });

    it('Step 1: Should create Team with Captain Participant', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: '   Code   Titans  ',
        captainDetails: {
          name: 'Captain Alpha',
          email: 'captain@example.com',
          phone: '9876543210',
          college: 'Karunya Institute',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      expect(team.teamName).toBe('Code   Titans');
      expect(team.normalizedTeamName).toBe('code titans');
      expect(team.captainUserId).toBe(captainUserId);

      // Verify captain participant was created with userId
      const teamWithMembers = await teamService.getTeamById(team.id);
      expect(teamWithMembers.participants.length).toBe(1);
      expect(teamWithMembers.participants[0].userId).toBe(captainUserId);
      expect(teamWithMembers.participants[0].isCaptain).toBe(true);
    });

    it('Step 2: Should add Members 2, 3, 4 with userId = NULL and reject 5th member', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Code Titans',
        captainDetails: {
          name: 'Captain',
          email: 'captain@example.com',
          phone: '9876543210',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      // Add Members 2, 3, 4
      for (let i = 2; i <= 4; i++) {
        const member = await participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: `Member ${i}`,
          email: `member${i}@example.com`,
          phone: `987654321${i}`,
          college: 'Karunya',
          department: 'ECE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.NON_VEG,
        });
        expect(member.userId).toBeNull();
        expect(member.isCaptain).toBe(false);
      }

      const teamWithMembers = await teamService.getTeamById(team.id);
      expect(teamWithMembers.participants.length).toBe(4);

      // Attempting 5th Member should throw ValidationError
      await expect(
        participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: 'Member 5',
          email: 'member5@example.com',
          phone: '9876543215',
          college: 'Karunya',
          department: 'EEE',
          yearOfStudy: '1',
          foodPreference: FoodPreference.VEG,
        })
      ).rejects.toThrow(ValidationError);
    });

    it('Step 3: Should reject registration submission if team has fewer than 4 members', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Incomplete Team',
        captainDetails: {
          name: 'Captain',
          email: 'captain@example.com',
          phone: '9876543210',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      // Team has only 1 participant (Captain)
      await expect(
        registrationService.createOrSubmitRegistration(team.id, captainUserId)
      ).rejects.toThrow(ValidationError);
    });

    it('Step 4: Should complete full registration submission, authoritative fee calculation (₹2,400), and transactional confirmation', async () => {
      // 1. Create Team
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Complete Squad',
        captainDetails: {
          name: 'Captain',
          email: 'captain@example.com',
          phone: '9876543210',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      // 2. Add Members 2, 3, 4
      for (let i = 2; i <= 4; i++) {
        await participantService.addParticipant({
          teamId: team.id,
          requesterUserId: captainUserId,
          name: `Member ${i}`,
          email: `member${i}@example.com`,
          phone: `987654321${i}`,
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        });
      }

      // 3. Submit Registration
      const reg = await registrationService.createOrSubmitRegistration(team.id, captainUserId);
      expect(reg.status).toBe(RegistrationStatus.READY_FOR_PAYMENT);

      // 4. Initiate Payment -> Authoritative fee calculation ₹2,400 (₹600 per person x 4)
      const payment = await paymentService.initiatePayment({
        registrationId: reg.registrationId,
        requesterUserId: captainUserId,
      });

      expect(payment.amount).toBe(2400); // ₹2,400 TOTAL
      expect(payment.currency).toBe('INR');

      // 5. Verify Payment Transactionally
      const txId = 'KARUNYA-TXN-SUCCESS-999';
      const result = await paymentService.verifyPaymentTransaction({
        paymentId: payment.id,
        transactionId: txId,
        providerReference: 'REF-999',
      });

      expect(result.isConfirmed).toBe(true);
      expect(result.payment.status).toBe(PaymentStatus.VERIFIED);

      // Verify updated Team and Registration status
      const updatedTeam = await teamService.getTeamById(team.id);
      expect(updatedTeam.status).toBe(TeamStatus.CONFIRMED);
      expect(updatedTeam.registration?.status).toBe(RegistrationStatus.CONFIRMED);
    });

    it('Step 5: Should reject unauthorized requester for team actions', async () => {
      const team = await teamService.createTeam({
        captainUserId,
        teamName: 'Protected Team',
        captainDetails: {
          name: 'Captain',
          email: 'captain@example.com',
          phone: '9876543210',
          college: 'Karunya',
          department: 'CSE',
          yearOfStudy: '3',
          foodPreference: FoodPreference.VEG,
        },
      });

      const unauthorizedUserId = 'unauthorized-user-uuid';
      await expect(
        teamService.verifyCaptainOwnership(team.id, unauthorizedUserId)
      ).rejects.toThrow(AuthorizationError);
    });
  });
});
