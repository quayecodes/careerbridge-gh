import { z } from "zod";

export const updateApplicationStatusSchema = z.object({
  status: z.enum(
    [
      "APPLIED",
      "UNDER_REVIEW",
      "SHORTLISTED",
      "INTERVIEW_SCHEDULED",
      "ACCEPTED",
      "REJECTED",
      "WITHDRAWN",
    ],
    { errorMap: () => ({ message: "Please select a valid candidate status" }) }
  ),
  employerNotes: z.string().optional(),
});

export type UpdateApplicationStatusInput = z.infer<
  typeof updateApplicationStatusSchema
>;
