import { z } from "zod";

export const submitApplicationSchema = z.object({
  jobListingId: z.string().min(1, "Job listing ID is required"),
  coverLetter: z
    .string()
    .trim()
    .min(30, "Please provide a cover letter or statement of interest (min 30 characters)"),
  resumeUrl: z.string().url("Please provide a valid resume URL or link").or(z.literal("")).optional(),
});

export type SubmitApplicationInput = z.infer<typeof submitApplicationSchema>;
