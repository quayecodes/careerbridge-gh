"use client";

import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { Loader2, Briefcase, Filter } from "lucide-react";

interface JobItem {
  id: string;
  title: string;
  slug: string;
  opportunityType: string;
  workplaceType: string;
  locationRegion: string;
  industry: string;
  stipendMin: number | null;
  stipendMax: number | null;
  currency: string;
  applicationDeadline: string;
  isFeatured: boolean;
  employer: {
    companyName: string;
    companyLogoUrl: string | null;
    verificationStatus: string;
  };
}

export default function OpportunitiesPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedRegion, setSelectedRegion] = useState("ALL");
  const [selectedWorkplace, setSelectedWorkplace] = useState("ALL");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.set("query", searchQuery.trim());
      if (selectedType !== "ALL") params.set("type", selectedType);
      if (selectedRegion !== "ALL") params.set("region", selectedRegion);
      if (selectedWorkplace !== "ALL") params.set("workplace", selectedWorkplace);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setJobs(json.data || []);
        setTotal(json.meta?.total || 0);
      }
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedType, selectedRegion, selectedWorkplace]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchJobs]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedType("ALL");
    setSelectedRegion("ALL");
    setSelectedWorkplace("ALL");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Header Banner */}
      <div className="bg-white border-b py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore Opportunities in Ghana
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Verified internships, NSS postings, graduate trainee schemes, and scholarships.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-xl transition"
            >
              <Filter className="h-4 w-4" />
              <span>{mobileFilterOpen ? "Hide Filters" : "Filter Opportunities"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filters */}
          <aside
            className={`lg:col-span-1 ${
              mobileFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="sticky top-24">
              <JobFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                selectedRegion={selectedRegion}
                onRegionChange={setSelectedRegion}
                selectedWorkplace={selectedWorkplace}
                onWorkplaceChange={setSelectedWorkplace}
                onReset={handleReset}
              />
            </div>
          </aside>

          {/* Right Opportunity Grid */}
          <section className="lg:col-span-3">
            {/* Counter bar */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-600">
                Showing <strong className="text-slate-900">{jobs.length}</strong> of{" "}
                <strong className="text-slate-900">{total}</strong> verified listings
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200">
                <Loader2 className="h-8 w-8 text-brand-600 animate-spin mb-3" />
                <p className="text-sm font-medium text-slate-600">
                  Loading verified opportunities...
                </p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 text-center p-6">
                <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                  <Briefcase className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  No opportunities match your search
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
                  Try adjusting your filters, selecting all regions, or clearing your search keywords.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs rounded-xl shadow-sm transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
