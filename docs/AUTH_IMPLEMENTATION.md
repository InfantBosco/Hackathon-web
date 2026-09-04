# HackNEX 2026 — Authentication & Authorization Implementation Documentation

## Overview
This document details the backend authentication and authorization architecture implemented in Phase 4 of **HackNEX 2026**, adhering strictly to `Documents/Authentication.pdf`.

---

## 1. Account Lifecycle & User States

| Account State | Condition | Access Permissions |
| :--- | :--- | :--- |
| **`UNVERIFIED`** | Signup complete; email verification pending | Blocked from logging in or registering a team. |
| **`ACTIVE`** | Email verified via 24-hour verification token | Full access to create/manage team and initiate payment. |
| **`SUSPENDED`** | Account administratively suspended | Blocked from logging in and protected API endpoints. |
| **`DISABLED`** | Account administratively disabled | Blocked from logging in and protected API endpoints. |

> **Crucial Distinction**: An **Account** (`User`) is an authentication identity. A **HackNEX Registration** (`Registration`) is an event entry for a team of 4 members. Having an account does not mean a user is registered for HackNEX.

---

## 2. Security Protocols & Cryptography

### Password Hashing (Argon2id)
* **Algorithm**: **Argon2id** (via `argon2` npm package)
* **Parameters**: `memoryCost = 65536 KB` (64 MB), `timeCost = 3`, `parallelism = 1`.
* **Plaintext Passwords**: Never logged or stored. `confirmPassword` is validated in memory and never persisted.

### Email Normalization
* Emails are trimmed and converted to lowercase before database operations (`INFANT@Example.COM` -> `infant@example.com`).
* Enforced via Zod schema, `AuthService` normalization layer, and database `User.email` `@unique` constraint.

### Token Management & Security
* **Verification Tokens**: 24-hour lifetime, single-use, cryptographically random (`crypto.randomBytes(32)`).
* **Reset Tokens**: 1-hour lifetime, single-use, cryptographically random.
* **Token Hashing**: Tokens are SHA-256 hashed before database storage in `verifications` table (`value = SHA256(rawToken)`). Raw tokens are sent only via email and never logged or returned in API responses.

---

## 3. API Endpoints Catalog

```text
POST /api/v1/auth/signup               # Create account (Argon2id hash + email verification token)
POST /api/v1/auth/verify-email         # Verify email address using 24-h token
POST /api/v1/auth/resend-verification  # Resend email verification link
POST /api/v1/auth/login                # Authenticate & receive JWT token (Requires emailVerified = true)
POST /api/v1/auth/logout               # Clear user session
POST /api/v1/auth/forgot-password      # Request password reset email
POST /api/v1/auth/reset-password       # Reset password using 1-h token
GET  /api/v1/auth/me                   # Get current user profile (Protected)
```

---

## 4. Role-Based Access Control (RBAC) & Middleware

* **`USER`**: Normal registered participant / team captain.
* **`ADMIN`**: HackNEX administrator (Verified if user has active entry in `Admin` table).

### Middleware Functions
* **`authenticate`**: Verifies JWT Bearer token in `Authorization` header. Attaches `request.user` (`id`, `email`, `role`).
* **`requireAdmin`**: Runs `authenticate` and verifies `request.user.role === 'ADMIN'`. Returns `403 Forbidden` if unauthorized.

---

## 5. Error Codes Matrix

| HTTP Status | Error Code | Trigger Condition |
| :--- | :--- | :--- |
| `400` | `VALIDATION_ERROR` | Weak password (<8 chars), password mismatch, invalid format. |
| `401` | `AUTHENTICATION_ERROR` | Invalid credentials, unverified email login attempt, expired JWT. |
| `403` | `AUTHORIZATION_ERROR` | Non-admin user accessing admin endpoint, non-captain modifying team. |
| `409` | `EMAIL_ALREADY_EXISTS` | Signup attempt with an email that is already registered. |
| `429` | `RATE_LIMIT_ERROR` | Exceeding request rate limit on auth endpoints. |
