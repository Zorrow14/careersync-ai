import {
  BriefcaseBusiness,
  Building2,
  Clock,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import { universityInsights } from "../../data/universityData.js";

const barColors = {
  amber: "neo-progress-fill",
  blue: "neo-progress-fill-stone",
  emerald: "neo-progress-fill-emerald",
  rose: "neo-progress-fill-rose",
};

export default function EmployabilityTracker() {
  const { employabilityTracker: data } = universityInsights;
  const { summary } = data;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-4xl font-bold">Employability Tracker</h1>
        <p className="neo-text mt-2 max-w-3xl leading-7">
          Post-graduation employment outcomes for <strong className="text-amber-300">{data.institutionName}</strong> alumni
          — {data.reportingPeriod}. {data.definition}
        </p>
      </div>

      <div className="neo-good mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl px-5 py-4 text-sm">
        <div className="flex items-center gap-2">
          <Building2 size={18} className="shrink-0 text-amber-300" />
          <span>
            <strong className="font-semibold">{data.institutionName}</strong> employability rate
          </span>
        </div>
        <span className="neo-muted hidden sm:inline">·</span>
        <span>
          National benchmark: <strong className="text-amber-300">{summary.nationalBenchmark}%</strong>
        </span>
        <span className="neo-muted hidden sm:inline">·</span>
        <span className="text-emerald-300">
          {summary.yearOverYearChange} vs. last academic year
        </span>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Employability Rate",
            value: `${summary.employabilityRate}%`,
            detail: "Graduates employed within 6 months",
            icon: TrendingUp,
            accent: true,
          },
          {
            label: "Graduates Tracked",
            value: summary.totalGraduatesTracked.toLocaleString(),
            detail: data.reportingPeriod,
            icon: GraduationCap,
          },
          {
            label: "Employed Alumni",
            value: summary.employedCount.toLocaleString(),
            detail: `${Math.round((summary.employedCount / summary.totalGraduatesTracked) * 100)}% of tracked cohort`,
            icon: BriefcaseBusiness,
          },
          {
            label: "Avg. Time to Job",
            value: `${summary.avgTimeToEmploymentMonths} mo`,
            detail: "Among employed graduates",
            icon: Clock,
          },
        ].map((kpi) => (
          <div key={kpi.label} className="neo-card rounded-2xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="neo-muted text-sm font-medium">{kpi.label}</p>
              <kpi.icon size={18} className="text-amber-300" />
            </div>
            <h3 className={`neo-title text-4xl font-bold ${kpi.accent ? "text-amber-300" : ""}`}>
              {kpi.value}
            </h3>
            <p className="neo-muted mt-1 text-xs">{kpi.detail}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <GraduationCap size={20} className="text-amber-300" />
            <div>
              <h2 className="neo-title text-xl font-bold">Employability by Graduation Year</h2>
              <p className="neo-muted text-sm">How many graduates from each class secured employment within 6 months</p>
            </div>
          </div>
          <div className="space-y-4">
            {data.cohortByYear.map((cohort) => (
              <div key={cohort.year}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <p className="neo-title text-sm font-semibold">Class of {cohort.year}</p>
                    {cohort.status === "in-window" && (
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">
                        Tracking in progress
                      </span>
                    )}
                  </div>
                  <p className="neo-muted text-xs">
                    {cohort.employed} / {cohort.graduates} employed · <span className="font-bold text-amber-300">{cohort.rate}%</span>
                  </p>
                </div>
                <div className="neo-progress-track h-3 overflow-hidden rounded-full">
                  <div className="neo-progress-fill h-full rounded-full" style={{ width: `${cohort.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <Building2 size={20} className="text-amber-300" />
            <div>
              <h2 className="neo-title text-xl font-bold">By Faculty</h2>
              <p className="neo-muted text-sm">Employability rate per school at {data.institutionName}</p>
            </div>
          </div>
          <div className="space-y-4">
            {data.byFaculty.map((faculty, i) => (
              <div key={faculty.faculty}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="neo-text text-sm font-medium">{faculty.faculty}</p>
                  <p className="neo-muted shrink-0 text-xs">
                    {faculty.employed}/{faculty.graduates} · <span className="font-bold text-amber-300">{faculty.rate}%</span>
                  </p>
                </div>
                <div className="neo-progress-track h-2.5 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${barColors[["emerald", "amber", "blue", "rose", "amber"][i % 5]]}`}
                    style={{ width: `${faculty.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <BriefcaseBusiness size={20} className="text-amber-300" />
            <div>
              <h2 className="neo-title text-xl font-bold">Graduate Outcomes</h2>
              <p className="neo-muted text-sm">Where alumni landed after leaving {data.institutionName}</p>
            </div>
          </div>
          <div className="space-y-3">
            {data.employmentOutcomes.map((outcome) => (
              <div key={outcome.outcome} className="neo-soft rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="neo-title text-sm font-semibold">{outcome.outcome}</p>
                  <span className="text-sm font-bold text-amber-300">{outcome.rate}%</span>
                </div>
                <p className="neo-muted text-xs">{outcome.count.toLocaleString()} graduates</p>
                <div className="neo-progress-track mt-3 h-2 overflow-hidden rounded-full">
                  <div className="neo-progress-fill-stone h-full rounded-full" style={{ width: `${outcome.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-3">
            <Clock size={20} className="text-amber-300" />
            <div>
              <h2 className="neo-title text-xl font-bold">Time to Employment</h2>
              <p className="neo-muted text-sm">How quickly graduates from this university found work after completing their degree</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {data.timeToEmployment.map((slot) => (
              <div key={slot.window} className="neo-soft rounded-2xl p-5 text-center">
                <Users size={20} className="mx-auto mb-3 text-amber-300" />
                <p className="neo-title text-2xl font-bold text-amber-300">{slot.rate}%</p>
                <p className="neo-muted mt-1 text-xs">{slot.count.toLocaleString()} graduates</p>
                <p className="neo-text mt-2 text-sm font-medium">{slot.window}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
