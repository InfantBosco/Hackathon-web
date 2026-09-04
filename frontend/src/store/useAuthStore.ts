import { create } from 'zustand';
import { authService, UserProfile, LoginInput, SignupInput } from '../services/authService';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  isLoading: boolean;
  login: (credentials: LoginInput) => Promise<void>;
  signup: (data: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
  setUser: (user: UserProfile | null, token?: string | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: sessionStorage.getItem('hacknex_token'),
  isAuthenticated: !!sessionStorage.getItem('hacknex_token'),
  isVerified: false,
  isLoading: false,

  setUser: (user, token) => {
    if (token) {
      sessionStorage.setItem('hacknex_token', token);
    } else if (token === null) {
      sessionStorage.removeItem('hacknex_token');
    }

    set({
      user,
      token: token ?? get().token,
      isAuthenticated: !!user && !!(token ?? get().token),
      isVerified: user?.emailVerified ?? false,
      isLoading: false,
    });
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const data = await authService.login(credentials);
      sessionStorage.setItem('hacknex_token', data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isVerified: data.user?.emailVerified ?? true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signup: async (data) => {
    set({ isLoading: true });
    try {
      await authService.signup(data);
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    await authService.logout();
    sessionStorage.removeItem('hacknex_token');
    localStorage.removeItem('hacknex_token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isVerified: false,
      isLoading: false,
    });
  },

  initializeAuth: async () => {
    const token = sessionStorage.getItem('hacknex_token');
    if (!token) {
      set({ isLoading: false, isAuthenticated: false, user: null, isVerified: false });
      return;
    }

    try {
      const data = await authService.getCurrentUser();
      set({
        user: data.user,
        token,
        isAuthenticated: true,
        isVerified: data.user?.emailVerified ?? true,
        isLoading: false,
      });
    } catch {
      sessionStorage.removeItem('hacknex_token');
      localStorage.removeItem('hacknex_token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isVerified: false,
        isLoading: false,
      });
    }
  },
}));
