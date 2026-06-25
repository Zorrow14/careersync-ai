import { useState } from "react";
import {
  Briefcase,
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { employerJobs, fitReports } from "../../data/employerData.js";

const recColors = {
  recommend: "neo-good",
  consider: "neo-blue",
  decline: "neo-danger",
};
const recLabels = {
  recommend: "Recommended",
  consider: "Consider",
  decline: "Not a fit",
};

export default function EmployerDashboard() {
  const [expandedJob, setExpandedJob] = useState(employerJobs[0].id);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const totalCandidates = new Set(
    employerJobs.flatMap((j) => j.candidates.map((c) => c.personaId))
  ).size;
  const avgFit = Math.round(
    employerJobs.reduce((s, j) => s + j.candidates.reduce((a, c) => a + c.fitScore, 0), 0) /
    employerJobs.reduce((s, j) => s + j.candidates.length, 0)
  );
  const recommended = employerJobs.flatMap((j) =>
    j.candidates.filter((c) => c.recommendation === "recommend")
  ).length;

  const report = selectedCandidate ? fitReports[selectedCandidate] : null;

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Employer Portal</p>
        <h1 className="neo-title text-4xl font-bold">Talent Dashboard</h1>
        <p className="neo-text mt-2">
          AI-powered candidate matching and fit reports for your open positions.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">
        {[
          { label: "Open Positions", value: employerJobs.length, icon: Briefcase },
          { label: "Candidates", value: totalCandidates, icon: Users },
          { label: "Avg. Fit Score", value: `${avgFit}%`, icon: TrendingUp },
          { label: "Recommended", value: recommended, icon: CheckCircle2 },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="neo-card rounded-2xl p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="neo-muted text-sm font-medium">{label}</p>
              <Icon size={18} className="text-amber-300" />
            </div>
            <h3 className="neo-title text-4xl font-bold">{value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Jobs + candidate list */}
        <div className="space-y-4 lg:col-span-2">
          {employerJobs.map((job) => {
            const open = expandedJob === job.id;
            return (
              <div key={job.id} className="neo-card rounded-2xl">
                <button
                  onClick={() => setExpandedJob(open ? null : job.id)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-500/15 p-2 text-amber-300">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <p className="neo-title font-semibold">{job.title}</p>
                      <p className="neo-muted text-sm">{job.company} · {job.location}</p>
                    </div>
                  </div>
                  {open ? <ChevronUp size={18} className="neo-muted" /> : <ChevronDown size={18} className="neo-muted" />}
                </button>

                {open && (
                  <div className="border-t border-slate-700/30 p-6 pt-4">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {job.requiredSkills.map((s) => (
                        <span key={s} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">{s}</span>
                      ))}
                      {job.preferredSkills.map((s) => (
                        <span key={s} className="neo-soft rounded-full px-3 py-1 text-xs font-medium neo-muted">{s} (preferred)</span>
                      ))}
                    </div>

                    <div className="space-y-3">
                      {job.candidates.map((c) => (
                        <button
                          key={c.personaId}
                          onClick={() => setSelectedCandidate(c.personaId)}
                          className={`neo-soft flex w-full items-center justify-between rounded-xl p-4 text-left transition hover:bg-white/5 ${
                            selectedCandidate === c.personaId ? "ring-1 ring-amber-500/40" : ""
                          }`}
                        >
                          <div>
                            <p className="neo-title font-semibold">{c.name}</p>
                            <p className="neo-muted text-xs">{c.topStrength}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-amber-300">{c.fitScore}%</span>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${recColors[c.recommendation]}`}>
                              {recLabels[c.recommendation]}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Fit report panel */}
        <div className="space-y-6">
          {report ? (
            <>
              <div className="neo-card rounded-2xl p-6 text-center">
                <p className="neo-muted text-sm">Candidate Fit Score</p>
                <h2 className="neo-title mt-2 text-5xl font-bold text-amber-300">{report.fitScore}%</h2>
                <span className={`mt-2 inline-block rounded-full px-4 py-1 text-sm font-semibold ${recColors[report.hiringRecommendation]}`}>
                  {recLabels[report.hiringRecommendation]}
                </span>
              </div>

              <div className="neo-card rounded-2xl p-6">
                <h3 className="neo-title mb-3 font-bold">AI Fit Report</h3>
                <p className="neo-text text-sm leading-7">{report.summary}</p>

                <div className="mt-4 space-y-3">
                  <div className="neo-good rounded-xl p-3 text-sm">
                    <p className="mb-1 flex items-center gap-1 font-semibold"><CheckCircle2 size={14} /> Strengths</p>
                    <ul className="list-inside list-disc space-y-1">{report.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                  <div className="neo-danger rounded-xl p-3 text-sm">
                    <p className="mb-1 flex items-center gap-1 font-semibold"><AlertCircle size={14} /> Risks</p>
                    <ul className="list-inside list-disc space-y-1">{report.risks.map((r) => <li key={r}>{r}</li>)}</ul>
                  </div>
                </div>

                <p className="neo-muted mt-4 text-xs">
                  <span className="font-semibold text-amber-300">Growth potential: </span>
                  {report.growthPotential}
                </p>
              </div>

              <div className="neo-card rounded-2xl p-6">
                <h3 className="neo-title mb-3 font-bold">Interview Tips</h3>
                <ul className="neo-text space-y-2 text-sm">
                  {report.interviewSuggestions.map((tip) => (
                    <li key={tip}>→ {tip}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="neo-card flex flex-col items-center justify-center rounded-2xl p-12 text-center">
              <Users size={36} className="neo-muted" />
              <p className="neo-muted mt-4 text-sm">Select a candidate to view their AI fit report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
