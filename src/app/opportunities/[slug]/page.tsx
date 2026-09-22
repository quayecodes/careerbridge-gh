import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { JobService } from "@/lib/services/job.service";
import { formatGHS } from "@/lib/utils";
import {
  Building2,
  MapPin,
  Clock,
  Banknote,
  CheckCircle2,
  Briefcase,
  Calendar,
  Globe,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const job = await JobService.getJobListingBySlug(resolvedParams.slug);
  if (!job) return { title: "Opportunity Not Found" };

  return {
    title: `${job.title} at ${job.employer.companyName} | CareerBridge Ghana`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const job = await JobService.getJobListingBySlug(resolvedParams.slug);

  if (!job) {
    notFound();
  }

  const deadlineDate = new Date(job.applicationDeadline);
  const now = new Date();
  const diffDays = Math.ceil(
    (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-600 mb-6 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all opportunities
        </Link>

        {/* Job Header Hero */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700 font-bold shrink-0">
                <Building2 className="h-8 w-8" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-700">
                    {job.employer.companyName}
                  </span>
                  {job.employer.verificationStatus === "VERIFIED" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>
                      {job.locationRegion} ({job.workplaceType.replace("_", "-").toLowerCase()})
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                    <span>{job.industry}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>
                      Posted {new Date(job.createdAt).toLocaleDateString("en-GH")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply CTA Header Action */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link
                href={`/opportunities/${job.slug}/apply`}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-6 py-3 rounded-xl shadow-sm text-center transition flex items-center justify-center gap-2"
              >
                <GraduationCap className="h-5 w-5" /> Apply for Opportunity
              </Link>
            </div>
          </div>
        </div>

        {/* Details & Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Job Body */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b">
                Role Description & Overview
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>

            {/* Responsibilities */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b">
                Key Responsibilities
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {job.responsibilities}
              </div>
            </div>

            {/* Requirements & Eligibility */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b">
                Requirements & Eligibility
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {job.requirements}
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 border-b pb-2">
                Opportunity Summary
              </h3>

              <div>
                <span className="block text-[11px] font-bold uppercase text-slate-400">
                  Opportunity Type
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {job.opportunityType.replace("_", " ")}
                </span>
              </div>

              <div>
                <span className="block text-[11px] font-bold uppercase text-slate-400">
                  Workplace Setup
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {job.workplaceType.replace("_", " ")}
                </span>
              </div>

              {job.stipendMin && (
                <div>
                  <span className="block text-[11px] font-bold uppercase text-slate-400">
                    Monthly Stipend
                  </span>
                  <div className="text-sm font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                    <Banknote className="h-4 w-4" />
                    <span>
                      {formatGHS(job.stipendMin)}
                      {job.stipendMax ? ` - ${formatGHS(job.stipendMax)}` : ""}
                    </span>
                  </div>
                </div>
              )}

              <div>
                <span className="block text-[11px] font-bold uppercase text-slate-400">
                  Application Deadline
                </span>
                <div className="text-sm font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span>{deadlineDate.toLocaleDateString("en-GH")}</span>
                  <span className="text-xs text-rose-600 font-bold ml-1">
                    ({diffDays > 0 ? `${diffDays} days left` : "Closed"})
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t">
                <Link
                  href={`/opportunities/${job.slug}/apply`}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-xl shadow-sm text-center block text-sm transition"
                >
                  Apply Now
                </Link>
              </div>
            </div>

            {/* About the Employer */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 border-b pb-2 mb-3">
                About {job.employer.companyName}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {job.employer.description}
              </p>

              {job.employer.website && (
                <a
                  href={job.employer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" /> Visit Company Website
                </a>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
