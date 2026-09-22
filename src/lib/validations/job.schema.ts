import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string().trim().min(5, "Job title must be at least 5 characters"),
  opportunityType: z.enum(
    [
      "INTERNSHIP",
      "NSS_PLACEMENT",
      "GRADUATE_TRAINEE",
      "ENTRY_LEVEL",
      "SCHOLARSHIP",
    ],
    { errorMap: () => ({ message: "Please select an opportunity type" }) }
  ),
  workplaceType: z.enum(["ON_SITE", "HYBRID", "REMOTE"], {
    errorMap: () => ({ message: "Please select a workplace model" }),
  }),
  locationRegion: z.string().min(2, "Please select a region in Ghana"),
  industry: z.string().min(2, "Please select or provide an industry"),
  stipendMin: z.coerce.number().min(0).optional(),
  stipendMax: z.coerce.number().min(0).optional(),
  currency: z.string().default("GHS"),
  applicationDeadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Please enter a valid application deadline date",
  }),
  description: z.string().trim().min(30, "Description must be at least 30 characters"),
  responsibilities: z.string().trim().min(20, "Please outline key responsibilities"),
  requirements: z.string().trim().min(20, "Please outline requirements & eligibility"),
  isFeatured: z.boolean().default(false),
});

export const updateJobStatusSchema = z.object({
  status: z.enum(["ACTIVE", "CLOSED", "DRAFT", "ARCHIVED"]),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
