import { api } from '../lib/api';

export interface DashboardMetrics {
  totalUsers: number;
  totalTeams: number;
  confirmedTeams: number;
  totalParticipants: number;
  confirmedRegistrations: number;
  pendingRegistrations: number;
  successfulPayments: number;
  pendingPayments: number;
  failedPayments: number;
  totalRevenueINR: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface AdminTeam {
  id: string;
  teamName: string;
  status: string;
  captain: {
    id: string;
    name: string;
    email: string;
  };
  participantCount: number;
  registration?: {
    registrationId: string;
    status: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AdminParticipant {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  yearOfStudy: string;
  linkedinUrl?: string;
  foodPreference: string;
  isCaptain: boolean;
  createdAt: string;
  team?: {
    id: string;
    teamName: string;
    status: string;
  };
}

export interface AdminRegistration {
  id: string;
  registrationId: string;
  status: string;
  submittedAt?: string | null;
  confirmedAt?: string | null;
  createdAt: string;
  team: {
    id: string;
    teamName: string;
    status: string;
    captain: {
      id: string;
      name: string;
      email: string;
    };
    participants?: AdminParticipant[];
    _count?: {
      participants: number;
    };
  };
  payments?: any[];
}

export interface AdminPayment {
  id: string;
  amount: number;
  currency: string;
  provider: string;
  transactionId?: string | null;
  providerReference?: string | null;
  status: string;
  verifiedAt?: string | null;
  createdAt: string;
  registration?: {
    registrationId: string;
    status: string;
    team: {
      id: string;
      teamName: string;
      captain: {
        id: string;
        name: string;
        email: string;
      };
    };
  };
}

export interface AdminAnalytics {
  topColleges: Array<{ college: string; count: number }>;
  topDepartments: Array<{ department: string; count: number }>;
  foodPreferenceDistribution: Array<{ foodPreference: string; count: number }>;
  paymentStatusDistribution: Array<{ status: string; count: number }>;
  registrationStatusDistribution: Array<{ status: string; count: number }>;
}

export interface AuditLogItem {
  id: string;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: any;
  adminName: string;
  adminEmail: string;
  createdAt: string;
}

export const adminService = {
  async getDashboardMetrics(): Promise<{ metrics: DashboardMetrics }> {
    const response = await api.get('/admin/dashboard');
    return response.data.data;
  },

  async getTeams(params: { page?: number; limit?: number; search?: string; status?: string }): Promise<PaginatedResponse<AdminTeam>> {
    const response = await api.get('/admin/teams', { params });
    return response.data.data;
  },

  async getTeamById(id: string): Promise<{ team: AdminTeam }> {
    const response = await api.get(`/admin/teams/${id}`);
    return response.data.data;
  },

  async getParticipants(params: {
    page?: number;
    limit?: number;
    search?: string;
    college?: string;
    department?: string;
    foodPreference?: string;
    isCaptain?: boolean;
  }): Promise<PaginatedResponse<AdminParticipant>> {
    const response = await api.get('/admin/participants', { params });
    return response.data.data;
  },

  async getParticipantById(id: string): Promise<{ participant: AdminParticipant }> {
    const response = await api.get(`/admin/participants/${id}`);
    return response.data.data;
  },

  async getRegistrations(params: { page?: number; limit?: number; search?: string; status?: string }): Promise<PaginatedResponse<AdminRegistration>> {
    const response = await api.get('/admin/registrations', { params });
    return response.data.data;
  },

  async getRegistrationById(id: string): Promise<{ registration: AdminRegistration }> {
    const response = await api.get(`/admin/registrations/${id}`);
    return response.data.data;
  },

  async getPayments(params: { page?: number; limit?: number; search?: string; status?: string }): Promise<PaginatedResponse<AdminPayment>> {
    const response = await api.get('/admin/payments', { params });
    return response.data.data;
  },

  async getPaymentById(id: string): Promise<{ payment: AdminPayment }> {
    const response = await api.get(`/admin/payments/${id}`);
    return response.data.data;
  },

  async getAnalytics(): Promise<AdminAnalytics> {
    const response = await api.get('/admin/analytics');
    return response.data.data;
  },

  async exportRegistrationsCsv(): Promise<Blob> {
    const response = await api.get('/admin/exports/registrations', {
      responseType: 'blob',
    });
    return response.data;
  },

  async getAuditLogs(params: { page?: number; limit?: number }): Promise<PaginatedResponse<AuditLogItem>> {
    const response = await api.get('/admin/audit-logs', { params });
    return response.data.data;
  },
};
