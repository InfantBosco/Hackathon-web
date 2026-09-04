# HackNEX 2026 — Email & Notification System Architecture & Implementation Guide (Phase 6)

## Executive Summary

Phase 6 introduces a centralized, production-ready, provider-abstracted **Email & Notification System** for **HackNEX 2026**.

The notification system provides:
- **Provider Abstraction Architecture**: Clean separation between application logic and email delivery providers (`ResendProvider` for live transactional delivery, `MockEmailProvider` for testing & local development).
- **Responsive HTML & Plain-Text Templates**: 5 core templates formatted for brand consistency (HackNEX 2026, NEXUS Club, Karunya Institute of Technology and Sciences).
- **Service Integration**: Seamless hooks into `AuthService`, `RegistrationService`, and `PaymentService`.
- **Fault-Tolerant Resilience**: Non-blocking async exception handling ensures core business operations (registration, payment, verification) are preserved even if email delivery fails.
- **Vitest Verification Suite**: 100% test coverage for email rendering, provider abstraction, and error handling.

---

## 1. Provider Abstraction Architecture

The email service uses an interface-driven design (`EmailProvider` pattern).

```
                      +-------------------+
                      |   EmailService    |
                      +---------+---------+
                                |
             +------------------+------------------+
             |                                     |
+------------v------------+           +------------v------------+
|     ResendProvider      |           |    MockEmailProvider    |
| (Production Resend SDK) |           |  (Vitest & Offline Dev) |
+-------------------------+           +-------------------------+
```

### Key Components

1. **`EmailProvider` Interface** (`src/services/email/email.provider.ts`)
   Defines `sendEmail(options: SendEmailOptions): Promise<EmailSendResult>`.

2. **`ResendProvider`** (`src/services/email/resend.provider.ts`)
   Wraps the official `resend` package. Uses `settings.RESEND_API_KEY` and `settings.EMAIL_FROM`. Returns structured delivery results without unhandled process crashes.

3. **`MockEmailProvider`** (`src/services/email/mock.provider.ts`)
   In-memory provider activated automatically during Vitest testing (`NODE_ENV === 'test'`) or when no valid Resend key is provided. Records all outbound messages in `sentEmails[]` for test assertions.

4. **`EmailService`** (`src/services/email/email.service.ts`)
   High-level centralized service delegating to the appropriate provider and rendering templates.

---

## 2. Dynamic Email Templates

All templates reside under `src/services/email/templates/` and generate both **Responsive HTML** (with inline styles, primary brand color `#0284c7`, dark header `#0f172a`, and structured tables) and a **Plain Text Fallback**.

| Template | Subject Pattern | Key Dynamic Payload |
|---|---|---|
| **1. Email Verification** | `Verify your HackNEX 2026 Account Email` | Recipient Name, 24-hour verification link (`${APP_URL}/verify-email?token=...`) |
| **2. Password Reset** | `Reset your HackNEX 2026 Password` | Recipient Name, 1-hour reset link (`${APP_URL}/reset-password?token=...`) |
| **3. Registration Confirmation** | `Registration Confirmed — Team [TeamName] [[TeamCode]]` | Team Name, Team Code, Track Title, Captain Name, Roster of 4 members, Fee notice (₹2,400) |
| **4. Payment Confirmation Contract** | `Payment Confirmed — Receipt for Team [TeamName]` | Transaction ID, Gateway Ref, Amount (₹2,400), Payment Timestamp, Status (VERIFIED) |
| **5. Admin Announcement** | `[HackNEX 2026] [Title]` | Recipient Name, Title, Formatted Paragraphs, Action Button, Sender Name |

---

## 3. Configuration & Environment Variables

Environment variables are defined in `.env` and schema-validated in `src/config/settings.ts`.

```env
# Email Service Configuration
RESEND_API_KEY=re_your_resend_api_key_here
EMAIL_FROM=HackNEX Team <noreply@hacknex.in>
APP_URL=http://localhost:5173
```

- When `RESEND_API_KEY` is empty or set to placeholder values, `EmailService` automatically switches to `MockEmailProvider` and logs email dispatches to stdout.

---

## 4. Service Integrations

### Auth Service (`src/services/auth.service.ts`)
- Dispatches `sendVerificationEmail` during user signup and token resend.
- Dispatches `sendPasswordResetEmail` during forgot password requests.

### Registration Service (`src/services/registration.service.ts`)
- Dispatches `sendRegistrationConfirmationEmail` when a 4-member team completes registration submission.
- Wrapped in a non-blocking `try ... catch` block to preserve database status changes if email services are unreachable.

### Payment Service (`src/services/payment.service.ts`)
- Dispatches `sendPaymentConfirmationEmail` as an official payment receipt contract when payment is verified.

---

## 5. Verification & Testing

### Running Tests
To run the email test suite:
```bash
npm test
```
The test suite in `tests/email.test.ts` validates:
- Provider switching logic and mock recording
- HTML and text rendering across all 5 templates
- Error tolerance when email providers fail

### Build & Typecheck
```bash
npm run typecheck
npm run build
```
Both commands pass cleanly with **0 errors**.
