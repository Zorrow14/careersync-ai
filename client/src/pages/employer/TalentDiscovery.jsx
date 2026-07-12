import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  GraduationCap,
  Briefcase,
  Star,
  X,
  Sparkles,
  User,
} from "lucide-react";
import { talentPool, resolvePersonaId } from "../../data/employerData.js";
import DropdownSelect from "../../components/ui/DropdownSelect.jsx";
import FitReportPanel from "../../components/employer/FitReportPanel.jsx";
import ProfileAvatar from "../../components/ui/ProfileAvatar.jsx";

export default function TalentDiscovery() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [sortBy, setSortBy] = useState("fitScore");
  const [minScore, setMinScore] = useState(0);
  const [reportCandidate, setReportCandidate] = useState(null);
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

  useEffect(() => {
    if (!reportCandidate) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [reportCandidate]);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Talent Discovery</p>
        <h1 className="neo-title text-4xl font-bold">Find Candidates</h1>
        <p className="neo-text mt-2">
          Search, filter, and discover top talent with explainable AI fit reports.
        </p>
      </div>

      {/* ─── Search & Filters ─── */}
      <div className="neo-card mb-6 rounded-2xl p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="neo-dropdown min-w-0">
            <label htmlFor="talent-search" className="neo-label">
              Search
            </label>
            <div className="relative">
              <Search
                size={16}
                className="neo-muted pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="talent-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, skill, or university..."
                className="neo-input w-full rounded-xl py-[0.9rem] pl-10 pr-4 text-sm"
              />
            </div>
            <p className="neo-muted mt-2 text-xs leading-5">Search by name, skill, or university</p>
          </div>
          <DropdownSelect
            label="Role"
            value={roleFilter}
            options={roleOptions}
            onChange={setRoleFilter}
            helperText="Narrow results by target role"
          />
          <DropdownSelect
            label="Sort by"
            value={sortBy}
            options={sortOptions}
            onChange={setSortBy}
            helperText="Reorder candidate cards"
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
          <div key={c.id} className="neo-card flex flex-col rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ProfileAvatar
                  photoUrl={c.photoUrl}
                  initials={c.avatar}
                  size="sm"
                  alt={c.name}
                />
                <div>
                  <Link
                    to={`/employer/candidates/${c.id}`}
                    className="neo-title font-semibold transition hover:text-amber-300"
                  >
                    {c.name}
                  </Link>
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

            <div className="neo-talent-card-actions">
              <button
                type="button"
                onClick={() =>
                  setReportCandidate({
                    name: c.name,
                    fitScore: c.fitScore,
                    role: c.targetRole,
                    personaId: resolvePersonaId(c.name),
                  })
                }
                className="neo-talent-card-actions__btn neo-primary cursor-pointer"
              >
                <Sparkles size={14} className="shrink-0" />
                Fit Report
              </button>
              <div className="neo-talent-card-actions__row">
                <Link
                  to={`/employer/candidates/${c.id}`}
                  className="neo-talent-card-actions__btn neo-secondary cursor-pointer"
                >
                  <User size={14} className="shrink-0" />
                  View Profile
                </Link>
                <button
                  type="button"
                  className="neo-talent-card-actions__btn neo-secondary cursor-pointer"
                >
                  <Star size={14} className="shrink-0" />
                  Shortlist
                </button>
              </div>
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

      {reportCandidate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fit-report-title"
          onClick={() => setReportCandidate(null)}
        >
          <div
            className="neo-card flex max-h-[min(90vh,calc(100dvh-2rem))] w-full max-w-lg flex-col overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-6 pb-4">
              <div>
                <p className="text-sm font-semibold text-amber-300">Explainable Fit Report</p>
                <h2 id="fit-report-title" className="neo-title text-xl font-bold">
                  {reportCandidate.name}
                </h2>
                <p className="neo-muted text-sm">{reportCandidate.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setReportCandidate(null)}
                className="neo-muted cursor-pointer rounded-lg p-2 hover:bg-white/5 hover:text-amber-300"
                aria-label="Close fit report"
              >
                <X size={20} />
              </button>
            </div>
            <div className="neo-scroll-hidden min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              <FitReportPanel compact candidate={reportCandidate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
