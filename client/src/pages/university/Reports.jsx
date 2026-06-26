import { Download, FileSpreadsheet, FileText, RefreshCcw, TrendingUp, Globe, Users } from "lucide-react";
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
  const outcomes = universityInsights.outcomeMetrics;
  const sdgMetrics = universityInsights.sdgMetrics;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">University Portal</p>
        <h1 className="neo-title text-3xl font-bold sm:text-4xl">Reports & Outcomes</h1>
        <p className="neo-text mt-2">
          Lifelong outcome tracking, graduate employment metrics, and SDG-aligned impact reports.
        </p>
      </div>

      {/* Lifelong outcome loop */}
      <div className="neo-card mb-8 rounded-2xl p-6">
        <div className="mb-5 flex items-center gap-3">
          <TrendingUp size={22} className="text-amber-300" />
          <h2 className="neo-title text-xl font-bold">Lifelong Outcome Loop</h2>
        </div>
        <p className="neo-muted mb-5 text-sm">
          {outcomes.lifelongTracking} — universities keep visibility after students graduate.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Employed (6 mo.)", value: `${outcomes.employedWithin6MonthsRate}%`, detail: `${outcomes.employedWithin6Months} graduates` },
            { label: "Intern → Full-time", value: `${outcomes.internshipConversionRate}%`, detail: `${outcomes.internshipToFullTime} conversions` },
            { label: "Postgrad study", value: "12%", detail: `${outcomes.postgraduateStudy} students` },
            { label: "Actively seeking", value: "22%", detail: `${outcomes.activelySeeking} students` },
          ].map((item) => (
            <div key={item.label} className="neo-soft rounded-xl p-4">
              <p className="neo-muted text-xs">{item.label}</p>
              <p className="neo-title mt-1 text-2xl font-bold">{item.value}</p>
              <p className="neo-muted mt-1 text-[11px]">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SDG impact metrics */}
      <div className="neo-card mb-8 rounded-2xl p-6">
        <div className="mb-5 flex items-center gap-3">
          <Globe size={22} className="text-emerald-300" />
          <h2 className="neo-title text-xl font-bold">SDG Impact Metrics</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {sdgMetrics.map((m) => (
            <div key={`${m.code}-${m.metric}`} className="neo-soft rounded-xl p-4">
              <span className="rounded-lg bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-300">
                {m.code}
              </span>
              <p className="neo-title mt-2 font-semibold">{m.metric}</p>
              <p className="neo-gradient-text mt-1 text-2xl font-bold">{m.value}</p>
              <p className="neo-muted mt-2 text-xs leading-5">{m.detail}</p>
            </div>
          ))}
        </div>
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
          <div className="flex items-center justify-between">
            <div>
              <p className="neo-muted text-sm font-medium">Alumni Tracked</p>
              <h3 className="neo-title mt-3 text-4xl font-bold">156</h3>
            </div>
            <Users size={28} className="text-amber-300" />
          </div>
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
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  ready ? "neo-primary" : "neo-secondary cursor-not-allowed opacity-60"
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
