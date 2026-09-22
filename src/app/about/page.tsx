import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GraduationCap, ShieldCheck, Target, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <GraduationCap className="h-4 w-4 text-emerald-600" /> About CareerBridge Ghana
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Empowering Ghanaian Students &amp; Graduates
          </h1>
          <p className="mt-4 text-base text-slate-600 leading-relaxed">
            CareerBridge Ghana is a specialized digital platform bridging higher education institutions across Ghana with verified employers, vacation internships, NSS placements, and graduate trainee schemes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="h-11 w-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Verified Listings</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Every job and employer profile is audited to protect students from recruitment fraud and unverified agency fees.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Ghana-Specific Alignment</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Tailored around Level 100-400 academic calendars, mandatory 1-year NSS deployments, and Ghanaian corporate recruitment seasons.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
            <div className="h-11 w-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Institutional Partnerships</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Built to assist career counseling offices at UG, KNUST, UCC, Ashesi, and ATU in tracking graduate outcomes.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-8 sm:p-10 text-center text-white shadow-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to take the next step in your career?</h2>
          <p className="text-emerald-100 text-sm sm:text-base mt-2 max-w-xl mx-auto leading-relaxed">
            Create your student profile or register your organization on Ghana&apos;s verified talent bridge today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/auth/register?role=STUDENT"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-sm shadow-sm transition flex items-center gap-2"
            >
              <span>Get Started as Student</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
