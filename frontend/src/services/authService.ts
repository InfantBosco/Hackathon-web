import { api } from '../lib/api';

export interface UserProfile {
  id: string;
  name?: string;
  email: string;
  emailVerified?: boolean;
  role: 'ADMIN' | 'USER' | 'PARTICIPANT';
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  token: string;
  newPassword: string;
  confirmPassword?: string;
}

export const authService = {
  async signup(data: SignupInput) {
    const response = await api.post('/auth/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword || data.password,
    });
    return response.data.data;
  },

  async verifyEmail(token: string) {
    const response = await api.post('/auth/verify-email', { token });
    return response.data.data;
  },

  async resendVerification(email: string) {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data.data;
  },

  async login(data: LoginInput) {
    const response = await api.post('/auth/login', {
      email: data.email,
      password: data.password,
    });
    return response.data.data;
  },

  async forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data.data;
  },

  async resetPassword(data: ResetPasswordInput) {
    const response = await api.post('/auth/reset-password', {
      token: data.token,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword || data.newPassword,
    });
    return response.data.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore network failures on logout
    }
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data.data;
  },
};
