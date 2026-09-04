import { PrismaClient, Team, TeamStatus, FoodPreference, Prisma } from '@prisma/client';
import { ConflictError, NotFoundError, AuthorizationError, ValidationError } from '../core/errors.js';
import { normalizeEmail, normalizeTeamName, trimString } from '../utils/normalization.js';
import { ValidationService } from './validation.service.js';

export interface CreateTeamInput {
  captainUserId: string;
  teamName: string;
  captainDetails: {
    name: string;
    email: string;
    phone: string;
    college: string;
    department: string;
    yearOfStudy: string;
    linkedinUrl?: string;
    foodPreference: FoodPreference;
  };
}

export type TeamWithMembers = Prisma.PromiseReturnType<TeamService['getTeamById']>;

export class TeamService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Create a new Team and assign Captain Participant
   */
  public async createTeam(input: CreateTeamInput): Promise<Team> {
    const rawTeamName = trimString(input.teamName);
    const normalizedName = normalizeTeamName(rawTeamName);

    if (!rawTeamName) {
      throw new ValidationError('Team name is required');
    }

    // 1. Verify Captain User exists
    const captainUser = await this.prisma.user.findUnique({
      where: { id: input.captainUserId },
    });

    if (!captainUser) {
      throw new NotFoundError('Captain User account not found');
    }

    // 2. Check if Captain already owns a team
    const existingCaptainTeam = await this.prisma.team.findUnique({
      where: { captainUserId: input.captainUserId },
    });

    if (existingCaptainTeam) {
      throw new ConflictError('User is already a captain of another team');
    }

    // 3. Check Team Name uniqueness
    const existingName = await this.prisma.team.findFirst({
      where: {
        OR: [{ teamName: rawTeamName }, { normalizedTeamName: normalizedName }],
      },
    });

    if (existingName) {
      throw new ConflictError(`Team name '${rawTeamName}' is already taken`);
    }

    // 4. Validate Captain Participant Input
    const captainEmail = normalizeEmail(input.captainDetails.email);
    ValidationService.validateEmail(captainEmail);
    ValidationService.validatePhone(input.captainDetails.phone);

    // 5. Check Captain Participant Email Uniqueness
    const existingParticipantEmail = await this.prisma.participant.findUnique({
      where: { email: captainEmail },
    });

    if (existingParticipantEmail) {
      throw new ConflictError('This participant email is already associated with a HackNEX team.');
    }

    // 6. Create Team & Captain Participant atomically
    const team = await this.prisma.$transaction(async (tx) => {
      const createdTeam = await tx.team.create({
        data: {
          teamName: rawTeamName,
          normalizedTeamName: normalizedName,
          captainUserId: input.captainUserId,
          status: TeamStatus.DRAFT,
        },
      });

      await tx.participant.create({
        data: {
          teamId: createdTeam.id,
          userId: input.captainUserId,
          name: trimString(input.captainDetails.name),
          email: captainEmail,
          phone: trimString(input.captainDetails.phone),
          college: trimString(input.captainDetails.college),
          department: trimString(input.captainDetails.department),
          yearOfStudy: trimString(input.captainDetails.yearOfStudy),
          linkedinUrl: input.captainDetails.linkedinUrl ? trimString(input.captainDetails.linkedinUrl) : null,
          foodPreference: input.captainDetails.foodPreference,
          isCaptain: true,
        },
      });

      return createdTeam;
    });

    return team;
  }

  /**
   * Get team details with participants and registration info
   */
  public async getTeamById(teamId: string) {
    const team = await this.prisma.team.findUnique({
      where: { id: teamId },
      include: {
        captain: {
          select: { id: true, name: true, email: true },
        },
        participants: true,
        registration: {
          include: {
            payments: true,
          },
        },
      },
    });

    if (!team) {
      throw new NotFoundError(`Team not found with ID ${teamId}`);
    }

    return team;
  }

  /**
   * Verify server-side captain ownership
   */
  public async verifyCaptainOwnership(teamId: string, userId: string): Promise<TeamWithMembers> {
    const team = await this.getTeamById(teamId);
    if (team.captainUserId !== userId) {
      throw new AuthorizationError('You are not authorized to perform actions on this team.');
    }
    return team;
  }
}
