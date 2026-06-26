import { useState } from "react";
import {
  Building2,
  BookOpen,
  Download,
  FileSpreadsheet,
  FileText,
  Globe,
  Loader2,
  RefreshCcw,
  Sparkles,
  TrendingUp,
  Users,
  WandSparkles,
} from "lucide-react";
import { generateUniversityInsights } from "../../lib/mock-ai.js";
import { getCohortEmployabilityDimensions, getCohortEmployabilityTotal } from "../../data/cohortEmployability.js";
import { universityInsights } from "../../data/universityData.js";
import PageHeader from "../../components/ui/PageHeader.jsx";

const reportIcons = { PDF: FileText, CSV: FileSpreadsheet, XLSX: FileSpreadsheet };
const statusColors = {
  Ready: "bg-emerald-500/15 text-emerald-300",
  Generating: "bg-amber-500/15 text-amber-300",
};
const priorityColors = { high: "neo-danger", medium: "neo-blue", low: "neo-soft" };
const trackBarColors = {
  amber: "neo-progress-fill",
  blue: "neo-progress-fill-stone",
  emerald: "neo-progress-fill-emerald",
  purple: "neo-progress-fill-purple",
  rose: "neo-progress-fill-rose",
};

export default function Reports() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const outcomes = universityInsights.outcomeMetrics;
  const sdgMetrics = universityInsights.sdgMetrics;
  const reports = universityInsights.reports;
  const tracker = universityInsights.employabilityTracker.summary;

  async function handleGenerate() {
    setLoading(true);
    try {
      const result = await generateUniversityInsights();
      setInsights(result);
    } finally {
      setLoading(false);
    }
  }

  const cohortDimensions = insights ? getCohortEmployabilityDimensions() : [];
  const cohortScore = insights ? getCohortEmployabilityTotal() : 0;

  return (
    <div>
      <PageHeader
        eyebrow="University Portal"
        title="AI Insights & Reports"
        description="Generate AI-powered cohort analysis, track graduate outcomes, and export reports for stakeholders."
      />

      {/* ─── AI Cohort Insights (generate flow) ─── */}
      <section className="neo-card mb-8 rounded-2xl p-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
              <WandSparkles size={24} />
            </div>
            <div>
              <h2 className="neo-title text-xl font-bold">AI Cohort Insights</h2>
              <p className="neo-muted mt-1 max-w-2xl text-sm leading-6">
                Analyze aggregated student profiles, job match results, and employer demand signals.
                Produces readiness scores, skill gaps, and curriculum recommendations — no individual student data is exposed.
              </p>
            </div>
          </div>
          {insights && !loading && (
            <button
              type="button"
              onClick={handleGenerate}
              className="neo-secondary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
            >
              <RefreshCcw size={16} />
              Regenerate
            </button>
          )}
        </div>

        {!insights && !loading && (
          <div className="neo-soft flex flex-col items-center rounded-2xl px-6 py-12 text-center">
            <Sparkles size={36} className="text-amber-300" />
            <h3 className="neo-title mt-4 text-lg font-bold">Run your first cohort analysis</h3>
            <p className="neo-muted mt-2 max-w-md text-sm leading-6">
              This is separate from the live dashboard — click below when you need a full AI breakdown for faculty meetings or accreditation.
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              className="neo-primary mt-6 flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
            >
              <Sparkles size={18} />
              Generate AI Cohort Insights
            </button>
          </div>
        )}

        {loading && (
          <div className="neo-soft flex flex-col items-center rounded-2xl px-6 py-12 text-center">
            <Loader2 size={44} className="animate-spin text-amber-400" />
            <h3 className="neo-title mt-6 text-lg font-bold">Analyzing cohort data…</h3>
            <p className="neo-muted mt-2 max-w-md text-sm">
              Aggregating readiness scores, skill gaps, and curriculum alignment across{" "}
              {universityInsights.totalStudents} students.
            </p>
            <div className="neo-progress-track mt-8 h-2 w-64 overflow-hidden rounded-full">
              <div className="neo-progress-fill-alt h-full animate-pulse rounded-full" style={{ width: "72%" }} />
            </div>
          </div>
        )}

        {insights && !loading && (
          <div className="space-y-6">
            <div className="neo-good flex items-center gap-3 rounded-2xl px-5 py-4 text-sm">
              <Sparkles size={18} className="shrink-0" />
              <span>
                <strong className="font-semibold">Analysis complete</strong> — {insights.totalStudents} students
                analyzed · {insights.studentsNeedingSupport} flagged for support · avg. readiness{" "}
                {insights.averageReadinessScore}%
              </span>
            </div>

            <div className="neo-soft rounded-2xl p-5">
              <h3 className="neo-title font-bold">AI Cohort Summary</h3>
              <p className="neo-text mt-2 leading-7">{insights.summary}</p>
              {insights.strongestTracks?.length > 0 && (
                <p className="neo-muted mt-3 text-sm">
                  Strongest tracks:{" "}
                  <span className="text-amber-300">{insights.strongestTracks.join(", ")}</span>
                </p>
              )}
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="neo-title text-lg font-bold">Explainable Cohort Score</h3>
                <div className="text-right">
                  <p className="neo-title text-2xl font-bold text-amber-300">{cohortScore}%</p>
                  <p className="neo-muted text-[10px]">Shared employability model</p>
                </div>
              </div>
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

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="neo-soft rounded-2xl p-5">
                <h3 className="neo-title mb-4 font-bold">Track Performance</h3>
                <div className="space-y-4">
                  {insights.trackBreakdown.map((track) => (
                    <div key={track.track}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="neo-text font-medium">{track.track}</span>
                        <span className="neo-muted text-xs">
                          {track.studentCount} students · {track.averageScore}%
                        </span>
                      </div>
                      <div className="neo-progress-track h-2.5 overflow-hidden rounded-full">
                        <div
                          className={`h-full rounded-full ${trackBarColors[track.color] || trackBarColors.amber}`}
                          style={{ width: `${track.averageScore}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="neo-soft rounded-2xl p-5">
                <h3 className="neo-title mb-4 font-bold">Top Skill Gaps</h3>
                <div className="space-y-3">
                  {insights.topSkillGaps.slice(0, 6).map((gap) => (
                    <div key={gap.skill} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                      <div>
                        <p className="neo-title text-sm font-semibold">{gap.skill}</p>
                        <p className="neo-muted text-xs">{gap.affectedCount} students affected</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColors[gap.priority]}`}>
                        {gap.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="neo-soft rounded-2xl p-5">
                <div className="mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-amber-300" />
                  <h3 className="neo-title font-bold">Curriculum vs. Market</h3>
                </div>
                <div className="mb-3">
                  <p className="neo-muted mb-2 text-xs font-semibold uppercase">Curriculum Gaps</p>
                  <div className="flex flex-wrap gap-2">
                    {insights.curriculumGap.map((s) => (
                      <span key={s} className="neo-badge-missing rounded-full px-3 py-1 text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="neo-muted mb-2 text-xs font-semibold uppercase">Market Demands</p>
                  <div className="flex flex-wrap gap-2">
                    {insights.marketDemandedSkills.map((s) => {
                      const taught = insights.taughtSkills.includes(s);
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
              </div>

              <div className="neo-soft rounded-2xl p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Building2 size={18} className="text-amber-300" />
                  <h3 className="neo-title font-bold">AI Recommendations</h3>
                </div>
                <ul className="space-y-3">
                  {insights.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3 rounded-xl bg-white/5 p-3 text-sm">
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
        )}
      </section>

      {/* ─── Graduate outcomes ─── */}
      <section className="neo-card mb-8 rounded-2xl p-6">
        <div className="mb-5 flex items-center gap-3">
          <TrendingUp size={22} className="text-amber-300" />
          <div>
            <h2 className="neo-title text-xl font-bold">Graduate Outcome Summary</h2>
            <p className="neo-muted text-sm">{outcomes.lifelongTracking}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: "Employed (6 mo.)",
              value: `${tracker.employabilityRate}%`,
              detail: `${tracker.employedCount.toLocaleString()} graduates`,
            },
            {
              label: "Intern → Full-time",
              value: `${outcomes.internshipConversionRate}%`,
              detail: `${outcomes.internshipToFullTime} conversions`,
            },
            {
              label: "Postgrad study",
              value: `${Math.round((tracker.furtherStudy / tracker.totalGraduatesTracked) * 100)}%`,
              detail: `${tracker.furtherStudy} graduates`,
            },
            {
              label: "Actively seeking",
              value: `${Math.round((tracker.stillSeeking / tracker.totalGraduatesTracked) * 100)}%`,
              detail: `${tracker.stillSeeking} graduates`,
            },
          ].map((item) => (
            <div key={item.label} className="neo-soft rounded-xl p-4">
              <p className="neo-muted text-xs">{item.label}</p>
              <p className="neo-title mt-1 text-2xl font-bold">{item.value}</p>
              <p className="neo-muted mt-1 text-[11px]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SDG metrics ─── */}
      <section className="neo-card mb-8 rounded-2xl p-6">
        <div className="mb-5 flex items-center gap-3">
          <Globe size={22} className="text-emerald-300" />
          <h2 className="neo-title text-xl font-bold">SDG Impact Metrics</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {sdgMetrics.map((m) => (
            <div key={`${m.code}-${m.metric}`} className="neo-soft rounded-xl p-4">
              <span className="rounded-lg bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-300">
                {m.code}
              </span>
              <p className="neo-title mt-2 font-semibold">{m.metric}</p>
              <p className="neo-gradient-text mt-1 text-2xl font-bold">{m.value}</p>
              <p className="neo-muted mt-2 text-xs leading-5">{m.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Exportable reports ─── */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="neo-title text-xl font-bold">Exportable Reports</h2>
          <p className="neo-muted text-sm">Download reports for deans, program directors, and career services</p>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="neo-muted">
            <strong className="text-amber-300">{reports.filter((r) => r.status === "Ready").length}</strong> ready
          </span>
          <span className="neo-muted flex items-center gap-1">
            <Users size={14} />
            {tracker.totalGraduatesTracked.toLocaleString()} alumni tracked
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {reports.map((report) => {
          const Icon = reportIcons[report.type] || FileText;
          const ready = report.status === "Ready";

          return (
            <article key={report.title} className="neo-card rounded-2xl p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="neo-title text-lg font-bold">{report.title}</h3>
                    <p className="neo-muted mt-1 text-sm">{report.audience}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[report.status]}`}>
                  {report.status}
                </span>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
                <div className="neo-soft rounded-xl p-3">
                  <p className="neo-muted text-xs">Format</p>
                  <p className="neo-title mt-1 font-semibold">{report.type}</p>
                </div>
                <div className="neo-soft rounded-xl p-3">
                  <p className="neo-muted text-xs">Period</p>
                  <p className="neo-title mt-1 font-semibold">{report.period}</p>
                </div>
              </div>

              <div className="mb-5">
                <p className="neo-muted mb-2 text-xs font-semibold uppercase">Included Metrics</p>
                <div className="flex flex-wrap gap-2">
                  {report.metrics.map((metric) => (
                    <span key={metric} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!ready}
                onClick={() => {
                  if (ready) alert(`${report.title} download started. This is a mock prototype action.`);
                }}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  ready ? "neo-primary cursor-pointer" : "neo-secondary cursor-not-allowed opacity-60"
                }`}
              >
                {ready ? <Download size={17} /> : <RefreshCcw size={17} />}
                {ready ? "Download Report" : "Generating Report"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
