# HackNEX 2026 — Master Hackathon Website Repository

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

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Lucide React, React Router DOM v7, React Hook Form, Zod, Zustand.
- **Media & Storage**: Cloudinary (Image CDN, dynamic optimization & uploads).
- **Monitoring & Analytics**: Sentry (Error tracking), Vercel Analytics.
- **Registration**: Direct Integration with Official Google Forms (Karunya & External participant tracks).

---

## 3. Repository Structure

```text
Hackathon-web/
├── frontend/             # React + Vite + TypeScript web application
├── assets/               # Branding assets & loadingscreen.mp4
├── docs/                 # Authoritative requirements & design PDF specifications
├── .env.example          # Environment variable template
├── .env                  # Local dev environment settings (Gitignored)
└── README.md             # Master documentation
```

---

## 4. Quick Start Guide

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Type Checking & Build Verification
```bash
npm run typecheck
npm run build
```
