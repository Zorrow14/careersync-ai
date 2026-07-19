import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Bookmark,
  BookmarkCheck,
  SlidersHorizontal,
  CheckCircle2,
  X,
} from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { useDemoWorkflow } from "../../context/DemoWorkflowContext.jsx";
import { jobs, getJobMatch } from "../../data/jobsData.js";
import { companies, getCompanyByName } from "../../data/companiesData.js";
import { usePagination } from "../../hooks/usePagination.js";
import Pagination from "../../components/ui/Pagination.jsx";
import ProfileAvatar from "../../components/ui/ProfileAvatar.jsx";

const workModes = ["All", "Remote", "Hybrid", "On-site"];
const types = ["All", "Internship", "Full-time", "Contract", "Part-time"];

function matchColor(score) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-rose-300";
}

export default function JobSearch() {
  const { personaId } = usePersona();
  const { candidateApplications, savedJobs, applyToJob, toggleSavedJob } = useDemoWorkflow();
  const [search, setSearch] = useState("");
  const [workMode, setWorkMode] = useState("All");
  const [type, setType] = useState("All");
  const [minMatch, setMinMatch] = useState(0);
  const [showFilters, setShowFilters] = useState(true);
  const [applyJob, setApplyJob] = useState(null);
  const saved = useMemo(() => new Set(savedJobs[personaId] || []), [personaId, savedJobs]);
  const applied = useMemo(
    () => new Set((candidateApplications[personaId] || []).map((application) => application.jobId)),
    [candidateApplications, personaId]
  );

  function toggleSave(id) {
    toggleSavedJob(personaId, id);
  }

  function submitApply(coverLetter) {
    applyToJob({
      personaId,
      job: applyJob,
      match: getJobMatch(applyJob, personaId),
      coverLetter,
    });
    setApplyJob(null);
  }

  const filtered = jobs
    .map((job) => ({ job, match: getJobMatch(job, personaId) }))
    .filter(({ job, match }) => {
      if (workMode !== "All" && job.workMode !== workMode) return false;
      if (type !== "All" && job.type !== type) return false;
      if (match.score < minMatch) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.skills.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    })
    .sort((a, b) => b.match.score - a.match.score);

  const { page, totalPages, paged, goToPage, showingFrom, showingTo, totalItems } =
    usePagination(filtered, 8);

  useEffect(() => {
    goToPage(1);
  }, [search, workMode, type, minMatch, personaId, goToPage]);

  const featuredEmployer = companies.find((c) => c.featured) || companies[0];

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Job Search</p>
        <h1 className="neo-title text-3xl font-bold sm:text-4xl">Find Your Next Role</h1>
        <p className="neo-text mt-2">
          AI-matched opportunities ranked by how well they fit your profile.
        </p>
      </div>

      {/* sticky search */}
      <div className="neo-card sticky top-4 z-10 mb-6 rounded-2xl p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="neo-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, company, or skill..."
              className="neo-input w-full rounded-xl py-3 pl-10 pr-4 text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-700/30 pt-4">
            <FilterGroup label="Work Mode" options={workModes} value={workMode} onChange={setWorkMode} />
            <FilterGroup label="Type" options={types} value={type} onChange={setType} />
            <div className="flex items-center gap-2">
              <span className="neo-muted text-xs font-medium">Min Match:</span>
              {[0, 60, 70, 80].map((v) => (
                <button
                  key={v}
                  onClick={() => setMinMatch(v)}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    minMatch === v ? "bg-amber-500/15 text-amber-300" : "neo-secondary"
                  }`}
                >
                  {v === 0 ? "Any" : `${v}%+`}
                </button>
              ))}
            </div>
            <span className="neo-muted ml-auto text-xs">{filtered.length} jobs found</span>
          </div>
        )}
      </div>

      {/* featured employer (sponsored placeholder) */}
      {featuredEmployer && (
        <div className="neo-card mb-6 rounded-2xl border border-amber-500/20 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <ProfileAvatar
                photoUrl={featuredEmployer.profileImageUrl}
                initials={featuredEmployer.logo}
                size="md"
                alt={`${featuredEmployer.name} logo`}
                className="rounded-xl"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                  Sponsored · Featured Employer
                </p>
                <h2 className="neo-title text-lg font-bold">{featuredEmployer.name}</h2>
                <p className="neo-muted text-sm">{featuredEmployer.tagline}</p>
              </div>
            </div>
            <Link
              to={`/companies/${featuredEmployer.id}`}
              className="neo-primary shrink-0 rounded-xl px-5 py-2.5 text-center text-sm font-semibold"
            >
              View Company
            </Link>
          </div>
        </div>
      )}

      {/* job cards */}
      <div className="space-y-4">
        {paged.map(({ job, match }) => {
          const companyRecord = getCompanyByName(job.company);
          return (
          <div key={job.id} className="neo-card rounded-2xl p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <ProfileAvatar
                  photoUrl={companyRecord?.profileImageUrl}
                  initials={job.logo}
                  size="md"
                  alt={`${job.company} logo`}
                  className="rounded-xl"
                />
                <div>
                  <Link to={`/jobs/${job.id}`} className="neo-title text-lg font-bold hover:text-amber-300">
                    {job.title}
                  </Link>
                  <p className="neo-muted text-sm">{job.company}</p>
                  {companyRecord && (
                    <Link
                      to={`/companies/${companyRecord.id}`}
                      className="neo-link mt-1 inline-flex items-center gap-1 text-xs font-semibold"
                    >
                      View Company →
                    </Link>
                  )}
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span className="neo-muted flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                    <span className="neo-muted flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
                    <span className="neo-muted flex items-center gap-1"><Building2 size={12} /> {job.workMode}</span>
                    <span className="neo-muted">{job.salary}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${matchColor(match.score)}`}>{match.score}%</p>
                <p className="neo-muted text-xs">match</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {match.matched.map((s) => (
                <span key={s} className="neo-badge-match rounded-full px-2.5 py-0.5 text-xs font-medium">✓ {s}</span>
              ))}
              {match.missing.map((s) => (
                <span key={s} className="neo-badge-missing rounded-full px-2.5 py-0.5 text-xs font-medium">{s}</span>
              ))}
            </div>
            <p className="neo-muted mt-3 text-xs leading-5">
              <span className="font-semibold text-amber-300">Deterministic score rationale:</span>{" "}
              {match.matched.length} evidenced skills align with this role
              {match.missing.length ? `; the fastest improvement is ${match.missing[0]}.` : "; no core skill gaps detected."}
            </p>

            {job.description && (
              <p className="neo-text mt-4 line-clamp-2 text-sm leading-6">{job.description}</p>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                onClick={() => setApplyJob(job)}
                disabled={applied.has(job.id)}
                className="neo-primary w-full rounded-xl px-5 py-2.5 text-sm font-semibold disabled:opacity-50 sm:w-auto"
              >
                {applied.has(job.id) ? "Applied" : "Apply Now"}
              </button>
              <Link to={`/jobs/${job.id}`} className="neo-secondary w-full rounded-xl px-5 py-2.5 text-center text-sm font-semibold sm:w-auto">
                View Details
              </Link>
              <button
                onClick={() => toggleSave(job.id)}
                className="neo-secondary flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold sm:ml-auto sm:w-auto"
              >
                {saved.has(job.id) ? <BookmarkCheck size={16} className="text-amber-300" /> : <Bookmark size={16} />}
                {saved.has(job.id) ? "Saved" : "Save"}
              </button>
            </div>
          </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="neo-card flex flex-col items-center justify-center rounded-2xl p-16 text-center">
            <Search size={36} className="neo-muted" />
            <p className="neo-muted mt-4 text-sm">No jobs match your filters. Try broadening your search.</p>
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

      {/* apply modal */}
      {applyJob && (
        <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} onSubmit={submitApply} />
      )}
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="neo-muted text-xs font-medium">{label}:</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
            value === o ? "bg-amber-500/15 text-amber-300" : "neo-secondary"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function ApplyModal({ job, onClose, onSubmit }) {
  const [coverLetter, setCoverLetter] = useState("");
  const submitRef = useRef(null);

  useEffect(() => {
    submitRef.current?.focus();
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur">
      <div role="dialog" aria-modal="true" aria-labelledby="apply-title" className="neo-card w-full max-w-lg rounded-2xl p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 id="apply-title" className="neo-title text-xl font-bold">Apply to {job.title}</h2>
            <p className="neo-muted text-sm">{job.company}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close application form" className="neo-nav-icon-btn"><X size={20} /></button>
        </div>

        <div className="space-y-4">
          <label className="neo-soft flex items-center justify-between rounded-xl p-4">
            <span className="neo-text text-sm font-medium">Resume (from Living Portfolio)</span>
            <CheckCircle2 size={18} className="text-emerald-400" />
          </label>
          <label className="neo-soft flex items-center justify-between rounded-xl p-4">
            <span className="neo-text text-sm font-medium">Living Portfolio Profile</span>
            <CheckCircle2 size={18} className="text-emerald-400" />
          </label>
          <div>
            <label className="neo-text mb-1 block text-sm font-medium">Cover Letter (optional)</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={4}
              placeholder="Tell the employer why you're a great fit..."
              className="neo-input w-full resize-none rounded-xl px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <button ref={submitRef} type="button" onClick={() => onSubmit(coverLetter)} className="neo-primary flex-1 rounded-xl py-3 text-sm font-semibold">
            Submit Application
          </button>
          <button type="button" onClick={onClose} className="neo-secondary rounded-xl px-5 py-3 text-sm font-semibold">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
