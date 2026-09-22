import Link from "next/link";
import { GraduationCap, Briefcase, ShieldCheck, ArrowRight, Building2, Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner Navigation */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-brand-600 text-white p-2 rounded-lg font-bold text-lg flex items-center justify-center">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-slate-900 tracking-tight">CareerBridge<span className="text-brand-600">.gh</span></span>
              <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Ghana Student Career Hub</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/opportunities" className="hover:text-brand-600 transition">Browse Opportunities</Link>
            <Link href="/employers" className="hover:text-brand-600 transition">For Employers</Link>
            <Link href="/about" className="hover:text-brand-600 transition">About</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 rounded-md transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/50 via-white to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-semibold mb-6">
                <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse"></span>
                Official Hub for Student Internships & NSS in Ghana
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Launch Your Career in Ghana with <span className="text-brand-600">Verified Opportunities</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
                Connect directly with top employers across Greater Accra, Ashanti, Western, and beyond. Verified internships, NSS placements, graduate trainee cohorts, and scholarships.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register?role=STUDENT"
                  className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <GraduationCap className="h-5 w-5" /> I am a Student / Graduate
                </Link>
                <Link
                  href="/auth/register?role=EMPLOYER"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Building2 className="h-5 w-5" /> I am an Employer / Recruiter
                </Link>
              </div>
            </div>

            {/* Quick Feature Pillars */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">100% Vetted Listings</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  No scam recruitment fees or fake listings. Every employer and vacancy is verified by our administrative moderation team.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Ghana Specific Categories</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Tailored specifically for Level 100-400 vacation internships, NSS company postings, and structured corporate graduate programs.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Real-Time Tracking</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Track your application status from submission to interview invitation directly on your personalized student dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-slate-900 text-slate-400 text-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} CareerBridge Ghana. Final Year BSc Computer Science Project Portfolio.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
