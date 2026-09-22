import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Building2, CheckCircle2, ArrowRight, Award, Zap } from "lucide-react";
import Link from "next/link";

export default function EmployersLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <Building2 className="h-4 w-4 text-emerald-700" /> For Employers &amp; Recruiters in Ghana
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Recruit Ghana&apos;s Brightest Emerging Tech &amp; Business Talent
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            Post verified vacation internships, National Service Scheme (NSS) vacancies, and graduate trainee openings to reach students from top Ghanaian universities.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/auth/register?role=EMPLOYER"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <span>Register Your Organization</span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 font-bold">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Direct Talent Pipeline</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Connect directly with verified students across UG, KNUST, UCC, Ashesi, and ATU without sorting through thousands of unstructured email resumes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 font-bold">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verified Badge Credibility</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Build your corporate employer brand. High-caliber students prioritize verified companies with transparent compensation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="h-11 w-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 font-bold">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Candidate Pipeline Management</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Review applicant portfolios, track statuses (`Shortlisted`, `Interview Scheduled`, `Offered`), and add recruiter notes in real-time.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
