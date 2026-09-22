import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { ApplicationService } from "@/lib/services/application.service";
import { submitApplicationSchema } from "@/lib/validations/application.schema";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "STUDENT") {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized. Student access only." } },
        { status: 401 }
      );
    }

    const studentProfile = user.studentProfile as { id: string } | undefined;
    if (!studentProfile) {
      return NextResponse.json(
        { success: false, error: { message: "Student profile not found." } },
        { status: 404 }
      );
    }

    const data = await ApplicationService.getStudentDashboardMetrics(studentProfile.id);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch applications.";
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "STUDENT") {
      return NextResponse.json(
        { success: false, error: { message: "Please log in as a student to submit an application." } },
        { status: 401 }
      );
    }

    const studentProfile = user.studentProfile as { id: string } | undefined;
    if (!studentProfile) {
      return NextResponse.json(
        { success: false, error: { message: "Student profile not found. Please complete your profile." } },
        { status: 404 }
      );
    }

    const body = await req.json();
    const validatedData = submitApplicationSchema.parse(body);

    const application = await ApplicationService.applyToJob(
      studentProfile.id,
      validatedData
    );

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully!",
        data: { application },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit application.";
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 400 }
    );
  }
}
