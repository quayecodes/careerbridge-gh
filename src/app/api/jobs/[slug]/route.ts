import { NextRequest, NextResponse } from "next/server";
import { JobService } from "@/lib/services/job.service";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> | { slug: string } }
) {
  try {
    const params = await Promise.resolve(context.params);
    const job = await JobService.getJobListingBySlug(params.slug);

    if (!job) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Opportunity not found." },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { job },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch job.";
    return NextResponse.json(
      {
        success: false,
        error: { message },
      },
      { status: 500 }
    );
  }
}
