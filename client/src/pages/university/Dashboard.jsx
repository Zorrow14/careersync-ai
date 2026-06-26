import { useState } from "react";
import {
  Building2,
  Users,
  TrendingUp,
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  Handshake,
  ArrowRight,
  Sparkles,
  Loader2,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { generateUniversityInsights } from "../../lib/mock-ai.js";
import { getCohortEmployabilityDimensions, getCohortEmployabilityTotal } from "../../data/cohortEmployability.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import KpiCard from "../../components/ui/KpiCard.jsx";

const priorityColors = { high: "neo-danger", medium: "neo-blue", low: "neo-soft" };
const trackBarColors = {
  amber: "neo-progress-fill",
  blue: "neo-progress-fill-stone",
  emerald: "neo-progress-fill-emerald",
  purple: "neo-progress-fill-purple",
  rose: "neo-progress-fill-rose",
};

export default function UniversityDashboard() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    try {
      const result = await generateUniversityInsights();
      setInsights(result);
    } finally {
      setLoading(false);
    }
  }

  if (!insights && !loading) {
    return (
      <div>
        <PageHeader
          eyebrow="University Portal"
          title="Cohort Readiness Dashboard"
          description="AI-powered employability intelligence for your student cohort"
        />
        <div className="neo-card flex min-h-[420px] flex-col items-center justify-center rounded-2xl p-10 text-center">
          <div className="rounded-2xl bg-amber-500/15 p-5 text-amber-300">
            <WandSparkles size={40} />
          </div>
          <h2 className="neo-title mt-6 text-2xl font-bold">Generate Cohort Insights</h2>
          <p className="neo-text mt-3 max-w-lg leading-7">
            CareerSync AI will analyze aggregated student profiles, job match results, and
            employer demand signals to produce readiness scores, skill gaps, and curriculum
            recommendations — no individual student data is exposed.
          </p>
          <button
            type="button"
            onClick={handleGenerate}
            className="neo-primary mt-8 flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
          >
            <Sparkles size={18} />
            Generate AI Cohort Insights
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <PageHeader
          eyebrow="University Portal"
          title="Cohort Readiness Dashboard"
          description="Analyzing cohort data…"
        />
        <div className="neo-card flex min-h-[420px] flex-col items-center justify-center rounded-2xl p-16 text-center">
          <Loader2 size={48} className="animate-spin text-amber-400" />
          <h2 className="neo-title mt-6 text-2xl font-bold">Generating cohort insights…</h2>
          <p className="neo-text mt-3 max-w-md">
            Aggregating readiness scores, skill gaps, and curriculum alignment across{" "}
            {insights?.totalStudents ?? "your"} students.
          </p>
          <div className="neo-progress-track mt-8 h-2 w-64 overflow-hidden rounded-full">
            <div className="neo-progress-fill-alt h-full animate-pulse rounded-full" style={{ width: "72%" }} />
          </div>
        </div>
      </div>
    );
  }

  const data = insights;
  const cohortDimensions = getCohortEmployabilityDimensions();
  const cohortScore = getCohortEmployabilityTotal();

  return (
    <div>
      <PageHeader
        eyebrow="University Portal"
        title="Cohort Readiness Dashboard"
        description={data.institutionName}
        actions={
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="neo-secondary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
          >
            <Sparkles size={16} />
            Regenerate Insights
          </button>
        }
      />

      <div className="neo-good mb-8 flex items-center gap-3 rounded-2xl px-5 py-4 text-sm">
        <Sparkles size={18} className="shrink-0" />
        <span>
          <strong className="font-semibold">AI-generated report</strong> — {data.totalStudents} students
          analyzed · {data.studentsNeedingSupport} flagged for support · avg. readiness{" "}
          {data.averageReadinessScore}%
        </span>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        {[
          { label: "Total Students", value: data.totalStudents, icon: Users, to: "/university/students" },
          { label: "Avg. Readiness", value: `${data.averageReadinessScore}%`, icon: TrendingUp, to: "/university/tracker" },
          { label: "Internship Ready", value: data.internshipReady, icon: BriefcaseBusiness },
          { label: "Employer Partners", value: data.employerPartnerships, icon: Handshake },
        ].map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="neo-card mb-8 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
            <GraduationCap size={24} />
          </div>
          <div className="flex-1">
            <h2 className="neo-title text-xl font-bold">AI Cohort Summary</h2>
            <p className="neo-text mt-2 leading-7">{data.summary}</p>
            {data.strongestTracks?.length > 0 && (
              <p className="neo-muted mt-3 text-sm">
                Strongest tracks:{" "}
                <span className="text-amber-300">{data.strongestTracks.join(", ")}</span>
              </p>
            )}
          </div>
          <div className="hidden text-right sm:block">
            <p className="neo-muted text-xs">Shared employability model</p>
            <p className="neo-title text-3xl font-bold text-amber-300">{cohortScore}%</p>
            <p className="neo-muted text-[10px]">Cohort avg. (same as candidate score)</p>
          </div>
        </div>
      </div>

      <div className="neo-card mb-8 rounded-2xl p-6">
        <h2 className="neo-title mb-4 text-xl font-bold">Explainable Cohort Score</h2>
        <p className="neo-muted mb-5 text-sm">
          Aggregated across tracked students — mirrors the dimensions candidates and employers see individually.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {cohortDimensions.map((d) => (
            <div key={d.key} className="neo-soft rounded-xl p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="neo-title font-semibold">{d.label}</span>
                <span className="font-bold text-amber-300">{d.value}%</span>
              </div>
              <div className="neo-progress-track mb-2 h-2 overflow-hidden rounded-full">
                <div className="neo-progress-fill-alt h-full rounded-full" style={{ width: `${d.value}%` }} />
              </div>
              <p className="neo-muted text-xs leading-5">{d.why}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="neo-card mb-8 rounded-2xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="neo-title text-xl font-bold">Overall Employability Overview</h2>
            <p className="neo-muted text-sm">
              Readiness at {data.readinessPercentage}% of cohort above threshold ·{" "}
              {data.studentsNeedingSupport} students need intervention
            </p>
          </div>
          <Link to="/university/tracker" className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold">
            View Tracker <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {data.employabilityOverview.map((item) => (
            <div key={item.label} className="neo-soft rounded-2xl p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="neo-title font-semibold">{item.label}</p>
                <span className="text-lg font-bold text-amber-300">{item.value}%</span>
              </div>
              <div className="neo-progress-track mb-3 h-2 overflow-hidden rounded-full">
                <div
                  className={`h-full rounded-full ${trackBarColors[item.color] || trackBarColors.amber}`}
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <p className="neo-muted text-xs">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-6 text-xl font-bold">Track Performance</h2>
          <div className="space-y-5">
            {data.trackBreakdown.map((track) => (
              <div key={track.track}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="neo-text text-sm font-medium">{track.track}</span>
                  <span className="neo-muted text-xs">
                    {track.studentCount} students · {track.averageScore}%
                  </span>
                </div>
                <div className="neo-progress-track h-3 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${trackBarColors[track.color] || trackBarColors.amber}`}
                    style={{ width: `${track.averageScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-6 text-xl font-bold">Top Skill Gaps</h2>
          <div className="space-y-3">
            {data.topSkillGaps.map((gap) => (
              <div key={gap.skill} className="neo-soft flex items-center justify-between rounded-xl p-4">
                <div>
                  <p className="neo-title font-semibold">{gap.skill}</p>
                  <p className="neo-muted text-xs">{gap.affectedCount} students affected</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColors[gap.priority]}`}>
                  {gap.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-3">
            <BookOpen size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Curriculum vs. Market</h2>
          </div>

          <div className="mb-4">
            <p className="neo-muted mb-2 text-xs font-semibold uppercase">Currently Taught</p>
            <div className="flex flex-wrap gap-2">
              {data.taughtSkills.map((s) => (
                <span key={s} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="neo-muted mb-2 text-xs font-semibold uppercase">Market Demands</p>
            <div className="flex flex-wrap gap-2">
              {data.marketDemandedSkills.map((s) => {
                const taught = data.taughtSkills.includes(s);
                return (
                  <span
                    key={s}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${taught ? "neo-badge-match" : "neo-badge-missing"}`}
                  >
                    {s}
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <p className="neo-muted mb-2 text-xs font-semibold uppercase">Curriculum Gaps</p>
            <div className="flex flex-wrap gap-2">
              {data.curriculumGap.map((s) => (
                <span key={s} className="neo-badge-missing rounded-full px-3 py-1 text-xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <Building2 size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">AI Recommendations</h2>
          </div>
          <ul className="space-y-3">
            {data.recommendations.map((rec, i) => (
              <li key={i} className="neo-soft flex items-start gap-3 rounded-xl p-4 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-slate-950">
                  {i + 1}
                </span>
                <span className="neo-text leading-6">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
