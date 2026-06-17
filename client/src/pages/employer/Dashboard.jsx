import { Briefcase } from "lucide-react";

export default function EmployerDashboard() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Employer Portal</p>
        <h1 className="neo-title text-4xl font-bold">Employer Dashboard</h1>
        <p className="neo-text mt-2">
          Smart talent matching and candidate fit reports — coming in Phase 10.
        </p>
      </div>

      <div className="neo-card flex flex-col items-center justify-center rounded-2xl p-16 text-center">
        <div className="mb-4 rounded-2xl bg-amber-500/10 p-5 text-amber-300">
          <Briefcase size={36} />
        </div>
        <h2 className="neo-title text-xl font-semibold">
          Employer features under construction
        </h2>
        <p className="neo-muted mt-2 max-w-sm text-sm">
          Job descriptions, candidate matching, fit reports, and pipeline board
          will be available here.
        </p>
      </div>
    </div>
  );
}
