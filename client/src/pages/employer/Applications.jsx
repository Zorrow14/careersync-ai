import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Calendar,
  FileText,
  Search,
  User,
  Briefcase,
  Sparkles,
  StickyNote,
  ExternalLink,
} from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import ProfileAvatar from "../../components/ui/ProfileAvatar.jsx";
import DropdownSelect from "../../components/ui/DropdownSelect.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { usePagination } from "../../hooks/usePagination.js";
import {
  getEmployerApplications,
  getEmployerApplicationStats,
  getEmployerApplicationRoles,
} from "../../data/employerApplications.js";
import { companyProfile, pipelineStages } from "../../data/employerData.js";

const stageColors = {
  Applied: "neo-soft",
  Screening: "neo-blue",
  Interview: "bg-purple-500/15 text-purple-300",
  Offer: "neo-good",
  Hired: "bg-emerald-500/15 text-emerald-300",
  Rejected: "neo-danger",
};

const candidateStatusColors = {
  Applied: "neo-soft",
  "Resume Reviewed": "neo-blue",
  Interview: "bg-purple-500/15 text-purple-300",
  Assessment: "bg-amber-500/15 text-amber-300",
  Offer: "neo-good",
  Rejected: "neo-danger",
};

function fitScoreClass(score) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-rose-300";
}

export default function EmployerApplications() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "all";
  const [roleFilter, setRoleFilter] = useState(initialRole);
  const [stageFilter, setStageFilter] = useState("all");
  const [query, setQuery] = useState("");

  const applications = useMemo(() => getEmployerApplications(), []);
  const stats = useMemo(() => getEmployerApplicationStats(), []);
  const roles = useMemo(() => getEmployerApplicationRoles(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return applications.filter((app) => {
      if (roleFilter !== "all" && app.role !== roleFilter) return false;
      if (stageFilter !== "all" && app.employerStage !== stageFilter) return false;
      if (q) {
        const haystack = `${app.candidateName} ${app.role} ${app.university} ${app.source}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [applications, roleFilter, stageFilter, query]);

  const { page, totalPages, paged, goToPage, showingFrom, showingTo, totalItems } =
    usePagination(filtered, 8);

  return (
    <div>
      <PageHeader
        eyebrow="Application Inbox"
        title="Candidate Applications"
        description={`Review applications submitted to ${companyProfile.name} roles — synced from candidate apply flows and your hiring pipeline.`}
        actions={
          <Link
            to="/employer/pipeline"
            className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            <Briefcase size={16} />
            Open Pipeline
          </Link>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <button
          type="button"
          onClick={() => setStageFilter("all")}
          className={`neo-card rounded-xl p-4 text-center transition ${
            stageFilter === "all" ? "ring-1 ring-amber-500/40" : "hover:bg-white/5"
          }`}
        >
          <p className="neo-title text-2xl font-bold">{stats.total}</p>
          <p className="neo-muted mt-1 text-xs">All</p>
        </button>
        {pipelineStages.map((stage) => (
          <button
            key={stage}
            type="button"
            onClick={() => setStageFilter(stageFilter === stage ? "all" : stage)}
            className={`neo-card rounded-xl p-4 text-center transition ${
              stageFilter === stage ? "ring-1 ring-amber-500/40" : "hover:bg-white/5"
            }`}
          >
            <p className="neo-title text-2xl font-bold">{stats.byStage[stage] || 0}</p>
            <p className="neo-muted mt-1 text-xs">{stage}</p>
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="employer-app-search" className="neo-text mb-1 block text-sm font-medium">
            Search candidates
          </label>
          <div className="relative">
            <Search
              size={16}
              className="neo-muted pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              id="employer-app-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, university, or source…"
              className="neo-input w-full rounded-xl py-3 pl-10 pr-4 text-sm"
            />
          </div>
        </div>
        <div className="w-full lg:w-64">
          <DropdownSelect
            label="Applied role"
            value={roleFilter}
            onChange={setRoleFilter}
            options={[
              { value: "all", label: "All roles", description: `${stats.total} applications` },
              ...roles.map((role) => ({
                value: role,
                label: role,
                description: `${stats.byRole[role] || 0} applicants`,
              })),
            ]}
            helperText="Filter by job posting"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="neo-muted text-sm">
          {stageFilter === "all" && roleFilter === "all"
            ? `${applications.length} applications`
            : `Showing ${filtered.length} of ${applications.length}`}
        </p>
        {(stageFilter !== "all" || roleFilter !== "all" || query) && (
          <button
            type="button"
            onClick={() => {
              setStageFilter("all");
              setRoleFilter("all");
              setQuery("");
            }}
            className="text-xs font-semibold text-amber-300 hover:text-amber-200"
          >
            Clear filters
          </button>
        )}
      </div>

      {paged.length === 0 ? (
        <EmptyState
          title="No applications match"
          description="Try adjusting your filters or check back when candidates apply to your open roles."
        />
      ) : (
        <div className="space-y-4">
          {paged.map((app) => (
            <article key={app.id} className="neo-card rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <ProfileAvatar
                    photoUrl={app.photoUrl}
                    initials={app.avatar}
                    size="md"
                    alt={app.candidateName}
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="neo-title text-lg font-bold">{app.candidateName}</h2>
                      {app.origin === "candidate" && (
                        <span className="neo-soft rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
                          Applied via CareerSync
                        </span>
                      )}
                    </div>
                    <p className="neo-muted text-sm">
                      {app.degree} · {app.university}
                    </p>
                    <p className="neo-text mt-2 text-sm font-medium">{app.role}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                      <span className="neo-muted flex items-center gap-1">
                        <Calendar size={12} aria-hidden="true" />
                        Applied {app.appliedDate}
                      </span>
                      <span className={`flex items-center gap-1 font-semibold ${fitScoreClass(app.matchScore)}`}>
                        <Sparkles size={12} aria-hidden="true" />
                        {app.matchScore}% fit
                      </span>
                      <span className="neo-muted flex items-center gap-1">
                        <FileText size={12} aria-hidden="true" />
                        Source: {app.source}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${stageColors[app.employerStage] || "neo-soft"}`}
                  >
                    {app.employerStage}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${candidateStatusColors[app.candidateStatus] || "neo-soft"}`}
                  >
                    {app.candidateStatus}
                  </span>
                </div>
              </div>

              {app.notes && (
                <div className="neo-soft mt-4 flex items-start gap-2 rounded-xl p-3 text-xs">
                  <StickyNote size={14} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" />
                  <span className="neo-text">{app.notes}</span>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                <Link
                  to={`/employer/candidates/${app.candidateId}`}
                  state={{ from: "/employer/applications", role: app.role }}
                  className="neo-primary flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
                >
                  <User size={14} aria-hidden="true" />
                  View Profile
                </Link>
                {app.pipelineId && (
                  <Link
                    to="/employer/pipeline"
                    className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    Open in Pipeline
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          className="mt-6"
          page={page}
          totalPages={totalPages}
          onPageChange={goToPage}
          showingFrom={showingFrom}
          showingTo={showingTo}
          totalItems={totalItems}
        />
      )}
    </div>
  );
}
