import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { JobService } from "@/lib/services/job.service";
import { updateJobStatusSchema } from "@/lib/validations/job.schema";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
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

    const params = await Promise.resolve(context.params);
    const body = await req.json();
    const { status } = updateJobStatusSchema.parse(body);

    const updatedJob = await JobService.updateJobStatus(
      employerProfile.id,
      params.id,
      status
    );

    return NextResponse.json({
      success: true,
      message: `Job status updated to ${status}`,
      data: { job: updatedJob },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update job.";
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 400 }
    );
  }
}
