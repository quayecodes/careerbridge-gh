# Phase 6: Feature 6.3 — Employer Job Management & Posting Portal
## Project: CareerBridge Ghana – Student Internship & Career Platform

---

### 1. Feature Description
Feature 6.3 empowers registered and verified Ghanaian employers to manage their recruitment lifecycle directly:
* **Recruiter Analytics Dashboard:** Displays live KPI counters for total listings, active postings, candidate applications received, and cumulative listing view impressions.
* **Opportunity Creation Engine:** Form interface tailored for Ghana with opportunity categories (Internships, NSS Placements, Graduate Trainees, Entry-Level, Scholarships), Ghana region selectors, Cedi stipend ranges, and deadline pickers.
* **Listing Lifecycle Control:** Instant status toggles (`ACTIVE` $\leftrightarrow$ `CLOSED`) and direct links to candidate evaluation queues.

---

### 2. Files Created / Modified
* `src/lib/validations/job.schema.ts`: Zod schema for job posting and status mutations.
* `src/lib/services/job.service.ts`: Extended with `createJob`, `getEmployerJobs`, `getEmployerDashboardMetrics`, and `updateJobStatus`.
* `src/app/api/employer/jobs/route.ts`: API Route Handler for GET dashboard metrics and POST job listings.
* `src/app/api/employer/jobs/[id]/route.ts`: API Route Handler for PATCH status updates.
* `src/components/employer/JobPostForm.tsx`: Reusable validated opportunity creation form.
* `src/app/employer/jobs/create/page.tsx`: Page hosting the vacancy creation wizard.
* `src/app/employer/dashboard/page.tsx`: Full recruiter dashboard view.

---

### 3. Verification & Testing Instructions
1. Log in as a seeded Ghanaian employer:
   * **Email:** `recruitment@hubtel.com`
   * **Password:** `Password123!`
2. Navigate to `http://localhost:3000/employer/dashboard`:
   * Verify the KPI cards (Total Listings, Active Vacancies, Total Applicants, Views) populate.
   * Test the **Active/Closed** status toggle button in the table.
3. Click **"Post New Opportunity"** (`http://localhost:3000/employer/jobs/create`):
   * Create a new vacancy (e.g. *Junior Frontend Developer – NSS Placement* in Greater Accra with GHS 1,800 stipend).
   * Submit and verify automatic redirection to the dashboard where the new job immediately appears in the table and public catalog.
