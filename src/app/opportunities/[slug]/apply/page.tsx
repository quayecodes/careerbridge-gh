"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileText,
  Lock,
} from "lucide-react";

interface JobInfo {
  id: string;
  title: string;
  slug: string;
  opportunityType: string;
  locationRegion: string;
  employer: {
    companyName: string;
  };
}

export default function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const router = useRouter();
  const [job, setJob] = useState<JobInfo | null>(null);
  const [loadingJob, setLoadingJob] = useState(true);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadJob() {
      const resolved = await Promise.resolve(params);
      try {
        const res = await fetch(`/api/jobs/${resolved.slug}`);
        if (res.ok) {
          const json = await res.json();
          setJob(json.data?.job || null);
        }
      } catch {
        setJob(null);
      } finally {
        setLoadingJob(false);
      }
    }
    loadJob();
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!job) return;

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobListingId: job.id,
          coverLetter,
          resumeUrl: resumeUrl || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || "Failed to submit application.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/student/dashboard");
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {job && (
          <Link
            href={`/opportunities/${job.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 mb-6 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Opportunity Details
          </Link>
        )}

        {loadingJob ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
            <Loader2 className="h-8 w-8 text-brand-600 animate-spin mb-3" />
            <p className="text-sm font-medium text-slate-600">Loading application form...</p>
          </div>
        ) : !job ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center">
            <h2 className="text-lg font-bold text-slate-900">Opportunity Not Found</h2>
            <p className="text-sm text-slate-600 mt-2 mb-4">The opportunity you are trying to apply for does not exist.</p>
            <Link href="/opportunities" className="text-xs font-bold text-brand-600 underline">
              Browse other opportunities
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Job Header Preview */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500">
                  Applying at {job.employer.companyName}
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {job.title}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700">
                    {job.opportunityType.replace("_", " ")}
                  </span>
                  <span className="text-[11px] text-slate-500">{job.locationRegion}</span>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900">Submit Your Application</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Your academic profile information will automatically be attached to this application.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>Application successfully submitted! Redirecting to your dashboard...</span>
                </div>
              )}

              {/* Cover Letter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Cover Letter / Statement of Interest *
                </label>
                <textarea
                  required
                  rows={6}
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Explain why you are interested in this role, your relevant academic coursework, projects, and what you hope to learn or contribute..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Minimum 30 characters. Tailor your message to the employer.
                </span>
              </div>

              {/* Resume / Portfolio Link */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Resume / CV Link (Google Drive / LinkedIn / Cloud PDF)
                </label>
                <div className="relative">
                  <FileText className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="url"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/your-cv.pdf"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Ensure link permissions are set to &apos;Anyone with the link can view&apos;.
                </span>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Lock className="h-3.5 w-3.5 text-slate-400" />
                  <span>Direct & Secure Submission</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow-sm transition flex items-center gap-2 text-sm"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <GraduationCap className="h-4 w-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
