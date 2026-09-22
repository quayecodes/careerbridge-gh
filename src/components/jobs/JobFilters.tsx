"use client";

import { Search, RotateCcw } from "lucide-react";

const GHANA_REGIONS = [
  "ALL",
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
  "Western North",
];

const OPPORTUNITY_TYPES = [
  { value: "ALL", label: "All Opportunities" },
  { value: "INTERNSHIP", label: "Internships" },
  { value: "NSS_PLACEMENT", label: "NSS Placements" },
  { value: "GRADUATE_TRAINEE", label: "Graduate Trainees" },
  { value: "ENTRY_LEVEL", label: "Entry Level" },
  { value: "SCHOLARSHIP", label: "Scholarships" },
];

const WORKPLACE_TYPES = [
  { value: "ALL", label: "Any Workplace" },
  { value: "ON_SITE", label: "On-Site" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "REMOTE", label: "Remote" },
];

interface JobFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedType: string;
  onTypeChange: (val: string) => void;
  selectedRegion: string;
  onRegionChange: (val: string) => void;
  selectedWorkplace: string;
  onWorkplaceChange: (val: string) => void;
  onReset: () => void;
}

export function JobFilters({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedRegion,
  onRegionChange,
  selectedWorkplace,
  onWorkplaceChange,
  onReset,
}: JobFiltersProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-5">
      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Search Keywords
        </label>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Role, skills, company (e.g. React, Hubtel)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
        </div>
      </div>

      {/* Opportunity Type Pills */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Opportunity Type
        </label>
        <div className="flex flex-wrap gap-1.5">
          {OPPORTUNITY_TYPES.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => onTypeChange(type.value)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                selectedType === type.value
                  ? "bg-brand-600 text-white font-semibold shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Region Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Region in Ghana
        </label>
        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
        >
          {GHANA_REGIONS.map((region) => (
            <option key={region} value={region}>
              {region === "ALL" ? "All Regions Across Ghana" : region}
            </option>
          ))}
        </select>
      </div>

      {/* Workplace Type */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Workplace Model
        </label>
        <div className="grid grid-cols-2 gap-2">
          {WORKPLACE_TYPES.map((wp) => (
            <button
              key={wp.value}
              type="button"
              onClick={() => onWorkplaceChange(wp.value)}
              className={`text-xs py-1.5 px-2.5 rounded-lg border text-center font-medium transition ${
                selectedWorkplace === wp.value
                  ? "border-brand-600 bg-brand-50 text-brand-700 font-semibold"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {wp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        onClick={onReset}
        className="w-full text-xs text-slate-600 hover:text-slate-900 font-semibold py-2 border border-dashed border-slate-300 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-1.5 transition"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );
}
