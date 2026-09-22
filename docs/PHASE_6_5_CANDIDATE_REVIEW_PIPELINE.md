# Phase 6: Feature 6.5 — Employer Candidate Review & Application Pipeline
## Project: CareerBridge Ghana – Student Internship & Career Platform

---

### 1. Feature Description
Feature 6.5 delivers the recruiter-facing candidate screening and evaluation engine:
* **Candidate Review Pipeline (`/employer/applications`):** Recruiter screening portal allowing employers to review incoming applications across all posted jobs or filtered by a specific vacancy (`?jobId=...`).
* **Candidate Profile & Dossier Card (`CandidateCard`):** Displays candidate background including verified university, academic program, study level, skill chips, cover letter, and direct links to résumé, GitHub, and LinkedIn profiles.
* **Recruiter Status Decision System (`PATCH /api/employer/applications/[id]`):** Enables employers to transition applicants through recruitment stages (`APPLIED`, `UNDER_REVIEW`, `SHORTLISTED`, `INTERVIEW_SCHEDULED`, `ACCEPTED`, `REJECTED`) and provide internal recruiter notes.
* **Strict Authorization Guard:** Verifies that the authenticated employer owns the job listing before granting access to candidate details or permitting status updates.

---

### 2. Files Created / Modified
* `src/lib/validations/candidate.schema.ts`: Zod schema for validating candidate status transitions and notes.
* `src/lib/services/application.service.ts`: Added `getEmployerApplications` and `updateApplicationStatus` service methods.
* `src/app/api/employer/applications/route.ts`: GET route handler for fetching applications belonging to the employer's vacancies.
* `src/app/api/employer/applications/[id]/route.ts`: PATCH route handler for updating candidate status and notes with ownership verification.
* `src/components/employer/CandidateCard.tsx`: Interactive candidate card with expandable cover letter, résumé links, and status transition selector.
* `src/app/employer/applications/page.tsx`: Dedicated recruiter screening page with filtering and status controls.
* `src/app/employer/dashboard/page.tsx`: Connected to review links (`/employer/applications?jobId=...`).
* `src/lib/auth/session.ts`: Enhanced `requireAuth` helper supporting single role and role array checks.

---

### 3. Verification & Testing Instructions
1. **Sign in as an Employer Recruiter (e.g. Hubtel Ghana):**
   * **URL:** `http://localhost:3000/auth/login`
   * **Email:** `recruitment@hubtel.com`
   * **Password:** `Password123!`
2. **Access the Recruiter Dashboard:**
   * Navigate to `http://localhost:3000/employer/dashboard`.
   * Click **Review** or the **Applicants** badge next to the *Software Engineering Intern (Fintech)* listing.
3. **Screen & Update Candidate Status:**
   * You will land on `http://localhost:3000/employer/applications?jobId=...`.
   * Click **"View cover letter & actions"** on Kwame Mensah's application card.
   * Switch the status to `INTERVIEW_SCHEDULED` and update notes to: *"Technical interview scheduled for Friday at 10 AM GMT"*.
   * Click **Save Changes** and verify the status badge reflects the update.
4. **Student Real-Time Verification:**
   * In an incognito window or after switching accounts, log in as Kwame (`kwame.mensah@st.ug.edu.gh` / `Password123!`).
   * Navigate to `http://localhost:3000/student/dashboard` and verify the updated status `Interview Scheduled` appears immediately.
