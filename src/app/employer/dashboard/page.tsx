"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import {
  Briefcase,
  Users,
  Eye,
  PlusCircle,
  Loader2,
  Building2,
  Calendar,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";
import { formatGHS } from "@/lib/utils";

interface EmployerJob {
  id: string;
  title: string;
  slug: string;
  opportunityType: string;
  locationRegion: string;
  status: string;
  viewsCount: number;
  stipendMin: number | null;
  applicationDeadline: string;
  createdAt: string;
  _count: {
    applications: number;
  };
}

interface Metrics {
  totalJobs: number;
  activeJobs: number;
  totalApplicants: number;
  totalViews: number;
  jobs: EmployerJob[];
}

export default function EmployerDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/employer/jobs");
      if (res.ok) {
        const json = await res.json();
        setMetrics(json.data || null);
      }
    } catch {
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  async function handleToggleStatus(jobId: string, currentStatus: string) {
    const nextStatus = currentStatus === "ACTIVE" ? "CLOSED" : "ACTIVE";
    setUpdatingId(jobId);

    try {
      const res = await fetch(`/api/employer/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (res.ok) {
        await fetchDashboardData();
      }
    } catch {
      // ignore
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg w-fit mb-2">
              <Building2 className="h-3.5 w-3.5" /> Employer Recruiter Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Recruitment Dashboard
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage your company&apos;s active vacancies and track incoming candidate applications.
            </p>
          </div>

          <Link
            href="/employer/jobs/create"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-5 py-3 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-sm shrink-0"
          >
            <PlusCircle className="h-4 w-4" /> Post New Opportunity
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200">
            <Loader2 className="h-8 w-8 text-brand-600 animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-600">Loading recruiter dashboard...</p>
          </div>
        ) : !metrics ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <p className="text-sm text-slate-600">Unable to load dashboard data. Please make sure you are logged in with an employer account.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Listings</span>
                  <div className="text-2xl font-extrabold text-slate-900">{metrics.totalJobs}</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ToggleRight className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Vacancies</span>
                  <div className="text-2xl font-extrabold text-emerald-600">{metrics.activeJobs}</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Applicants</span>
                  <div className="text-2xl font-extrabold text-blue-600">{metrics.totalApplicants}</div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Eye className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Listing Views</span>
                  <div className="text-2xl font-extrabold text-slate-900">{metrics.totalViews}</div>
                </div>
              </div>
            </div>

            {/* Opportunities Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Your Posted Opportunities</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Manage visibility, deadlines, and review student applicants.</p>
                </div>
              </div>

              {metrics.jobs.length === 0 ? (
                <div className="p-12 text-center">
                  <Briefcase className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">No opportunities posted yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                    Get started by creating your first student internship, NSS role, or graduate trainee vacancy.
                  </p>
                  <Link
                    href="/employer/jobs/create"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
                  >
                    <PlusCircle className="h-3.5 w-3.5" /> Post First Opportunity
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-500 tracking-wider border-b">
                      <tr>
                        <th className="px-6 py-3.5">Opportunity Title</th>
                        <th className="px-6 py-3.5">Category & Region</th>
                        <th className="px-6 py-3.5">Status</th>
                        <th className="px-6 py-3.5 text-center">Applicants</th>
                        <th className="px-6 py-3.5">Deadline</th>
                        <th className="px-6 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {metrics.jobs.map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50/70 transition">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900 line-clamp-1">{job.title}</div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              Posted on {new Date(job.createdAt).toLocaleDateString("en-GH")}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                              {job.opportunityType.replace("_", " ")}
                            </span>
                            <div className="text-[11px] text-slate-500 mt-1">{job.locationRegion}</div>
                          </td>

                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleStatus(job.id, job.status)}
                              disabled={updatingId === job.id}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition ${
                                job.status === "ACTIVE"
                                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {updatingId === job.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : job.status === "ACTIVE" ? (
                                <ToggleRight className="h-3.5 w-3.5 text-emerald-600" />
                              ) : (
                                <ToggleLeft className="h-3.5 w-3.5 text-slate-400" />
                              )}
                              <span>{job.status}</span>
                            </button>
                          </td>

                          <td className="px-6 py-4 text-center">
                            <Link
                              href={`/employer/applications?jobId=${job.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-bold transition"
                            >
                              <Users className="h-3.5 w-3.5" />
                              <span>{job._count.applications} Applicants</span>
                            </Link>
                          </td>

                          <td className="px-6 py-4 text-xs text-slate-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-slate-400" />
                              <span>{new Date(job.applicationDeadline).toLocaleDateString("en-GH")}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/opportunities/${job.slug}`}
                                target="_blank"
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                                title="Preview Live Listing"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                              <Link
                                href={`/employer/applications?jobId=${job.id}`}
                                className="p-1.5 text-brand-600 hover:bg-brand-50 rounded-lg transition font-semibold text-xs flex items-center gap-1"
                              >
                                <span>Review</span>
                                <ChevronRight className="h-3.5 w-3.5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
