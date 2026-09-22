const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function hash(password) {
  return bcrypt.hash(password, 10);
}

async function main() {
  console.log("🌱 Seeding CareerBridge Ghana database...");

  // 1. Clear existing data in reverse relational order
  await prisma.savedJob.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.jobListing.deleteMany({});
  await prisma.employerProfile.deleteMany({});
  await prisma.studentProfile.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.auditLog.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Cleaned existing database records.");

  const defaultPassword = await hash("Password123!");

  // 2. Create Platform Administrator
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@careerbridge.gh",
      passwordHash: await hash("AdminPass123!"),
      name: "Platform Administrator",
      role: "ADMIN",
      isVerified: true,
    },
  });

  console.log(`👤 Created Admin: ${adminUser.email}`);

  // 3. Create Verified Ghanaian Employers
  const employer1 = await prisma.user.create({
    data: {
      email: "recruitment@hubtel.com",
      passwordHash: defaultPassword,
      name: "Akosua Boateng",
      role: "EMPLOYER",
      isVerified: true,
      employerProfile: {
        create: {
          companyName: "Hubtel Ghana Ltd",
          industry: "FinTech & Messaging",
          companySize: "201-500 employees",
          website: "https://hubtel.com",
          description:
            "Hubtel is Ghana's leading fintech and eCommerce platform providing convenient messaging, payments, and digital merchant solutions.",
          locationRegion: "Greater Accra",
          address: "Kokomlemle, Accra, Ghana",
          phone: "+233 30 700 0577",
          businessRegNumber: "CS-10928374",
          verificationStatus: "VERIFIED",
        },
      },
    },
    include: { employerProfile: true },
  });

  const employer2 = await prisma.user.create({
    data: {
      email: "careers@telecel.com.gh",
      passwordHash: defaultPassword,
      name: "Kofi Mensah",
      role: "EMPLOYER",
      isVerified: true,
      employerProfile: {
        create: {
          companyName: "Telecel Ghana",
          industry: "Telecommunications",
          companySize: "1000+ employees",
          website: "https://telecel.com.gh",
          description:
            "Telecel Ghana is a leading provider of mobile voice, data, fixed broadband, and business ICT solutions across Ghana.",
          locationRegion: "Greater Accra",
          address: "Airport City, Accra, Ghana",
          phone: "+233 30 220 0000",
          businessRegNumber: "CS-88392019",
          verificationStatus: "VERIFIED",
        },
      },
    },
    include: { employerProfile: true },
  });

  const employer3 = await prisma.user.create({
    data: {
      email: "talent@mpharma.com",
      passwordHash: defaultPassword,
      name: "Esi Quansah",
      role: "EMPLOYER",
      isVerified: true,
      employerProfile: {
        create: {
          companyName: "mPharma Africa",
          industry: "HealthTech & Pharmaceuticals",
          companySize: "500-1000 employees",
          website: "https://mpharma.com",
          description:
            "mPharma is on a mission to build an Africa in good health by managing prescription drug supply chains and healthcare delivery.",
          locationRegion: "Ashanti",
          address: "Ahodwo, Kumasi & Roman Ridge, Accra",
          phone: "+233 24 100 2000",
          businessRegNumber: "CS-44772211",
          verificationStatus: "VERIFIED",
        },
      },
    },
    include: { employerProfile: true },
  });

  console.log("🏢 Created 3 Verified Ghanaian Employers.");

  // 4. Create Diverse Ghanaian Students
  const student1 = await prisma.user.create({
    data: {
      email: "kwame.mensah@st.ug.edu.gh",
      passwordHash: defaultPassword,
      name: "Kwame Mensah",
      role: "STUDENT",
      isVerified: true,
      studentProfile: {
        create: {
          university: "University of Ghana (UG - Legon)",
          programOfStudy: "BSc Computer Science",
          level: "LEVEL_300",
          graduationYear: 2026,
          skills: JSON.stringify(["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"]),
          locationRegion: "Greater Accra",
          phone: "+233 24 555 0101",
          bio: "Passionate Level 300 Computer Science undergraduate enthusiastic about full-stack web development and FinTech innovations.",
          githubUrl: "https://github.com/kwamemensah",
          linkedInUrl: "https://linkedin.com/in/kwamemensah-gh",
        },
      },
    },
    include: { studentProfile: true },
  });

  const student2 = await prisma.user.create({
    data: {
      email: "abena.osei@st.knust.edu.gh",
      passwordHash: defaultPassword,
      name: "Abena Osei",
      role: "STUDENT",
      isVerified: true,
      studentProfile: {
        create: {
          university: "Kwame Nkrumah University of Science and Technology (KNUST)",
          programOfStudy: "BSc Computer Engineering",
          level: "LEVEL_400",
          graduationYear: 2025,
          skills: JSON.stringify(["Python", "Machine Learning", "Data Analysis", "SQL", "Cloud Computing"]),
          locationRegion: "Ashanti",
          phone: "+233 20 888 0202",
          bio: "Final year Computer Engineering student at KNUST seeking National Service (NSS) placements in data engineering and cloud operations.",
          githubUrl: "https://github.com/abenaosei",
          linkedInUrl: "https://linkedin.com/in/abenaosei",
        },
      },
    },
    include: { studentProfile: true },
  });

  console.log("🎓 Created 2 Sample Ghanaian Students.");

  // 5. Create Realistic Job Listings
  const job1 = await prisma.jobListing.create({
    data: {
      employerId: employer1.employerProfile.id,
      title: "Software Engineering Intern (Summer 2025)",
      slug: "software-engineering-intern-hubtel-2025",
      description:
        "Join Hubtel's engineering team in Accra for an intensive 3-month summer internship program. You will collaborate with senior software engineers building high-scale messaging and payment APIs.",
      requirements:
        "• Level 200 - 400 Computer Science or related STEM students\n• Strong fundamentals in Data Structures & Algorithms\n• Experience with JavaScript/TypeScript, Python, or Go\n• Passion for building payment technology in Africa",
      responsibilities:
        "• Assist in writing unit and integration tests for core payment microservices\n• Develop user-facing UI components for web and merchant portals\n• Participate in daily standups and sprint planning",
      opportunityType: "INTERNSHIP",
      workplaceType: "HYBRID",
      locationRegion: "Greater Accra",
      industry: "FinTech & Messaging",
      stipendMin: 1800,
      stipendMax: 2500,
      currency: "GHS",
      applicationDeadline: new Date("2026-11-30"),
      status: "ACTIVE",
      isFeatured: true,
      viewsCount: 142,
    },
  });

  const job2 = await prisma.jobListing.create({
    data: {
      employerId: employer2.employerProfile.id,
      title: "National Service (NSS) – Cloud & DevOps Associate",
      slug: "nss-cloud-devops-associate-telecel-2025",
      description:
        "Telecel Ghana invites enthusiastic 2025/2026 graduates to undertake their mandatory one-year National Service within our Core Infrastructure and Cloud Engineering division.",
      requirements:
        "• Fresh graduates in Computer Science, Telecom, or Computer Engineering\n• Familiarity with Linux terminal commands and basic networking\n• Eagerness to learn AWS, Kubernetes, and CI/CD pipelines\n• Valid NSS PIN",
      responsibilities:
        "• Monitor cloud infrastructure health and alerts\n• Assist the site reliability team in automating system deployments\n• Document network infrastructure topologies",
      opportunityType: "NSS_PLACEMENT",
      workplaceType: "ON_SITE",
      locationRegion: "Greater Accra",
      industry: "Telecommunications",
      stipendMin: 1500,
      stipendMax: 2000,
      currency: "GHS",
      applicationDeadline: new Date("2026-12-15"),
      status: "ACTIVE",
      isFeatured: true,
      viewsCount: 98,
    },
  });

  const job3 = await prisma.jobListing.create({
    data: {
      employerId: employer1.employerProfile.id,
      title: "Graduate Trainee – FinTech Product Operations",
      slug: "graduate-trainee-fintech-product-hubtel",
      description:
        "A structured 12-month rotational program designed to transition exceptional Ghanaian graduates into product management and financial operations leaders.",
      requirements:
        "• Recent bachelor's degree (First Class or Second Upper)\n• Exceptional analytical and problem-solving abilities\n• Proficiency with Excel and data visualization tools",
      responsibilities:
        "• Rotate through Product Operations, Merchant Support, and Analytics\n• Conduct user research and gather merchant feedback\n• Analyze transaction metrics to optimize onboarding workflows",
      opportunityType: "GRADUATE_TRAINEE",
      workplaceType: "ON_SITE",
      locationRegion: "Greater Accra",
      industry: "FinTech & Messaging",
      stipendMin: 3000,
      stipendMax: 4000,
      currency: "GHS",
      applicationDeadline: new Date("2026-10-25"),
      status: "ACTIVE",
      isFeatured: false,
      viewsCount: 210,
    },
  });

  const job4 = await prisma.jobListing.create({
    data: {
      employerId: employer3.employerProfile.id,
      title: "HealthTech Data Analyst Intern",
      slug: "healthtech-data-analyst-intern-mpharma-kumasi",
      description:
        "Work directly with mPharma's analytics team in Kumasi to optimize pharmaceutical supply chains across Ghanaian hospitals and community pharmacies.",
      requirements:
        "• Level 300/400 students in Computer Science, Statistics, Mathematics, or Pharmacy\n• Strong knowledge of Python (Pandas/NumPy) or R and SQL\n• Keen eye for data accuracy and healthcare logistics",
      responsibilities:
        "• Clean and organize medication inventory datasets\n• Build automated inventory dashboard reports for regional hubs\n• Present monthly supply forecasts to operations managers",
      opportunityType: "INTERNSHIP",
      workplaceType: "HYBRID",
      locationRegion: "Ashanti",
      industry: "HealthTech & Pharmaceuticals",
      stipendMin: 1600,
      stipendMax: 2200,
      currency: "GHS",
      applicationDeadline: new Date("2026-11-15"),
      status: "ACTIVE",
      isFeatured: true,
      viewsCount: 76,
    },
  });

  console.log("💼 Created 4 Authentic Job Listings across Accra & Kumasi.");

  // 6. Create Initial Applications
  await prisma.application.create({
    data: {
      jobListingId: job1.id,
      studentProfileId: student1.studentProfile.id,
      coverLetter:
        "I am writing to express my strong interest in the Software Engineering Summer Internship at Hubtel. As a Level 300 CS student at the University of Ghana with active full-stack TypeScript projects, I am excited to contribute to high-scale payment infrastructure.",
      resumeUrl: "https://example.com/resumes/kwame-mensah-cv.pdf",
      status: "SHORTLISTED",
      employerNotes: "Candidate has strong GitHub portfolio with Next.js and Prisma. Invite for technical round.",
    },
  });

  await prisma.application.create({
    data: {
      jobListingId: job2.id,
      studentProfileId: student2.studentProfile.id,
      coverLetter:
        "I am eager to apply for the NSS Cloud & DevOps Associate role at Telecel Ghana. Having completed cloud certifications and Linux lab modules at KNUST, I am enthusiastic about contributing to telecommunications infrastructure.",
      resumeUrl: "https://example.com/resumes/abena-osei-cv.pdf",
      status: "UNDER_REVIEW",
      employerNotes: "Good academic standing from KNUST. Reviewing cloud course projects.",
    },
  });

  // 7. Create Sample Bookmarks
  await prisma.savedJob.create({
    data: {
      studentProfileId: student1.studentProfile.id,
      jobListingId: job3.id,
    },
  });

  console.log("🚀 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
