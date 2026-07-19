import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Building2,
  Bookmark,
  Share2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Gift,
  FileText,
  ListChecks,
} from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { jobs, getJobMatch, getJobResponsibilities } from "../../data/jobsData.js";
import { companies } from "../../data/companiesData.js";
import ProfileAvatar from "../../components/ui/ProfileAvatar.jsx";

function matchColor(score) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-rose-300";
}

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { personaId } = usePersona();

  const job = jobs.find((j) => j.id === id);
  if (!job) {
    return (
      <div className="neo-card rounded-2xl p-16 text-center">
        <p className="neo-muted">Job not found.</p>
        <Link to="/jobs" className="neo-primary mt-4 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold">
          Back to Job Search
        </Link>
      </div>
    );
  }

  const match = getJobMatch(job, personaId);
  const responsibilities = getJobResponsibilities(job);
  const similar = jobs.filter((j) => j.id !== job.id && j.industry === job.industry).slice(0, 3);
  const company = companies.find((c) => c.name === job.company);

  return (
    <div className="mx-auto max-w-5xl">
      <button onClick={() => navigate(-1)} className="neo-muted mb-6 flex items-center gap-2 text-sm hover:text-amber-300">
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* main */}
        <div className="space-y-6 lg:col-span-2">
          <div className="neo-card rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <ProfileAvatar
                photoUrl={company?.profileImageUrl}
                initials={job.logo}
                size="lg"
                alt={`${job.company} logo`}
                className="rounded-xl"
              />
              <div className="flex-1">
                <h1 className="neo-title text-2xl font-bold">{job.title}</h1>
                {company ? (
                  <Link to={`/companies/${company.id}`} className="font-medium text-amber-300 hover:text-amber-200">
                    {job.company}
                  </Link>
                ) : (
                  <p className="neo-text">{job.company}</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                  <span className="neo-muted flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span className="neo-muted flex items-center gap-1"><Briefcase size={12} /> {job.type}</span>
                  <span className="neo-muted flex items-center gap-1"><Building2 size={12} /> {job.workMode}</span>
                  <span className="neo-muted">{job.salary}</span>
                  <span className="neo-muted">· {job.postedDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h2 className="neo-title mb-3 flex items-center gap-2 text-xl font-bold">
              <FileText size={20} className="text-amber-300" /> Job Description
            </h2>
            <p className="neo-text text-sm leading-7">{job.description}</p>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h2 className="neo-title mb-3 flex items-center gap-2 text-xl font-bold">
              <ListChecks size={20} className="text-amber-300" /> Key Responsibilities
            </h2>
            <ul className="neo-text space-y-2 text-sm">
              {responsibilities.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-amber-300" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h2 className="neo-title mb-3 text-xl font-bold">Requirements</h2>
            <ul className="neo-text space-y-2 text-sm">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-amber-300" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h2 className="neo-title mb-3 flex items-center gap-2 text-xl font-bold">
              <Gift size={20} className="text-amber-300" /> Benefits
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((b) => (
                <span key={b} className="neo-soft rounded-full px-3 py-1 text-sm neo-text">{b}</span>
              ))}
            </div>
          </div>

          {similar.length > 0 && (
            <div className="neo-card rounded-2xl p-6">
              <h2 className="neo-title mb-4 text-xl font-bold">Similar Jobs</h2>
              <div className="space-y-3">
                {similar.map((s) => {
                  const sm = getJobMatch(s, personaId);
                  return (
                    <Link key={s.id} to={`/jobs/${s.id}`} className="neo-soft flex items-center justify-between rounded-xl p-4 transition hover:bg-white/5">
                      <div className="flex items-center gap-3">
                        <ProfileAvatar
                          photoUrl={companies.find((c) => c.name === s.company)?.profileImageUrl}
                          initials={s.logo}
                          size="sm"
                          alt={`${s.company} logo`}
                          className="rounded-lg"
                        />
                        <div>
                          <p className="neo-title text-sm font-semibold">{s.title}</p>
                          <p className="neo-muted text-xs">{s.company} · {s.location}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-bold ${matchColor(sm.score)}`}>{sm.score}%</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* sidebar */}
        <div className="space-y-6">
          <div className="neo-card rounded-2xl p-6 text-center">
            <p className="neo-muted text-sm">Your Match Score</p>
            <p className={`text-6xl font-bold ${matchColor(match.score)}`}>{match.score}%</p>
            <div className="neo-progress-track mt-4 h-3 overflow-hidden rounded-full">
              <div className="neo-progress-fill-alt h-full rounded-full" style={{ width: `${match.score}%` }} />
            </div>
            <Link to="/jobs" className="neo-primary mt-5 block rounded-xl py-3 text-sm font-semibold">
              Apply Now
            </Link>
            <div className="mt-3 flex gap-2">
              <button className="neo-secondary flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold">
                <Bookmark size={14} /> Save
              </button>
              <button className="neo-secondary flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold">
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-3 font-bold">Skill Match</h3>
            <p className="neo-muted mb-2 text-xs font-semibold uppercase">You have</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {match.matched.length > 0 ? match.matched.map((s) => (
                <span key={s} className="neo-badge-match rounded-full px-2.5 py-0.5 text-xs font-medium">
                  <CheckCircle2 size={11} className="mr-1 inline" />{s}
                </span>
              )) : <span className="neo-muted text-xs">No direct matches</span>}
            </div>
            <p className="neo-muted mb-2 text-xs font-semibold uppercase">Skill gaps</p>
            <div className="flex flex-wrap gap-2">
              {match.missing.length > 0 ? match.missing.map((s) => (
                <span key={s} className="neo-badge-missing rounded-full px-2.5 py-0.5 text-xs font-medium">
                  <XCircle size={11} className="mr-1 inline" />{s}
                </span>
              )) : <span className="text-xs text-emerald-300">You meet all requirements!</span>}
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-3 flex items-center gap-2 font-bold">
              <Sparkles size={16} className="text-amber-300" /> Why This Fits You
            </h3>
            <p className="neo-text text-sm leading-6">
              {match.score >= 80
                ? `You're a strong match for this role. Your skills in ${match.matched.slice(0, 3).join(", ")} align closely with the requirements. Apply with confidence!`
                : match.score >= 60
                ? `A solid opportunity. You match on ${match.matched.slice(0, 2).join(", ")}, and closing gaps in ${match.missing.slice(0, 2).join(", ")} would make you a top candidate.`
                : `This role stretches your current profile. Consider building ${match.missing.slice(0, 2).join(", ")} before applying, or use it as a growth target.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
