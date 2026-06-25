import {
  Building2,
  Users,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  BookOpen,
  Target,
} from "lucide-react";
import { universityInsights } from "../../data/universityData.js";

const priorityColors = { high: "neo-danger", medium: "neo-blue", low: "neo-soft" };
const trackBarColors = {
  amber: "from-amber-500 to-amber-300",
  blue: "from-blue-500 to-blue-300",
  emerald: "from-emerald-500 to-emerald-300",
  purple: "from-purple-500 to-purple-300",
  rose: "from-rose-500 to-rose-300",
};

export default function UniversityDashboard() {
  const data = universityInsights;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-4xl font-bold">Cohort Readiness Dashboard</h1>
        <p className="neo-text mt-2">{data.institutionName}</p>
      </div>

      {/* ─── Top Stats ─── */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        {[
          { label: "Total Students", value: data.totalStudents, icon: Users },
          { label: "Avg. Readiness", value: `${data.averageReadinessScore}%`, icon: TrendingUp },
          { label: "Industry Ready", value: `${data.readinessPercentage}%`, icon: Target },
          { label: "Need Support", value: data.studentsNeedingSupport, icon: AlertTriangle },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="neo-card rounded-2xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="neo-muted text-sm font-medium">{label}</p>
              <Icon size={18} className="text-amber-300" />
            </div>
            <h3 className="neo-title text-4xl font-bold">{value}</h3>
          </div>
        ))}
      </div>

      {/* ─── Summary ─── */}
      <div className="neo-card mb-8 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 className="neo-title text-xl font-bold">AI Cohort Summary</h2>
            <p className="neo-text mt-2 leading-7">{data.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* ─── Track Breakdown ─── */}
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-6 text-xl font-bold">Track Performance</h2>
          <div className="space-y-5">
            {data.trackBreakdown.map((track) => (
              <div key={track.track}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="neo-text text-sm font-medium">{track.track}</span>
                  <span className="neo-muted text-xs">{track.studentCount} students · {track.averageScore}%</span>
                </div>
                <div className="neo-progress-track h-3 rounded-full">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${trackBarColors[track.color] || trackBarColors.amber}`}
                    style={{ width: `${track.averageScore}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Top Skill Gaps ─── */}
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

        {/* ─── Curriculum Gap ─── */}
        <div className="neo-card rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-3">
            <BookOpen size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Curriculum vs. Market</h2>
          </div>

          <div className="mb-4">
            <p className="neo-muted mb-2 text-xs font-semibold uppercase">Currently Taught</p>
            <div className="flex flex-wrap gap-2">
              {data.taughtSkills.map((s) => (
                <span key={s} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="neo-muted mb-2 text-xs font-semibold uppercase">Market Demands</p>
            <div className="flex flex-wrap gap-2">
              {data.marketDemandedSkills.map((s) => {
                const taught = data.taughtSkills.includes(s);
                return (
                  <span key={s} className={`rounded-full px-3 py-1 text-xs font-medium ${taught ? "neo-badge-match" : "neo-badge-missing"}`}>
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
                <span key={s} className="neo-badge-missing rounded-full px-3 py-1 text-xs font-medium">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Recommendations ─── */}
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-4 text-xl font-bold">AI Recommendations</h2>
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
