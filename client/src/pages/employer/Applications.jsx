import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Briefcase } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader.jsx";
import ProfileAvatar from "../../components/ui/ProfileAvatar.jsx";
import DropdownSelect from "../../components/ui/DropdownSelect.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { usePagination } from "../../hooks/usePagination.js";
import { useDemoWorkflow } from "../../context/DemoWorkflowContext.jsx";
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
  const { employerApplications: applications, employerStats: stats } = useDemoWorkflow();

  const roles = [...new Set(applications.map((application) => application.role))].sort();

  const filtered = (() => {
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
  })();

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

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Dropdown on the left for compact inline layout, search expands to fill remaining space */}
        <div className="w-full sm:w-64">
          <DropdownSelect
            label={<span className="sr-only">Applied role</span>}
            value={roleFilter}
            onChange={setRoleFilter}
            options={[
              { value: "all", label: "All roles", description: `${stats.total} applications` },
              ...roles.map((role) => ({
                value: role,
                label: role,
                description: `${applications.filter((application) => application.role === role).length} applicants`,
              })),
            ]}
            className="mt-0"
            helperText={null}
          />
        </div>

        <div className="relative min-w-0 flex-1">
          <label htmlFor="employer-app-search" className="sr-only">
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
          {/* Table view for medium+ screens: denser, more columns */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left neo-muted text-xs">
                  <th className="py-3 pl-4">Candidate</th>
                  <th className="py-3">Role</th>
                  <th className="py-3">University</th>
                  <th className="py-3 text-center">Applied</th>
                  <th className="py-3 text-center">Fit</th>
                  <th className="py-3 text-center">Stage</th>
                  <th className="py-3 text-center">Status</th>
                  <th className="py-3 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {paged.map((app) => (
                  <tr key={app.id} className="align-top">
                    <td className="py-4 pl-4 pr-6">
                      <div className="flex items-center gap-3">
                        <ProfileAvatar photoUrl={app.photoUrl} initials={app.avatar} size="sm" alt={app.candidateName} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="neo-title block truncate font-semibold">{app.candidateName}</span>
                            {app.origin === "candidate" && (
                              <span className="neo-soft rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">Applied</span>
                            )}
                          </div>
                          <div className="neo-muted text-xs truncate">{app.degree} · {app.university}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 pr-6">
                      <div className="neo-text text-sm font-medium truncate">{app.role}</div>
                    </td>

                    <td className="py-4 pr-6 neo-muted text-sm truncate">{app.university}</td>

                    <td className="py-4 pr-6 text-center neo-muted text-sm">{app.appliedDate}</td>

                    <td className="py-4 pr-6 text-center">
                      <div className={`font-semibold ${fitScoreClass(app.matchScore)}`}>{app.matchScore}%</div>
                    </td>

                    <td className="py-4 pr-6 text-center">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stageColors[app.employerStage] || "neo-soft"}`}>{app.employerStage}</span>
                    </td>

                    <td className="py-4 pr-6 text-center">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${candidateStatusColors[app.candidateStatus] || "neo-soft"}`}>{app.candidateStatus}</span>
                    </td>

                    <td className="py-4 pr-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/employer/candidates/${app.candidateId}`}
                          state={{ from: "/employer/applications", role: app.role }}
                          className="neo-primary rounded-xl px-3 py-1 text-xs font-semibold"
                        >
                          View
                        </Link>
                        {app.pipelineId && (
                          <Link to="/employer/pipeline" className="neo-secondary rounded-xl px-3 py-1 text-xs font-semibold">Open</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Compact stacked cards for small screens */}
          <div className="md:hidden space-y-3">
            {paged.map((app) => (
              <article key={app.id} className="neo-card rounded-xl p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <ProfileAvatar photoUrl={app.photoUrl} initials={app.avatar} size="sm" alt={app.candidateName} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="neo-title text-sm font-semibold truncate">{app.candidateName}</h3>
                        <div className="neo-muted text-[11px] truncate">{app.degree} · {app.university}</div>
                      </div>
                      <div className="neo-text text-xs truncate">{app.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className={`text-sm font-semibold ${fitScoreClass(app.matchScore)}`}>{app.matchScore}%</div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${stageColors[app.employerStage] || "neo-soft"}`}>{app.employerStage}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="neo-muted text-xs">Applied {app.appliedDate} · {app.source}</div>
                  <div className="flex items-center gap-2">
                    <Link to={`/employer/candidates/${app.candidateId}`} state={{ from: "/employer/applications", role: app.role }} className="neo-primary rounded-xl px-3 py-1 text-xs font-semibold">View</Link>
                    {app.pipelineId && <Link to="/employer/pipeline" className="neo-secondary rounded-xl px-3 py-1 text-xs font-semibold">Open</Link>}
                  </div>
                </div>
              </article>
            ))}
          </div>
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
