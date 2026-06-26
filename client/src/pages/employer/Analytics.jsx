import {
  TrendingUp,
  Users,
  Clock,
  Percent,
} from "lucide-react";
import { hiringAnalytics } from "../../data/employerData.js";
import ApplicationsTrendChart from "../../components/charts/ApplicationsTrendChart.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import KpiCard from "../../components/ui/KpiCard.jsx";

export default function Analytics() {
  const data = hiringAnalytics;

  return (
    <div>
      <PageHeader
        eyebrow="Hiring Analytics"
        title="Recruitment Insights"
        description="Hiring trends, skill demand, source performance, and conversion rates."
      />

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        {[
          { label: "Total Applications", value: data.totalApplications, icon: Users },
          { label: "Total Hired", value: data.totalHired, icon: TrendingUp },
          { label: "Avg. Time to Hire", value: data.avgTimeToHire, icon: Clock },
          { label: "Offer Accept Rate", value: data.offerAcceptRate, icon: Percent },
        ].map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ApplicationsTrendChart months={data.applicationsByMonth} />

        {/* ─── Top Demanded Skills ─── */}
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-6 text-xl font-bold">Most Demanded Skills</h2>
          <div className="space-y-4">
            {data.topDemandedSkills.map((s) => (
              <div key={s.skill}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="neo-text font-medium">{s.skill}</span>
                  <span className="neo-muted">{s.demand}%</span>
                </div>
                <div className="neo-progress-track h-2.5 overflow-hidden rounded-full">
                  <div className="neo-progress-fill-alt h-full rounded-full" style={{ width: `${s.demand}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Source Breakdown ─── */}
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-6 text-xl font-bold">Application Sources</h2>
          <div className="space-y-4">
            {data.sourceBreakdown.map((s) => (
              <div key={s.source} className="neo-soft flex items-center justify-between rounded-xl p-4">
                <div>
                  <p className="neo-title text-sm font-semibold">{s.source}</p>
                  <p className="neo-muted text-xs">{s.count} applications</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="neo-progress-track h-2 w-24 overflow-hidden rounded-full">
                    <div className="neo-progress-fill-alt h-full rounded-full" style={{ width: `${s.percentage}%` }} />
                  </div>
                  <span className="text-sm font-bold text-amber-300">{s.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Pipeline Conversion ─── */}
        <div className="neo-card rounded-2xl p-6">
          <h2 className="neo-title mb-6 text-xl font-bold">Pipeline Conversion Rates</h2>
          <div className="space-y-4">
            {data.stageConversion.map((s) => (
              <div key={s.stage}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="neo-text font-medium">{s.stage}</span>
                  <span className="font-bold text-amber-300">{s.rate}%</span>
                </div>
                <div className="neo-progress-track h-3 overflow-hidden rounded-full">
                  <div className="neo-progress-fill-emerald h-full rounded-full" style={{ width: `${s.rate}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Role Performance ─── */}
      <div className="neo-card mt-6 rounded-2xl p-6">
        <h2 className="neo-title mb-6 text-xl font-bold">Performance by Role</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/30">
                <th className="neo-muted pb-3 text-left font-medium">Role</th>
                <th className="neo-muted pb-3 text-center font-medium">Applications</th>
                <th className="neo-muted pb-3 text-center font-medium">Hired</th>
                <th className="neo-muted pb-3 text-center font-medium">Avg. Fit Score</th>
                <th className="neo-muted pb-3 text-center font-medium">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {data.rolePerformance.map((r) => (
                <tr key={r.role} className="border-b border-slate-700/10">
                  <td className="neo-title py-4 font-semibold">{r.role}</td>
                  <td className="neo-text py-4 text-center">{r.applications}</td>
                  <td className="py-4 text-center font-bold text-emerald-300">{r.hired}</td>
                  <td className="py-4 text-center font-bold text-amber-300">{r.avgFitScore}%</td>
                  <td className="py-4 text-center">
                    <span className="neo-good rounded-full px-3 py-1 text-xs font-semibold">
                      {Math.round((r.hired / r.applications) * 100)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
