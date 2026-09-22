import { getCurrentUser } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  if (user.role === "EMPLOYER") {
    redirect("/employer/dashboard");
  }

  // Student default
  redirect("/student/dashboard");
}
