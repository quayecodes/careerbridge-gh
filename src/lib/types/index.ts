export type Role = "STUDENT" | "EMPLOYER" | "ADMIN";

export type StudentLevel =
  | "LEVEL_100"
  | "LEVEL_200"
  | "LEVEL_300"
  | "LEVEL_400"
  | "GRADUATE"
  | "POSTGRADUATE";

export type EmployerVerificationStatus = "PENDING" | "VERIFIED" | "REJECTED";

export type OpportunityType =
  | "INTERNSHIP"
  | "NSS_PLACEMENT"
  | "GRADUATE_TRAINEE"
  | "ENTRY_LEVEL"
  | "SCHOLARSHIP";

export type WorkplaceType = "ON_SITE" | "HYBRID" | "REMOTE";

export type JobStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "ACTIVE"
  | "CLOSED"
  | "ARCHIVED";

export type ApplicationStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN";

export type NotificationType =
  | "APPLICATION_STATUS"
  | "NEW_OPPORTUNITY"
  | "SYSTEM_ALERT";
