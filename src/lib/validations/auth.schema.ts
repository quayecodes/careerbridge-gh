import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerStudentSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid university or personal email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  university: z.string().min(2, "Please select or specify your university (e.g., UG, KNUST, UCC, Ashesi)"),
  programOfStudy: z.string().min(2, "Please specify your program of study (e.g., BSc Computer Science)"),
  level: z.enum(["LEVEL_100", "LEVEL_200", "LEVEL_300", "LEVEL_400", "GRADUATE", "POSTGRADUATE"], {
    errorMap: () => ({ message: "Please select a valid academic level" }),
  }),
  graduationYear: z.coerce.number().int().min(2020).max(2035),
  locationRegion: z.string().min(2, "Please specify your region in Ghana (e.g., Greater Accra, Ashanti)"),
  phone: z.string().optional(),
});

export const registerEmployerSchema = z.object({
  name: z.string().trim().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid corporate email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().trim().min(2, "Company name is required"),
  industry: z.string().min(2, "Industry category is required (e.g., FinTech, Telecommunications, Software)"),
  locationRegion: z.string().min(2, "Location region in Ghana is required (e.g., Greater Accra)"),
  description: z.string().min(10, "Please provide a brief description of the organization"),
  website: z.string().url("Please provide a valid website URL").or(z.literal("")).optional(),
  businessRegNumber: z.string().optional(),
  phone: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterStudentInput = z.infer<typeof registerStudentSchema>;
export type RegisterEmployerInput = z.infer<typeof registerEmployerSchema>;
