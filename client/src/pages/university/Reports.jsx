import { Download, FileSpreadsheet, FileText, RefreshCcw } from "lucide-react";
import { universityInsights } from "../../data/universityData.js";

const reportIcons = {
  PDF: FileText,
  CSV: FileSpreadsheet,
  XLSX: FileSpreadsheet,
};

const statusColors = {
  Ready: "bg-emerald-500/15 text-emerald-300",
  Generating: "bg-amber-500/15 text-amber-300",
};

export default function Reports() {
  const reports = universityInsights.reports;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-4xl font-bold">Reports</h1>
        <p className="neo-text mt-2">Downloadable summaries and analytics exports for university stakeholders.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="neo-card rounded-2xl p-6">
          <p className="neo-muted text-sm font-medium">Available Reports</p>
          <h3 className="neo-title mt-3 text-4xl font-bold">{reports.filter((r) => r.status === "Ready").length}</h3>
        </div>
        <div className="neo-card rounded-2xl p-6">
          <p className="neo-muted text-sm font-medium">Formats</p>
          <h3 className="neo-title mt-3 text-4xl font-bold">PDF / CSV / XLSX</h3>
        </div>
        <div className="neo-card rounded-2xl p-6">
          <p className="neo-muted text-sm font-medium">Latest Period</p>
          <h3 className="neo-title mt-3 text-4xl font-bold">June 2026</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {reports.map((report) => {
          const Icon = reportIcons[report.type] || FileText;
          const ready = report.status === "Ready";

          return (
            <article key={report.title} className="neo-card rounded-2xl p-6">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h2 className="neo-title text-xl font-bold">{report.title}</h2>
                    <p className="neo-muted mt-1 text-sm">{report.audience}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[report.status]}`}>
                  {report.status}
                </span>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-3 text-sm">
                <div className="neo-soft rounded-xl p-3">
                  <p className="neo-muted text-xs">Format</p>
                  <p className="neo-title mt-1 font-semibold">{report.type}</p>
                </div>
                <div className="neo-soft rounded-xl p-3">
                  <p className="neo-muted text-xs">Period</p>
                  <p className="neo-title mt-1 font-semibold">{report.period}</p>
                </div>
              </div>

              <div className="mb-5">
                <p className="neo-muted mb-2 text-xs font-semibold uppercase">Included Metrics</p>
                <div className="flex flex-wrap gap-2">
                  {report.metrics.map((metric) => (
                    <span key={metric} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                disabled={!ready}
                onClick={() => {
                  if (ready) alert(`${report.title} download started. This is a mock prototype action.`);
                }}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${ready ? "neo-primary" : "neo-secondary cursor-not-allowed opacity-60"
                  }`}
              >
                {ready ? <Download size={17} /> : <RefreshCcw size={17} />}
                {ready ? "Download Report" : "Generating Report"}
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
