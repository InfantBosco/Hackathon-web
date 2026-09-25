# HackNEX 2026 — Master Hackathon Website Repository

Official platform codebase for **HackNEX 2026**, presented by the **NEXUS** of **Karunya Institute of Technology and Sciences (KITS), Coimbatore**.

---

## 1. Event Overview
- **Event Name**: HackNEX 2026
- **Event Dates**: October 7–9, 2026
- **Event Mode**: Offline (Karunya Institute of Technology and Sciences, Coimbatore)
- **Expected Scale**: 1,500+ Participants 
- **Team Size**: 3-4 members
- **Registration Fee**: ₹500 per person

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
