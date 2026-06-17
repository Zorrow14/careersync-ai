import { Building2 } from "lucide-react";

export default function UniversityDashboard() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-4xl font-bold">University Dashboard</h1>
        <p className="neo-text mt-2">
          Cohort readiness, skill gap maps, and curriculum insights — coming in Phase 11.
        </p>
      </div>

      <div className="neo-card flex flex-col items-center justify-center rounded-2xl p-16 text-center">
        <div className="mb-4 rounded-2xl bg-blue-500/10 p-5 text-blue-300">
          <Building2 size={36} />
        </div>
        <h2 className="neo-title text-xl font-semibold">
          University features under construction
        </h2>
        <p className="neo-muted mt-2 max-w-sm text-sm">
          Readiness dashboards, heatmaps, and curriculum gap analysis will be
          available here.
        </p>
      </div>
    </div>
  );
}
