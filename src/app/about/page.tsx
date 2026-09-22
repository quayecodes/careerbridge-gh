import { Navbar } from "@/components/layout/Navbar";
import { GraduationCap, ShieldCheck, Target, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold mb-4">
            <GraduationCap className="h-4 w-4" /> About CareerBridge Ghana
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Empowering Ghanaian Students & Graduates
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            CareerBridge Ghana is a specialized digital platform bridging higher education institutions across Ghana with verified employers, vacation internships, NSS placements, and graduate trainee schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verified Listings</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Every job and employer profile is audited to protect students from recruitment fraud and unverified agency fees.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Ghana-Specific Alignment</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Tailored around Level 100-400 academic calendars, mandatory 1-year NSS deployments, and Ghanaian corporate recruitment seasons.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Institutional Partnerships</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Built to assist career counseling offices at UG, KNUST, UCC, Ashesi, and ATU in tracking graduate outcomes.
            </p>
          </div>
        </div>

        <div className="bg-brand-600 rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Ready to take the next step in your career?</h2>
          <p className="text-brand-100 text-sm mt-2 max-w-xl mx-auto">
            Create your student profile or register your organization today.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/auth/register?role=STUDENT"
              className="bg-white text-brand-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-brand-50 transition"
            >
              Get Started as Student
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
