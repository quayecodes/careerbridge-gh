import { NextRequest, NextResponse } from "next/server";
import { JobService } from "@/lib/services/job.service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || undefined;
    const opportunityType = searchParams.get("type") || undefined;
    const workplaceType = searchParams.get("workplace") || undefined;
    const locationRegion = searchParams.get("region") || undefined;
    const industry = searchParams.get("industry") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const result = await JobService.getJobListings({
      query,
      opportunityType,
      workplaceType,
      locationRegion,
      industry,
      page,
      limit,
    });

    return NextResponse.json({
      success: true,
      data: result.jobs,
      meta: result.pagination,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch opportunities.";
    return NextResponse.json(
      {
        success: false,
        error: { message },
      },
      { status: 500 }
    );
  }
}
