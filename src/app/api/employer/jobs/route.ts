import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { JobService } from "@/lib/services/job.service";
import { createJobSchema } from "@/lib/validations/job.schema";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "EMPLOYER") {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized. Employer access only." } },
        { status: 401 }
      );
    }

    const employerProfile = user.employerProfile as { id: string } | undefined;
    if (!employerProfile) {
      return NextResponse.json(
        { success: false, error: { message: "Employer profile not found." } },
        { status: 404 }
      );
    }

    const metrics = await JobService.getEmployerDashboardMetrics(employerProfile.id);

    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch employer dashboard.";
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "EMPLOYER") {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized. Employer access only." } },
        { status: 401 }
      );
    }

    const employerProfile = user.employerProfile as { id: string } | undefined;
    if (!employerProfile) {
      return NextResponse.json(
        { success: false, error: { message: "Employer profile not found." } },
        { status: 404 }
      );
    }

    const body = await req.json();
    const validatedData = createJobSchema.parse(body);

    const job = await JobService.createJob(employerProfile.id, validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Opportunity published successfully!",
        data: { job },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to publish opportunity.";
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 400 }
    );
  }
}
