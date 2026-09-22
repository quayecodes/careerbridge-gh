import { NextRequest, NextResponse } from "next/server";
import { registerStudentSchema } from "@/lib/validations/auth.schema";
import { AuthService } from "@/lib/services/auth.service";
import { setAuthCookie } from "@/lib/auth/jwt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = registerStudentSchema.parse(body);

    const { user, token } = await AuthService.registerStudent(validatedData);
    await setAuthCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Student account created successfully.",
        data: { user },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to register student.";
    return NextResponse.json(
      {
        success: false,
        error: { message: errorMessage },
      },
      { status: 400 }
    );
  }
}
