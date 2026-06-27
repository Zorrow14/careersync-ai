import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutGrid,
  List,
  Calendar,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  XCircle,
  User,
} from "lucide-react";
import { pipelineCandidates, pipelineStages, resolvePersonaId } from "../../data/employerData.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import PipelineFunnel, { stageIcons, stageAccent } from "../../components/pipeline/PipelineFunnel.jsx";
import PipelineStageStepper from "../../components/pipeline/PipelineStageStepper.jsx";
import FitReportPanel from "../../components/employer/FitReportPanel.jsx";

const activeStages = pipelineStages.filter((s) => s !== "Rejected");

function fitScoreClass(score) {
  if (score >= 80) return "text-emerald-300";
  if (score >= 60) return "text-amber-300";
  return "text-rose-300";
}

function fitBarClass(score) {
  if (score >= 80) return "neo-progress-fill-success";
  if (score >= 60) return "neo-progress-fill";
  return "neo-progress-fill-danger";
}

export default function Pipeline() {
  const [candidates, setCandidates] = useState(pipelineCandidates);
  const [selectedId, setSelectedId] = useState(pipelineCandidates[0]?.id ?? null);
  const [view, setView] = useState("board");
  const [toast, setToast] = useState(null);

  const selected = candidates.find((c) => c.id === selectedId);

  const stageCounts = useMemo(() => {
    const counts = {};
    for (const stage of pipelineStages) {
      counts[stage] = candidates.filter((c) => c.stage === stage).length;
    }
    return counts;
  }, [candidates]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  function moveStage(id, newStage) {
    const person = candidates.find((c) => c.id === id);
    if (!person || person.stage === newStage) return;
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c))
    );
    setToast(`${person.name} moved to ${newStage}`);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Candidate Pipeline"
        title="Hiring Pipeline"
        description="Track candidates through application stages, spot drop-offs, and advance top fits with explainable scores."
        actions={
          <div className="flex rounded-xl border border-white/10 p-1">
            <button
              type="button"
              onClick={() => setView("board")}
              aria-pressed={view === "board"}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                view === "board" ? "bg-amber-500 text-slate-950" : "neo-muted hover:text-amber-300"
              }`}
            >
              <LayoutGrid size={14} aria-hidden="true" />
              Board
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                view === "list" ? "bg-amber-500 text-slate-950" : "neo-muted hover:text-amber-300"
              }`}
            >
              <List size={14} aria-hidden="true" />
              List
            </button>
          </div>
        }
      />

      <PipelineFunnel stageCounts={stageCounts} />

      {toast && (
        <div className="neo-pipeline-toast mb-4 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium" role="status">
          <CheckCircle2 size={16} className="text-emerald-300" aria-hidden="true" />
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="min-w-0">
          {view === "board" ? (
            <>
              <div className="neo-pipeline-board flex gap-4 overflow-x-auto pb-3">
                {activeStages.map((stage) => {
                  const Icon = stageIcons[stage];
                  const stageCandidates = candidates.filter((c) => c.stage === stage);
                  return (
                    <section
                      key={stage}
                      className={`neo-pipeline-column ${stageAccent[stage]} flex min-h-[420px] w-[min(100%,260px)] shrink-0 flex-col rounded-2xl`}
                      aria-label={`${stage} stage, ${stageCandidates.length} candidates`}
                    >
                      <header className="flex items-center justify-between gap-2 border-b border-white/5 px-4 py-3">
                        <span className="flex items-center gap-2 text-sm font-bold">
                          <Icon size={16} aria-hidden="true" />
                          {stage}
                        </span>
                        <span className="neo-pipeline-count rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums">
                          {stageCandidates.length}
                        </span>
                      </header>
                      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-3">
                        {stageCandidates.map((c) => (
                          <CandidateCard
                            key={c.id}
                            candidate={c}
                            selected={selectedId === c.id}
                            onSelect={() => setSelectedId(c.id)}
                          />
                        ))}
                        {stageCandidates.length === 0 && (
                          <p className="neo-muted flex flex-1 items-center justify-center py-8 text-center text-xs">
                            Drop candidates here
                          </p>
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>

              {(stageCounts.Rejected ?? 0) > 0 && (
                <div className="neo-card mt-4 rounded-2xl p-4">
                  <p className="neo-muted mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
                    <XCircle size={14} className="text-rose-300" aria-hidden="true" />
                    Rejected ({stageCounts.Rejected})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {candidates
                      .filter((c) => c.stage === "Rejected")
                      .map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelectedId(c.id)}
                          className={`neo-pipeline-chip cursor-pointer ${
                            selectedId === c.id ? "ring-1 ring-rose-400/50" : ""
                          }`}
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/15 text-[10px] font-bold text-rose-300">
                            {c.avatar}
                          </span>
                          <span className="neo-muted text-xs">{c.name}</span>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="neo-card overflow-hidden rounded-2xl">
              <table className="w-full text-sm">
                <caption className="sr-only">All candidates in hiring pipeline</caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="neo-muted px-4 py-3 text-left font-medium">Candidate</th>
                    <th className="neo-muted px-4 py-3 text-left font-medium">Role</th>
                    <th className="neo-muted hidden px-4 py-3 text-left font-medium sm:table-cell">Source</th>
                    <th className="neo-muted px-4 py-3 text-center font-medium">Fit</th>
                    <th className="neo-muted px-4 py-3 text-left font-medium">Stage</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedId(c.id)}
                      onKeyDown={(e) => e.key === "Enter" && setSelectedId(c.id)}
                      tabIndex={0}
                      className={`neo-pipeline-row cursor-pointer border-b border-white/5 transition ${
                        selectedId === c.id ? "bg-amber-500/8" : "hover:bg-white/5"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-300">
                            {c.avatar}
                          </span>
                          <span className="neo-title font-semibold">{c.name}</span>
                        </span>
                      </td>
                      <td className="neo-muted px-4 py-3">{c.role}</td>
                      <td className="neo-muted hidden px-4 py-3 sm:table-cell">{c.source}</td>
                      <td className={`px-4 py-3 text-center font-bold tabular-nums ${fitScoreClass(c.fitScore)}`}>
                        {c.fitScore}%
                      </td>
                      <td className="px-4 py-3">
                        <span className={`neo-pipeline-stage-pill ${stageAccent[c.stage]}`}>{c.stage}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <aside className="xl:sticky xl:top-24 xl:self-start">
          {selected ? (
            <div className="neo-card space-y-5 rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-lg font-bold text-slate-950">
                  {selected.avatar}
                </span>
                <div className="min-w-0">
                  <p className="neo-title truncate text-lg font-bold">{selected.name}</p>
                  <p className="neo-muted truncate text-sm">{selected.role}</p>
                </div>
              </div>

              <PipelineStageStepper currentStage={selected.stage} />

              <div className="neo-soft rounded-xl p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="neo-muted flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
                    <Sparkles size={13} className="text-amber-300" />
                    AI fit score
                  </p>
                  <span className={`text-2xl font-bold tabular-nums ${fitScoreClass(selected.fitScore)}`}>
                    {selected.fitScore}%
                  </span>
                </div>
                <div className="neo-progress-track h-2 overflow-hidden rounded-full">
                  <div
                    className={`h-full rounded-full ${fitBarClass(selected.fitScore)}`}
                    style={{ width: `${selected.fitScore}%` }}
                  />
                </div>
              </div>

              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="neo-muted">Source</dt>
                  <dd className="neo-text text-right font-medium">{selected.source}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="neo-muted flex items-center gap-1">
                    <Calendar size={13} /> Applied
                  </dt>
                  <dd className="neo-text font-medium">{selected.appliedDate}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="neo-muted">Current stage</dt>
                  <dd>
                    <span className={`neo-pipeline-stage-pill ${stageAccent[selected.stage]}`}>
                      {selected.stage}
                    </span>
                  </dd>
                </div>
              </dl>

              <div>
                <p className="neo-muted mb-2 text-[11px] font-semibold uppercase tracking-wider">Advance stage</p>
                <div className="flex flex-wrap gap-2">
                  {pipelineStages
                    .filter((s) => s !== selected.stage)
                    .map((s) => {
                      const Icon = stageIcons[s];
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => moveStage(selected.id, s)}
                          className="neo-secondary flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition hover:border-amber-500/30 hover:text-amber-300"
                        >
                          <Icon size={12} aria-hidden="true" />
                          {s}
                          <ArrowRight size={11} className="opacity-60" aria-hidden="true" />
                        </button>
                      );
                    })}
                </div>
              </div>

              <Link
                to={`/employer/candidates/${selected.id}`}
                className="neo-secondary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold"
              >
                <User size={15} />
                View full profile
              </Link>

              <div className="border-t border-white/10 pt-5">
                <FitReportPanel
                  compact
                  candidate={{
                    name: selected.name,
                    fitScore: selected.fitScore,
                    role: selected.role,
                    personaId: resolvePersonaId(selected.name),
                  }}
                />
              </div>
            </div>
          ) : (
            <EmptyState
              icon={Calendar}
              title="Select a candidate"
              description="Choose someone from the board or list to view their fit score and move them through stages."
            />
          )}
        </aside>
      </div>
    </div>
  );
}

function CandidateCard({ candidate, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`neo-pipeline-card w-full cursor-pointer rounded-xl p-3 text-left transition ${
        selected ? "neo-pipeline-card-active" : ""
      }`}
    >
      <div className="mb-2 flex items-start gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-300">
          {candidate.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <p className="neo-title truncate text-sm font-semibold">{candidate.name}</p>
          <p className="neo-muted truncate text-[11px]">{candidate.role}</p>
        </div>
        <span className={`shrink-0 text-sm font-bold tabular-nums ${fitScoreClass(candidate.fitScore)}`}>
          {candidate.fitScore}%
        </span>
      </div>
      <div className="neo-progress-track mb-2 h-1 overflow-hidden rounded-full">
        <div
          className={`h-full rounded-full ${fitBarClass(candidate.fitScore)}`}
          style={{ width: `${candidate.fitScore}%` }}
        />
      </div>
      <p className="neo-muted flex items-center gap-1 text-[10px]">
        <MapPin size={10} className="shrink-0 opacity-70" aria-hidden="true" />
        {candidate.source}
      </p>
    </button>
  );
}
