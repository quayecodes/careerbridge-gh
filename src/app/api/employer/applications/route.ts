import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { ApplicationService } from "@/lib/services/application.service";

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth("EMPLOYER");

    // Resolve the employer profile
    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!employerProfile) {
      return NextResponse.json(
        { error: "Employer profile not found." },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get("jobId") ?? undefined;

    const applications = await ApplicationService.getEmployerApplications(
      employerProfile.id,
      jobId
    );

    return NextResponse.json({ applications });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error.message === "Unauthorised" ||
        error.message === "Authentication required" ||
        error.message === "Forbidden"
      ) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}
