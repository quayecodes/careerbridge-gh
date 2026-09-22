import { prisma } from "@/lib/db/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { signJwtToken } from "@/lib/auth/jwt";
import {
  RegisterStudentInput,
  RegisterEmployerInput,
  LoginInput,
} from "@/lib/validations/auth.schema";

export class AuthService {
  static async registerStudent(input: RegisterStudentInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error("An account with this email address already exists.");
    }

    const passwordHash = await hashPassword(input.password);

    const user = await prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        name: input.name,
        role: "STUDENT",
        isVerified: true, // Students are auto-active
        studentProfile: {
          create: {
            university: input.university,
            programOfStudy: input.programOfStudy,
            level: input.level,
            graduationYear: input.graduationYear,
            skills: JSON.stringify([]),
            locationRegion: input.locationRegion,
            phone: input.phone || null,
          },
        },
      },
      include: {
        studentProfile: true,
      },
    });

    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role as "STUDENT" | "EMPLOYER" | "ADMIN",
      name: user.name,
    });

    return { user, token };
  }

  static async registerEmployer(input: RegisterEmployerInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
    });

    if (existingUser) {
      throw new Error("An account with this corporate email address already exists.");
    }

    const passwordHash = await hashPassword(input.password);

    const user = await prisma.user.create({
      data: {
        email: input.email.toLowerCase(),
        passwordHash,
        name: input.name,
        role: "EMPLOYER",
        isVerified: false, // Employers undergo administrative verification
        employerProfile: {
          create: {
            companyName: input.companyName,
            industry: input.industry,
            locationRegion: input.locationRegion,
            description: input.description,
            website: input.website || null,
            businessRegNumber: input.businessRegNumber || null,
            phone: input.phone || null,
            verificationStatus: "PENDING",
          },
        },
      },
      include: {
        employerProfile: true,
      },
    });

    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role as "STUDENT" | "EMPLOYER" | "ADMIN",
      name: user.name,
    });

    return { user, token };
  }

  static async login(input: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: input.email.toLowerCase() },
      include: {
        studentProfile: true,
        employerProfile: true,
      },
    });

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    const isValid = await verifyPassword(input.password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid email or password.");
    }

    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role as "STUDENT" | "EMPLOYER" | "ADMIN",
      name: user.name,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
        studentProfile: user.studentProfile,
        employerProfile: user.employerProfile,
      },
      token,
    };
  }
}
