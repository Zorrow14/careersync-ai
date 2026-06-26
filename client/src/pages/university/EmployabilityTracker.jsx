import { AlertTriangle, BriefcaseBusiness, GraduationCap, Target } from "lucide-react";
import { universityInsights } from "../../data/universityData.js";

const barColors = {
  amber: "neo-progress-fill",
  blue: "neo-progress-fill-stone",
  emerald: "neo-progress-fill-emerald",
  rose: "neo-progress-fill-rose",
};

const severityColors = {
  high: "neo-danger",
  medium: "neo-blue",
  low: "neo-soft",
};

export default function EmployabilityTracker() {
  const data = universityInsights.readinessTracker;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-4xl font-bold">Employability Tracker</h1>
        <p className="neo-text mt-2">Monitor readiness, internship movement, graduate outcomes, and support priorities.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        {data.readinessBands.map((band) => (
          <div key={band.band} className="neo-card rounded-2xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="neo-muted text-sm font-medium">{band.band}</p>
              <Target size={18} className="text-amber-300" />
            </div>
            <h3 className="neo-title text-4xl font-bold">{band.count}</h3>
            <p className="neo-muted mt-1 text-xs">Readiness score {band.range}</p>
            <div className="neo-progress-track mt-4 h-2 overflow-hidden rounded-full">
              <div
                className={`h-full rounded-full ${barColors[band.color]}`}
                style={{ width: `${(band.count / universityInsights.totalStudents) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <BriefcaseBusiness size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Internship Pipeline</h2>
          </div>
          <div className="space-y-4">
            {data.internshipPipeline.map((stage) => (
              <div key={stage.stage}>
                <div className="mb-2 flex items-center justify-between">
                  <p className="neo-text text-sm font-medium">{stage.stage}</p>
                  <p className="neo-muted text-xs">{stage.count} students · {stage.rate}%</p>
                </div>
                <div className="neo-progress-track h-3 overflow-hidden rounded-full">
                  <div className="neo-progress-fill h-full rounded-full" style={{ width: `${stage.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <GraduationCap size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Graduate Outcomes</h2>
          </div>
          <div className="space-y-4">
            {data.graduateOutcomes.map((outcome) => (
              <div key={outcome.outcome} className="neo-soft rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="neo-title font-semibold">{outcome.outcome}</p>
                  <span className="text-sm font-bold text-amber-300">{outcome.rate}%</span>
                </div>
                <p className="neo-muted text-xs">{outcome.count} students in this outcome group</p>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <AlertTriangle size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Intervention Queue</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {data.interventionQueue.map((item) => (
              <div key={`${item.studentGroup}-${item.issue}`} className="neo-soft rounded-2xl p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="neo-title font-semibold">{item.studentGroup}</h3>
                    <p className="neo-muted mt-1 text-sm">{item.issue}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityColors[item.severity]}`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-sm font-semibold text-amber-300">{item.students} students need attention</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
