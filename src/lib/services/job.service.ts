import { prisma } from "@/lib/db/prisma";
import { CreateJobInput } from "@/lib/validations/job.schema";

export interface JobFilterParams {
  query?: string;
  opportunityType?: string;
  workplaceType?: string;
  locationRegion?: string;
  industry?: string;
  page?: number;
  limit?: number;
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    Math.random().toString(36).substring(2, 7)
  );
}

export class JobService {
  static async getJobListings(params: JobFilterParams = {}) {
    const {
      query,
      opportunityType,
      workplaceType,
      locationRegion,
      industry,
      page = 1,
      limit = 12,
    } = params;

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      status: "ACTIVE",
    };

    if (opportunityType && opportunityType !== "ALL") {
      where.opportunityType = opportunityType;
    }

    if (workplaceType && workplaceType !== "ALL") {
      where.workplaceType = workplaceType;
    }

    if (locationRegion && locationRegion !== "ALL") {
      where.locationRegion = locationRegion;
    }

    if (industry && industry !== "ALL") {
      where.industry = industry;
    }

    if (query && query.trim() !== "") {
      const cleanQuery = query.trim();
      where.OR = [
        { title: { contains: cleanQuery } },
        { description: { contains: cleanQuery } },
        { requirements: { contains: cleanQuery } },
        { employer: { companyName: { contains: cleanQuery } } },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.jobListing.findMany({
        where,
        include: {
          employer: {
            select: {
              id: true,
              companyName: true,
              companyLogoUrl: true,
              industry: true,
              locationRegion: true,
              verificationStatus: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.jobListing.count({ where }),
    ]);

    return {
      jobs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getJobListingBySlug(slug: string) {
    const job = await prisma.jobListing.findUnique({
      where: { slug },
      include: {
        employer: true,
        _count: {
          select: { applications: true },
        },
      },
    });

    if (job) {
      await prisma.jobListing.update({
        where: { id: job.id },
        data: { viewsCount: { increment: 1 } },
      }).catch(() => {});
    }

    return job;
  }

  static async createJob(employerProfileId: string, input: CreateJobInput) {
    const slug = slugify(input.title);

    return prisma.jobListing.create({
      data: {
        employerId: employerProfileId,
        title: input.title,
        slug,
        opportunityType: input.opportunityType,
        workplaceType: input.workplaceType,
        locationRegion: input.locationRegion,
        industry: input.industry,
        stipendMin: input.stipendMin || null,
        stipendMax: input.stipendMax || null,
        currency: input.currency || "GHS",
        applicationDeadline: new Date(input.applicationDeadline),
        description: input.description,
        responsibilities: input.responsibilities,
        requirements: input.requirements,
        isFeatured: input.isFeatured,
        status: "ACTIVE",
      },
    });
  }

  static async getEmployerJobs(employerProfileId: string) {
    return prisma.jobListing.findMany({
      where: { employerId: employerProfileId },
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  static async getEmployerDashboardMetrics(employerProfileId: string) {
    const jobs = await prisma.jobListing.findMany({
      where: { employerId: employerProfileId },
      include: {
        _count: {
          select: { applications: true },
        },
      },
    });

    const totalJobs = jobs.length;
    const activeJobs = jobs.filter((j) => j.status === "ACTIVE").length;
    const totalApplicants = jobs.reduce((sum, j) => sum + j._count.applications, 0);
    const totalViews = jobs.reduce((sum, j) => sum + j.viewsCount, 0);

    return {
      totalJobs,
      activeJobs,
      totalApplicants,
      totalViews,
      jobs,
    };
  }

  static async updateJobStatus(
    employerProfileId: string,
    jobId: string,
    status: string
  ) {
    const job = await prisma.jobListing.findFirst({
      where: {
        id: jobId,
        employerId: employerProfileId,
      },
    });

    if (!job) {
      throw new Error("Job not found or you do not have permission to modify it.");
    }

    return prisma.jobListing.update({
      where: { id: jobId },
      data: { status },
    });
  }
}
