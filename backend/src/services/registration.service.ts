import { PrismaClient, Registration, RegistrationStatus, TeamStatus } from '@prisma/client';
import { ConflictError, NotFoundError, ValidationError, InvalidStateError } from '../core/errors.js';
import { ValidationService } from './validation.service.js';
import { TeamService } from './team.service.js';
import { EmailService } from './email.service.js';

export class RegistrationService {
  constructor(private prisma: PrismaClient, private teamService: TeamService, private emailService?: EmailService) {}

  /**
   * Generate a unique registration ID (e.g. HNX-2026-000001)
   */
  private async generateRegistrationId(): Promise<string> {
    const count = await this.prisma.registration.count();
    const sequence = (count + 1).toString().padStart(6, '0');
    return `HNX-2026-${sequence}`;
  }

  /**
   * Create or transition registration for a team
   */
  public async createOrSubmitRegistration(teamId: string, requesterUserId: string): Promise<Registration> {
    // 1. Ownership & Authorization Check
    const team = await this.teamService.verifyCaptainOwnership(teamId, requesterUserId);

    // 2. Validate Team has EXACTLY 4 Participants
    const participantCount = team.participants.length;
    ValidationService.validateTeamSizeForRegistration(participantCount);

    // 3. Check for existing active registration
    const existingRegistration = await this.prisma.registration.findUnique({
      where: { teamId },
    });

    if (existingRegistration && (existingRegistration.status === RegistrationStatus.CONFIRMED || existingRegistration.status === RegistrationStatus.PAYMENT_VERIFIED)) {
      throw new ConflictError('Team registration is already confirmed and completed');
    }

    const regId = existingRegistration ? existingRegistration.registrationId : await this.generateRegistrationId();
    const now = new Date();

    // 4. Update or Create Registration & Sync Team Status atomically
    const registration = await this.prisma.$transaction(async (tx) => {
      const reg = await tx.registration.upsert({
        where: { teamId },
        update: {
          status: RegistrationStatus.READY_FOR_PAYMENT,
          submittedAt: now,
        },
        create: {
          registrationId: regId,
          teamId,
          status: RegistrationStatus.READY_FOR_PAYMENT,
          submittedAt: now,
        },
      });

      await tx.team.update({
        where: { id: teamId },
        data: {
          status: TeamStatus.READY_FOR_PAYMENT,
        },
      });

      return reg;
    });

    // 5. Async Email Dispatch (Safe & Non-blocking)
    if (this.emailService && team.captain) {
      try {
        const membersList = team.participants.map((p) => ({
          name: p.name,
          email: p.email,
          role: p.isCaptain ? 'Team Captain' : 'Team Member',
        }));

        await this.emailService.sendRegistrationConfirmationEmail(team.captain.email, {
          teamName: team.teamName,
          teamCode: team.id.slice(0, 8).toUpperCase(),
          trackTitle: 'General Hackathon Track',
          leaderName: team.captain.name,
          members: membersList,
        });
      } catch (err) {
        console.error('⚠️ Non-critical error: Failed to dispatch registration confirmation email:', err);
      }
    }

    return registration;
  }

  /**
   * Get registration summary for team captain by registration ID
   */
  public async getRegistrationSummary(registrationId: string, requesterUserId: string) {
    const registration = await this.prisma.registration.findUnique({
      where: { registrationId },
      include: {
        team: {
          include: {
            participants: true,
          },
        },
        payments: true,
      },
    });

    if (!registration) {
      throw new NotFoundError(`Registration not found with ID ${registrationId}`);
    }

    if (registration.team.captainUserId !== requesterUserId) {
      throw new InvalidStateError('Unauthorized access to registration details');
    }

    const participantCount = registration.team.participants.length;
    const totalFee = ValidationService.calculateRegistrationFee(participantCount);

    return {
      id: registration.id,
      registrationId: registration.registrationId,
      status: registration.status,
      team: {
        id: registration.team.id,
        name: registration.team.teamName,
        status: registration.team.status,
        participants: registration.team.participants,
      },
      participantCount,
      feeSummary: {
        feePerPerson: ValidationService.REGISTRATION_FEE_PER_PERSON,
        totalAmount: totalFee,
        currency: 'INR',
      },
      submittedAt: registration.submittedAt,
      confirmedAt: registration.confirmedAt,
      payments: registration.payments,
    };
  }

  /**
   * Get active team registration summary for a user (captain)
   */
  public async getRegistrationByUserId(userId: string) {
    const team = await this.prisma.team.findUnique({
      where: { captainUserId: userId },
      include: {
        registration: true,
      },
    });

    if (!team || !team.registration) {
      return null;
    }

    return this.getRegistrationSummary(team.registration.registrationId, userId);
  }
}
