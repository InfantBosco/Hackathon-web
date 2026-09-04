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
   * List Registrations (Paginated, Filtered, Searched)
   */
  public async listRegistrations(params: ListRegistrationsParams & { search?: string }) {
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
        { registrationId: { contains: query, mode: 'insensitive' } },
        { team: { teamName: { contains: query, mode: 'insensitive' } } },
        { team: { captain: { name: { contains: query, mode: 'insensitive' } } } },
        { team: { captain: { email: { contains: query, mode: 'insensitive' } } } },
      ];
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
                yearOfStudy: true,
                linkedinUrl: true,
                foodPreference: true,
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
   * List Payments (Paginated, Filtered, Searched)
   */
  public async listPayments(params: ListPaymentsParams & { search?: string }) {
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
        { transactionId: { contains: query, mode: 'insensitive' } },
        { providerReference: { contains: query, mode: 'insensitive' } },
        { registration: { registrationId: { contains: query, mode: 'insensitive' } } },
        { registration: { team: { teamName: { contains: query, mode: 'insensitive' } } } },
      ];
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

  /**
   * Get Analytics & Breakdown Metrics
   */
  public async getAnalytics() {
    const [
      collegesGroup,
      deptsGroup,
      foodGroup,
      paymentGroup,
      registrationGroup,
    ] = await Promise.all([
      this.prisma.participant.groupBy({
        by: ['college'],
        _count: { college: true },
        orderBy: { _count: { college: 'desc' } },
        take: 10,
      }),
      this.prisma.participant.groupBy({
        by: ['department'],
        _count: { department: true },
        orderBy: { _count: { department: 'desc' } },
        take: 10,
      }),
      this.prisma.participant.groupBy({
        by: ['foodPreference'],
        _count: { foodPreference: true },
      }),
      this.prisma.payment.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
      this.prisma.registration.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    return {
      topColleges: collegesGroup.map((c) => ({ college: c.college, count: c._count.college })),
      topDepartments: deptsGroup.map((d) => ({ department: d.department, count: d._count.department })),
      foodPreferenceDistribution: foodGroup.map((f) => ({ foodPreference: f.foodPreference, count: f._count.foodPreference })),
      paymentStatusDistribution: paymentGroup.map((p) => ({ status: p.status, count: p._count.status })),
      registrationStatusDistribution: registrationGroup.map((r) => ({ status: r.status, count: r._count.status })),
    };
  }

  /**
   * Export Registrations as CSV String
   */
  public async exportRegistrationsCsv(): Promise<string> {
    const registrations = await this.prisma.registration.findMany({
      include: {
        team: {
          include: {
            participants: true,
          },
        },
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const headers = [
      'Registration ID',
      'Team Name',
      'Registration Status',
      'Submitted At',
      'Confirmed At',
      'Captain Name',
      'Captain Email',
      'Captain Phone',
      'Captain College',
      'Member 2 Name',
      'Member 2 Email',
      'Member 3 Name',
      'Member 3 Email',
      'Member 4 Name',
      'Member 4 Email',
      'Payment Status',
      'Transaction ID',
      'Amount INR',
    ];

    const rows = registrations.map((r) => {
      const captain = r.team.participants.find((p) => p.isCaptain) || r.team.participants[0];
      const members = r.team.participants.filter((p) => !p.isCaptain);
      const latestPayment = r.payments[0];

      return [
        `"${r.registrationId}"`,
        `"${r.team.teamName.replace(/"/g, '""')}"`,
        `"${r.status}"`,
        `"${r.submittedAt ? r.submittedAt.toISOString() : ''}"`,
        `"${r.confirmedAt ? r.confirmedAt.toISOString() : ''}"`,
        `"${captain ? captain.name.replace(/"/g, '""') : ''}"`,
        `"${captain ? captain.email : ''}"`,
        `"${captain ? captain.phone : ''}"`,
        `"${captain ? captain.college.replace(/"/g, '""') : ''}"`,
        `"${members[0] ? members[0].name.replace(/"/g, '""') : ''}"`,
        `"${members[0] ? members[0].email : ''}"`,
        `"${members[1] ? members[1].name.replace(/"/g, '""') : ''}"`,
        `"${members[1] ? members[1].email : ''}"`,
        `"${members[2] ? members[2].name.replace(/"/g, '""') : ''}"`,
        `"${members[2] ? members[2].email : ''}"`,
        `"${latestPayment ? latestPayment.status : 'N/A'}"`,
        `"${latestPayment && latestPayment.transactionId ? latestPayment.transactionId : 'N/A'}"`,
        `"${latestPayment ? latestPayment.amount : 2400}"`,
      ].join(',');
    });

    return [headers.join(','), ...rows].join('\n');
  }

  /**
   * List Audit Logs (Paginated)
   */
  public async listAuditLogs(params: PaginationParams) {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(100, Math.max(1, params.limit || 10));
    const skip = (page - 1) * limit;

    const [total, logs] = await Promise.all([
      this.prisma.auditLog.count(),
      this.prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            include: {
              user: {
                select: { name: true, email: true },
              },
            },
          },
        },
      }),
    ]);

    return {
      data: logs.map((l) => ({
        id: l.id,
        action: l.action,
        entityType: l.entityType,
        entityId: l.entityId,
        metadata: l.metadata,
        adminName: l.admin.user.name,
        adminEmail: l.admin.user.email,
        createdAt: l.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
