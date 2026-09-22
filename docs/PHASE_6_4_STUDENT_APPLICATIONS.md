# Phase 6: Feature 6.4 — Student Application Submission & Real-Time Status Tracker
## Project: CareerBridge Ghana – Student Internship & Career Platform

---

### 1. Feature Description
Feature 6.4 completes the end-to-end student application pipeline:
* **Application Submission Portal (`/opportunities/[slug]/apply`):** Allows authenticated students to submit a tailored statement of interest / cover letter and attach their verified CV/resume link. Automatically links their educational profile (University, Program, Level, Skills).
* **Duplicate Submission Prevention:** Enforces database and service level checks ensuring a student cannot apply multiple times to the same opening.
* **Student Application Tracker (`/student/dashboard`):** Real-time monitoring dashboard showing application lifecycle stages (`Submitted`, `Under Review`, `Shortlisted`, `Interview Scheduled`, `Offer Received`, `Not Selected`), reviewer feedback notes from recruiters, and saved opportunities.
* **Bookmark Engine:** Allows students to save listings for later evaluation.

---

### 2. Files Created / Modified
* `src/lib/validations/application.schema.ts`: Zod schema for application payload validation.
* `src/lib/services/application.service.ts`: Application workflow service handling creation, metrics, duplicate prevention, and bookmarks.
* `src/app/api/applications/route.ts`: API Route Handler for student submissions and metrics retrieval.
* `src/app/api/bookmarks/route.ts`: API Route Handler for saving/toggling bookmarks.
* `src/components/applications/ApplicationStatusBadge.tsx`: Reusable status indicator with distinct Ghana color accents.
* `src/app/opportunities/[slug]/apply/page.tsx`: Application submission view.
* `src/app/student/dashboard/page.tsx`: Real-time student tracking dashboard.

---

### 3. Verification & Testing Instructions
1. Sign in as Kwame Mensah (Level 300 Computer Science student at UG):
   * **URL:** `http://localhost:3000/auth/login`
   * **Email:** `kwame.mensah@st.ug.edu.gh`
   * **Password:** `Password123!`
2. Navigate to `http://localhost:3000/student/dashboard`:
   * Confirm Kwame's shortlisted application for Hubtel Software Engineering Intern and his saved bookmark for the Graduate Trainee role appear.
   * Review the Recruiter Feedback note: *"Candidate has strong GitHub portfolio with Next.js and Prisma. Invite for technical round."*
3. Explore and submit a new application:
   * Visit `http://localhost:3000/opportunities` and select the **mPharma HealthTech Data Analyst Intern** role.
   * Click **Apply for Opportunity** (`/opportunities/healthtech-data-analyst-intern-mpharma-kumasi/apply`).
   * Enter a cover letter and submit $\rightarrow$ observe instant redirection to the student dashboard where the new application appears in **Submitted** status.
