import { prisma } from "@/lib/db/prisma";
import { SubmitApplicationInput } from "@/lib/validations/application.schema";
import { UpdateApplicationStatusInput } from "@/lib/validations/candidate.schema";

export class ApplicationService {
  static async applyToJob(
    studentProfileId: string,
    input: SubmitApplicationInput
  ) {
    // 1. Verify Job exists and is active
    const job = await prisma.jobListing.findUnique({
      where: { id: input.jobListingId },
    });

    if (!job) {
      throw new Error("The opportunity you are applying for does not exist.");
    }

    if (job.status !== "ACTIVE") {
      throw new Error("This opportunity is no longer accepting applications.");
    }

    if (new Date(job.applicationDeadline) < new Date()) {
      throw new Error("The application deadline for this opportunity has passed.");
    }

    // 2. Prevent duplicate applications
    const existingApp = await prisma.application.findUnique({
      where: {
        studentProfileId_jobListingId: {
          studentProfileId,
          jobListingId: input.jobListingId,
        },
      },
    });

    if (existingApp) {
      throw new Error(
        "You have already submitted an application for this opportunity."
      );
    }

    // 3. Create Application
    const application = await prisma.application.create({
      data: {
        studentProfileId,
        jobListingId: input.jobListingId,
        coverLetter: input.coverLetter,
        resumeUrl: input.resumeUrl || null,
        status: "APPLIED",
      },
      include: {
        jobListing: {
          include: {
            employer: true,
          },
        },
      },
    });

    return application;
  }

  static async getStudentApplications(studentProfileId: string) {
    return prisma.application.findMany({
      where: { studentProfileId },
      include: {
        jobListing: {
          include: {
            employer: {
              select: {
                companyName: true,
                companyLogoUrl: true,
                industry: true,
                locationRegion: true,
                verificationStatus: true,
              },
            },
          },
        },
      },
      orderBy: { appliedAt: "desc" },
    });
  }

  static async getStudentDashboardMetrics(studentProfileId: string) {
    const [applications, savedJobs] = await Promise.all([
      prisma.application.findMany({
        where: { studentProfileId },
        include: {
          jobListing: {
            include: {
              employer: {
                select: {
                  companyName: true,
                  companyLogoUrl: true,
                  industry: true,
                  locationRegion: true,
                  verificationStatus: true,
                },
              },
            },
          },
        },
        orderBy: { appliedAt: "desc" },
      }),
      prisma.savedJob.findMany({
        where: { studentProfileId },
        include: {
          jobListing: {
            include: {
              employer: {
                select: {
                  companyName: true,
                  companyLogoUrl: true,
                  locationRegion: true,
                  verificationStatus: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const totalApplied = applications.length;
    const underReview = applications.filter(
      (a) => a.status === "UNDER_REVIEW" || a.status === "APPLIED"
    ).length;
    const shortlisted = applications.filter(
      (a) => a.status === "SHORTLISTED" || a.status === "INTERVIEW_SCHEDULED"
    ).length;
    const offers = applications.filter((a) => a.status === "ACCEPTED").length;

    return {
      totalApplied,
      underReview,
      shortlisted,
      offers,
      totalSaved: savedJobs.length,
      applications,
      savedJobs,
    };
  }

  static async toggleBookmark(studentProfileId: string, jobListingId: string) {
    const existing = await prisma.savedJob.findUnique({
      where: {
        studentProfileId_jobListingId: {
          studentProfileId,
          jobListingId,
        },
      },
    });

    if (existing) {
      await prisma.savedJob.delete({
        where: { id: existing.id },
      });
      return { bookmarked: false };
    } else {
      await prisma.savedJob.create({
        data: {
          studentProfileId,
          jobListingId,
        },
      });
      return { bookmarked: true };
    }
  }

  // ── Employer Side ──────────────────────────────────────────────────────────

  static async getEmployerApplications(
    employerProfileId: string,
    jobId?: string
  ) {
    const whereClause = jobId
      ? { jobListingId: jobId, jobListing: { employerId: employerProfileId } }
      : { jobListing: { employerId: employerProfileId } };

    return prisma.application.findMany({
      where: whereClause,
      include: {
        studentProfile: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        jobListing: {
          select: {
            id: true,
            title: true,
            slug: true,
            opportunityType: true,
            locationRegion: true,
          },
        },
      },
      orderBy: { appliedAt: "desc" },
    });
  }

  static async updateApplicationStatus(
    employerProfileId: string,
    applicationId: string,
    input: UpdateApplicationStatusInput
  ) {
    // Verify the application belongs to one of this employer's jobs
    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: {
        jobListing: {
          select: { employerId: true },
        },
      },
    });

    if (!application) {
      throw new Error("Application not found.");
    }

    if (application.jobListing.employerId !== employerProfileId) {
      throw new Error(
        "You are not authorised to update this application."
      );
    }

    return prisma.application.update({
      where: { id: applicationId },
      data: {
        status: input.status,
        employerNotes: input.employerNotes ?? null,
      },
    });
  }
}
