import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Users,
  Star,
  CalendarDays,
  Globe,
  BadgeCheck,
  ShieldCheck,
  Heart,
  Briefcase,
  CheckCircle2,
  Newspaper,
  Sparkles,
  Building2,
  SearchX,
} from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { useDemoWorkflow } from "../../context/DemoWorkflowContext.jsx";
import { getCompanyById, getCompanyJobs } from "../../data/companiesData.js";
import { getCompanyFeedById } from "../../data/companyFeedData.js";
import { getJobMatch } from "../../data/jobsData.js";
import ProfileAvatar from "../../components/ui/ProfileAvatar.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";

function matchColor(score) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-rose-300";
}

/** Deterministic, explainable company-level fit summary built from each open role's persona match. */
function buildCompanyFit(openRoles, personaId, personaName) {
  if (openRoles.length === 0) return null;

  const matches = openRoles.map((job) => ({ job, match: getJobMatch(job, personaId) }));
  const best = matches.reduce((top, current) => (current.match.score > top.match.score ? current : top));
  const avgScore = Math.round(matches.reduce((sum, m) => sum + m.match.score, 0) / matches.length);

  const skillCounts = new Map();
  matches.forEach(({ match }) => {
    match.matched.forEach((skill) => skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1));
  });
  const topSkills = [...skillCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([skill]) => skill);

  const gapCounts = new Map();
  matches.forEach(({ match }) => {
    match.missing.forEach((skill) => gapCounts.set(skill, (gapCounts.get(skill) || 0) + 1));
  });
  const topGap = [...gapCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

  let summary;
  if (avgScore >= 80) {
    summary = `${personaName}'s profile aligns strongly here — ${topSkills.length > 0 ? `${topSkills.join(", ")} show up across multiple open roles.` : "several skills line up with open roles."}`;
  } else if (avgScore >= 60) {
    summary = `A solid overlap for ${personaName}. ${topSkills[0] ? `${topSkills.join(", ")} matched most roles.` : ""}${topGap ? ` Building ${topGap} would raise the fit further.` : ""}`;
  } else {
    summary = `Fit is limited today. ${topGap ? `${topGap} is the most common gap across this company's roles.` : "Few of this company's role requirements match the current profile."}`;
  }

  return { avgScore, best, topSkills, topGap, summary };
}

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { personaId, persona } = usePersona();
  const { followedCompanies, toggleFollowCompany } = useDemoWorkflow();

  const company = getCompanyById(id);

  if (!company) {
    return (
      <div className="neo-card rounded-2xl p-16 text-center">
        <p className="neo-muted">Company not found.</p>
        <Link to="/companies" className="neo-primary mt-4 inline-block rounded-xl px-5 py-2.5 text-sm font-semibold">
          Back to Directory
        </Link>
      </div>
    );
  }

  const openRoles = getCompanyJobs(company.name);
  const companyPosts = getCompanyFeedById(company.id).slice(0, 3);
  const isFollowing = (followedCompanies[personaId] ?? []).includes(company.id);
  const workModes = [...new Set(openRoles.map((job) => job.workMode).filter(Boolean))];
  const fit = buildCompanyFit(openRoles, personaId, persona?.name || "You");
  const isVerified = company.rating >= 4.3;

  return (
    <div className="mx-auto max-w-5xl">
      <button onClick={() => navigate(-1)} className="neo-muted mb-6 flex cursor-pointer items-center gap-2 text-sm hover:text-amber-300">
        <ArrowLeft size={16} /> Back
      </button>

      {/* ─── Header ─── */}
      <div className="neo-card mb-6 rounded-2xl p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <ProfileAvatar
              photoUrl={company.profileImageUrl}
              initials={company.logo}
              size="lg"
              alt={`${company.name} logo`}
              className="rounded-2xl"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="neo-title text-2xl font-bold">{company.name}</h1>
                {isVerified && (
                  <span
                    className="flex items-center gap-1 rounded-full bg-sky-500/15 px-2.5 py-1 text-xs font-semibold text-sky-300"
                    title="Rated 4.3+ by candidates on CareerSync AI"
                  >
                    <ShieldCheck size={12} /> Verified employer
                  </span>
                )}
                {company.hiring && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                    <BadgeCheck size={12} /> Hiring
                  </span>
                )}
              </div>
              <p className="text-amber-300">{company.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className="neo-muted flex items-center gap-1"><Building2 size={12} /> {company.industry}</span>
                <span className="neo-muted flex items-center gap-1"><MapPin size={12} /> {company.location}</span>
                <span className="neo-muted flex items-center gap-1"><Users size={12} /> {company.size}</span>
                <span className="neo-muted flex items-center gap-1"><CalendarDays size={12} /> Founded {company.founded}</span>
                <span className="neo-muted flex items-center gap-1"><Star size={12} className="text-amber-300" /> {company.rating}</span>
                {fit && (
                  <span className={`flex items-center gap-1 font-semibold ${matchColor(fit.avgScore)}`}>
                    <Sparkles size={12} /> {fit.avgScore}% avg fit for you
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
            >
              <Globe size={15} /> Website
            </a>
            <button
              type="button"
              onClick={() => toggleFollowCompany(personaId, company.id)}
              aria-pressed={isFollowing}
              className={`flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                isFollowing ? "bg-amber-500 text-slate-950" : "neo-secondary"
              }`}
            >
              <Heart size={15} fill={isFollowing ? "currentColor" : "none"} />
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="neo-card rounded-2xl p-6">
            <h2 className="neo-title mb-3 text-xl font-bold">About {company.name}</h2>
            <p className="neo-text text-sm leading-7">{company.about}</p>

            <h3 className="neo-title mt-5 mb-2 text-sm font-bold uppercase tracking-wide">Culture &amp; work model</h3>
            <div className="flex flex-wrap gap-2">
              {company.culture.map((t) => (
                <span key={t} className="neo-soft rounded-full px-3 py-1 text-xs neo-text">{t}</span>
              ))}
              {workModes.map((mode) => (
                <span key={mode} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">{mode}</span>
              ))}
            </div>
          </div>

          {/* ─── Open roles (cross-linked to job listings) ─── */}
          <div id="open-roles" className="neo-card rounded-2xl p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-amber-300" aria-hidden="true" />
                <h2 className="neo-title text-xl font-bold">Open Roles ({openRoles.length})</h2>
              </div>
              {fit && (
                <Link
                  to={`/jobs/${fit.best.job.id}`}
                  className="neo-primary rounded-xl px-4 py-2 text-xs font-semibold"
                >
                  Apply to your top match ({fit.best.match.score}%)
                </Link>
              )}
            </div>

            {openRoles.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="No open roles right now"
                description="Follow this company to get notified the moment they post a new role."
                action={
                  <button
                    type="button"
                    onClick={() => toggleFollowCompany(personaId, company.id)}
                    className="neo-primary rounded-xl px-5 py-2.5 text-sm font-semibold"
                  >
                    {isFollowing ? "Following — you'll be notified" : "Follow this company"}
                  </button>
                }
              />
            ) : (
              <div className="space-y-3">
                {openRoles.map((job) => {
                  const m = getJobMatch(job, personaId);
                  return (
                    <Link
                      key={job.id}
                      to={`/jobs/${job.id}`}
                      className="neo-soft flex items-center justify-between gap-4 rounded-xl p-4 transition hover:bg-white/5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="neo-title font-semibold">{job.title}</p>
                        <p className="neo-muted mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs">
                          <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                          <span>{job.workMode}</span>
                          <span>{job.type}</span>
                          <span className="font-medium text-amber-300/90">{job.salary}</span>
                        </p>
                        {job.description && (
                          <p className="neo-text mt-1.5 line-clamp-2 text-xs leading-5">{job.description}</p>
                        )}
                      </div>
                      <span className={`shrink-0 text-sm font-bold ${matchColor(m.score)}`}>{m.score}%</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {companyPosts.length > 0 && (
            <div className="neo-card rounded-2xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Newspaper size={18} className="text-amber-300" aria-hidden="true" />
                  <h2 className="neo-title text-xl font-bold">Company Updates</h2>
                </div>
                <Link to="/feed" className="text-xs font-semibold text-amber-300 hover:text-amber-200">
                  View all posts →
                </Link>
              </div>

              <div className="space-y-3">
                {companyPosts.map((post) => (
                  <div key={post.id} className="neo-soft rounded-xl p-4">
                    <p className="neo-title text-sm font-semibold leading-tight">{post.title}</p>
                    <p className="neo-muted mt-1 text-xs capitalize">{post.type} · {post.date}</p>
                    <p className="neo-text mt-2 line-clamp-2 text-xs leading-5">{post.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─── Sidebar ─── */}
        <div className="space-y-6">
          {fit && (
            <div className="neo-card rounded-2xl p-6">
              <h3 className="neo-title mb-1 flex items-center gap-2 font-bold">
                <Sparkles size={16} className="text-amber-300" aria-hidden="true" /> Why this company may fit you
              </h3>
              <p className="neo-muted mb-3 text-[11px] uppercase tracking-wide">Demo insight · based on your persona's skills</p>
              <p className="neo-text text-sm leading-6">{fit.summary}</p>
              {fit.topSkills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {fit.topSkills.map((skill) => (
                    <span key={skill} className="neo-badge-match rounded-full px-2.5 py-0.5 text-xs font-medium">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-3 font-bold">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {company.techStack.map((t) => (
                <span key={t} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-3 font-bold">Benefits</h3>
            <ul className="space-y-2">
              {company.benefits.map((b) => (
                <li key={b} className="neo-text flex items-start gap-2 text-sm">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
