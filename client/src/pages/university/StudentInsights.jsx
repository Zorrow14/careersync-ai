import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  LineChart,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { universityInsights } from "../../data/universityData.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import KpiCard from "../../components/ui/KpiCard.jsx";

function SectionIntro({ title, description }) {
  return (
    <div className="mb-5">
      <h2 className="neo-title text-xl font-bold">{title}</h2>
      <p className="neo-muted mt-1 max-w-2xl text-sm leading-6">{description}</p>
    </div>
  );
}

export default function StudentInsights() {
  const { studentInsights: data, totalStudents, institutionName } = universityInsights;
  const timeline = data.progressTimeline;
  const firstMonth = timeline[0];
  const latestMonth = timeline[timeline.length - 1];
  const readinessGain = latestMonth.readiness - firstMonth.readiness;
  const topSkill = [...data.skillClusters].sort((a, b) => b.averageProgress - a.averageProgress)[0];
  const topInterest = [...data.interestAreas].sort((a, b) => b.students - a.students)[0];

  return (
    <div>
      <PageHeader
        eyebrow="University Portal"
        title="Student Insights"
        description="See what your current students are learning, which careers they want, and whether they are becoming more job-ready — all in one cohort view."
      />

      <div className="neo-soft mb-8 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="neo-title text-sm font-semibold">What this page is for</p>
            <p className="neo-text mt-2 text-sm leading-7">
              Use this page to understand your <strong className="text-amber-300">active student cohort</strong> at{" "}
              {institutionName}. It helps career advisors and faculty answer: What skills are students building? What
              jobs do they want? Is their readiness improving over the semester?
            </p>
            <p className="neo-muted mt-3 text-sm leading-6">
              This is <strong className="neo-text">not</strong> graduate employment data. For alumni job outcomes and
              placement rates, use{" "}
              <Link to="/university/tracker" className="font-semibold text-amber-300 hover:text-amber-200">
                Employability Tracker
              </Link>
              .
            </p>
          </div>
          <div className="neo-card shrink-0 rounded-xl p-4 lg:max-w-xs">
            <p className="neo-muted text-xs font-semibold uppercase tracking-wide">Good for</p>
            <ul className="neo-text mt-2 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Target size={14} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" />
                Course and workshop planning
              </li>
              <li className="flex items-start gap-2">
                <Compass size={14} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" />
                Career advising conversations
              </li>
              <li className="flex items-start gap-2">
                <BookOpen size={14} className="mt-0.5 shrink-0 text-amber-300" aria-hidden="true" />
                Spotting skills to strengthen in class
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Students in cohort"
          value={totalStudents}
          hint="All enrolled students included in this view"
          icon={Users}
        />
        <KpiCard
          label="Strongest skill area"
          value={topSkill.skill}
          hint={`${topSkill.averageProgress}% average progress · ${topSkill.students} students`}
          icon={Sparkles}
        />
        <KpiCard
          label="Most popular career path"
          value={topInterest.area}
          hint={`${topInterest.students} students interested · ${topInterest.growth} this semester`}
          icon={Compass}
        />
        <KpiCard
          label="Readiness improving"
          value={`+${readinessGain}%`}
          hint={`Job readiness rose from ${firstMonth.readiness}% (${firstMonth.month}) to ${latestMonth.readiness}% (${latestMonth.month})`}
          icon={TrendingUp}
          iconClassName="text-emerald-300"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="neo-card rounded-2xl p-6">
          <SectionIntro
            title="What skills are students building?"
            description="Average skill progress across the cohort. Higher bars mean more students have practiced and demonstrated that skill."
          />
          <div className="space-y-4">
            {data.skillClusters.map((skill) => (
              <div key={skill.skill}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="neo-text text-sm font-medium">{skill.skill}</p>
                  <p className="neo-muted shrink-0 text-xs">
                    {skill.students} students · {skill.averageProgress}% ready
                  </p>
                </div>
                <div
                  className="neo-progress-track h-3 overflow-hidden rounded-full"
                  role="progressbar"
                  aria-valuenow={skill.averageProgress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${skill.skill}: ${skill.averageProgress}% average progress`}
                >
                  <div
                    className="neo-progress-fill-alt h-full rounded-full"
                    style={{ width: `${skill.averageProgress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <SectionIntro
            title="What careers are students aiming for?"
            description="Career paths students selected in their profiles. Growth shows how interest changed this semester."
          />
          <div className="space-y-3">
            {data.interestAreas.map((interest) => (
              <div key={interest.area} className="neo-soft flex items-center justify-between gap-3 rounded-xl p-4">
                <div className="min-w-0">
                  <p className="neo-title font-semibold">{interest.area}</p>
                  <p className="neo-muted text-xs">{interest.students} students chose this path</p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {interest.growth} interest
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <LineChart size={20} className="text-amber-300" aria-hidden="true" />
                <h2 className="neo-title text-xl font-bold">Are students getting more job-ready?</h2>
              </div>
              <p className="neo-muted mt-1 max-w-3xl text-sm leading-6">
                Month-by-month cohort progress. <strong className="neo-text">Readiness</strong> = overall employability
                score. <strong className="neo-text">Portfolio</strong> = profile and project completeness.{" "}
                <strong className="neo-text">Interview</strong> = mock interview and communication prep.
              </p>
            </div>
            <Link
              to="/university/curriculum"
              className="neo-secondary flex shrink-0 items-center gap-2 self-start rounded-xl px-4 py-2 text-xs font-semibold"
            >
              Turn gaps into curriculum actions
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {timeline.map((point) => (
              <div key={point.month} className="neo-soft rounded-2xl p-4">
                <p className="neo-muted mb-3 text-xs font-semibold uppercase">{point.month} 2026</p>
                <Metric label="Readiness" hint="Overall job readiness" value={point.readiness} />
                <Metric label="Portfolio" hint="Profiles & projects" value={point.portfolio} />
                <Metric label="Interview" hint="Interview prep" value={point.interview} />
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6 lg:col-span-2">
          <SectionIntro
            title="Key takeaways for staff"
            description="Plain-language summaries you can use in advising meetings or program reviews."
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.cohortHighlights.map((highlight, index) => (
              <div key={highlight} className="neo-soft rounded-2xl p-5">
                <p className="neo-muted mb-2 text-xs font-semibold uppercase tracking-wide">
                  Insight {index + 1}
                </p>
                <p className="neo-text text-sm leading-6">{highlight}</p>
              </div>
            ))}
          </div>
          <div className="neo-good mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl px-4 py-3 text-sm">
            <GraduationCap size={16} className="shrink-0 text-amber-300" aria-hidden="true" />
            <span>
              Want graduate job outcomes instead?{" "}
              <Link to="/university/tracker" className="font-semibold text-amber-300 hover:text-amber-200">
                Open Employability Tracker
              </Link>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, hint, value }) {
  return (
    <div className="mb-3 last:mb-0" title={hint}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="neo-muted text-[11px]">{label}</span>
        <span className="text-[11px] font-semibold text-amber-300">{value}%</span>
      </div>
      <div
        className="neo-progress-track h-1.5 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${value}%`}
      >
        <div className="neo-progress-fill h-full rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
