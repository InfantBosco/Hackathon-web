import { PrismaClient, TeamStatus, RegistrationStatus, PaymentStatus, FoodPreference } from '@prisma/client';
import { NotFoundError } from '../core/errors.js';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ListTeamsParams extends PaginationParams {
  search?: string;
  status?: TeamStatus;
}

export interface ListParticipantsParams extends PaginationParams {
  search?: string;
  college?: string;
  department?: string;
  foodPreference?: FoodPreference;
  isCaptain?: boolean;
}

export interface ListRegistrationsParams extends PaginationParams {
  status?: RegistrationStatus;
}

export interface ListPaymentsParams extends PaginationParams {
  status?: PaymentStatus;
}

export class AdminService {
  constructor(private prisma: PrismaClient) {}

  /**
   * Get Admin Dashboard Metrics
   */
  public async getDashboardMetrics() {
    const [
      totalUsers,
      totalTeams,
      confirmedTeams,
      totalParticipants,
      confirmedRegistrations,
      pendingRegistrations,
      successfulPayments,
      pendingPayments,
      failedPayments,
      revenueResult,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.team.count(),
      this.prisma.team.count({ where: { status: TeamStatus.CONFIRMED } }),
      this.prisma.participant.count(),
      this.prisma.registration.count({ where: { status: RegistrationStatus.CONFIRMED } }),
      this.prisma.registration.count({ where: { status: { in: [RegistrationStatus.DRAFT, RegistrationStatus.READY_FOR_PAYMENT, RegistrationStatus.PAYMENT_PENDING] } } }),
      this.prisma.payment.count({ where: { status: PaymentStatus.VERIFIED } }),
      this.prisma.payment.count({ where: { status: { in: [PaymentStatus.PENDING, PaymentStatus.INITIATED, PaymentStatus.PROCESSING] } } }),
      this.prisma.payment.count({ where: { status: { in: [PaymentStatus.FAILED, PaymentStatus.EXPIRED, PaymentStatus.CANCELLED] } } }),
      this.prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: PaymentStatus.VERIFIED },
      }),
    ]);

    return {
      metrics: {
        totalUsers,
        totalTeams,
        confirmedTeams,
        totalParticipants,
        confirmedRegistrations,
        pendingRegistrations,
        successfulPayments,
        pendingPayments,
        failedPayments,
        totalRevenueINR: revenueResult._sum.amount || 0,
      },
    };
  }

  /**
   * List Teams (Paginated, Filtered, Searched)
   */
  public async listTeams(params: ListTeamsParams) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 10));
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (params.status) {
      whereClause.status = params.status;
    }

    if (params.search && params.search.trim()) {
      const query = params.search.trim();
      whereClause.OR = [
        { teamName: { contains: query, mode: 'insensitive' } },
        { captain: { name: { contains: query, mode: 'insensitive' } } },
        { captain: { email: { contains: query, mode: 'insensitive' } } },
      ];
    }

    const [total, teams] = await Promise.all([
      this.prisma.team.count({ where: whereClause }),
      this.prisma.team.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          teamName: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          captain: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          _count: {
            select: { participants: true },
          },
          registration: {
            select: {
              registrationId: true,
              status: true,
            },
          },
        },
      }),
    ]);

    return {
      data: teams.map((t) => ({
        id: t.id,
        teamName: t.teamName,
        status: t.status,
        captain: t.captain,
        participantCount: t._count.participants,
        registration: t.registration,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get Team Details by ID
   */
  public async getTeamById(id: string) {
    const team = await this.prisma.team.findUnique({
      where: { id },
      select: {
        id: true,
        teamName: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        captain: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            college: true,
            department: true,
            yearOfStudy: true,
            linkedinUrl: true,
            foodPreference: true,
            isCaptain: true,
            createdAt: true,
          },
        },
        registration: {
          select: {
            id: true,
            registrationId: true,
            status: true,
            submittedAt: true,
            confirmedAt: true,
            payments: {
              select: {
                id: true,
                amount: true,
                currency: true,
                provider: true,
                transactionId: true,
                providerReference: true,
                status: true,
                verifiedAt: true,
              },
            },
          },
        },
      },
    });

    if (!team) {
      throw new NotFoundError(`Team not found with ID ${id}`);
    }

    return { team };
  }

  /**
   * List Participants (Paginated, Filtered, Searched)
   */
  public async listParticipants(params: ListParticipantsParams) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 10));
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (params.college) {
      whereClause.college = { equals: params.college, mode: 'insensitive' };
    }
    if (params.department) {
      whereClause.department = { equals: params.department, mode: 'insensitive' };
    }
    if (params.foodPreference) {
      whereClause.foodPreference = params.foodPreference;
    }
    if (params.isCaptain !== undefined) {
      whereClause.isCaptain = params.isCaptain;
    }

    if (params.search && params.search.trim()) {
      const query = params.search.trim();
      whereClause.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query, mode: 'insensitive' } },
        { college: { contains: query, mode: 'insensitive' } },
      ];
    }

    const [total, participants] = await Promise.all([
      this.prisma.participant.count({ where: whereClause }),
      this.prisma.participant.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          college: true,
          department: true,
          yearOfStudy: true,
          linkedinUrl: true,
          foodPreference: true,
          isCaptain: true,
          createdAt: true,
          team: {
            select: {
              id: true,
              teamName: true,
              status: true,
            },
          },
        },
      }),
    ]);

    return {
      data: participants,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get Participant Details by ID
   */
  public async getParticipantById(id: string) {
    const participant = await this.prisma.participant.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        college: true,
        department: true,
        yearOfStudy: true,
        linkedinUrl: true,
        foodPreference: true,
        isCaptain: true,
        createdAt: true,
        updatedAt: true,
        team: {
          select: {
            id: true,
            teamName: true,
            status: true,
            captain: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!participant) {
      throw new NotFoundError(`Participant not found with ID ${id}`);
    }

    return { participant };
  }

  /**
   * List Registrations (Paginated, Filtered)
   */
  public async listRegistrations(params: ListRegistrationsParams) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 10));
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (params.status) {
      whereClause.status = params.status;
    }

    const [total, registrations] = await Promise.all([
      this.prisma.registration.count({ where: whereClause }),
      this.prisma.registration.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          registrationId: true,
          status: true,
          submittedAt: true,
          confirmedAt: true,
          createdAt: true,
          team: {
            select: {
              id: true,
              teamName: true,
              status: true,
              captain: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              _count: {
                select: { participants: true },
              },
            },
          },
        },
      }),
    ]);

    return {
      data: registrations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get Registration Details by ID
   */
  public async getRegistrationById(id: string) {
    const registration = await this.prisma.registration.findFirst({
      where: {
        OR: [{ id }, { registrationId: id }],
      },
      select: {
        id: true,
        registrationId: true,
        status: true,
        submittedAt: true,
        confirmedAt: true,
        createdAt: true,
        updatedAt: true,
        team: {
          select: {
            id: true,
            teamName: true,
            status: true,
            captain: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            participants: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                college: true,
                department: true,
                isCaptain: true,
              },
            },
          },
        },
        payments: {
          select: {
            id: true,
            amount: true,
            currency: true,
            provider: true,
            transactionId: true,
            providerReference: true,
            status: true,
            verifiedAt: true,
          },
        },
      },
    });

    if (!registration) {
      throw new NotFoundError(`Registration record not found with ID ${id}`);
    }

    return { registration };
  }

  /**
   * List Payments (Paginated, Filtered)
   */
  public async listPayments(params: ListPaymentsParams) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 10));
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (params.status) {
      whereClause.status = params.status;
    }

    const [total, payments] = await Promise.all([
      this.prisma.payment.count({ where: whereClause }),
      this.prisma.payment.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          amount: true,
          currency: true,
          provider: true,
          transactionId: true,
          providerReference: true,
          status: true,
          verifiedAt: true,
          createdAt: true,
          registration: {
            select: {
              registrationId: true,
              status: true,
              team: {
                select: {
                  id: true,
                  teamName: true,
                  captain: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),
    ]);

    return {
      data: payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get Payment Details by ID
   */
  public async getPaymentById(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        currency: true,
        provider: true,
        transactionId: true,
        providerReference: true,
        status: true,
        verifiedAt: true,
        createdAt: true,
        updatedAt: true,
        registration: {
          select: {
            id: true,
            registrationId: true,
            status: true,
            team: {
              select: {
                id: true,
                teamName: true,
                captain: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundError(`Payment record not found with ID ${id}`);
    }

    return { payment };
  }
}
