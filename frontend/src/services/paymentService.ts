import { api } from '../lib/api';

export interface InitiatePaymentInput {
  registrationId: string;
  requesterUserId: string;
  provider?: string;
}

export interface VerifyPaymentInput {
  paymentId: string;
  transactionId: string;
  providerReference?: string;
}

export interface PaymentRecord {
  id: string;
  registrationId: string;
  amount: number;
  currency: string;
  provider: string;
  transactionId?: string | null;
  providerReference?: string | null;
  status: 'PENDING' | 'INITIATED' | 'PROCESSING' | 'SUCCESS' | 'VERIFIED' | 'FAILED' | 'EXPIRED' | 'CANCELLED';
  verifiedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export const paymentService = {
  async initiatePayment(input: InitiatePaymentInput): Promise<PaymentRecord> {
    const response = await api.post('/payments/create', input);
    return response.data.data;
  },

  async verifyPayment(input: VerifyPaymentInput): Promise<{ payment: PaymentRecord; isConfirmed: boolean }> {
    const response = await api.post(`/payments/${input.paymentId}/verify`, {
      transactionId: input.transactionId,
      providerReference: input.providerReference,
    });
    return response.data.data;
  },

  async getPaymentStatus(paymentId: string): Promise<PaymentRecord> {
    const response = await api.get(`/payments/${paymentId}/status`);
    return response.data.data;
  },
};
