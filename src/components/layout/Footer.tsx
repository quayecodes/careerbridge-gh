import Link from "next/link";
import {
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Building2,
  Briefcase,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
      {/* Top Banner with Ghana Flag Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-emerald-600 text-white p-2 rounded-xl font-bold flex items-center justify-center shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white tracking-tight">
                  CareerBridge<span className="text-emerald-500">.gh</span>
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Ghana Student Career Hub
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Ghana&apos;s premier national platform connecting tertiary students, polytechnic graduates, and NSS personnel with verified internships, graduate trainee cohorts, and early-career opportunities.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>100% Free &amp; Verified • No Scam Fees Policy</span>
            </div>
          </div>

          {/* Quick Links: Opportunities */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Briefcase className="h-3.5 w-3.5 text-emerald-500" /> Opportunities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/opportunities?type=INTERNSHIP" className="hover:text-emerald-400 transition">
                  Vacation Internships
                </Link>
              </li>
              <li>
                <Link href="/opportunities?type=NSS_PLACEMENT" className="hover:text-emerald-400 transition">
                  NSS Company Placements
                </Link>
              </li>
              <li>
                <Link href="/opportunities?type=GRADUATE_TRAINEE" className="hover:text-emerald-400 transition">
                  Graduate Trainee Schemes
                </Link>
              </li>
              <li>
                <Link href="/opportunities?type=ENTRY_LEVEL" className="hover:text-emerald-400 transition">
                  Entry-Level Jobs
                </Link>
              </li>
              <li>
                <Link href="/opportunities?type=SCHOLARSHIP" className="hover:text-emerald-400 transition">
                  Fellowships &amp; Grants
                </Link>
              </li>
            </ul>
          </div>

          {/* Ghanaian Tech & Industry Hubs */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-amber-400" /> Regional Hubs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/opportunities?region=Greater%20Accra" className="hover:text-amber-300 transition">
                  Greater Accra (Silicon Accra)
                </Link>
              </li>
              <li>
                <Link href="/opportunities?region=Ashanti" className="hover:text-amber-300 transition">
                  Ashanti (Kumasi Tech Ecosystem)
                </Link>
              </li>
              <li>
                <Link href="/opportunities?region=Western" className="hover:text-amber-300 transition">
                  Western (Takoradi Industrial Hub)
                </Link>
              </li>
              <li>
                <Link href="/opportunities?region=Central" className="hover:text-amber-300 transition">
                  Central (Cape Coast Innovation)
                </Link>
              </li>
              <li>
                <Link href="/opportunities?region=Northern" className="hover:text-amber-300 transition">
                  Northern (Tamale Digital Hub)
                </Link>
              </li>
            </ul>
          </div>

          {/* Tertiary Ecosystem & Support */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-blue-400" /> Institution Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-slate-400 hover:text-slate-200 transition inline-flex items-center gap-1">
                  University of Ghana (UG) <ExternalLink className="h-3 w-3 opacity-60" />
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 transition inline-flex items-center gap-1">
                  KNUST Kumasi <ExternalLink className="h-3 w-3 opacity-60" />
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 transition inline-flex items-center gap-1">
                  Ashesi University <ExternalLink className="h-3 w-3 opacity-60" />
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 transition inline-flex items-center gap-1">
                  UCC Cape Coast <ExternalLink className="h-3 w-3 opacity-60" />
                </span>
              </li>
              <li className="pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-500">
                <Mail className="h-3.5 w-3.5 text-slate-400" /> support@careerbridge.gh
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} CareerBridge Ghana. Final Year BSc Computer Science Portfolio Project.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-slate-300 transition">
              About Project
            </Link>
            <Link href="/employers" className="hover:text-slate-300 transition">
              Employer Verification
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-medium">Built with Next.js 16 &amp; Prisma</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
