import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  TrendingUp,
  UserCircle,
  Target,
  BarChart3,
  Route as RouteIcon,
  Mic,
} from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { resumeAnalyses } from "../../data/resumeAnalysis.js";
import { skillGaps } from "../../data/skillGap.js";
import { roadmaps } from "../../data/roadmapData.js";

export default function Dashboard() {
  const { personaId, persona, profile } = usePersona();
  const analysis = resumeAnalyses[personaId];
  const gap = skillGaps[personaId];
  const roadmap = roadmaps[personaId];

  const careerReadiness = Math.round(
    (analysis.matchScore + profile.completion + (100 - gap.missingSkills.length * 8)) / 3
  );

  const stats = [
    { label: "Career Readiness", value: `${careerReadiness}%`, description: "Overall employability score", icon: Target },
    { label: "Job Match", value: `${analysis.matchScore}%`, description: `For ${analysis.role}`, icon: BarChart3 },
    { label: "Skill Gaps", value: `${gap.missingSkills.length}`, description: "Areas to improve", icon: TrendingUp },
    { label: "Roadmap Progress", value: `${roadmap.steps.length} phases`, description: roadmap.duration, icon: RouteIcon },
  ];

  const careerPaths = [
    ["Frontend Developer", "92%", "Best match"],
    ["Full Stack Developer", "86%", "Strong potential"],
    ["UI Engineer", "84%", "Good fit"],
    ["DevOps Engineer", "68%", "Needs improvement"],
  ];

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-300">
            Welcome back, {persona.name.split(" ")[0]}
          </p>
          <h1 className="neo-title text-4xl font-bold">Career Dashboard</h1>
          <p className="neo-text mt-2">
            Track your career readiness, job fit, and recommended next steps.
          </p>
        </div>

        <Link
          to="/analyzer"
          className="neo-primary rounded-xl px-5 py-3 font-semibold"
        >
          New Analysis
        </Link>
      </div>

      {/* ─── Career Health Score ─── */}
      <div className="neo-card mb-8 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500 text-xl font-bold text-slate-950">
              {persona.avatar}
            </div>
            <div>
              <h2 className="neo-title text-lg font-bold">{persona.name}</h2>
              <p className="neo-muted text-sm">
                {persona.degree} · {persona.institution}
              </p>
              <p className="neo-muted text-sm">
                Target: <span className="text-amber-300">{persona.targetRole}</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="neo-muted text-xs font-medium">Career Readiness</p>
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

        {profile.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.skills.slice(0, 8).map((s) => (
              <span key={s} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
                {s}
              </span>
            ))}
            {profile.skills.length > 8 && (
              <span className="neo-muted self-center text-xs">+{profile.skills.length - 8} more</span>
            )}
          </div>
        )}
      </div>

      {/* ─── Stats ─── */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {stats.map(({ label, value, description, icon: Icon }) => (
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

      {/* ─── Career Paths + AI Insight ─── */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="neo-title text-xl font-bold">Recommended Career Paths</h2>
            <TrendingUp className="text-amber-300" size={22} />
          </div>

          <div className="mt-6 space-y-4">
            {careerPaths.map(([role, score, label]) => (
              <div key={role} className="neo-soft flex items-center justify-between rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/15 p-2 text-amber-300">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <p className="neo-title font-semibold">{role}</p>
                    <p className="neo-muted text-sm">{label}</p>
                  </div>
                </div>
                <span className="rounded-full bg-amber-500/15 px-4 py-1 text-sm font-semibold text-amber-300">
                  {score}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <div className="w-fit rounded-xl bg-amber-500/15 p-3 text-amber-300">
            <GraduationCap size={24} />
          </div>

          <h2 className="neo-title mt-5 text-xl font-bold">AI Insight</h2>
          <p className="neo-text mt-4 leading-7">
            {analysis.summary}
          </p>

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
