import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Calendar,
  Users,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  ClipboardList,
} from "lucide-react";
import { companyProfile } from "../../data/employerData.js";
import { useDemoWorkflow } from "../../context/DemoWorkflowContext.jsx";
import DropdownSelect from "../../components/ui/DropdownSelect.jsx";

const statusConfig = {
  Active: { color: "neo-good", icon: CheckCircle2 },
  Closed: { color: "neo-danger", icon: XCircle },
  Draft: { color: "neo-soft", icon: Clock },
};

export default function Jobs() {
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [jobType, setJobType] = useState("Internship");
  const [draft, setDraft] = useState({
    title: "",
    location: "",
    deadline: "",
    description: "",
    requiredSkills: "",
  });
  const { employerJobs: workflowJobs, employerApplications, publishJob } = useDemoWorkflow();

  const applicationsByJob = useMemo(() => {
    return employerApplications.reduce((acc, app) => {
      if (app.employerJobId) {
        acc[app.employerJobId] = (acc[app.employerJobId] || 0) + 1;
      }
      return acc;
    }, {});
  }, [employerApplications]);

  const filtered = filter === "all"
    ? workflowJobs
    : workflowJobs.filter((j) => j.status.toLowerCase() === filter);

  function publish() {
    if (!draft.title.trim() || !draft.location.trim() || !draft.description.trim()) return;
    publishJob({
      title: draft.title.trim(),
      location: draft.location.trim(),
      deadline: draft.deadline || "TBD",
      description: draft.description.trim(),
      type: jobType,
      requiredSkills: draft.requiredSkills.split(",").map((skill) => skill.trim()).filter(Boolean),
    });
    setDraft({ title: "", location: "", deadline: "", description: "", requiredSkills: "" });
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-300">Job Management</p>
          <h1 className="neo-title text-4xl font-bold">Open Positions</h1>
          <p className="neo-text mt-2">Create, manage, and track your job openings.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="neo-primary flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
        >
          <Plus size={18} /> Post New Job
        </button>
      </div>

      {/* ─── Create Job Form (Demo) ─── */}
      {showForm && (
        <div className="neo-card mb-8 rounded-2xl p-6">
          <h2 className="neo-title mb-4 text-xl font-bold">New Job Posting</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="neo-text mb-1 block text-sm font-medium">Job Title</label>
              <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="e.g. Frontend Developer Intern" className="neo-input w-full rounded-xl px-4 py-3 text-sm" />
            </div>
            <div>
              <label className="neo-text mb-1 block text-sm font-medium">Location</label>
              <input value={draft.location} onChange={(event) => setDraft({ ...draft, location: event.target.value })} placeholder="e.g. Kuala Lumpur" className="neo-input w-full rounded-xl px-4 py-3 text-sm" />
            </div>
            <div>
              <DropdownSelect
                label="Type"
                value={jobType}
                onChange={setJobType}
                options={[
                  { value: "Internship", label: "Internship", description: "Intern or trainee role" },
                  { value: "Full-time", label: "Full-time", description: "Permanent position" },
                  { value: "Contract", label: "Contract", description: "Fixed-term engagement" },
                  { value: "Part-time", label: "Part-time", description: "Part-time / reduced hours" },
                ]}
                helperText="Choose the job type"
              />
            </div>
            <div>
              <label className="neo-text mb-1 block text-sm font-medium">Deadline</label>
              <input type="date" value={draft.deadline} onChange={(event) => setDraft({ ...draft, deadline: event.target.value })} className="neo-input w-full rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="neo-text mb-1 block text-sm font-medium">Job Description</label>
              <textarea rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Describe the role, responsibilities, and requirements..." className="neo-input w-full resize-none rounded-xl px-4 py-3 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="neo-text mb-1 block text-sm font-medium">Required Skills (comma-separated)</label>
              <input value={draft.requiredSkills} onChange={(event) => setDraft({ ...draft, requiredSkills: event.target.value })} placeholder="e.g. React.js, JavaScript, Node.js" className="neo-input w-full rounded-xl px-4 py-3 text-sm" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={publish} disabled={!draft.title.trim() || !draft.location.trim() || !draft.description.trim()} className="neo-primary rounded-xl px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60">Publish Job</button>
            <button onClick={() => setShowForm(false)} className="neo-secondary rounded-xl px-5 py-3 text-sm font-semibold">Cancel</button>
          </div>
          <p className="neo-muted mt-3 text-xs">Local demo mode — published positions persist in this browser until reset.</p>
        </div>
      )}

      {/* ─── Filter Tabs ─── */}
      <div className="mb-6 flex gap-2">
        {["all", "active", "closed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${
              filter === f ? "bg-amber-500/15 text-amber-300" : "neo-secondary"
            }`}
          >
            {f === "all" ? `All (${workflowJobs.length})` : `${f} (${workflowJobs.filter((j) => j.status.toLowerCase() === f).length})`}
          </button>
        ))}
      </div>

      {/* ─── Job Cards ─── */}
      <div className="space-y-4">
        {filtered.map((job) => {
          const statusCfg = statusConfig[job.status] || statusConfig.Draft;
          const StatusIcon = statusCfg.icon;
          return (
            <div key={job.id} className="neo-card rounded-2xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h3 className="neo-title text-lg font-bold">{job.title}</h3>
                    <p className="neo-muted text-sm">{job.company}</p>
                    <p className="neo-text mt-2 text-sm leading-6">{job.description}</p>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusCfg.color}`}>
                  <StatusIcon size={13} />
                  {job.status}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                <span className="neo-muted flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                <span className="neo-muted flex items-center gap-1"><Briefcase size={13} /> {job.type}</span>
                <span className="neo-muted flex items-center gap-1"><Calendar size={13} /> Posted {job.postedDate}</span>
                <span className="neo-muted flex items-center gap-1"><Clock size={13} /> Deadline {job.deadline}</span>
                <span className="neo-muted flex items-center gap-1"><Users size={13} /> {job.applications} applications</span>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((s) => (
                    <span key={s} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">{s}</span>
                  ))}
                  {job.preferredSkills.map((s) => (
                    <span key={s} className="neo-soft rounded-full px-3 py-1 text-xs font-medium neo-muted">{s}</span>
                  ))}
                </div>
                {job.company === companyProfile.name && (
                  <Link
                    to={`/employer/applications?role=${encodeURIComponent(job.title)}`}
                    className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold"
                  >
                    <ClipboardList size={14} />
                    View Applications ({applicationsByJob[job.id] ?? job.applications})
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
