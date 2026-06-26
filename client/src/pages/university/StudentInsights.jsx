import { LineChart, Sparkles, TrendingUp, Users } from "lucide-react";
import { universityInsights } from "../../data/universityData.js";

export default function StudentInsights() {
  const data = universityInsights.studentInsights;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-4xl font-bold">Student Insights</h1>
        <p className="neo-text mt-2">Aggregated skills, career interests, and progress signals across the student cohort.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="neo-card rounded-2xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="neo-muted text-sm font-medium">Tracked Skills</p>
            <Sparkles size={18} className="text-amber-300" />
          </div>
          <h3 className="neo-title text-4xl font-bold">{data.skillClusters.length}</h3>
        </div>
        <div className="neo-card rounded-2xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="neo-muted text-sm font-medium">Interest Areas</p>
            <Users size={18} className="text-amber-300" />
          </div>
          <h3 className="neo-title text-4xl font-bold">{data.interestAreas.length}</h3>
        </div>
        <div className="neo-card rounded-2xl p-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="neo-muted text-sm font-medium">Readiness Trend</p>
            <TrendingUp size={18} className="text-amber-300" />
          </div>
          <h3 className="neo-title text-4xl font-bold">+13%</h3>
          <p className="neo-muted mt-1 text-xs">Since January mock baseline</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-5 text-xl font-bold">Aggregated Skill Strength</h2>
          <div className="space-y-4">
            {data.skillClusters.map((skill) => (
              <div key={skill.skill}>
                <div className="mb-2 flex items-center justify-between">
                  <p className="neo-text text-sm font-medium">{skill.skill}</p>
                  <p className="neo-muted text-xs">{skill.students} students · {skill.averageProgress}% avg</p>
                </div>
                <div className="neo-progress-track h-3 overflow-hidden rounded-full">
                  <div className="neo-progress-fill-alt h-full rounded-full" style={{ width: `${skill.averageProgress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-5 text-xl font-bold">Career Interest Demand</h2>
          <div className="space-y-3">
            {data.interestAreas.map((interest) => (
              <div key={interest.area} className="neo-soft flex items-center justify-between rounded-xl p-4">
                <div>
                  <p className="neo-title font-semibold">{interest.area}</p>
                  <p className="neo-muted text-xs">{interest.students} students interested</p>
                </div>
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                  {interest.growth}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <LineChart size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Progress Timeline</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            {data.progressTimeline.map((point) => (
              <div key={point.month} className="neo-soft rounded-2xl p-4">
                <p className="neo-muted mb-3 text-xs font-semibold uppercase">{point.month}</p>
                <Metric label="Readiness" value={point.readiness} />
                <Metric label="Portfolio" value={point.portfolio} />
                <Metric label="Interview" value={point.interview} />
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6 lg:col-span-2">
          <h2 className="neo-title mb-4 text-xl font-bold">Cohort Highlights</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {data.cohortHighlights.map((highlight) => (
              <div key={highlight} className="neo-soft rounded-2xl p-5">
                <p className="neo-text text-sm leading-6">{highlight}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1 flex items-center justify-between">
        <span className="neo-muted text-[11px]">{label}</span>
        <span className="text-[11px] font-semibold text-amber-300">{value}%</span>
      </div>
      <div className="neo-progress-track h-1.5 overflow-hidden rounded-full">
        <div className="neo-progress-fill h-full rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
