# CareerBridge Ghana 🇬🇭
> **Empowering Ghanaian Tertiary Students & Recent Graduates with Verified Internships, NSS Placements, and Early-Career Opportunities.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/Database-SQLite%20%2F%20PostgreSQL%20Ready-003B57?style=flat&logo=sqlite)](https://www.sqlite.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v23.9.0-339933?style=flat&logo=node.js)](https://nodejs.org/)

---

## 📌 Project Overview

**CareerBridge Ghana** is a full-stack, enterprise-grade web application built to address youth unemployment and internship accessibility challenges in Ghana. It bridges the gap between Ghanaian university/polytechnic students (UG, KNUST, UCC, Ashesi, etc.) and leading employers (Fintech, Telecom, HealthTech, Public Sector) by providing:

1. **Verified Opportunities:** Dedicated filters for Ghanaian National Service Scheme (NSS) placements, vacation internships, graduate trainee programs, and entry-level vacancies.
2. **Student Career Hub:** Fast profile builder, one-click application submission with tailored cover letters and resume attachments, and a real-time status tracker.
3. **Recruiter Pipeline:** Employer dashboard for posting opportunities, managing listing lifecycles, screening applicants with verified academic dossiers, and updating hiring stages.
4. **Role-Based Security:** Multi-tenant architecture with secure JWT cookie authentication, bcrypt hashing, and Next.js proxy route guards.

---

## 🏗️ Architecture & Tech Stack

```
┌────────────────────────────────────────────────────────┐
│                   Next.js 16 App Router                │
│             (React 19 + Server Components)             │
├────────────────────────────────────────────────────────┤
│           Client & Server UI (Tailwind CSS)            │
│  • Public Catalog & Filters   • Student Dashboard      │
│  • Auth Forms & Badges        • Employer Recruiter Hub │
├────────────────────────────────────────────────────────┤
│                   Next.js Proxy Guard                  │
│       (Role-Based Access Control: src/proxy.ts)        │
├────────────────────────────────────────────────────────┤
│                   Route Handlers                       │
│    /api/auth/*   /api/jobs/*   /api/employer/*         │
├────────────────────────────────────────────────────────┤
│                    Service Layer                       │
│  • AuthService   • JobService   • ApplicationService   │
├────────────────────────────────────────────────────────┤
│                    Validation Layer                    │
│             (Zod Schemas for Type Safety)              │
├────────────────────────────────────────────────────────┤
│                   Prisma ORM Client                    │
├────────────────────────────────────────────────────────┤
│      Database (SQLite for Dev / PostgreSQL Ready)      │
└────────────────────────────────────────────────────────┘
```

### Core Technologies
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) with Turbopack
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with Ghanaian national palette (`#006B3F` Green, `#FCD116` Gold, `#CE1126` Red)
- **Database ORM:** [Prisma ORM](https://www.prisma.io/) with SQLite database (zero external setup required)
- **Authentication:** Custom JWT-based authentication stored in `HttpOnly`, `SameSite=Lax` cookies
- **Security:** Password hashing with `bcryptjs`, multi-tenant access control, input sanitization via `Zod`
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Progress & Implemented Phases

| Phase | Milestone / Feature | Status | Documentation |
|:---|:---|:---:|:---|
| **Phase 1** | Requirements Engineering, User Stories & Domain Modeling | ✅ Completed | [`docs/PHASE_1_REQUIREMENTS_PLANNING.md`](docs/PHASE_1_REQUIREMENTS_PLANNING.md) |
| **Phase 2** | System Architecture, Tech Stack Selection & API Contract | ✅ Completed | [`docs/PHASE_2_SYSTEM_ARCHITECTURE.md`](docs/PHASE_2_SYSTEM_ARCHITECTURE.md) |
| **Phase 3** | Database Design, Prisma Schema & Entity Relationships | ✅ Completed | [`docs/PHASE_3_DATABASE_DESIGN.md`](docs/PHASE_3_DATABASE_DESIGN.md) |
| **Phase 4** | Project Initialization, App Shell, Layout & Design Tokens | ✅ Completed | [`docs/PHASE_4_PROJECT_INITIALIZATION.md`](docs/PHASE_4_PROJECT_INITIALIZATION.md) |
| **Phase 5** | Authentication, JWT Session Management & RBAC Guard | ✅ Completed | [`docs/PHASE_5_AUTHENTICATION_AUTHORIZATION.md`](docs/PHASE_5_AUTHENTICATION_AUTHORIZATION.md) |
| **Phase 6.1** | Realistic Ghanaian Seed Dataset (Hubtel, Telecel, mPharma) | ✅ Completed | [`docs/PHASE_6_1_SEED_DATA.md`](docs/PHASE_6_1_SEED_DATA.md) |
| **Phase 6.2** | Opportunity Discovery, Live Search & Regional Filters | ✅ Completed | [`docs/PHASE_6_2_OPPORTUNITY_DISCOVERY.md`](docs/PHASE_6_2_OPPORTUNITY_DISCOVERY.md) |
| **Phase 6.3** | Employer Recruiter Portal, KPI Dashboard & Job Creation | ✅ Completed | [`docs/PHASE_6_3_EMPLOYER_PORTAL.md`](docs/PHASE_6_3_EMPLOYER_PORTAL.md) |
| **Phase 6.4** | Student Application Submission & Real-Time Status Tracker | ✅ Completed | [`docs/PHASE_6_4_STUDENT_APPLICATIONS.md`](docs/PHASE_6_4_STUDENT_APPLICATIONS.md) |
| **Phase 6.5** | Recruiter Candidate Review Pipeline & Hiring Decisions | ✅ Completed | [`docs/PHASE_6_5_CANDIDATE_REVIEW_PIPELINE.md`](docs/PHASE_6_5_CANDIDATE_REVIEW_PIPELINE.md) |
| **Phase 7** | UI/UX Refinement, Ghanaian Identity & Mobile Optimization | ✅ Completed | [`docs/PHASE_7_UI_UX_REFINEMENT.md`](docs/PHASE_7_UI_UX_REFINEMENT.md) |
| **Phase 8** | Testing, Security Hardening & Code Review | 🔄 Next | *Upcoming* |
| **Phase 9** | Production Deployment & CI/CD Setup | ⏳ Planned | *Upcoming* |
| **Phase 10** | Comprehensive Final Documentation & Portfolio Presentation | ⏳ Planned | *Upcoming* |

---

## 🔑 Demo & Test Credentials

The database comes pre-seeded with realistic Ghanaian accounts across all roles:

### 1. Student Accounts (University of Ghana & KNUST)
- **Kwame Mensah** (BSc Computer Science, Level 300 – UG):
  - **Email:** `kwame.mensah@st.ug.edu.gh`
  - **Password:** `Password123!`
  - *Has active applications & saved bookmarks*
- **Abena Osei** (BSc Biomedical Engineering, Level 400 – KNUST):
  - **Email:** `abena.osei@st.knust.edu.gh`
  - **Password:** `Password123!`

### 2. Verified Employer Accounts
- **Hubtel Ghana (Fintech):**
  - **Email:** `recruitment@hubtel.com`
  - **Password:** `Password123!`
- **Telecel Ghana (Telecommunications):**
  - **Email:** `careers@telecel.com.gh`
  - **Password:** `Password123!`
- **mPharma (HealthTech):**
  - **Email:** `talent@mpharma.com`
  - **Password:** `Password123!`

### 3. Platform Administrator
- **CareerBridge Admin:**
  - **Email:** `admin@careerbridge.gh`
  - **Password:** `AdminPass123!`

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or later (Tested on v23.9.0)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd ExamsSecure
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="careerbridge-ghana-secure-jwt-secret-key-2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed Realistic Data
```bash
# Push schema to SQLite
npx prisma db push

# Populate with Ghanaian employers, student profiles, job listings, and applications
node prisma/seed.js
```

### 4. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
├── docs/                                # Detailed phase-by-phase documentation
│   ├── PHASE_1_REQUIREMENTS_PLANNING.md
│   ├── PHASE_2_SYSTEM_ARCHITECTURE.md
│   ├── PHASE_3_DATABASE_DESIGN.md
│   ├── PHASE_4_PROJECT_INITIALIZATION.md
│   ├── PHASE_5_AUTHENTICATION_AUTHORIZATION.md
│   ├── PHASE_6_1_SEED_DATA.md
│   ├── PHASE_6_2_OPPORTUNITY_DISCOVERY.md
│   ├── PHASE_6_3_EMPLOYER_PORTAL.md
│   ├── PHASE_6_4_STUDENT_APPLICATIONS.md
│   └── PHASE_6_5_CANDIDATE_REVIEW_PIPELINE.md
├── prisma/
│   ├── schema.prisma                    # Complete database schema
│   ├── seed.js                          # CommonJS realistic seed script
│   └── dev.db                           # Local SQLite database
├── src/
│   ├── app/                             # Next.js 16 App Router
│   │   ├── api/                         # Backend Route Handlers
│   │   │   ├── auth/                    # /login, /logout, /me, /register/*
│   │   │   ├── jobs/                    # Public listing & detail APIs
│   │   │   ├── applications/            # Student application endpoints
│   │   │   ├── bookmarks/               # Save/unsave opportunities
│   │   │   └── employer/                # Recruiter management endpoints
│   │   ├── auth/                        # Login & Registration views
│   │   ├── dashboard/                   # Smart role-based redirect
│   │   ├── employer/                    # Recruiter dashboard & applicant review
│   │   ├── opportunities/               # Opportunity catalog, detail & apply
│   │   ├── student/                     # Student tracker dashboard
│   │   ├── layout.tsx                   # App shell layout
│   │   └── page.tsx                     # Landing page
│   ├── components/
│   │   ├── applications/                # Status badges & application widgets
│   │   ├── auth/                        # Auth forms (Student & Employer)
│   │   ├── employer/                    # Recruiter cards, job forms & applicant dossiers
│   │   ├── jobs/                        # Job cards, search bars & filter sidebar
│   │   └── layout/                      # Navbar, footers & navigation
│   ├── lib/
│   │   ├── auth/                        # JWT utils, session extraction, bcrypt helpers
│   │   ├── db/                          # Prisma client singleton
│   │   ├── services/                    # Business logic (Auth, Job, Application)
│   │   ├── types/                       # TypeScript models & enums
│   │   ├── utils.ts                     # Tailwind class merging & formatGHS()
│   │   └── validations/                 # Zod validation schemas
│   └── proxy.ts                         # Role-Based Route Guard (Next.js 16)
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔒 Security & Data Integrity

- **Password Security:** Salted and hashed using `bcryptjs` with standard work factors.
- **Session Protection:** Signed JWT tokens stored in strict `HttpOnly`, `SameSite=Lax` cookies to mitigate XSS and CSRF vectors.
- **Route Authorization:** Next.js `proxy.ts` performs server-side role inspections, redirecting unauthenticated or unauthorized requests before render.
- **Data Isolation:** Recruiter APIs verify vacancy ownership before returning student applicant details or applying status updates.
- **Input Validation:** Strict type checking and validation on all inbound HTTP requests using `Zod` schemas.

---

## 🎓 Academic Portfolio Context

- **Author:** BSc Computer Science Final-Year Student
- **Institution:** Ghanaian Tertiary Institution
- **Project Domain:** Educational Technology, Youth Employment & Web Systems Architecture
- **Standards:** Clean Architecture, Domain-Driven Design (DDD), Strict TypeScript, Responsive Accessibility.
