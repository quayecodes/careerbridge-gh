"use client";

import { useState } from "react";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import { ApplicationStatus } from "@/lib/types";
import {
  User,
  GraduationCap,
  MapPin,
  FileText,
  ChevronDown,
  ExternalLink,
  Briefcase,
} from "lucide-react";

interface StudentInfo {
  id: string;
  name: string;
  email: string;
}

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
  user: StudentInfo;
}

interface JobInfo {
  id: string;
  title: string;
  slug: string;
  opportunityType: string;
  locationRegion: string;
}

interface CandidateCardProps {
  application: {
    id: string;
    status: string;
    coverLetter: string | null;
    resumeUrl: string | null;
    employerNotes: string | null;
    appliedAt: string;
    studentProfile: StudentProfile;
    jobListing: JobInfo;
  };
  onStatusUpdate: (applicationId: string, status: ApplicationStatus, notes: string) => void;
  isUpdating?: boolean;
}

const STATUS_OPTIONS: ApplicationStatus[] = [
  "APPLIED",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "INTERVIEW_SCHEDULED",
  "ACCEPTED",
  "REJECTED",
];

export function CandidateCard({ application, onStatusUpdate, isUpdating }: CandidateCardProps) {
  const { studentProfile, jobListing } = application;
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(
    application.status as ApplicationStatus
  );
  const [notes, setNotes] = useState(application.employerNotes ?? "");
  const [showActions, setShowActions] = useState(false);

  let skills: string[] = [];
  try {
    skills = JSON.parse(studentProfile.skills);
  } catch {
    skills = [];
  }

  const handleUpdate = () => {
    onStatusUpdate(application.id, selectedStatus, notes);
    setShowActions(false);
  };

  const appliedDate = new Date(application.appliedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Header Row */}
      <div className="flex items-start justify-between p-5 gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
            {studentProfile.user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 truncate">
              {studentProfile.user.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {studentProfile.user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <ApplicationStatusBadge status={application.status as ApplicationStatus} />
          <span className="text-xs text-gray-400">Applied {appliedDate}</span>
        </div>
      </div>

      {/* Info Pills */}
      <div className="px-5 pb-4 flex flex-wrap gap-2 text-sm">
        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
          <GraduationCap className="w-3.5 h-3.5" />
          {studentProfile.university}
        </span>
        <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
          <FileText className="w-3.5 h-3.5" />
          {studentProfile.programOfStudy} — {studentProfile.level.replace("_", " ")}
        </span>
        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
          <Briefcase className="w-3.5 h-3.5" />
          {jobListing.title}
        </span>
        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-full">
          <MapPin className="w-3.5 h-3.5" />
          {jobListing.locationRegion}
        </span>
      </div>

      {/* Skills */}
      {skills.length > 0 && (
        <div className="px-5 pb-4 flex flex-wrap gap-1.5">
          {skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
          {skills.length > 6 && (
            <span className="text-xs text-gray-400 px-1 py-0.5">
              +{skills.length - 6} more
            </span>
          )}
        </div>
      )}

      {/* Expand / Collapse */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setShowDetails((p) => !p)}
          className="w-full flex items-center justify-between px-5 py-3 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>{showDetails ? "Hide details" : "View cover letter & actions"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showDetails ? "rotate-180" : ""}`}
          />
        </button>

        {showDetails && (
          <div className="px-5 pb-5 space-y-4">
            {/* Cover Letter */}
            {application.coverLetter && (
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Cover Letter
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 rounded-lg p-3 leading-relaxed max-h-40 overflow-y-auto">
                  {application.coverLetter}
                </p>
              </div>
            )}

            {/* Resume / Links */}
            <div className="flex flex-wrap gap-3">
              {(application.resumeUrl || studentProfile.resumeUrl) && (
                <a
                  href={application.resumeUrl ?? studentProfile.resumeUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  View Résumé
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {studentProfile.linkedInUrl && (
                <a
                  href={studentProfile.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
                >
                  <User className="w-4 h-4" />
                  LinkedIn
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {studentProfile.githubUrl && (
                <a
                  href={studentProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-gray-700 hover:underline"
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Update Status */}
            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={() => setShowActions((p) => !p)}
                className="text-sm font-medium text-brand-600 hover:underline mb-3 flex items-center gap-1"
              >
                Update Status
                <ChevronDown className={`w-4 h-4 transition-transform ${showActions ? "rotate-180" : ""}`} />
              </button>

              {showActions && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      New Status
                    </label>
                    <select
                      value={selectedStatus}
                      onChange={(e) =>
                        setSelectedStatus(e.target.value as ApplicationStatus)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Recruiter Notes (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Internal notes visible only to your team..."
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                  </div>
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-60 transition-colors"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}