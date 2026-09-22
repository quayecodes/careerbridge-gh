import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Building2,
  Search,
  Sparkles,
  MapPin,
  CheckCircle2,
  Users,
  Compass,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-emerald-50/60 via-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold mb-6 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Ghana&apos;s Dedicated Career Platform for Students &amp; NSS</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight lg:leading-tight">
                Kickstart Your Career in Ghana with{" "}
                <span className="text-emerald-700 underline decoration-amber-400 decoration-wavy decoration-2">
                  Verified Roles
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-normal">
                Connecting tertiary students and NSS graduates across Greater Accra, Ashanti, Western, and beyond with legitimate internships, graduate programs, and career mentorship.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3.5 justify-center max-w-md mx-auto sm:max-w-none">
                <Link
                  href="/opportunities"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Compass className="h-5 w-5 text-amber-300" />
                  <span>Browse Opportunities</span>
                </Link>

                <Link
                  href="/auth/register?role=EMPLOYER"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Building2 className="h-5 w-5 text-emerald-400" />
                  <span>Hire Ghanaian Talent</span>
                </Link>
              </div>

              {/* Micro Trust Indicators */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 100% Free for Students
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Verified Employers
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> No Recruitment Fees
                </span>
              </div>
            </div>

            {/* Quick Metrics Ticker */}
            <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-2xl sm:text-3xl font-black text-emerald-700">500+</div>
                <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                  Verified Students
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-2xl sm:text-3xl font-black text-slate-900">30+</div>
                <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                  Partner Employers
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-2xl sm:text-3xl font-black text-amber-600">16</div>
                <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                  Ghanaian Regions
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                <div className="text-2xl sm:text-3xl font-black text-blue-600">100%</div>
                <div className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                  Free Platform
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tertiary Institutions Banner */}
        <section className="py-8 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Supporting Students &amp; Graduates from Leading Ghanaian Institutions
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm font-extrabold text-slate-600">
              <span className="flex items-center gap-2 hover:text-emerald-700 transition">
                <GraduationCap className="h-4 w-4 text-emerald-600" /> University of Ghana (UG Legon)
              </span>
              <span className="flex items-center gap-2 hover:text-emerald-700 transition">
                <GraduationCap className="h-4 w-4 text-emerald-600" /> KNUST Kumasi
              </span>
              <span className="flex items-center gap-2 hover:text-emerald-700 transition">
                <GraduationCap className="h-4 w-4 text-emerald-600" /> Ashesi University
              </span>
              <span className="flex items-center gap-2 hover:text-emerald-700 transition">
                <GraduationCap className="h-4 w-4 text-emerald-600" /> UCC Cape Coast
              </span>
              <span className="flex items-center gap-2 hover:text-emerald-700 transition">
                <GraduationCap className="h-4 w-4 text-emerald-600" /> GCTU &amp; Technical Universities
              </span>
            </div>
          </div>
        </section>

        {/* Value Pillars */}
        <section className="py-16 lg:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
                Why CareerBridge Ghana?
              </h2>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Designed for the Real Ghanaian Job Market
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 font-bold">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Vetted &amp; Legit Listings</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Every vacancy is verified against corporate registration data. We eliminate fake recruitment agencies, upfront application fee scams, and ghost postings.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
                <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5 font-bold">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">NSS &amp; Student Specific</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Categorized tailored roles for Level 100–400 vacation attachments, National Service Scheme (NSS) corporate requests, and structured graduate cohorts.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 font-bold">
                  <Search className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Real-Time Application Tracker</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Never wonder what happened to your application. Track submission, review stages, shortlist alerts, and interview schedules in your live student portal.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 lg:py-24 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2">
                Simple &amp; Transparent
              </h2>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                How CareerBridge Ghana Works
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* For Students */}
              <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-200/80">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-bold">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">For Students &amp; NSS</h4>
                    <p className="text-xs text-emerald-800 font-semibold">Your direct path to industry experience</p>
                  </div>
                </div>

                <ol className="space-y-4 text-sm text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-900 font-bold">Create Verified Profile:</strong> Add your university, program of study, graduation year, and core tech/business skills.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-900 font-bold">Discover &amp; Filter:</strong> Find opportunities by Ghanaian region, stipend in GHS, and workplace model.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-slate-900 font-bold">1-Click Apply &amp; Track:</strong> Submit your tailored cover letter and track status updates live on your dashboard.
                    </div>
                  </li>
                </ol>

                <div className="mt-8">
                  <Link
                    href="/auth/register?role=STUDENT"
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-900 underline decoration-2"
                  >
                    <span>Register as a Student</span> &rarr;
                  </Link>
                </div>
              </div>

              {/* For Employers */}
              <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl font-bold">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">For Employers &amp; Recruiters</h4>
                    <p className="text-xs text-slate-400 font-semibold">Access Ghana&apos;s best emerging minds</p>
                  </div>
                </div>

                <ol className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <strong className="text-white font-bold">Post Vacancies:</strong> Publish internships, NSS quotas, and graduate trainee schemes with custom requirements.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <strong className="text-white font-bold">Screen Candidate Dossiers:</strong> Review applicant profiles, institution ratings, skills chips, and portfolios in one place.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </span>
                    <div>
                      <strong className="text-white font-bold">Manage Pipeline:</strong> Transition candidates to Shortlisted or Interviewed and leave feedback notes effortlessly.
                    </div>
                  </li>
                </ol>

                <div className="mt-8">
                  <Link
                    href="/auth/register?role=EMPLOYER"
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 underline decoration-2"
                  >
                    <span>Register Your Company</span> &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-14 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Shape the Future of Ghana&apos;s Workforce?
            </h3>
            <p className="mt-3 text-emerald-100 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Join hundreds of Ghanaian students and leading corporate organizations building sustainable early-career pathways.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/opportunities"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl shadow-md transition text-sm"
              >
                Explore Active Vacancies
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition text-sm"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
