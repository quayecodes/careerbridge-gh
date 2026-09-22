# Phase 1: Requirements & Project Planning
## Project: CareerBridge Ghana – Student Internship & Career Platform

---

### 1. Executive Summary & Project Overview
**CareerBridge Ghana** is a specialized, web-based career platform engineered to bridge the gap between Ghanaian tertiary students / recent graduates and legitimate employment opportunities. The platform centralizes verified internships, National Service Scheme (NSS) placements, graduate trainee programs, entry-level jobs, and academic scholarships across Ghana.

---

### 2. Problem Statement
In Ghana's higher education ecosystem:
1. **Fragmented Information Channels:** Opportunities are predominantly circulated through unindexed WhatsApp groups, Telegram channels, and scattered social media posts, leading to high noise and missed deadlines.
2. **Prevalence of Employment Scams:** Unverified job postings frequently target vulnerable students with fake recruitment fees and ghost listings.
3. **Application Friction & Disorganization:** Students lack centralized tooling to track multiple application lifecycles, store verified CVs, and receive structured feedback.
4. **Employer Verification & Talent Discovery Challenges:** Small-to-Medium Enterprises (SMEs) and corporate recruiters face difficulty identifying vetted student talent from institutions like UG, KNUST, UCC, Ashesi, and ATU without sorting through thousands of unstructured email applications.

---

### 3. User Personas & Target Roles

#### Persona A: The Student / Recent Graduate (e.g., Kwame - Level 300 CS Student)
* **Goal:** Discover verified summer tech internships and NSS opportunities tailored to his academic background.
* **Pain Points:** Scams, lack of visibility into application status, difficulty tailoring applications.
* **Needs:** Verified opportunity feeds, one-click application tracking, resume builder/upload, bookmarking, email/in-app deadline alerts.

#### Persona B: The Employer / Recruiter (e.g., Akosua - HR Lead at a FinTech SME in Accra)
* **Goal:** Post internship and graduate trainee openings, screen candidate pools, and shortlist qualified students efficiently.
* **Pain Points:** Inundated with unqualified email spam, lack of structured candidate profiles.
* **Needs:** Company profile verification, intuitive job posting dashboard, candidate filtering (by university, major, graduation year, skills), status workflow (Applied $\rightarrow$ Shortlisted $\rightarrow$ Interviewing $\rightarrow$ Offered $\rightarrow$ Rejected).

#### Persona C: Platform Administrator (Career Bridge Operations / Career Office)
* **Goal:** Maintain platform integrity, verify employer accounts and job listings, monitor platform activity, and generate analytics.
* **Needs:** Admin moderation panel, audit logs, user management, reported listing review.

---

### 4. Functional Requirements (FR)

#### 4.1 Authentication & Profile Management
* **FR-1.1:** Role-based registration and authentication (Student, Employer, Admin) with secure password hashing and session management.
* **FR-1.2:** Student Profile creation: Education history (University, Program, Level/Year of Completion), skills, portfolio links (GitHub, LinkedIn), resume upload (PDF), and bio.
* **FR-1.3:** Employer Profile creation: Company name, industry, Ghana location (e.g., Greater Accra, Ashanti, Western), website, company description, and business registration verification documents.

#### 4.2 Opportunity Discovery & Search
* **FR-2.1:** Categorized opportunity listings: Internships, NSS Placements, Graduate Trainee Programs, Entry-Level Jobs, Scholarships.
* **FR-2.2:** Multi-parameter search & filtering: Keyword, Opportunity Type, Location/Region, Remote/Hybrid/On-site, Industry, Application Deadline.
* **FR-2.3:** Detailed Opportunity View: Role responsibilities, eligibility criteria, required skills, compensation/stipend information, deadlines, and company profile.

#### 4.3 Application & Tracking Workflow
* **FR-3.1:** Direct application submission through the platform (Profile + Tailored Cover Letter / Resume attachment).
* **FR-3.2:** Student Application Tracker: Dedicated dashboard tracking statuses (`Submitted`, `Under Review`, `Shortlisted`, `Interview Scheduled`, `Accepted`, `Declined`).
* **FR-3.3:** Employer Candidate Management: Review applications per job post, download candidate resumes, update application statuses, and add internal recruiter notes.

#### 4.4 Bookmarking & Notifications
* **FR-4.1:** Save / Bookmark opportunities for later review.
* **FR-4.2:** In-app notifications & email alerts for application status updates and impending deadlines.

