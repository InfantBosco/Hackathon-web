import { api } from '../lib/api';

export type FoodPreference = 'VEGETARIAN' | 'NON_VEGETARIAN';

export interface ParticipantInput {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  yearOfStudy: string;
  linkedinUrl?: string;
  foodPreference: FoodPreference;
}

export interface CreateTeamInput {
  captainUserId: string;
  teamName: string;
  captainDetails: ParticipantInput;
}

export interface AddMemberInput extends ParticipantInput {
  requesterUserId: string;
}

export interface RegistrationSummary {
  registrationId: string;
  status: string;
  team: {
    id: string;
    name: string;
    status: string;
  };
  participantCount: number;
  feeSummary: {
    feePerPerson: number;
    totalAmount: number;
    currency: string;
  };
  submittedAt: string;
  confirmedAt?: string | null;
}

export const registrationService = {
  async createTeam(input: CreateTeamInput) {
    const response = await api.post('/teams', input);
    return response.data.data;
  },

  async addParticipant(teamId: string, input: AddMemberInput) {
    const response = await api.post(`/participants/team/${teamId}`, input);
    return response.data.data;
  },

  async submitRegistration(teamId: string, requesterUserId: string) {
    const response = await api.post('/registrations', {
      teamId,
      requesterUserId,
    });
    return response.data.data;
  },

  async getRegistrationSummary(registrationId: string, requesterUserId: string): Promise<RegistrationSummary> {
    const response = await api.get(`/registrations/${registrationId}`, {
      params: { requesterUserId },
    });
    return response.data.data;
  },

  async getTeamById(teamId: string) {
    const response = await api.get(`/teams/${teamId}`);
    return response.data.data;
  },
};
