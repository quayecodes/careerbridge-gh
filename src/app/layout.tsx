import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerBridge Ghana | Student Internship & Career Platform",
  description:
    "Connecting university students and graduates in Ghana with verified internships, NSS placements, graduate trainee programs, and scholarships.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
