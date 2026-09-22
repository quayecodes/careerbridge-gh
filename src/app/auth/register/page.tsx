"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { StudentRegisterForm } from "@/components/auth/StudentRegisterForm";
import { EmployerRegisterForm } from "@/components/auth/EmployerRegisterForm";
import { GraduationCap, Building2 } from "lucide-react";
import Link from "next/link";

function RegisterContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") === "EMPLOYER" ? "EMPLOYER" : "STUDENT";
  const [activeTab, setActiveTab] = useState<"STUDENT" | "EMPLOYER">(initialRole);

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-xl w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Join CareerBridge Ghana
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Create an account to start discovering or posting verified career opportunities.
        </p>
      </div>

      {/* Role Switcher Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("STUDENT")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition ${
            activeTab === "STUDENT"
              ? "bg-white text-brand-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Student / Graduate</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("EMPLOYER")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition ${
            activeTab === "EMPLOYER"
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Building2 className="h-4 w-4" />
          <span>Employer / Recruiter</span>
        </button>
      </div>

      {/* Dynamic Form Render */}
      {activeTab === "STUDENT" ? <StudentRegisterForm /> : <EmployerRegisterForm />}

      <div className="mt-6 text-center text-xs text-slate-600 border-t pt-4">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-brand-600 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <Suspense fallback={<div className="p-8 bg-white rounded-xl shadow">Loading registration...</div>}>
          <RegisterContent />
        </Suspense>
      </main>
    </div>
  );
}
