import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, FileText, StickyNote, Search } from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { applications, applicationStages } from "../../data/applicationsData.js";
import { usePagination } from "../../hooks/usePagination.js";
import Pagination from "../../components/ui/Pagination.jsx";

const statusColors = {
  Applied: "neo-soft",
  "Resume Reviewed": "neo-blue",
  Interview: "bg-purple-500/15 text-purple-300",
  Assessment: "bg-amber-500/15 text-amber-300",
  Offer: "neo-good",
  Rejected: "neo-danger",
};

export default function Applications() {
  const { personaId } = usePersona();
  const apps = applications[personaId] || [];
  const [filter, setFilter] = useState("All");

  const counts = applicationStages.reduce((acc, s) => {
    acc[s] = apps.filter((a) => a.status === s).length;
    return acc;
  }, {});

  const filtered = filter === "All" ? apps : apps.filter((a) => a.status === filter);

  const { page, totalPages, paged, goToPage, showingFrom, showingTo, totalItems } =
    usePagination(filtered, 6);

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Application Tracker</p>
        <h1 className="neo-title text-3xl font-bold sm:text-4xl">My Applications</h1>
        <p className="neo-text mt-2">Track every application from submission to offer.</p>
      </div>

      {/* stage summary */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {applicationStages.map((stage) => (
          <button
            key={stage}
            onClick={() => setFilter(filter === stage ? "All" : stage)}
            className={`neo-card rounded-xl p-4 text-center transition ${
              filter === stage ? "ring-1 ring-amber-500/40" : "hover:bg-white/5"
            }`}
          >
            <p className="neo-title text-2xl font-bold">{counts[stage] || 0}</p>
            <p className="neo-muted mt-1 text-xs">{stage}</p>
          </button>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <p className="neo-muted text-sm">
          {filter === "All" ? `${apps.length} total applications` : `Filtered by: ${filter}`}
        </p>
        {filter !== "All" && (
          <button onClick={() => setFilter("All")} className="text-xs font-semibold text-amber-300 hover:text-amber-200">
            Clear filter
          </button>
        )}
      </div>

      {/* application list */}
      <div className="space-y-4">
        {paged.map((app) => (
          <div key={app.id} className="neo-card rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-sm font-bold text-amber-300">
                  {app.logo}
                </div>
                <div>
                  <Link to={`/jobs/${app.jobId}`} className="neo-title text-lg font-bold hover:text-amber-300">
                    {app.role}
                  </Link>
                  <p className="neo-muted text-sm">{app.company}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span className="neo-muted flex items-center gap-1"><Calendar size={12} /> Applied {app.appliedDate}</span>
                    <span className="neo-muted flex items-center gap-1"><FileText size={12} /> {app.matchScore}% match</span>
                  </div>
                </div>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusColors[app.status]}`}>
                {app.status}
              </span>
            </div>

            {/* progress track */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                {applicationStages.filter((s) => s !== "Rejected").map((stage, i) => {
                  const currentIdx = applicationStages.indexOf(app.status);
                  const stageIdx = applicationStages.indexOf(stage);
                  const isRejected = app.status === "Rejected";
                  const done = !isRejected && stageIdx <= currentIdx;
                  return (
                    <div key={stage} className="flex flex-1 items-center">
                      <div className={`flex h-3 w-3 shrink-0 rounded-full ${done ? "bg-amber-400" : "bg-slate-600/40"}`} />
                      {i < applicationStages.filter((s) => s !== "Rejected").length - 1 && (
                        <div className={`h-0.5 flex-1 ${done ? "bg-amber-400/50" : "bg-slate-600/30"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {app.notes && (
              <div className="neo-soft mt-4 flex items-start gap-2 rounded-xl p-3 text-xs">
                <StickyNote size={14} className="mt-0.5 shrink-0 text-amber-300" />
                <span className="neo-text">{app.notes}</span>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="neo-card flex flex-col items-center justify-center rounded-2xl p-16 text-center">
            <Search size={36} className="neo-muted" />
            <p className="neo-muted mt-4 text-sm">No applications in this stage.</p>
            <Link to="/jobs" className="neo-primary mt-4 rounded-xl px-5 py-2.5 text-sm font-semibold">
              Browse Jobs
            </Link>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="neo-card rounded-2xl p-4">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
              showingFrom={showingFrom}
              showingTo={showingTo}
              totalItems={totalItems}
            />
          </div>
        )}
      </div>
    </div>
  );
}
