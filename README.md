# HackNEX 2026 — Master Hackathon Platform Repository

Official platform codebase for **HackNEX 2026**, organized by the **NEXUS Club** of **Karunya Institute of Technology and Sciences (KITS), Coimbatore**.

---

## 1. Event Overview
- **Event Name**: HackNEX 2026
- **Event Dates**: October 7–9, 2026
- **Event Mode**: Offline (Karunya Campus, Coimbatore)
- **Expected Scale**: 1,500+ Participants (~375+ Teams)
- **Team Size**: Exactly 4 Participants (Captain + 3 Members)
- **Registration Fee**: ₹600 per team

---

## 2. Technical Stack Summary

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React, React Router DOM v7, React Hook Form, Zod, Zustand, Axios.
- **Backend**: Node.js, Fastify v5, TypeScript, Prisma ORM v6, Better Auth, Zod validation.
- **Database**: PostgreSQL (hosted on Neon.tech), managed via Prisma ORM.
- **Media & Storage**: Cloudinary (Image CDN, dynamic optimization & uploads).
- **Email Service**: Resend (Transactional emails: verification, confirmation, notifications).
- **Monitoring & Analytics**: Sentry (Error tracking), Vercel Analytics.
- **Payment**: Karunya Payment Gateway (via Payment Adapter Abstraction Pattern).

---

## 3. Repository Structure

```text
Hackathon-web/
├── frontend/             # React + Vite + TypeScript web application
├── backend/              # Fastify + TypeScript REST API server
├── prisma/               # Database ORM schema & seed data
├── assets/               # Branding assets & loadingscreen.mp4
├── docs/                 # Authoritative requirements & design PDF specifications
├── .env.example          # Master environment variable template
├── .env                  # Local dev environment settings (Gitignored)
├── DEPENDENCIES.md       # Full catalog of installed packages & justifications
├── ENVIRONMENT_SETUP.md  # Detailed setup, build, and development instructions
├── SETUP_STATUS.md       # Component-by-component setup status matrix
└── PAYMENT_INTEGRATION_PENDING.md # Payment adapter architecture & pending details
```

---

## 4. Quick Start Guide

### Installation
```bash
npm install
npm run prisma:generate
```

### Development
```bash
# Start both Backend (Port 4000) and Frontend (Port 5173) concurrently
npm run dev
```

### Type Checking & Build Verification
```bash
npm run typecheck
npm run build
```

---

## 5. Environment & Setup Documentation
- View [SETUP_STATUS.md](file:///d:/Github%20Repo/HackWeb/SETUP_STATUS.md) for full environment status matrix.
- View [ENVIRONMENT_SETUP.md](file:///d:/Github%20Repo/HackWeb/ENVIRONMENT_SETUP.md) for local dev commands.
- View [DEPENDENCIES.md](file:///d:/Github%20Repo/HackWeb/DEPENDENCIES.md) for package manifests.
- View [PAYMENT_INTEGRATION_PENDING.md](file:///d:/Github%20Repo/HackWeb/PAYMENT_INTEGRATION_PENDING.md) for payment adapter design.
