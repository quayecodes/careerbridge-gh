"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, PlusCircle, CheckCircle2 } from "lucide-react";

const GHANA_REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West",
  "Bono",
  "Bono East",
  "Ahafo",
  "Oti",
  "Savannah",
  "North East",
  "Western North",
];

const OPPORTUNITY_TYPES = [
  { value: "INTERNSHIP", label: "Vacation / Summer Internship" },
  { value: "NSS_PLACEMENT", label: "National Service (NSS) Placement" },
  { value: "GRADUATE_TRAINEE", label: "Graduate Trainee Program" },
  { value: "ENTRY_LEVEL", label: "Entry-Level Job" },
  { value: "SCHOLARSHIP", label: "Scholarship & Fellowship" },
];

const INDUSTRIES = [
  "Information Technology & Software",
  "FinTech & Banking",
  "Telecommunications",
  "Oil, Gas & Energy",
  "Consulting & Professional Services",
  "Health & Pharmaceuticals",
  "Agriculture & AgriTech",
  "Media & Creative Arts",
  "Education & EdTech",
  "Manufacturing & FMCG",
];

export function JobPostForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    opportunityType: "INTERNSHIP",
    workplaceType: "HYBRID",
    locationRegion: "Greater Accra",
    industry: INDUSTRIES[0],
    stipendMin: "",
    stipendMax: "",
    currency: "GHS",
    applicationDeadline: "",
    description: "",
    responsibilities: "",
    requirements: "",
    isFeatured: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        ...formData,
        stipendMin: formData.stipendMin ? parseFloat(formData.stipendMin) : undefined,
        stipendMax: formData.stipendMax ? parseFloat(formData.stipendMax) : undefined,
      };

      const res = await fetch("/api/employer/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message || "Failed to publish opportunity.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/employer/dashboard");
        router.refresh();
      }, 1500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-xl flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Opportunity published successfully! Redirecting to dashboard...</span>
        </div>
      )}

      {/* Role Title */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Opportunity Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. Full-Stack Engineering Summer Intern (2025)"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Type & Workplace */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Opportunity Category *
          </label>
          <select
            value={formData.opportunityType}
            onChange={(e) => setFormData({ ...formData, opportunityType: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {OPPORTUNITY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Workplace Model *
          </label>
          <select
            value={formData.workplaceType}
            onChange={(e) => setFormData({ ...formData, workplaceType: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="ON_SITE">On-Site</option>
            <option value="HYBRID">Hybrid (Flexible)</option>
            <option value="REMOTE">Fully Remote</option>
          </select>
        </div>
      </div>

      {/* Region & Industry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Region in Ghana *
          </label>
          <select
            value={formData.locationRegion}
            onChange={(e) => setFormData({ ...formData, locationRegion: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {GHANA_REGIONS.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Industry *
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Compensation / Stipend & Deadline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Min Monthly Stipend (GHS)
          </label>
          <input
            type="number"
            min={0}
            value={formData.stipendMin}
            onChange={(e) => setFormData({ ...formData, stipendMin: e.target.value })}
            placeholder="e.g. 1500"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Max Monthly Stipend (GHS)
          </label>
          <input
            type="number"
            min={0}
            value={formData.stipendMax}
            onChange={(e) => setFormData({ ...formData, stipendMax: e.target.value })}
            placeholder="e.g. 2500"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Application Deadline *
          </label>
          <input
            type="date"
            required
            value={formData.applicationDeadline}
            onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Role Overview & Mission *
        </label>
        <textarea
          required
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the opportunity, team culture, and learning expectations..."
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Responsibilities */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Key Responsibilities *
        </label>
        <textarea
          required
          rows={3}
          value={formData.responsibilities}
          onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
          placeholder="• Assist the software engineering team in writing unit tests&#10;• Build responsive UI interfaces with Next.js&#10;• Participate in weekly code reviews"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Candidate Requirements & Eligibility *
        </label>
        <textarea
          required
          rows={3}
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          placeholder="• Current Level 200 - 400 student in Computer Science or Engineering&#10;• Good understanding of JavaScript/TypeScript&#10;• Passion for software development in Ghana"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <PlusCircle className="h-5 w-5" />
            <span>Publish Opportunity Listing</span>
          </>
        )}
      </button>
    </form>
  );
}
