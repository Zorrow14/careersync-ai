import { Link } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Target,
  BarChart3,
  Route as RouteIcon,
  Send,
  CalendarCheck,
  Bookmark,
  Sparkles,
  FolderGit2,
  Mic,
} from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { resumeAnalyses } from "../../data/resumeAnalysis.js";
import { skillGaps } from "../../data/skillGap.js";
import { roadmaps } from "../../data/roadmapData.js";
import { jobs, getJobMatch } from "../../data/jobsData.js";
import { applications, savedJobs } from "../../data/applicationsData.js";
import { getEmployabilityScore } from "../../data/employabilityScore.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import KpiCard from "../../components/ui/KpiCard.jsx";

const dimensionIcons = { Target, FolderGit2, Mic, TrendingUp };

export default function Dashboard() {
  const { personaId, persona, profile } = usePersona();
  const analysis = resumeAnalyses[personaId];
  const gap = skillGaps[personaId];
  const roadmap = roadmaps[personaId];
  const apps = applications[personaId] || [];
  const saved = savedJobs[personaId] || [];

  const interviews = apps.filter((a) => a.status === "Interview" || a.status === "Assessment").length;

  const recommended = jobs
    .map((job) => ({ job, match: getJobMatch(job, personaId) }))
    .sort((a, b) => b.match.score - a.match.score)
    .slice(0, 3);

  const employability = getEmployabilityScore(personaId);
  const careerReadiness = employability.total;

  const widgets = [
    { label: "Applications", value: apps.length, icon: Send, to: "/applications" },
    { label: "Interviews", value: interviews, icon: CalendarCheck, to: "/applications" },
    { label: "Saved Jobs", value: saved.length, icon: Bookmark, to: "/jobs" },
    { label: "Recommended", value: recommended.length, icon: Sparkles, to: "/jobs" },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={`Welcome back, ${persona.name.split(" ")[0]}`}
        title="Career Dashboard"
        description="Track your career readiness, applications, and recommended next steps."
        actions={
          <Link to="/jobs" className="neo-primary rounded-xl px-5 py-3 text-sm font-semibold">
            Find Jobs
          </Link>
        }
      />

      {/* ─── Career Health Score ─── */}
      <div className="neo-card mb-6 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-xl font-bold text-slate-950">
              {persona.avatar}
            </div>
            <div>
              <h2 className="neo-title text-lg font-bold">{persona.name}</h2>
              <p className="neo-muted text-sm">{persona.degree} · {persona.institution}</p>
              <p className="neo-muted text-sm">
                Target: <span className="text-amber-300">{persona.targetRole}</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="neo-muted text-xs font-medium">Employability Score</p>
            <p className="neo-gradient-text text-5xl font-bold">{careerReadiness}%</p>
          </div>
        </div>

        <div className="mt-5">
          <div className="neo-progress-track h-3 overflow-hidden rounded-full">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-blue-400 transition-all duration-700"
              style={{ width: `${careerReadiness}%` }}
            />
          </div>
        </div>
      </div>

      {/* ─── Explainable Employability Score ─── */}
      <div className="neo-card mb-6 rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="neo-title text-xl font-bold">What's behind your score</h2>
            <p className="neo-muted text-sm">A transparent breakdown — never a black box.</p>
          </div>
          <Sparkles size={20} className="text-amber-300" />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {employability.dimensions.map((d) => {
            const Icon = dimensionIcons[d.icon] || Target;
            return (
              <div key={d.key} className="neo-soft rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-amber-300" />
                    <p className="neo-title text-sm font-semibold">{d.label}</p>
                    <span className="neo-muted text-xs">· {Math.round(d.weight * 100)}%</span>
                  </div>
                  <span className="text-sm font-bold text-amber-300">{d.value}%</span>
                </div>
                <div className="neo-progress-track mb-2 h-2 rounded-full">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-amber-300"
                    style={{ width: `${d.value}%` }}
                  />
                </div>
                <p className="neo-muted text-xs leading-5">{d.why}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Job Widgets ─── */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {widgets.map(({ label, value, icon: Icon, to }) => (
          <KpiCard key={label} label={label} value={value} icon={Icon} to={to} />
        ))}
      </div>

      {/* ─── Career Stats ─── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {[
          { label: "Career Readiness", value: `${careerReadiness}%`, description: "Overall employability", icon: Target },
          { label: "Job Match", value: `${analysis.matchScore}%`, description: `For ${analysis.role}`, icon: BarChart3 },
          { label: "Skill Gaps", value: `${gap.missingSkills.length}`, description: "Areas to improve", icon: TrendingUp },
          { label: "Roadmap", value: `${roadmap.steps.length} phases`, description: roadmap.duration, icon: RouteIcon },
        ].map(({ label, value, description, icon: Icon }) => (
          <div key={label} className="neo-card rounded-2xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="neo-muted text-sm font-medium">{label}</p>
              <Icon size={18} className="text-amber-300" />
            </div>
            <h3 className="neo-title text-4xl font-bold">{value}</h3>
            <p className="neo-text mt-3 text-sm leading-6">{description}</p>
          </div>
        ))}
      </div>

      {/* ─── Recommended Jobs + AI Insight ─── */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="neo-title text-xl font-bold">Recommended For You</h2>
            <Link to="/jobs" className="flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {recommended.map(({ job, match }) => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="neo-soft flex items-center justify-between rounded-xl p-4 transition hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-xs font-bold text-amber-300">
                    {job.logo}
                  </span>
                  <div>
                    <p className="neo-title font-semibold">{job.title}</p>
                    <p className="neo-muted text-sm">{job.company} · {job.location}</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/15 px-4 py-1 text-sm font-semibold text-amber-300">
                  {match.score}%
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <div className="w-fit rounded-xl bg-amber-500/15 p-3 text-amber-300">
            <GraduationCap size={24} />
          </div>
          <h2 className="neo-title mt-5 text-xl font-bold">AI Insight</h2>
          <p className="neo-text mt-4 leading-7">{analysis.summary}</p>
          <Link
            to="/roadmap"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
          >
            View roadmap <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
