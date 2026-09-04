# Karunya Payment Integration — Pending Integration Status

## Overview
Payment integration for **HackNEX 2026** requires connecting to the official **Karunya Payment System**. However, the exact technical API documentation, merchant endpoints, secret key structures, callback URLs, and webhook signature formats are pending release from the Karunya Institute finance/IT team.

---

## Payment Adapter Pattern Architecture

To ensure project development proceeds without being blocked by pending payment provider details, the HackNEX backend utilizes the **Payment Adapter Pattern**.

### Abstraction Design (`PaymentProvider` Interface)

```typescript
export interface PaymentProvider {
  createPayment(params: {
    registrationId: string;
    amount: number;
    currency: string;
    returnUrl: string;
  }): Promise<{
    paymentId: string;
    paymentUrl: string;
    transactionId?: string;
  }>;

  verifyPayment(params: {
    paymentId: string;
    transactionId: string;
    signature?: string;
  }): Promise<{
    isVerified: boolean;
    status: 'VERIFIED' | 'FAILED' | 'PENDING';
    providerReference?: string;
  }>;

  handleWebhook(payload: unknown, headers: Record<string, string>): Promise<{
    isVerified: boolean;
    registrationId: string;
    transactionId: string;
    status: 'SUCCESS' | 'FAILED';
  }>;
}
```

---

## Critical Payment Rules & Security Enforcement

1. **Server-Side Fee Calculation**:
   - The registration fee is strictly **₹600 per team** (for 4 participants).
   - The fee is **never** accepted from or calculated by the frontend. The Fastify backend computes the fee (`₹600`) and issues the payment request.

2. **Server-Side Verification before Confirmation**:
   - Frontend callbacks or user redirects saying `paymentSuccess = true` will **NEVER** confirm a team registration.
   - Team registration transitions to `CONFIRMED` **only** after the backend verifies the transaction signature via webhook callback or direct Karunya API verification.

3. **Confirmation Email Rule**:
   - The registration confirmation email via Resend is queued **only after** payment verification status transitions to `VERIFIED`.

4. **No Refund Policy**:
   - The ₹600 registration fee is strictly non-refundable. The user must explicitly accept the terms before payment initiation.

---

## Pending Information Checklist (Required from Karunya Authorities)

- [ ] Official Karunya Payment Gateway URL / Endpoint
- [ ] Sandbox / Staging Test Environment URL & Credentials
- [ ] Merchant ID / Account Identifiers
- [ ] Payment Initiation Request Schema
- [ ] Callback & Webhook Payload Schema
- [ ] Webhook Hash / HMAC Signature Verification Protocol
- [ ] Transaction Query / Status Verification API Endpoint
- [ ] Error Codes & Failure Status Definitions
