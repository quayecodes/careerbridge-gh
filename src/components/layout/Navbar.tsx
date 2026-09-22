"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { GraduationCap, LogOut, User, Building2, Shield, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

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

  return (
    <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-brand-600 text-white p-2 rounded-lg font-bold text-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              CareerBridge<span className="text-brand-600">.gh</span>
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">
              Ghana Career Hub
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/opportunities" className="hover:text-brand-600 transition">
            Explore Opportunities
          </Link>
          <Link href="/employers" className="hover:text-brand-600 transition">
            For Employers
          </Link>
          <Link href="/about" className="hover:text-brand-600 transition">
            About
          </Link>
        </nav>

        {/* User Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-md"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link
                href={getDashboardLink()}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition"
              >
                {user.role === "ADMIN" ? (
                  <Shield className="h-4 w-4 text-purple-600" />
                ) : user.role === "EMPLOYER" ? (
                  <Building2 className="h-4 w-4 text-blue-600" />
                ) : (
                  <User className="h-4 w-4 text-brand-600" />
                )}
                <span>{user.name.split(" ")[0]} ({user.role})</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-md transition flex items-center gap-1"
                title="Sign Out"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/auth/login"
                className="text-sm font-semibold text-slate-700 hover:text-brand-600 px-3 py-2 rounded-md transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/opportunities"
            className="block py-2 text-sm font-medium text-slate-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore Opportunities
          </Link>
          <Link
            href="/employers"
            className="block py-2 text-sm font-medium text-slate-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            For Employers
          </Link>
          <div className="pt-4 border-t flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  href={getDashboardLink()}
                  className="w-full text-center py-2 bg-slate-100 font-semibold text-sm rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard ({user.name})
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-rose-600 text-sm font-semibold text-center"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="w-full text-center py-2 border rounded-lg text-sm font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="w-full text-center py-2 bg-brand-600 text-white rounded-lg text-sm font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
