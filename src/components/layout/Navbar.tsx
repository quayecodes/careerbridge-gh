"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  GraduationCap,
  LogOut,
  User,
  Building2,
  Shield,
  Menu,
  X,
  Compass,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "EMPLOYER" | "ADMIN";
}

export function Navbar() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.data?.user || null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
      router.refresh();
    } catch {
      // ignore
    }
  }

  const getDashboardLink = () => {
    if (!user) return "/auth/login";
    if (user.role === "ADMIN") return "/admin/dashboard";
    if (user.role === "EMPLOYER") return "/employer/dashboard";
    return "/student/dashboard";
  };

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all shadow-xs">
      {/* Top micro Ghanaian color accent stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-red-600 via-amber-400 to-emerald-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-emerald-700 text-white p-2 rounded-xl font-bold flex items-center justify-center shadow-xs group-hover:bg-emerald-800 transition">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                CareerBridge<span className="text-emerald-600">.gh</span>
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider hidden sm:block">
              Ghana Career Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
          <Link
            href="/opportunities"
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
              isActive("/opportunities")
                ? "bg-emerald-50 text-emerald-800 font-bold"
                : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50"
            }`}
          >
            <Compass className="h-4 w-4 text-emerald-600" />
            <span>Explore Opportunities</span>
          </Link>
          <Link
            href="/employers"
            className={`px-3.5 py-2 rounded-lg transition flex items-center gap-1.5 ${
              isActive("/employers")
                ? "bg-emerald-50 text-emerald-800 font-bold"
                : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50"
            }`}
          >
            <Building2 className="h-4 w-4 text-slate-400" />
            <span>For Employers</span>
          </Link>
          <Link
            href="/about"
            className={`px-3.5 py-2 rounded-lg transition ${
              isActive("/about")
                ? "bg-emerald-50 text-emerald-800 font-bold"
                : "text-slate-600 hover:text-emerald-700 hover:bg-slate-50"
            }`}
          >
            About
          </Link>
        </nav>

        {/* User Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-28 bg-slate-100 animate-pulse rounded-xl"></div>
          ) : user ? (
            <div className="flex items-center gap-2.5">
              <Link
                href={getDashboardLink()}
                className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-800 text-xs font-bold rounded-xl transition border border-slate-200/70"
              >
                {user.role === "ADMIN" ? (
                  <Shield className="h-3.5 w-3.5 text-purple-600" />
                ) : user.role === "EMPLOYER" ? (
                  <Building2 className="h-3.5 w-3.5 text-blue-600" />
                ) : (
                  <User className="h-3.5 w-3.5 text-emerald-600" />
                )}
                <span>{user.name.split(" ")[0]}</span>
                <span className="px-1.5 py-0.5 bg-white text-slate-600 rounded text-[10px] font-extrabold uppercase tracking-wider border border-slate-200">
                  {user.role}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-xl transition flex items-center gap-1.5 border border-transparent hover:border-rose-200"
                title="Sign Out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/auth/login"
                className="text-sm font-bold text-slate-700 hover:text-emerald-700 px-3.5 py-2 rounded-xl transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-emerald-700" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/opportunities"
            className={`flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition ${
              isActive("/opportunities")
                ? "bg-emerald-50 text-emerald-800 font-bold"
                : "text-slate-700 hover:bg-slate-50"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Compass className="h-4 w-4 text-emerald-600" />
            <span>Explore Opportunities</span>
          </Link>
          <Link
            href="/employers"
            className={`flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition ${
              isActive("/employers")
                ? "bg-emerald-50 text-emerald-800 font-bold"
                : "text-slate-700 hover:bg-slate-50"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Building2 className="h-4 w-4 text-slate-400" />
            <span>For Employers</span>
          </Link>
          <Link
            href="/about"
            className={`flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition ${
              isActive("/about")
                ? "bg-emerald-50 text-emerald-800 font-bold"
                : "text-slate-700 hover:bg-slate-50"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>About CareerBridge Ghana</span>
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href={getDashboardLink()}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-50 text-emerald-800 font-bold text-sm rounded-xl border border-emerald-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4 text-emerald-600" />
                  <span>Go to Dashboard ({user.name.split(" ")[0]})</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-rose-600 font-bold text-sm text-center flex items-center justify-center gap-1.5 hover:bg-rose-50 rounded-xl transition"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/auth/login"
                  className="text-center py-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="text-center py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-xs hover:bg-emerald-700 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
