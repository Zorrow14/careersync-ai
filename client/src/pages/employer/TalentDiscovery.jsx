import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  GraduationCap,
  Briefcase,
  Star,
} from "lucide-react";
import { talentPool } from "../../data/employerData.js";
import DropdownSelect from "../../components/ui/DropdownSelect.jsx";

export default function TalentDiscovery() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("fitScore");
  const [minScore, setMinScore] = useState(0);
  const roleOptions = [
    { value: "All", label: "All roles", description: "Show every candidate" },
    { value: "Frontend Developer", label: "Frontend Developer", description: "React and UI focused" },
    { value: "Full Stack Developer", label: "Full Stack Developer", description: "Frontend + backend" },
    { value: "Data Analyst", label: "Data Analyst", description: "Analytics and reporting" },
  ];
  const sortOptions = [
    { value: "fitScore", label: "Fit score", description: "Highest match first" },
    { value: "name", label: "Name", description: "Alphabetical order" },
  ];

  const filtered = talentPool
    .filter((c) => {
      if (roleFilter !== "All" && c.targetRole !== roleFilter) return false;
      if (c.fitScore < minScore) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.skills.some((s) => s.toLowerCase().includes(q)) ||
          c.university.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "fitScore") return b.fitScore - a.fitScore;
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Talent Discovery</p>
        <h1 className="neo-title text-4xl font-bold">Find Candidates</h1>
        <p className="neo-text mt-2">
          Search, filter, and discover top talent with AI match scores.
        </p>
      </div>

      {/* ─── Search & Filters ─── */}
      <div className="neo-card mb-6 rounded-2xl p-6">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1">
            <Search size={16} className="neo-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, skill, or university..."
              className="neo-input w-full rounded-xl py-3 pl-10 pr-4 text-sm"
            />
          </div>
          <DropdownSelect
            label="Role"
            value={roleFilter}
            options={roleOptions}
            onChange={setRoleFilter}
            helperText="Narrow results by target role"
            className="min-w-[240px] flex-1"
          />
          <DropdownSelect
            label="Sort by"
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            helperText="Reorder candidate cards"
            className="min-w-[220px] flex-1"
          />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <SlidersHorizontal size={14} className="neo-muted" />
          <span className="neo-muted text-xs font-medium">Min. Fit Score:</span>
          {[0, 50, 60, 70, 80].map((v) => (
            <button
              key={v}
              onClick={() => setMinScore(v)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                minScore === v ? "bg-amber-500/15 text-amber-300" : "neo-secondary"
              }`}
            >
              {v === 0 ? "Any" : `${v}%+`}
            </button>
          ))}
          <span className="neo-muted ml-auto text-xs">{filtered.length} candidates</span>
        </div>
      </div>

      {/* ─── Talent Grid ─── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <div key={c.id} className="neo-card rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-slate-950">
                  {c.avatar}
                </span>
                <div>
                  <p className="neo-title font-semibold">{c.name}</p>
                  <p className="neo-muted text-xs">{c.targetRole}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-amber-300">{c.fitScore}%</p>
                <p className="neo-muted text-xs">AI Match</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <GraduationCap size={13} className="neo-muted shrink-0" />
                <span className="neo-text">{c.degree} · {c.university}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={13} className="neo-muted shrink-0" />
                <span className="neo-text">{c.experience}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {c.skills.slice(0, 5).map((s) => (
                <span key={s} className="neo-badge-match rounded-full px-2.5 py-0.5 text-xs font-medium">{s}</span>
              ))}
              {c.skills.length > 5 && (
                <span className="neo-muted self-center text-xs">+{c.skills.length - 5}</span>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button className="neo-primary flex-1 rounded-xl py-2 text-xs font-semibold">View Profile</button>
              <button className="neo-secondary flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold">
                <Star size={13} /> Shortlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="neo-card flex flex-col items-center justify-center rounded-2xl p-16 text-center">
          <Search size={36} className="neo-muted" />
          <p className="neo-muted mt-4 text-sm">No candidates match your filters. Try broadening your search.</p>
        </div>
      )}
    </div>
  );
}
