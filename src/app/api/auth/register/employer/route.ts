import { NextRequest, NextResponse } from "next/server";
import { registerEmployerSchema } from "@/lib/validations/auth.schema";
import { AuthService } from "@/lib/services/auth.service";
import { setAuthCookie } from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registerEmployerSchema.parse(body);

    const { user, token } = await AuthService.registerEmployer(validatedData);
    await setAuthCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Employer account registered successfully. Pending verification.",
        data: { user },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to register employer.";
    return NextResponse.json(
      {
        success: false,
        error: { message: errorMessage },
      },
      { status: 400 }
    );
  }
}
