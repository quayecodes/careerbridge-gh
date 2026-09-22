import { getSessionToken, verifyJwtToken } from "./jwt";
import { prisma } from "@/lib/db/prisma";

export async function getCurrentUser(): Promise<{
  id: string;
  email: string;
  name: string;
  role: "STUDENT" | "EMPLOYER" | "ADMIN";
  avatarUrl: string | null;
  studentProfile?: unknown;
  employerProfile?: unknown;
} | null> {
  const token = await getSessionToken();
  if (!token) return null;

  const payload = verifyJwtToken(token);
  if (!payload) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        studentProfile: true,
        employerProfile: true,
      },
    });

    return user
      ? { ...user, role: user.role as "STUDENT" | "EMPLOYER" | "ADMIN" }
      : null;
  } catch {
    return null;
  }
}

export async function requireAuth(
  allowedRoles?: "STUDENT" | "EMPLOYER" | "ADMIN" | Array<"STUDENT" | "EMPLOYER" | "ADMIN">
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }

  if (allowedRoles) {
    const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    if (!rolesArray.includes(user.role)) {
      throw new Error("Forbidden");
    }
  }

  return user;
}
