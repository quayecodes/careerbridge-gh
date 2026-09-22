import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("careerbridge_token")?.value;

  const isStudentRoute =
    pathname.startsWith("/student") || pathname.startsWith("/applications");
  const isEmployerRoute = pathname.startsWith("/employer");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute =
    pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");

  // Protect student, employer, and admin routes
  if ((isStudentRoute || isEmployerRoute || isAdminRoute) && !token) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect logged-in users visiting auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/opportunities", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/employer/:path*",
    "/admin/:path*",
    "/applications/:path*",
    "/auth/:path*",
  ],
};

export default proxy;
