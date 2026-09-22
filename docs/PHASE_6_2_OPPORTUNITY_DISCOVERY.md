# Phase 6: Feature 6.2 — Opportunity Discovery & Search/Filter Catalog
## Project: CareerBridge Ghana – Student Internship & Career Platform

---

### 1. Feature Description
Feature 6.2 introduces the public and authenticated Opportunity Discovery Engine:
* **Faceted Filtering:** Real-time filtering by Ghanaian region (Greater Accra, Ashanti, Western, etc.), Opportunity Type (Internships, NSS Placements, Graduate Trainees, Entry-Level, Scholarships), and Workplace Model (On-site, Hybrid, Remote).
* **Keyword Search:** High-performance search across title, description, skills, and employer names.
* **Opportunity Cards:** Visual cards highlighting Ghanaian cedi stipends, verified employer badges, and deadline countdowns.
* **Dedicated Detail Pages (`/opportunities/[slug]`):** Comprehensive views displaying responsibilities, eligibility criteria, corporate overview, and dynamic application triggers.

---

### 2. Files Created / Modified
* `src/lib/services/job.service.ts`: Backend service handling faceted search queries, pagination, view counter increments, and slug lookups.
* `src/app/api/jobs/route.ts`: API Route Handler for filtered job queries.
* `src/app/api/jobs/[slug]/route.ts`: API Route Handler for individual job details.
* `src/components/jobs/JobCard.tsx`: Reusable Opportunity card component.
* `src/components/jobs/JobFilters.tsx`: Interactive filter sidebar.
* `src/app/opportunities/page.tsx`: Catalog browse and discovery page.
* `src/app/opportunities/[slug]/page.tsx`: Dynamic job detail page.

---

### 3. Verification & Testing Instructions
1. Run the Next.js development server:
   ```bash
   npm run dev
   ```
2. Navigate to `http://localhost:3000/opportunities` in your browser.
3. Test the following interactions:
   * **Filter by Region:** Select "Ashanti" $\rightarrow$ verify only the Kumasi mPharma HealthTech role appears.
   * **Filter by Type:** Select "NSS Placements" $\rightarrow$ verify only the Telecel Ghana NSS Cloud role appears.
   * **Keyword Search:** Type "Hubtel" or "React" $\rightarrow$ verify instant search filtering.
   * **Click View Details:** Navigate into `http://localhost:3000/opportunities/software-engineering-intern-hubtel-2025` and confirm all responsibilities, stipend (GHS 1,800 - 2,500), and verified employer badges render cleanly.
