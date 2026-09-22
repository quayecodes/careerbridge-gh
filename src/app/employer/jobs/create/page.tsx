import { Navbar } from "@/components/layout/Navbar";
import { JobPostForm } from "@/components/employer/JobPostForm";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";

export default function CreateJobPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/employer/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Employer Dashboard
        </Link>

        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold mb-2">
            <Building2 className="h-3.5 w-3.5" /> Employer Recruiter Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Post a New Opportunity
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Publish verified vacation internships, NSS placements, graduate trainee cohorts, or scholarships to reach top student talent across Ghana.
          </p>
        </div>

        <JobPostForm />
      </main>
    </div>
  );
}
