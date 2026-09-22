import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { ApplicationService } from "@/lib/services/application.service";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "STUDENT") {
      return NextResponse.json(
        { success: false, error: { message: "Please log in as a student to save opportunities." } },
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

    const { jobListingId } = await req.json();
    if (!jobListingId) {
      return NextResponse.json(
        { success: false, error: { message: "Missing job listing ID." } },
        { status: 400 }
      );
    }

    const result = await ApplicationService.toggleBookmark(
      studentProfile.id,
      jobListingId
    );

    return NextResponse.json({
      success: true,
      message: result.bookmarked ? "Opportunity saved to bookmarks" : "Opportunity removed from bookmarks",
      data: result,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle bookmark.";
    return NextResponse.json(
      { success: false, error: { message } },
      { status: 500 }
    );
  }
}
