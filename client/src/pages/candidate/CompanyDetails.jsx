import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Users,
  Star,
  CalendarDays,
  Globe,
  BadgeCheck,
  Heart,
  Briefcase,
  CheckCircle2,
  Newspaper,
} from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { getCompanyById, getCompanyJobs } from "../../data/companiesData.js";
import { getCompanyFeedById } from "../../data/companyFeedData.js";
import { getJobMatch } from "../../data/jobsData.js";
import ProfileAvatar from "../../components/ui/ProfileAvatar.jsx";

function matchColor(score) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-rose-300";
}

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { personaId } = usePersona();

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
              <div className="flex items-center gap-2">
                <h1 className="neo-title text-2xl font-bold">{company.name}</h1>
                {company.verified && (
                  <BadgeCheck size={20} className="shrink-0 text-blue-400" title="Verified employer" aria-label="Verified employer" />
                )}
                {company.hiring && (
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                    <BadgeCheck size={12} /> Hiring
                  </span>
                )}
              </div>
              <p className="text-amber-300">{company.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                <span className="neo-muted flex items-center gap-1"><MapPin size={12} /> {company.location}</span>
                <span className="neo-muted flex items-center gap-1"><Users size={12} /> {company.size}</span>
                <span className="neo-muted flex items-center gap-1"><CalendarDays size={12} /> Founded {company.founded}</span>
                <span className="neo-muted flex items-center gap-1"><Star size={12} className="text-amber-300" /> {company.rating}</span>
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
            <button className="neo-secondary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
              <Heart size={15} /> Follow
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="neo-card rounded-2xl p-6">
            <h2 className="neo-title mb-3 text-xl font-bold">About {company.name}</h2>
            <p className="neo-text text-sm leading-7">{company.about}</p>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Newspaper size={18} className="text-amber-300" />
                <h2 className="neo-title text-xl font-bold">Company Updates</h2>
              </div>
              {companyPosts.length > 0 && (
                <Link to="/feed" className="text-xs font-semibold text-amber-300 hover:text-amber-200">
                  View all posts →
                </Link>
              )}
            </div>

            {companyPosts.length === 0 ? (
              <p className="neo-muted text-sm">No posts yet from this company.</p>
            ) : (
              <div className="space-y-3">
                {companyPosts.map((post) => (
                  <div key={post.id} className="neo-soft rounded-xl p-4">
                    <p className="neo-title text-sm font-semibold leading-tight">{post.title}</p>
                    <p className="neo-muted mt-1 text-xs capitalize">{post.type} · {post.date}</p>
                    <p className="neo-text mt-2 line-clamp-2 text-xs leading-5">{post.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ─── Open roles (cross-linked to job listings) ─── */}
          <div className="neo-card rounded-2xl p-6">
            <div className="mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-amber-300" />
              <h2 className="neo-title text-xl font-bold">Open Roles ({openRoles.length})</h2>
            </div>

            {openRoles.length === 0 ? (
              <p className="neo-muted text-sm">No open roles right now. Follow to get notified.</p>
            ) : (
              <div className="space-y-3">
                {openRoles.map((job) => {
                  const m = getJobMatch(job, personaId);
                  return (
                    <Link
                      key={job.id}
                      to={`/jobs/${job.id}`}
                      className="neo-soft flex items-center justify-between rounded-xl p-4 transition hover:bg-white/5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="neo-title font-semibold">{job.title}</p>
                        <p className="neo-muted text-xs">{job.location} · {job.type} · {job.salary}</p>
                        {job.description && (
                          <p className="neo-text mt-1 line-clamp-2 text-xs leading-5">{job.description}</p>
                        )}
                      </div>
                      <span className={`text-sm font-bold ${matchColor(m.score)}`}>{m.score}%</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ─── Sidebar ─── */}
        <div className="space-y-6">
          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-3 font-bold">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {company.techStack.map((t) => (
                <span key={t} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-3 font-bold">Culture</h3>
            <div className="flex flex-wrap gap-2">
              {company.culture.map((t) => (
                <span key={t} className="neo-soft rounded-full px-3 py-1 text-xs neo-text">{t}</span>
              ))}
            </div>
          </div>

          <div className="neo-card rounded-2xl p-6">
            <h3 className="neo-title mb-3 font-bold">Benefits</h3>
            <ul className="space-y-2">
              {company.benefits.map((b) => (
                <li key={b} className="neo-text flex items-start gap-2 text-sm">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-300" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
