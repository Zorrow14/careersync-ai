import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft, Sparkles, X } from "lucide-react";
import CandidateProfileView from "../../components/employer/CandidateProfileView.jsx";
import FitReportPanel from "../../components/employer/FitReportPanel.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { findEmployerCandidate, getCandidateProfileView } from "../../data/employerCandidates.js";

function BackLink({ to, label }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="neo-muted flex cursor-pointer items-center gap-2 text-sm font-medium transition hover:text-amber-300"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}

export default function CandidateProfile() {
  const { candidateId } = useParams();
  const location = useLocation();
  const [showFitReport, setShowFitReport] = useState(false);

  const candidate = useMemo(() => findEmployerCandidate(candidateId), [candidateId]);
  const view = useMemo(
    () => (candidate ? getCandidateProfileView(candidate) : null),
    [candidate]
  );

  if (!candidate || !view) {
    return (
      <div>
        <BackLink to="/employer/talent" label="Back to talent discovery" />
        <EmptyState
          title="Candidate not found"
          description="This profile may have been removed or the link is invalid."
          action={
            <Link to="/employer/talent" className="neo-primary inline-flex rounded-xl px-4 py-2 text-sm font-semibold">
              Browse talent
            </Link>
          }
        />
      </div>
    );
  }

  const fromApplications = location.state?.from === "/employer/applications";
  const backTo = fromApplications
    ? "/employer/applications"
    : candidate.context === "pipeline"
      ? "/employer/pipeline"
      : "/employer/talent";
  const backLabel = fromApplications
    ? "Back to applications"
    : candidate.context === "pipeline"
      ? "Back to pipeline"
      : "Back to talent discovery";

  const fitCandidate = {
    name: candidate.name,
    fitScore: candidate.fitScore,
    role: view.role,
    personaId: view.personaId,
  };

  return (
    <div className="mx-auto max-w-5xl pb-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <BackLink to={backTo} label={backLabel} />
        <button
          type="button"
          onClick={() => setShowFitReport(true)}
          className="neo-primary flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
        >
          <Sparkles size={16} />
          AI Fit Report
        </button>
      </div>

      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Candidate Profile</p>
        <h1 className="neo-title text-4xl font-bold">{candidate.name}</h1>
        <p className="neo-text mt-2">
          Read-only career profile shared via CareerSync — skills, portfolio, and employability signals.
        </p>
      </div>

      <CandidateProfileView view={view} />

      {showFitReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="employer-fit-report-title"
          onClick={() => setShowFitReport(false)}
        >
          <div
            className="neo-card flex max-h-[min(90vh,calc(100dvh-2rem))] w-full max-w-lg flex-col overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-6 pb-4">
              <div>
                <p className="text-sm font-semibold text-amber-300">Explainable Fit Report</p>
                <h2 id="employer-fit-report-title" className="neo-title text-xl font-bold">
                  {candidate.name}
                </h2>
                <p className="neo-muted text-sm">{view.role}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowFitReport(false)}
                className="neo-muted cursor-pointer rounded-lg p-2 hover:bg-white/5 hover:text-amber-300"
                aria-label="Close fit report"
              >
                <X size={20} />
              </button>
            </div>
            <div className="neo-scroll-hidden min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              <FitReportPanel compact candidate={fitCandidate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
