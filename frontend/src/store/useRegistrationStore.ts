import { create } from 'zustand';
import { registrationService, ParticipantInput, RegistrationSummary } from '../services/registrationService';

export interface FormErrors {
  [key: string]: string;
}

export interface RegistrationWizardState {
  currentStep: number;
  teamName: string;
  captain: ParticipantInput;
  member2: ParticipantInput;
  member3: ParticipantInput;
  member4: ParticipantInput;

  isSubmitting: boolean;
  error: string | null;
  submittedRegistration: RegistrationSummary | null;
  submittedTeamId: string | null;

  // Actions
  setStep: (step: number) => void;
  setTeamName: (name: string) => void;
  updateCaptain: (data: Partial<ParticipantInput>) => void;
  updateMember2: (data: Partial<ParticipantInput>) => void;
  updateMember3: (data: Partial<ParticipantInput>) => void;
  updateMember4: (data: Partial<ParticipantInput>) => void;
  initCaptainFromUser: (user: { name?: string; email: string }) => void;
  resetForm: () => void;
  submitFullRegistration: (userId: string) => Promise<RegistrationSummary>;
}

const defaultParticipant = (initialName = '', initialEmail = ''): ParticipantInput => ({
  name: initialName,
  email: initialEmail,
  phone: '',
  college: '',
  department: '',
  yearOfStudy: '1st Year',
  linkedinUrl: '',
  foodPreference: 'NON_VEGETARIAN',
});

export const useRegistrationStore = create<RegistrationWizardState>((set, get) => ({
  currentStep: 1,
  teamName: '',
  captain: defaultParticipant(),
  member2: defaultParticipant(),
  member3: defaultParticipant(),
  member4: defaultParticipant(),

  isSubmitting: false,
  error: null,
  submittedRegistration: null,
  submittedTeamId: null,

  setStep: (step) => set({ currentStep: step, error: null }),

  setTeamName: (name) => set({ teamName: name }),

  updateCaptain: (data) =>
    set((state) => ({
      captain: { ...state.captain, ...data },
    })),

  updateMember2: (data) =>
    set((state) => ({
      member2: { ...state.member2, ...data },
    })),

  updateMember3: (data) =>
    set((state) => ({
      member3: { ...state.member3, ...data },
    })),

  updateMember4: (data) =>
    set((state) => ({
      member4: { ...state.member4, ...data },
    })),

  initCaptainFromUser: (user) => {
    set((state) => ({
      captain: {
        ...state.captain,
        name: state.captain.name || user.name || '',
        email: user.email || state.captain.email,
      },
    }));
  },

  resetForm: () =>
    set({
      currentStep: 1,
      teamName: '',
      captain: defaultParticipant(),
      member2: defaultParticipant(),
      member3: defaultParticipant(),
      member4: defaultParticipant(),
      isSubmitting: false,
      error: null,
      submittedRegistration: null,
      submittedTeamId: null,
    }),

  submitFullRegistration: async (userId: string) => {
    const { teamName, captain, member2, member3, member4 } = get();

    set({ isSubmitting: true, error: null });

    try {
      // 1. Create Team & Captain
      const createdTeam = await registrationService.createTeam({
        captainUserId: userId,
        teamName,
        captainDetails: captain,
      });

      const teamId = createdTeam.id;

      // 2. Add Member 2, Member 3, Member 4 sequentially
      await registrationService.addParticipant(teamId, {
        ...member2,
        requesterUserId: userId,
      });

      await registrationService.addParticipant(teamId, {
        ...member3,
        requesterUserId: userId,
      });

      await registrationService.addParticipant(teamId, {
        ...member4,
        requesterUserId: userId,
      });

      // 3. Submit Registration (transition state to READY_FOR_PAYMENT)
      const registration = await registrationService.submitRegistration(teamId, userId);

      // 4. Fetch complete summary
      const summary = await registrationService.getRegistrationSummary(registration.registrationId, userId);

      set({
        isSubmitting: false,
        submittedTeamId: teamId,
        submittedRegistration: summary,
        currentStep: 7, // Transition to Payment Boundary Handoff view
      });

      return summary;
    } catch (err: any) {
      const msg = err.message || 'Registration failed. Please check member details and try again.';
      set({ isSubmitting: false, error: msg });
      throw new Error(msg);
    }
  },
}));
