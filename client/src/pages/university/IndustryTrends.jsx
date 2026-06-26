import { Banknote, BriefcaseBusiness, Cpu, TrendingUp } from "lucide-react";
import { universityInsights } from "../../data/universityData.js";

export default function IndustryTrends() {
  const data = universityInsights.industryTrends;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-4xl font-bold">Industry Trends</h1>
        <p className="neo-text mt-2">Mock labor-market signals for roles, technologies, and salary expectations.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <BriefcaseBusiness size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">In-Demand Roles</h2>
          </div>
          <div className="space-y-4">
            {data.inDemandRoles.map((role) => (
              <div key={role.role} className="neo-soft rounded-2xl p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="neo-title font-semibold">{role.role}</p>
                    <p className="neo-muted text-xs">Median salary {role.medianSalary}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {role.growth}
                  </span>
                </div>
                <div className="neo-progress-track h-3 overflow-hidden rounded-full">
                  <div className="neo-progress-fill h-full rounded-full" style={{ width: `${role.demand}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <Cpu size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Technology Demand</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {data.technologies.map((tech) => (
              <div key={tech.tech} className="neo-soft rounded-2xl p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="neo-title font-semibold">{tech.tech}</p>
                  <span className="text-xs font-semibold text-amber-300">{tech.salaryLift}</span>
                </div>
                <p className="neo-muted mb-2 text-xs">Demand index</p>
                <div className="neo-progress-track h-2 overflow-hidden rounded-full">
                  <div className="neo-progress-fill-stone h-full rounded-full" style={{ width: `${tech.demand}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <Banknote size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Salary Bands</h2>
          </div>
          <div className="space-y-3">
            {data.salaryBands.map((band) => (
              <div key={band.level} className="neo-soft rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <p className="neo-title font-semibold">{band.level}</p>
                  <p className="text-sm font-bold text-amber-300">RM {band.min.toLocaleString()} - RM {band.max.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <TrendingUp size={20} className="text-amber-300" />
            <h2 className="neo-title text-xl font-bold">Market Signals</h2>
          </div>
          <div className="space-y-3">
            {data.marketSignals.map((signal, index) => (
              <div key={signal} className="neo-soft flex items-start gap-3 rounded-xl p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-slate-950">
                  {index + 1}
                </span>
                <p className="neo-text text-sm leading-6">{signal}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
