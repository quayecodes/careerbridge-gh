import Link from "next/link";
import {
  Building2,
  MapPin,
  Clock,
  Banknote,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { formatGHS } from "@/lib/utils";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    slug: string;
    opportunityType: string;
    workplaceType: string;
    locationRegion: string;
    industry: string;
    stipendMin: number | null;
    stipendMax: number | null;
    currency: string;
    applicationDeadline: string | Date;
    isFeatured: boolean;
    employer: {
      companyName: string;
      companyLogoUrl: string | null;
      verificationStatus: string;
    };
    _count?: {
      applications: number;
    };
  };
}

export function JobCard({ job }: JobCardProps) {
  const deadlineDate = new Date(job.applicationDeadline);
  const now = new Date();
  const diffDays = Math.ceil(
    (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  const getOpportunityBadge = (type: string) => {
    switch (type) {
      case "INTERNSHIP":
        return { label: "Internship", bg: "bg-emerald-100 text-emerald-800" };
      case "NSS_PLACEMENT":
        return { label: "NSS Placement", bg: "bg-blue-100 text-blue-800" };
      case "GRADUATE_TRAINEE":
        return { label: "Graduate Trainee", bg: "bg-purple-100 text-purple-800" };
      case "ENTRY_LEVEL":
        return { label: "Entry Level", bg: "bg-amber-100 text-amber-800" };
      case "SCHOLARSHIP":
        return { label: "Scholarship", bg: "bg-rose-100 text-rose-800" };
      default:
        return { label: type, bg: "bg-slate-100 text-slate-800" };
    }
  };

  const badge = getOpportunityBadge(job.opportunityType);

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 hover:shadow-md flex flex-col justify-between relative p-6 ${
        job.isFeatured
          ? "border-brand-300 ring-1 ring-brand-200/50 bg-gradient-to-b from-brand-50/20 to-white"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Featured Pill */}
      {job.isFeatured && (
        <div className="absolute -top-3 right-6 bg-brand-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
          <Sparkles className="h-3 w-3" /> Featured
        </div>
      )}

      <div>
        {/* Header: Company & Badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0">
              <Building2 className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-700">
                  {job.employer.companyName}
                </span>
                {job.employer.verificationStatus === "VERIFIED" && (
                  <CheckCircle2
                    className="h-3.5 w-3.5 text-brand-600"
                    title="Verified Employer"
                  />
                )}
              </div>
              <span className="text-[11px] text-slate-500">{job.industry}</span>
            </div>
          </div>

          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0 ${badge.bg}`}
          >
            {badge.label}
          </span>
        </div>

        {/* Title */}
        <Link href={`/opportunities/${job.slug}`}>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-brand-600 transition leading-snug line-clamp-2 mt-1">
            {job.title}
          </h3>
        </Link>

        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-slate-600">
          <div className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
            <MapPin className="h-3.5 w-3.5 text-slate-500" />
            <span>
              {job.locationRegion} ({job.workplaceType.replace("_", "-").toLowerCase()})
            </span>
          </div>

          {job.stipendMin && (
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-100 font-medium">
              <Banknote className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                {formatGHS(job.stipendMin)}
                {job.stipendMax ? ` - ${formatGHS(job.stipendMax)}` : ""}/mo
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer: Deadline & Action Link */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {diffDays > 0
              ? `${diffDays} days left`
              : diffDays === 0
              ? "Deadline Today"
              : "Closed"}
          </span>
        </div>

        <Link
          href={`/opportunities/${job.slug}`}
          className="font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1 group transition"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
