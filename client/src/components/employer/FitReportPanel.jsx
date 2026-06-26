import { useEffect, useState } from "react";
import {
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Mic,
} from "lucide-react";
import { generateFitReport } from "../../lib/mock-ai.js";
import { getEmployabilityScore, scoreDimensions } from "../../data/employabilityScore.js";

const recStyles = {
  recommend: { label: "Recommend", className: "neo-good" },
  consider: { label: "Consider", className: "neo-blue" },
  decline: { label: "Decline", className: "neo-danger" },
};

function fitScoreClass(score) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-rose-300";
}

export default function FitReportPanel({ candidate, compact = false }) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setReport(null);
    setError(null);
  }, [candidate?.name, candidate?.fitScore]);

  async function handleGenerate() {
    if (!candidate || loading) return;
    setLoading(true);
    setError(null);
    try {
      const result = await generateFitReport({
        name: candidate.name,
        fitScore: candidate.fitScore,
        role: candidate.role,
        personaId: candidate.personaId,
      });
      setReport(result);
    } catch {
      setError("Could not generate fit report. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!candidate) return null;

  const employability = report?.personaId
    ? getEmployabilityScore(report.personaId)
    : null;
  const recommendation = report
    ? recStyles[report.hiringRecommendation] ?? recStyles.consider
    : null;

  return (
    <div className={compact ? "space-y-4" : "space-y-6"}>
      {!report && !loading && (
        <button
          type="button"
          onClick={handleGenerate}
          className="neo-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
        >
          <Sparkles size={16} />
          Generate AI Fit Report
        </button>
      )}

      {loading && (
        <div className="neo-soft flex flex-col items-center justify-center rounded-xl px-4 py-8 text-center">
          <Loader2 size={32} className="animate-spin text-amber-400" />
          <p className="neo-title mt-4 text-sm font-semibold">Analyzing candidate fit…</p>
          <p className="neo-muted mt-1 text-xs">
            Comparing profile, skills, and role requirements
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-rose-300" role="alert">
          {error}
        </p>
      )}

      {report && !loading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <p className="neo-muted flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
              <Sparkles size={13} className="text-amber-300" />
              AI-generated report
            </p>
            <button
              type="button"
              onClick={handleGenerate}
              className="neo-muted cursor-pointer text-xs font-medium hover:text-amber-300"
            >
              Regenerate
            </button>
          </div>

          <div className="neo-soft rounded-xl p-4 text-center">
            <p className={`text-3xl font-bold tabular-nums ${fitScoreClass(report.fitScore)}`}>
              {report.fitScore}%
            </p>
            <p className="neo-muted text-xs">Overall fit score</p>
            {recommendation && (
              <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${recommendation.className}`}>
                {recommendation.label}
              </span>
            )}
          </div>

          <p className="neo-text text-sm leading-6">{report.summary}</p>
          <p className="neo-muted text-[11px] leading-4">
            Uses the same explainable model as the candidate dashboard — skills, portfolio, interview, and market fit.
          </p>

          {employability && (
            <div>
              <p className="neo-muted mb-2 text-[11px] font-semibold uppercase tracking-wider">
                Explainable score breakdown
              </p>
              <div className="space-y-2.5">
                {employability.dimensions.map((dim) => (
                  <div key={dim.key}>
                    <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                      <span className="neo-text font-medium">{dim.label}</span>
                      <span className="font-bold text-amber-300">{dim.value}%</span>
                    </div>
                    <div className="neo-progress-track h-1.5 overflow-hidden rounded-full">
                      <div className="neo-progress-fill h-full rounded-full" style={{ width: `${dim.value}%` }} />
                    </div>
                    {!compact && (
                      <p className="neo-muted mt-1 text-[11px] leading-4">{dim.why}</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="neo-muted mt-2 text-[10px]">
                Weighted: {scoreDimensions.map((d) => `${Math.round(d.weight * 100)}% ${d.label.split(" ")[0]}`).join(" · ")}
              </p>
            </div>
          )}

          <div>
            <p className="neo-muted mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider">
              <CheckCircle2 size={12} className="text-emerald-300" />
              Matched
            </p>
            <div className="flex flex-wrap gap-1.5">
              {report.matchedRequirements.map((item) => (
                <span key={item} className="neo-badge-match rounded-full px-2 py-0.5 text-[10px] font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="neo-muted mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider">
              <AlertTriangle size={12} className="text-rose-300" />
              Gaps
            </p>
            <div className="flex flex-wrap gap-1.5">
              {report.missingRequirements.map((item) => (
                <span key={item} className="neo-badge-missing rounded-full px-2 py-0.5 text-[10px] font-medium">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {!compact && (
            <>
              <div className="grid grid-cols-1 gap-3">
                <div className="neo-soft rounded-lg p-3">
                  <p className="neo-muted mb-1 text-[10px] font-semibold uppercase">Strengths</p>
                  <ul className="neo-text space-y-1 text-xs leading-5">
                    {report.strengths.map((item) => (
                      <li key={item}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="neo-soft rounded-lg p-3">
                  <p className="neo-muted mb-1 text-[10px] font-semibold uppercase">Risks</p>
                  <ul className="neo-text space-y-1 text-xs leading-5">
                    {report.risks.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="neo-text text-xs">
                <span className="font-semibold text-amber-300">Growth potential: </span>
                {report.growthPotential}
              </p>

              <div>
                <p className="neo-muted mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider">
                  <Mic size={12} />
                  Interview suggestions
                </p>
                <ul className="neo-text space-y-1 text-xs leading-5">
                  {report.interviewSuggestions.map((item) => (
                    <li key={item}>→ {item}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
