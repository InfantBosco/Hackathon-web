import { PrismaClient, Participant, FoodPreference, TeamStatus } from '@prisma/client';
import { ConflictError, NotFoundError, ValidationError, InvalidStateError } from '../core/errors.js';
import { normalizeEmail, trimString } from '../utils/normalization.js';
import { ValidationService } from './validation.service.js';
import { TeamService } from './team.service.js';

export interface AddParticipantInput {
  teamId: string;
  requesterUserId: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  yearOfStudy: string;
  linkedinUrl?: string;
  foodPreference: FoodPreference;
}

export class ParticipantService {
  constructor(private prisma: PrismaClient, private teamService: TeamService) {}

  /**
   * Add a new participant to a team
   */
  public async addParticipant(input: AddParticipantInput): Promise<Participant> {
    // 1. Ownership & Authorization Check
    const team = await this.teamService.verifyCaptainOwnership(input.teamId, input.requesterUserId);

    // 2. State Check: Cannot modify members if confirmed or payment pending
    if (team.status === TeamStatus.CONFIRMED || team.status === TeamStatus.PAYMENT_VERIFIED) {
      throw new InvalidStateError('Cannot modify team members after registration is confirmed');
    }

    // 3. Max Participant Count Check (Max 4)
    const existingParticipants = await this.prisma.participant.findMany({
      where: { teamId: input.teamId },
    });

    if (existingParticipants.length >= ValidationService.MANDATORY_TEAM_SIZE) {
      throw new ValidationError(`Team already has maximum allowed participants (${ValidationService.MANDATORY_TEAM_SIZE})`);
    }

    // 4. Input Format Validation
    const cleanEmail = normalizeEmail(input.email);
    ValidationService.validateEmail(cleanEmail);
    ValidationService.validatePhone(input.phone);
    ValidationService.validateFoodPreference(input.foodPreference);

    // 5. Global Participant Email Uniqueness Check
    const existingGlobalEmail = await this.prisma.participant.findUnique({
      where: { email: cleanEmail },
    });

    if (existingGlobalEmail) {
      throw new ConflictError('This participant is already associated with a HackNEX team.');
    }

    // 6. Create Member 2/3/4 with userId = NULL
    const participant = await this.prisma.participant.create({
      data: {
        teamId: input.teamId,
        userId: null, // Non-captain participants do not require user accounts
        name: trimString(input.name),
        email: cleanEmail,
        phone: trimString(input.phone),
        college: trimString(input.college),
        department: trimString(input.department),
        yearOfStudy: trimString(input.yearOfStudy),
        linkedinUrl: input.linkedinUrl ? trimString(input.linkedinUrl) : null,
        foodPreference: input.foodPreference,
        isCaptain: false,
      },
    });

    return participant;
  }

  /**
   * Remove a non-captain participant from a team
   */
  public async removeParticipant(participantId: string, requesterUserId: string): Promise<void> {
    const participant = await this.prisma.participant.findUnique({
      where: { id: participantId },
    });

    if (!participant) {
      throw new NotFoundError('Participant not found');
    }

    if (participant.isCaptain) {
      throw new ValidationError('Cannot remove the team captain. Delete or transfer team instead.');
    }

    const team = await this.teamService.verifyCaptainOwnership(participant.teamId, requesterUserId);

    if (team.status === TeamStatus.CONFIRMED || team.status === TeamStatus.PAYMENT_VERIFIED) {
      throw new InvalidStateError('Cannot remove team members after registration is confirmed');
    }

    await this.prisma.participant.delete({
      where: { id: participantId },
    });
  }
}
