# HackNEX 2026 — Dependency Analysis Report

This document cataloging every major dependency selected for the HackNEX 2026 project, along with its justification, feature scope, and requirement status.

---

## 1. Frontend Dependencies (`apps/web` / `frontend/package.json`)

| Package | Purpose | Used By | Required/Optional | Justification |
| :--- | :--- | :--- | :--- | :--- |
| **React** (`v19`) | UI Framework | Core Frontend | `Required` | Standard declarative UI rendering engine. |
| **React DOM** (`v19`) | Web DOM Rendering | Core Frontend | `Required` | Mounts React component tree to DOM. |
| **TypeScript** (`~v5.7`) | Type Safety | All Frontend Code | `Required` | Enforces strict type safety across models and API contracts. |
| **Vite** (`v6`) | Build Tooling & Dev Server | Development & Build | `Required` | Lightning-fast HMR and optimized production bundling. |
| **Tailwind CSS** (`v4`) | Utility-First Styling | UI Styling | `Required` | Flexible, rapid design styling with zero runtime overhead. |
| **Framer Motion** (`v12`) | UI Animations | Page & Component UI | `Required` | Hardware-accelerated entrance, hover, and section reveal animations. |
| **Lucide React** (`v0.477`) | Icon System | UI Components | `Required` | Clean, modern SVG icons for hackathon domains and UI indicators. |
| **React Router DOM** (`v7`) | Client-side Routing | Navigation Layer | `Required` | Manages SPA routes (`/`, `/login`, `/register`, `/admin`). |
| **React Hook Form** (`v7`) | Form State Management | Registration & Auth | `Required` | High-performance multi-step team registration form handling. |
| **Zod** (`v3.24`) | Schema Validation | Form Validation | `Required` | Shared validation schemas for frontend forms and API responses. |
| **Zustand** (`v5`) | Client State Management | Global Auth & Registration | `Required` | Minimalist, boilerplate-free state manager for auth sessions and draft forms. |
| **Axios** (`v1.8`) | HTTP API Client | API Services Layer | `Required` | Structured HTTP client with interceptors for auth headers and error handling. |
| **@vercel/analytics** | Website Analytics | Public Pages | `Optional` | Non-intrusive page view and CTA click telemetry. |
| **@sentry/react** | Frontend Exception Monitoring | Global UI Error Boundary | `Required` | Real-time crash and error tracking in production. |

---

## 2. Backend Dependencies (`apps/api` / `backend/package.json`)

| Package | Purpose | Used By | Required/Optional | Justification |
| :--- | :--- | :--- | :--- | :--- |
| **Fastify** (`v5.2`) | REST API Framework | Core Backend | `Required` | High-performance, low-overhead Node.js web framework with built-in schema validation. |
| **@fastify/cors** | CORS Support | Fastify Server | `Required` | Secure cross-origin requests from frontend to API. |
| **@fastify/jwt** | JWT Token Handling | Auth Module | `Required` | Token generation and validation for session management. |
| **@fastify/cookie** | Cookie Parsing | Auth Module | `Required` | Secure HttpOnly cookie handling for auth tokens. |
| **@fastify/rate-limit** | API Rate Limiting | Security Layer | `Required` | Protects auth and payment endpoints against brute-force attacks. |
| **@fastify/swagger** & **UI** | API Documentation | Developer Tooling | `Optional` | Interactive OpenAPI documentation for Fastify endpoints. |
| **Prisma Client** (`v6.4`) | Database ORM | Data Layer | `Required` | Type-safe query engine for PostgreSQL. |
| **Better Auth** (`v1.1`) | Authentication Framework | Auth Module | `Required` | Documented authentication handler for email/password and user sessions. |
| **Zod** (`v3.24`) | Input Schema Validation | Fastify Request Validation | `Required` | Validates API request bodies and query parameters. |
| **Resend** (`v4.1`) | Transactional Email API | Email Service | `Required` | Programmatic sending of verification, confirmation, and announcement emails. |
| **Cloudinary** (`v2.5`) | Image Storage & CDN | Media Module | `Required` | CDN-delivered image uploads, transformations, and responsive image management. |
| **@sentry/node** | Backend Error Monitoring | Global Exception Handler | `Required` | Captures API runtime exceptions and database errors. |
| **dotenv** (`v16.4`) | Environment Variables | Config Loader | `Required` | Loads environment variables into `process.env`. |

---

## 3. Database & Dev Tooling Dependencies

| Package | Purpose | Used By | Required/Optional | Justification |
| :--- | :--- | :--- | :--- | :--- |
| **Prisma CLI** (`v6.4`) | ORM Tooling | Database Migrations | `Required` | Schema management (`npx prisma generate`, `npx prisma migrate`). |
| **tsx** (`v4.19`) | TS Execution Engine | Backend Dev Server | `Required` | Fast TypeScript execution for Fastify dev server without compilation step. |
| **Vitest** (`v3.0`) | Unit Testing Framework | Frontend & Backend Tests | `Required` | Fast Vite-native unit testing runner. |
| **Concurrently** (`v9.1`) | Process Runner | Root Workspace | `Required` | Runs frontend and backend dev servers simultaneously with one command. |

---

## Packages Explicitly Excluded (To Avoid Bloat)
- **Redux / MobX**: Excluded in favor of lightweight Zustand.
- **Express**: Excluded in favor of Fastify (as mandated by Technical Architecture Document).
- **Mongoose / TypeORM**: Excluded in favor of Prisma.
- **Moment.js / Lodash**: Excluded in favor of native JS / date-fns if needed.
- **Redis / BullMQ**: Deferred to V2 scaling phase per Section 93 of TAD.
