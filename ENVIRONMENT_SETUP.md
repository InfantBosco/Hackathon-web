# HackNEX 2026 — Environment Setup & Local Development Guide

## 1. Prerequisites & Required Software

Ensure your local machine has the following tools installed:

- **Node.js**: `v20.x` or `v24.x` (Tested on `v24.14.0`)
- **NPM**: `v10.x` or `v11.x` (Tested on `11.9.0`)
- **Git**: Installed and configured
- **PostgreSQL**: PostgreSQL 15+ database instance (or a Neon.tech cloud PostgreSQL database URL)

---

## 2. Directory Structure Overview

```text
Hackathon-web/
├── frontend/             # Vite + React + TypeScript + Tailwind CSS + Framer Motion
│   ├── src/              # Application source code (components, pages, stores)
│   ├── public/           # Static assets (including loadingscreen.mp4)
│   ├── package.json      # Frontend dependencies
│   └── vite.config.ts    # Vite bundler configuration
│
├── backend/              # Node.js + Fastify + TypeScript API Server
│   ├── src/              # API modules (auth, teams, participants, payments, media)
│   ├── package.json      # Backend dependencies
│   └── tsconfig.json     # Backend TypeScript configuration
│
├── prisma/               # Database ORM schema & seed scripts
│   └── schema.prisma     # Baseline 17 models and 5 enums
│
├── assets/               # Raw branding & media assets (loadingscreen.mp4, logos)
├── docs/                 # Authoritative architecture and requirements documents
│
├── .env.example          # Template environment variable configuration
├── .env                  # Local dev environment configuration (GITIGNORED)
├── package.json          # Root workspace configuration
└── README.md             # Project overview
```

---

## 3. Installation Commands

Clone the repository and install all workspace dependencies from the root directory:

```bash
# 1. Install root, frontend, and backend dependencies
npm install

# 2. Generate Prisma Client
npm run prisma:generate
```

---

## 4. Environment Variables Setup

Copy `.env.example` to create your local `.env` file:

```bash
cp .env.example .env
```

Ensure the following variables are configured in `.env`:

```env
# Database Credentials (PostgreSQL / Neon)
DATABASE_URL="postgresql://user:password@localhost:5432/hacknex?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/hacknex?schema=public"

# Backend Configuration
PORT=4000
HOST=0.0.0.0
JWT_SECRET="your_jwt_secret_key_here"
BETTER_AUTH_SECRET="your_better_auth_secret_key_here"

# External Integrations (Placeholders if live credentials unavailable)
RESEND_API_KEY="re_placeholder_key"
CLOUDINARY_CLOUD_NAME="hacknex-cloud"
CLOUDINARY_API_KEY="123456789"
CLOUDINARY_API_SECRET="placeholder_secret"
PAYMENT_API_KEY="karunya_pay_key"
PAYMENT_SECRET="karunya_pay_secret"

# Frontend Configuration
VITE_API_URL="http://localhost:4000/api"
VITE_CLOUDINARY_CLOUD_NAME="hacknex-cloud"
```

> **SECURITY NOTE**: Never commit `.env` or real API credentials to Git. `.gitignore` is configured to prevent accidental commits.

---

## 5. Development Commands

Run frontend and backend concurrently or individually:

```bash
# Start both Backend (Port 4000) and Frontend (Port 5173) concurrently
npm run dev

# Start Frontend only
npm run dev:frontend

# Start Backend only
npm run dev:backend
```

---

## 6. Database Commands

```bash
# Generate Prisma Client after schema changes
npm run prisma:generate

# Open Prisma Studio to inspect local database
npm run prisma:studio

# Apply migrations (when PostgreSQL is connected)
npx prisma migrate dev
```

---

## 7. Build & Verification Commands

```bash
# Run TypeScript typechecks across all modules
npm run typecheck

# Build both Backend and Frontend for production
npm run build

# Run unit and integration tests
npm test
```

---

## 8. Verification & Health Check

Access the following endpoints during development:

- **Frontend Application**: `http://localhost:5173`
- **Backend Health Check**: `http://localhost:4000/health`
- **Backend API Info**: `http://localhost:4000/api`
