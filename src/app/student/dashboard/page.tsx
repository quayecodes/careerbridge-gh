"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ApplicationStatusBadge } from "@/components/applications/ApplicationStatusBadge";
import Link from "next/link";
import {
  Send,
  Clock,
  Award,
  CheckCircle2,
  Bookmark,
  Loader2,
  Building2,
  MapPin,
  Calendar,
  ExternalLink,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

interface ApplicationItem {
  id: string;
  coverLetter: string;
  resumeUrl: string | null;
  status: string;
  employerNotes: string | null;
  appliedAt: string;
  jobListing: {
    id: string;
    title: string;
    slug: string;
    opportunityType: string;
    locationRegion: string;
    employer: {
      companyName: string;
      companyLogoUrl: string | null;
      industry: string;
      locationRegion: string;
      verificationStatus: string;
    };
  };
}

interface SavedJobItem {
  id: string;
  createdAt: string;
  jobListing: {
    id: string;
    title: string;
    slug: string;
    opportunityType: string;
    locationRegion: string;
    employer: {
      companyName: string;
      locationRegion: string;
    };
  };
}

interface StudentDashboardData {
  totalApplied: number;
  underReview: number;
  shortlisted: number;
  offers: number;
  totalSaved: number;
  applications: ApplicationItem[];
  savedJobs: SavedJobItem[];
}

export default function StudentDashboardPage() {
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"APPLICATIONS" | "SAVED">("APPLICATIONS");

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/applications");
      if (res.ok) {
        const json = await res.json();
        setData(json.data || null);
      }
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-lg w-fit mb-2">
              <GraduationCap className="h-3.5 w-3.5" /> Student & Graduate Career Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Application Tracker
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Monitor your application lifecycle, interview invitations, and saved opportunities.
            </p>
          </div>

          <Link
            href="/opportunities"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-sm shrink-0"
          >
            Explore More Opportunities
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200">
            <Loader2 className="h-8 w-8 text-brand-600 animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-600">Loading your applications...</p>
          </div>
        ) : !data ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <p className="text-sm text-slate-600">Unable to load student application data. Please sign in with a student account.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* KPI Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Submitted</span>
                  <div className="text-xl font-extrabold text-slate-900">{data.totalApplied}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">In Review</span>
                  <div className="text-xl font-extrabold text-amber-600">{data.underReview}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Shortlisted</span>
                  <div className="text-xl font-extrabold text-purple-600">{data.shortlisted}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Offers</span>
                  <div className="text-xl font-extrabold text-emerald-600">{data.offers}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Bookmark className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Saved Jobs</span>
                  <div className="text-xl font-extrabold text-slate-900">{data.totalSaved}</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-200/70 p-1 rounded-xl w-fit">
              <button
                onClick={() => setActiveTab("APPLICATIONS")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activeTab === "APPLICATIONS"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                My Applications ({data.applications.length})
              </button>
              <button
                onClick={() => setActiveTab("SAVED")}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                  activeTab === "SAVED"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Saved Bookmarks ({data.savedJobs.length})
              </button>
            </div>

            {/* Tab 1: Applications List */}
            {activeTab === "APPLICATIONS" && (
              <div className="space-y-4">
                {data.applications.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <Send className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800">No applications submitted yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                      Explore our catalog of verified internships and NSS postings to submit your first application.
                    </p>
                    <Link
                      href="/opportunities"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
                    >
                      Browse Opportunities
                    </Link>
                  </div>
                ) : (
                  data.applications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:border-slate-300 transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 font-bold">
                          <Building2 className="h-6 w-6 text-slate-700" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-slate-600">
                              {app.jobListing.employer.companyName}
                            </span>
                            {app.jobListing.employer.verificationStatus === "VERIFIED" && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-brand-600" />
                            )}
                          </div>

                          <Link
                            href={`/opportunities/${app.jobListing.slug}`}
                            className="text-base font-bold text-slate-900 hover:text-brand-600 transition"
                          >
                            {app.jobListing.title}
                          </Link>

                          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                            <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                              {app.jobListing.opportunityType.replace("_", " ")}
                            </span>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-slate-400" />
                              <span>{app.jobListing.locationRegion}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              <span>Applied on {new Date(app.appliedAt).toLocaleDateString("en-GH")}</span>
                            </div>
                          </div>

                          {/* Recruiter Feedback / Notes */}
                          {app.employerNotes && (
                            <div className="mt-3 p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                              <MessageSquare className="h-4 w-4 shrink-0 text-blue-600 mt-0.5" />
                              <div>
                                <strong className="font-semibold">Recruiter Feedback:</strong>{" "}
                                <span>{app.employerNotes}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Status & Action */}
                      <div className="flex sm:flex-row md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <ApplicationStatusBadge status={app.status} />
                        <Link
                          href={`/opportunities/${app.jobListing.slug}`}
                          className="text-xs font-bold text-brand-600 hover:underline inline-flex items-center gap-1"
                        >
                          <span>View Role</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 2: Saved Bookmarks */}
            {activeTab === "SAVED" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.savedJobs.length === 0 ? (
                  <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-12 text-center">
                    <Bookmark className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800">No saved opportunities</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                      Bookmark opportunities while browsing to review and apply to them later.
                    </p>
                  </div>
                ) : (
                  data.savedJobs.map((saved) => (
                    <div
                      key={saved.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[11px] font-semibold text-slate-500">
                          {saved.jobListing.employer.companyName} • {saved.jobListing.locationRegion}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                          {saved.jobListing.title}
                        </h4>
                        <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                          {saved.jobListing.opportunityType.replace("_", " ")}
                        </span>
                      </div>

                      <Link
                        href={`/opportunities/${saved.jobListing.slug}`}
                        className="px-3.5 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold transition shrink-0"
                      >
                        Apply
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
