import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { ApplicationService } from "@/lib/services/application.service";
import { updateApplicationStatusSchema } from "@/lib/validations/candidate.schema";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth("EMPLOYER");

    const { id: applicationId } = await context.params;

    const employerProfile = await prisma.employerProfile.findUnique({
      where: { userId: user.id },
    });

    if (!employerProfile) {
      return NextResponse.json(
        { error: "Employer profile not found." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const parsed = updateApplicationStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updated = await ApplicationService.updateApplicationStatus(
      employerProfile.id,
      applicationId,
      parsed.data
    );

    return NextResponse.json({ application: updated });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error.message === "Unauthorised" ||
        error.message === "Authentication required" ||
        error.message === "Forbidden"
      ) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message === "Application not found.") {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.message.includes("not authorised")) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Failed to update application." },
      { status: 500 }
    );
  }
}