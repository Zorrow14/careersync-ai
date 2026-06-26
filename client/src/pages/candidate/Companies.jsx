import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Users,
  Star,
  Building2,
  BadgeCheck,
  SearchX,
  Sparkles,
} from "lucide-react";
import { companies, industries, getCompanyJobs } from "../../data/companiesData.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { usePagination } from "../../hooks/usePagination.js";
import Pagination from "../../components/ui/Pagination.jsx";

export default function Companies() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");
  const [hiringOnly, setHiringOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies.filter((c) => {
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.techStack.some((t) => t.toLowerCase().includes(q));
      const matchesIndustry = industry === "All" || c.industry === industry;
      const matchesHiring = !hiringOnly || c.hiring;
      return matchesQuery && matchesIndustry && matchesHiring;
    });
  }, [query, industry, hiringOnly]);

  const featured = companies.filter((c) => c.featured).slice(0, 3);

  const { page, totalPages, paged, goToPage, showingFrom, showingTo, totalItems } =
    usePagination(filtered, 9);

  useEffect(() => {
    goToPage(1);
  }, [query, industry, hiringOnly]);

  return (
    <div>
      <PageHeader
        eyebrow="Explore"
        title="Company Directory"
        description="Discover employers hiring through CareerSync AI — explore culture, tech stacks, and open roles."
      />

      {/* ─── Search (the primary CTA for a directory) ─── */}
      <div className="neo-card mb-6 rounded-2xl p-5">
        <div className="relative">
          <Search size={18} className="neo-muted pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies, industries, tech, or location…"
            aria-label="Search companies"
            className="neo-input w-full rounded-xl py-3 pl-11 pr-4 text-sm"
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setIndustry(ind)}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                industry === ind
                  ? "bg-amber-500 text-slate-950"
                  : "neo-secondary hover:bg-amber-500/10 hover:text-amber-300"
              }`}
            >
              {ind}
            </button>
          ))}
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-xs font-medium">
            <input
              type="checkbox"
              checked={hiringOnly}
              onChange={(e) => setHiringOnly(e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-amber-500"
            />
            <span className="neo-text">Hiring now</span>
          </label>
        </div>
      </div>

      {/* ─── Featured companies ─── */}
      {industry === "All" && !query && !hiringOnly && (
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Featured Employers</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featured.map((c) => (
              <Link
                key={c.id}
                to={`/companies/${c.id}`}
                className="neo-card group rounded-2xl border border-amber-500/20 p-5 transition hover:-translate-y-1 hover:bg-white/5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-sm font-bold text-amber-300">
                    {c.logo}
                  </span>
                  <div>
                    <p className="neo-title font-bold">{c.name}</p>
                    <p className="neo-muted text-xs">{c.industry}</p>
                  </div>
                </div>
                <p className="neo-text text-sm leading-6">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ─── Results count ─── */}
      <div className="mb-4 flex items-center justify-between">
        <p className="neo-muted text-sm">
          {filtered.length} {filtered.length === 1 ? "company" : "companies"}
          {industry !== "All" && <> in {industry}</>}
        </p>
      </div>

      {/* ─── Company grid ─── */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No companies found"
          description="Try a different search or clear your filters."
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setIndustry("All");
                setHiringOnly(false);
              }}
              className="neo-primary rounded-xl px-5 py-2.5 text-sm font-semibold"
            >
              Clear filters
            </button>
          }
        />
      ) : (
        <>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paged.map((c) => {
            const openRoles = getCompanyJobs(c.name).length;
            return (
              <Link
                key={c.id}
                to={`/companies/${c.id}`}
                className="neo-card group relative flex flex-col overflow-hidden rounded-2xl p-5 transition hover:-translate-y-1 hover:bg-white/5"
              >
                {c.featured && (
                  <span className="absolute right-0 top-0 rounded-bl-xl bg-amber-500/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-300">
                    Featured
                  </span>
                )}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/15 text-sm font-bold text-amber-300">
                      {c.logo}
                    </span>
                    <div>
                      <p className="neo-title font-bold leading-tight">{c.name}</p>
                      <p className="neo-muted text-xs">{c.industry}</p>
                    </div>
                  </div>
                  {c.hiring && (
                    <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                      <BadgeCheck size={12} /> Hiring
                    </span>
                  )}
                </div>

                <p className="neo-text mb-4 text-sm leading-6">{c.tagline}</p>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {c.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="neo-soft rounded-full px-2.5 py-0.5 text-xs neo-muted">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <span className="neo-muted flex items-center gap-1"><MapPin size={12} /> {c.location}</span>
                  <span className="neo-muted flex items-center gap-1"><Users size={12} /> {c.size}</span>
                  <span className="neo-muted flex items-center gap-1"><Star size={12} className="text-amber-300" /> {c.rating}</span>
                  <span className="ml-auto flex items-center gap-1 font-semibold text-amber-300">
                    <Building2 size={12} /> {openRoles} {openRoles === 1 ? "role" : "roles"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="neo-card mt-6 rounded-2xl p-4">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={goToPage}
            showingFrom={showingFrom}
            showingTo={showingTo}
            totalItems={totalItems}
          />
        </div>
        </>
      )}
    </div>
  );
}
