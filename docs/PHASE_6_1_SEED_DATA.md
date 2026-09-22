# Phase 6: Feature 6.1 — Database Seeding & Mock Ghanaian Career Data
## Project: CareerBridge Ghana – Student Internship & Career Platform

---

### 1. Feature Description
Feature 6.1 provides a complete database seeding system (`prisma/seed.ts`) that initializes the SQLite/PostgreSQL database with authentic entities matching the higher education and corporate job ecosystem in Ghana:
* **Admin Account:** `admin@careerbridge.gh` / `AdminPass123!`
* **Employers:** 
  * `Hubtel Ghana Ltd` (FinTech & Payments - Kokomlemle, Greater Accra)
  * `Telecel Ghana` (Telecommunications - Airport City, Greater Accra)
  * `mPharma Africa` (HealthTech & Pharmaceuticals - Kumasi, Ashanti)
* **Students:**
  * Kwame Mensah (Level 300 Computer Science, University of Ghana - Legon)
  * Abena Osei (Level 400 Computer Engineering, KNUST - Kumasi)
* **Opportunities:**
  * Software Engineering Summer Internship (Hubtel)
  * National Service (NSS) Cloud & DevOps Associate (Telecel)
  * Graduate Trainee - FinTech Product Operations (Hubtel)
  * HealthTech Data Analyst Intern (mPharma)
* **Application Lifecycle Data:**
  * Pre-populated applications in `SHORTLISTED` and `UNDER_REVIEW` states with realistic recruiter feedback.

---

### 2. Files Created / Modified
* `prisma/seed.ts`: Complete Prisma database seeding script.

---

### 3. Verification Instructions
Run the following commands in the terminal to initialize and populate the database:
```bash
npm install
npx prisma db push
npm run prisma:seed
```
Upon execution, the terminal will log:
```text
🌱 Seeding CareerBridge Ghana database...
🧹 Cleaned existing database records.
👤 Created Admin: admin@careerbridge.gh
🏢 Created 3 Verified Ghanaian Employers.
🎓 Created 2 Sample Ghanaian Students.
💼 Created 4 Authentic Job Listings across Accra & Kumasi.
🚀 Seeding completed successfully!
```
