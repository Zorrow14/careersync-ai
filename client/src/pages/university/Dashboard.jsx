import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Handshake,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { universityInsights } from "../../data/universityData.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import KpiCard from "../../components/ui/KpiCard.jsx";

const trackBarColors = {
  amber: "neo-progress-fill",
  blue: "neo-progress-fill-stone",
  emerald: "neo-progress-fill-emerald",
  rose: "neo-progress-fill-rose",
};

const portalModules = [
  {
    to: "/university/tracker",
    label: "Employability Tracker",
    desc: "Post-graduation employment rates and alumni outcomes",
    icon: GraduationCap,
  },
  {
    to: "/university/students",
    label: "Student Insights",
    desc: "Skill clusters, interests, and cohort progress",
    icon: Users,
  },
  {
    to: "/university/curriculum",
    label: "Curriculum Insights",
    desc: "Module gaps and market alignment",
    icon: BookOpen,
  },
  {
    to: "/university/trends",
    label: "Industry Trends",
    desc: "In-demand roles, salaries, and technologies",
    icon: TrendingUp,
  },
  {
    to: "/university/reports",
    label: "AI Insights & Reports",
    desc: "Generate cohort analysis and export reports",
    icon: Sparkles,
    accent: true,
  },
];

export default function UniversityDashboard() {
  const data = universityInsights;
  const tracker = data.employabilityTracker.summary;
  const timeline = data.studentInsights.progressTimeline;

  return (
    <div>
      <PageHeader
        eyebrow="University Portal"
        title="Dashboard"
        description={`${data.institutionName} · ${data.activePrograms} active programs · Semester overview`}
      />

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Enrolled Students" value={data.totalStudents} icon={Users} to="/university/students" />
        <KpiCard
          label="Employability Rate"
          value={`${tracker.employabilityRate}%`}
          hint={`${tracker.employedCount.toLocaleString()} alumni employed within 6 months`}
          icon={TrendingUp}
          to="/university/tracker"
        />
        <KpiCard
          label="Internship Ready"
          value={data.internshipReady}
          hint="Students ready for placement this semester"
          icon={BriefcaseBusiness}
        />
        <KpiCard
          label="Employer Partners"
          value={data.employerPartnerships}
          hint="Active hiring partnerships"
          icon={Handshake}
        />
      </div>

      <div className="neo-card mb-8 rounded-2xl p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="neo-title text-xl font-bold">Portal Modules</h2>
            <p className="neo-muted text-sm">Jump to any section — data loads instantly, no setup required</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portalModules.map((mod) => (
            <Link
              key={mod.to}
              to={mod.to}
              className={`neo-soft group flex items-start gap-4 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:bg-white/5 ${
                mod.accent ? "border border-amber-500/25" : ""
              }`}
            >
              <div
                className={`rounded-xl p-3 ${mod.accent ? "bg-amber-500/20 text-amber-300" : "bg-amber-500/15 text-amber-300"}`}
              >
                <mod.icon size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="neo-title flex items-center gap-2 font-semibold">
                  {mod.label}
                  <ArrowRight
                    size={14}
                    className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </p>
                <p className="neo-muted mt-1 text-sm leading-6">{mod.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="neo-title text-xl font-bold">Current Cohort Snapshot</h2>
              <p className="neo-muted text-sm">
                {data.readinessPercentage}% above readiness threshold · {data.studentsNeedingSupport} need support
              </p>
            </div>
            <Link
              to="/university/students"
              className="neo-secondary flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold"
            >
              Details <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.employabilityOverview.map((item) => (
              <div key={item.label} className="neo-soft rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="neo-title text-sm font-semibold">{item.label}</p>
                  <span className="font-bold text-amber-300">{item.value}%</span>
                </div>
                <div className="neo-progress-track mb-2 h-2 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${trackBarColors[item.color] || trackBarColors.amber}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <p className="neo-muted text-xs">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="neo-title text-xl font-bold">Semester Progress</h2>
              <p className="neo-muted text-sm">Readiness, portfolio, and interview readiness trends</p>
            </div>
            <Link
              to="/university/students"
              className="neo-secondary flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold"
            >
              View <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { key: "readiness", label: "Avg. Readiness", color: "neo-progress-fill" },
              { key: "portfolio", label: "Portfolio Complete", color: "neo-progress-fill-emerald" },
              { key: "interview", label: "Interview Ready", color: "neo-progress-fill-stone" },
            ].map((metric) => {
              const latest = timeline[timeline.length - 1][metric.key];
              return (
                <div key={metric.key}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="neo-text font-medium">{metric.label}</span>
                    <span className="font-bold text-amber-300">{latest}%</span>
                  </div>
                  <div className="neo-progress-track h-2.5 overflow-hidden rounded-full">
                    <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${latest}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {timeline.map((point) => (
              <span key={point.month} className="neo-muted rounded-lg px-2 py-1 text-xs">
                {point.month}: {point.readiness}%
              </span>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="neo-title text-xl font-bold">Need deeper analysis?</h2>
                <p className="neo-text mt-1 max-w-xl text-sm leading-6">
                  Run AI cohort insights for skill gaps, curriculum alignment, and actionable recommendations —
                  separate from this live dashboard overview.
                </p>
              </div>
            </div>
            <Link
              to="/university/reports"
              className="neo-primary flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              <FileText size={16} />
              Go to AI Insights & Reports
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
