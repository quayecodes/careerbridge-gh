import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/validations/auth.schema";
import { AuthService } from "@/lib/services/auth.service";
import { setAuthCookie } from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = loginSchema.parse(body);

    const { user, token } = await AuthService.login(validatedData);
    await setAuthCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Logged in successfully.",
        data: { user },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Authentication failed.";
    return NextResponse.json(
      {
        success: false,
        error: { message: errorMessage },
      },
      { status: 401 }
    );
  }
}
