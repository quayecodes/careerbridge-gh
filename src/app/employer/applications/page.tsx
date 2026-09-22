"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CandidateCard } from "@/components/employer/CandidateCard";
import { ApplicationStatus } from "@/lib/types";
import { Users, Filter, ArrowLeft, Loader2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StudentProfile {
  id: string;
  university: string;
  programOfStudy: string;
  level: string;
  graduationYear: number;
  skills: string;
  resumeUrl: string | null;
  linkedInUrl: string | null;
  githubUrl: string | null;
  bio: string | null;
  user: { id: string; name: string; email: string };
}

interface JobInfo {
  id: string;
  title: string;
  slug: string;
  opportunityType: string;
  locationRegion: string;
}

interface Application {
  id: string;
  status: string;
  coverLetter: string | null;
  resumeUrl: string | null;
  employerNotes: string | null;
  appliedAt: string;
  studentProfile: StudentProfile;
  jobListing: JobInfo;
}

// ─── Status filter options ────────────────────────────────────────────────────

const ALL_STATUSES: ApplicationStatus[] = [
  "APPLIED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "INTERVIEW_SCHEDULED",
  "ACCEPTED",
  "REJECTED",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmployerApplicationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("jobId") ?? undefined;

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "ALL">("ALL");

  // Fetch applications (re-runs when jobId changes)
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = jobId
        ? `/api/employer/applications?jobId=${jobId}`
        : "/api/employer/applications";
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to fetch applications.");
      setApplications(data.applications ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Update status handler (called from CandidateCard)
  const handleStatusUpdate = async (
    applicationId: string,
    status: ApplicationStatus,
    notes: string
  ) => {
    setUpdatingId(applicationId);
    try {
      const res = await fetch(`/api/employer/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, employerNotes: notes }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Update failed.");

      // Optimistic update in local state
      setApplications((prev) =>
        prev.map((a) =>
          a.id === applicationId
            ? { ...a, status: data.application.status, employerNotes: data.application.employerNotes }
            : a
        )
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered list
  const filtered =
    statusFilter === "ALL"
      ? applications
      : applications.filter((a) => a.status === statusFilter);

  // Unique job titles for the heading
  const jobTitle =
    applications.length > 0 ? applications[0].jobListing.title : null;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">

        {/* Back link */}
        <button
          onClick={() => router.push("/employer/dashboard")}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-brand-600" />
              Candidate Review
            </h1>
            {jobTitle && (
              <p className="text-sm text-gray-500 mt-1">
                Reviewing applicants for: <span className="font-medium text-gray-700">{jobTitle}</span>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | "ALL")}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="ALL">All Statuses</option>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Count badge */}
        {!loading && (
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "candidate" : "candidates"}
            {statusFilter !== "ALL" && ` with status "${statusFilter.replace(/_/g, " ")}"`}
          </p>
        )}

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No candidates found.</p>
            <p className="text-sm mt-1">
              {statusFilter !== "ALL"
                ? "Try changing the status filter."
                : "No one has applied yet."}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map((app) => (
              <CandidateCard
                key={app.id}
                application={app}
                onStatusUpdate={handleStatusUpdate}
                isUpdating={updatingId === app.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}