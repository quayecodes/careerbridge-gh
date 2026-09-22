import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { Navbar } from "@/components/layout/Navbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <Suspense fallback={<div className="p-8 bg-white rounded-xl shadow">Loading login...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </div>
  );
}