#### 4.5 Admin Moderation & Quality Assurance
* **FR-5.1:** Employer verification pipeline before posts go public.
* **FR-5.2:** Job listing approval/flagging system to eliminate fraudulent listings.
* **FR-5.3:** Platform analytics (total active listings, applications submitted, placement rates).

---

### 5. Non-Functional Requirements (NFR)

#### 5.1 Security
* **NFR-1.1:** Passwords hashed with industry standards (e.g., Argon2id or bcrypt with appropriate salt rounds).
* **NFR-1.2:** Role-Based Access Control (RBAC) enforced on both API and page routes.
* **NFR-1.3:** Protection against common vulnerabilities (OWASP Top 10): CSRF, XSS, SQL Injection / ORM injection, Secure HTTP headers.
* **NFR-1.4:** Secure file upload validation (file type restriction to PDF, file size limits $\le 5\text{MB}$, sanitized storage paths).

#### 5.2 Performance & Scalability
* **NFR-2.1:** Page load response time under 1.5s on 3G/4G mobile networks common in Ghana.
* **NFR-2.2:** Optimized relational database queries with targeted indexes on search and foreign key columns.
* **NFR-2.3:** Server-side rendering (SSR) and static generation for public job listings to optimize SEO and quick discovery.

#### 5.3 Usability & Accessibility
* **NFR-3.1:** Mobile-first, responsive design tailored for mobile browsers (where $>70\%$ of Ghanaian students access web apps).
* **NFR-3.2:** WCAG 2.1 AA accessibility compliance (color contrast, keyboard navigability, semantic HTML).

#### 5.4 Maintainability & Clean Architecture
* **NFR-4.1:** Strict TypeScript throughout the stack for type safety.
* **NFR-4.2:** Modular directory structure separating presentation, domain business logic, data access, and utilities.

---

### 6. Feature Prioritization (MVP vs. Advanced)

| Priority | Feature | Description |
| :--- | :--- | :--- |
| **MVP (Phase 1-6)** | User Auth & RBAC | Secure registration/login for Students and Employers |
| **MVP (Phase 1-6)** | Student Profile & Resume Upload | Educational details, skills, PDF resume upload |
| **MVP (Phase 1-6)** | Employer Profile & Job Posting | Creation and management of opportunity listings |
| **MVP (Phase 1-6)** | Search & Filter Engine | Search by role, region in Ghana, type, and industry |
| **MVP (Phase 1-6)** | Application Submission & Pipeline | Direct apply and candidate status tracking |
| **MVP (Phase 1-6)** | Admin Verification & Moderation | Flagging and approving employers/listings |
| **Advanced (Post-MVP)** | Email Notifications | Automated transactional emails for status updates |
| **Advanced (Post-MVP)** | AI Resume Matcher / Recommendation | Matching student skillsets to posted requirements |
| **Advanced (Post-MVP)** | University Career Office Portal | Aggregated analytics for university administrators |
| **Advanced (Post-MVP)** | Scholarship Application Aggregator | Direct tracking for DAAD, Chevening, and local scholarships |

---

### 7. Technical Challenges & Mitigation Strategies

1. **Challenge: Handling File Uploads Safely (Resumes / CVs)**
   * *Mitigation:* Strict MIME-type checking, file signature verification, size limitations, and sandboxed storage (Supabase Storage / Cloudinary / AWS S3 / Local storage with secure access control).
2. **Challenge: Preventing Fraudulent Job Listings**
   * *Mitigation:* Employer account vetting workflow + mandatory company registration number check + report listing mechanism.
3. **Challenge: Ghanaian Mobile Network Constraints**
   * *Mitigation:* Asset optimization, lightweight CSS via Tailwind, server-side caching, pagination on listing queries.

---

### 8. Development Roadmap Overview

* **Phase 1:** Requirements & Project Planning *(Current)*
* **Phase 2:** System Architecture & Design (Tech stack, C4 model, API & Auth design)
* **Phase 3:** Database Design (ERD, Relational Schema, Prisma models, Indexing, Seed data)
* **Phase 4:** Project Initialization (Next.js/React, TypeScript, Tailwind CSS, Tooling, Linters)
* **Phase 5:** Authentication & Authorization (NextAuth / JWT, RBAC, Protected routes)
* **Phase 6:** Core Application Features (Profiles, Job Postings, Search/Filter, Applications Tracker, Admin Panel)
* **Phase 7:** UI/UX Refinement & Responsive Mobile Optimization
* **Phase 8:** Testing, Security Audit & Code Review
* **Phase 9:** Deployment & Production Setup
* **Phase 10:** Portfolio Documentation & Presentation (README, Architecture diagrams, Demo assets)
