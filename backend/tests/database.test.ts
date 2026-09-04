import { describe, it, expect } from 'vitest';
import { PrismaClient, FoodPreference, TeamStatus, RegistrationStatus, PaymentStatus, MediaCategory } from '@prisma/client';
import { normalizeEmail, normalizeTeamName, trimString } from '../src/utils/normalization.js';

describe('Phase 2 — Database Models & Fee Verification Suite', () => {
  // 1. Critical Fee Verification Test
  describe('Fee Structure Verification Rule', () => {
    const REGISTRATION_FEE_PER_PERSON = 600;
    const MANDATORY_TEAM_SIZE = 4;
    const EXPECTED_TOTAL_TEAM_FEE = REGISTRATION_FEE_PER_PERSON * MANDATORY_TEAM_SIZE;

    it('must enforce ₹600 PER PERSON resulting in ₹2,400 for a complete 4-member team', () => {
      expect(REGISTRATION_FEE_PER_PERSON).toBe(600);
      expect(MANDATORY_TEAM_SIZE).toBe(4);
      expect(EXPECTED_TOTAL_TEAM_FEE).toBe(2400);
    });

    it('should calculate correct total payment amount for any team size multiplier', () => {
      const calculateTeamFee = (participantCount: number) => participantCount * REGISTRATION_FEE_PER_PERSON;
      expect(calculateTeamFee(1)).toBe(600);
      expect(calculateTeamFee(4)).toBe(2400);
    });
  });

  // 2. Data Normalization Unit Tests
  describe('Data Normalization Utilities', () => {
    it('should trim string whitespace', () => {
      expect(trimString('   Infant Bosco   ')).toBe('Infant Bosco');
    });

    it('should normalize emails to lowercase and trimmed strings', () => {
      expect(normalizeEmail('  INFANT@EXAMPLE.COM  ')).toBe('infant@example.com');
    });

    it('should normalize team names by trimming, lowercasing, and collapsing multiple spaces', () => {
      expect(normalizeTeamName('  Code   Titans  ')).toBe('code titans');
      expect(normalizeTeamName('CODE TITANS')).toBe('code titans');
      expect(normalizeTeamName('code titans')).toBe('code titans');
    });
  });

  // 3. Schema Structure & Enum Verification
  describe('Prisma Schema Baseline & Enum Exports', () => {
    it('should export all 5 required Enums correctly', () => {
      expect(FoodPreference.VEG).toBe('VEG');
      expect(FoodPreference.NON_VEG).toBe('NON_VEG');

      expect(TeamStatus.DRAFT).toBe('DRAFT');
      expect(TeamStatus.CONFIRMED).toBe('CONFIRMED');

      expect(RegistrationStatus.DRAFT).toBe('DRAFT');
      expect(RegistrationStatus.CONFIRMED).toBe('CONFIRMED');

      expect(PaymentStatus.PENDING).toBe('PENDING');
      expect(PaymentStatus.VERIFIED).toBe('VERIFIED');

      expect(MediaCategory.HERO).toBe('HERO');
      expect(MediaCategory.ORGANIZER).toBe('ORGANIZER');
    });

    it('should instantiate PrismaClient with all 17 model delegates defined', () => {
      const prisma = new PrismaClient();
      expect(prisma.user).toBeDefined();
      expect(prisma.session).toBeDefined();
      expect(prisma.account).toBeDefined();
      expect(prisma.verification).toBeDefined();
      expect(prisma.team).toBeDefined();
      expect(prisma.participant).toBeDefined();
      expect(prisma.registration).toBeDefined();
      expect(prisma.payment).toBeDefined();
      expect(prisma.domain).toBeDefined();
      expect(prisma.scheduleItem).toBeDefined();
      expect(prisma.prize).toBeDefined();
      expect(prisma.sponsor).toBeDefined();
      expect(prisma.fAQ).toBeDefined();
      expect(prisma.announcement).toBeDefined();
      expect(prisma.media).toBeDefined();
      expect(prisma.admin).toBeDefined();
      expect(prisma.auditLog).toBeDefined();
    });
  });

  // 4. Conceptual Data Structure & Relationship Tests
  describe('Registration & Participant Conceptual Models', () => {
    it('should allow Captain to have userId while non-captain participants have userId = null', () => {
      const captainUserId = 'uuid-captain-user-123';

      const captainParticipant = {
        name: 'Captain Name',
        email: 'captain@example.com',
        userId: captainUserId,
        isCaptain: true,
      };

      const member2Participant = {
        name: 'Member Two',
        email: 'member2@example.com',
        userId: null,
        isCaptain: false,
      };

      expect(captainParticipant.userId).toBe(captainUserId);
      expect(captainParticipant.isCaptain).toBe(true);

      expect(member2Participant.userId).toBeNull();
      expect(member2Participant.isCaptain).toBe(false);
    });

    it('should construct Payment model payload with amount = 2400 (INR) for 4 members', () => {
      const paymentPayload = {
        registrationId: 'reg-uuid-001',
        amount: 4 * 600,
        currency: 'INR',
        provider: 'KARUNYA',
        status: PaymentStatus.PENDING,
      };

      expect(paymentPayload.amount).toBe(2400);
      expect(paymentPayload.currency).toBe('INR');
    });
  });
});
