# Phase 7 — Admin Backend & Administrative Management System

## Executive Summary
Phase 7 implements the administrative management backend for **HackNEX 2026**. This system securely parses, validates, hashes, and seeds 15 designated administrator accounts from a protected CSV file, supports dual authentication (by Username or Email), enforces server-side authorization across all admin endpoints, and provides read-only analytical APIs for monitoring hackathon teams, participants, registrations, and payment statuses.

---

## 1. Confidential CSV Data & Git Protection
* **CSV File**: `backend/private/admin-data.csv`
* **Git Protection**: The `backend/private/` directory and `*.csv` pattern are explicitly listed in `.gitignore`. No plaintext passwords or confidential admin credentials are committed to version control.
* **Format & Validation**:
  - Validated CSV headers: `Name, Email, PlaintextPassword`.
  - Required record count: **Exactly 15 records**.
  - Validation rules:
    - Unique Name and Email values across all rows.
    - Valid email regex format.
    - Non-empty passwords with minimum length enforcement (≥ 8 characters).

---

## 2. Admin Seeding Architecture (`backend/prisma/seed-admin.ts`)
* **Execution**: Executable standalone via `npm run seed:admin` or integrated in global Prisma seed routines.
* **Password Hashing**: Uses **Argon2id** with standard parameters (memory cost 65536 KiB, time cost 3, parallelism 4).
* **Database Operations**:
  - Performs atomic upsert transactions creating linked `User`, `Account` (credential provider), and `Admin` records.
  - Automatically assigns `Role.ADMIN` to each user.
  - Efficiently skips Argon2id re-hashing when accounts already exist, reducing re-seed duration to <50ms.

---

## 3. Dual-Credential Authentication (Name & Email Login)
* **Auth Service Update**: `AuthService.login` supports dual identifier lookup.
* **Identifier Resolution**:
  - Checks if input identifier contains `@` -> performs lookup by `user.email` (lowercased).
  - Otherwise -> performs case-insensitive lookup by `user.name`.
* **Security & Tokens**:
  - Verifies Argon2id password hash.
  - Confirms `user.role === Role.ADMIN` for admin endpoints.
  - Generates JWT access token with payload containing `userId`, `email`, and `role`.

---

## 4. Server-Side Authorization Pipeline
* **Fastify Plugins**: `fastify.authenticate` + `fastify.requireAdmin`.
* **Access Control**:
  - `401 Unauthorized`: Missing, expired, or malformed JWT token.
  - `403 Forbidden`: Valid JWT token belonging to a non-admin participant (`Role.PARTICIPANT`).
  - `200 OK`: Valid JWT token belonging to an admin user (`Role.ADMIN`).

---

## 5. Read-Only Administrative APIs

| Method | Route | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/admin/dashboard` | Aggregated dashboard metric counts | None |
| `GET` | `/api/v1/admin/teams` | Paginated team listing with participant counts | `page`, `limit`, `search`, `status` |
| `GET` | `/api/v1/admin/teams/:id` | Detailed team view with all members | `id` (Team UUID) |
| `GET` | `/api/v1/admin/participants` | Paginated participant directory | `page`, `limit`, `search`, `role` |
| `GET` | `/api/v1/admin/registrations` | Paginated hackathon registrations | `page`, `limit`, `search`, `status` |
| `GET` | `/api/v1/admin/payments` | Paginated payment transactions | `page`, `limit`, `search`, `status` |

---

## 6. Security Boundaries & Zero Mutation Enforcement
* **Strict Read-Only Enforcement**: Admin APIs contain **zero** `POST`, `PUT`, `PATCH`, or `DELETE` endpoints for user data or registrations.
* **Route Not Found (404)**: Any non-`GET` requests to `/api/v1/admin/*` trigger Fastify's default 404 handler.
* **Sensitive Field Sanitation**: `passwordHash`, `verificationToken`, and sensitive session secrets are stripped from API outputs.

---

## 7. Verification & Testing Strategy
* **Automated Test Suite**: `backend/tests/admin.test.ts`
* **Test Coverage**:
  - CSV format, header, and 15-record row count validation.
  - Dual Name / Email authentication & password verification.
  - Authorization pipeline (401 / 403 / 200 checks).
  - Read-only data pagination, filtering, and search queries.
  - Sensitive field exclusion and zero mutation safety.
