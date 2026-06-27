import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import {
  roadmaps,
  getRoadmapNodeIds,
  findRoadmapNode,
  getBranchProgress,
} from "../../data/roadmapData.js";
import { recordScoreBoost, getScoreBoost } from "../../lib/scoreProgress.js";
import RoadmapGraph from "../../components/roadmap/RoadmapGraph.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";

function progressPercent(completed, total) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export default function Roadmap() {
  const { personaId } = usePersona();
  const roadmap = roadmaps[personaId];
  const graph = roadmap.graph;

  const allNodeIds = useMemo(() => getRoadmapNodeIds(graph), [graph]);
  const [completed, setCompleted] = useState(() => new Set());
  const [selectedId, setSelectedId] = useState(graph.branches[0]?.id ?? "root");

  useEffect(() => {
    recordScoreBoost(personaId, "roadmap", 4);
  }, [personaId]);

  const boost = getScoreBoost(personaId);
  const doneCount = allNodeIds.filter((id) => completed.has(id)).length;
  const progress = progressPercent(doneCount, allNodeIds.length);
  const selected = findRoadmapNode(graph, selectedId);

  function toggleNode(id) {
    if (id === "root") return;
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div>
      <PageHeader
        eyebrow="Personalized Career Roadmap"
        title={roadmap.title}
        description={`${roadmap.duration} learning path toward ${graph.rootLabel} readiness.`}
      />

      {boost > 0 && (
        <p className="neo-good mb-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium">
          <TrendingUp size={16} />
          Following this roadmap adds +{boost}% to your employability score
        </p>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="neo-card rounded-2xl p-5">
          <p className="neo-muted text-xs font-medium">Progress</p>
          <p className="roadmap-stat-accent neo-title mt-1 text-3xl font-bold">{progress}%</p>
          <div className="neo-progress-track mt-3 h-2 overflow-hidden rounded-full">
            <div
              className="neo-progress-fill h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="neo-muted mt-2 text-xs">
            {doneCount} of {allNodeIds.length} topics
          </p>
        </div>
        <div className="neo-card rounded-2xl p-5">
          <p className="neo-muted text-xs font-medium">Employability score</p>
          <div className="mt-2 flex items-end gap-2">
            <p className="neo-title text-3xl font-bold">{roadmap.currentScore}%</p>
            <ArrowRight size={18} className="mb-2 neo-muted" aria-hidden="true" />
            <p className="roadmap-stat-projected neo-title text-3xl font-bold">
              {roadmap.projectedScore}%
            </p>
          </div>
          <p className="neo-muted mt-2 text-xs">If you complete this plan</p>
        </div>
        <div className="neo-card rounded-2xl p-5">
          <p className="neo-muted text-xs font-medium">Plan</p>
          <p className="neo-title mt-1 text-3xl font-bold">{graph.branches.length}</p>
          <p className="neo-muted mt-2 text-xs">
            phases · {roadmap.duration}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
        <div className="neo-card overflow-hidden rounded-2xl p-4 sm:p-5">
          <RoadmapGraph
            graph={graph}
            completed={completed}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onToggle={toggleNode}
          />
        </div>

        <aside className="neo-card h-fit rounded-2xl p-5 xl:sticky xl:top-24">
          {selected ? (
            <>
              <p className="neo-muted text-xs">
                {selected.type === "root"
                  ? graph.rootLabel
                  : selected.phase || selected.type}
              </p>
              <h2 className="neo-title mt-1 text-lg font-bold">
                {selected.type === "skill" ? selected.label : selected.milestone || selected.label}
              </h2>

              {selected.effort && selected.type !== "root" && (
                <p className="neo-muted mt-2 text-xs">{selected.effort}</p>
              )}

              {selected.type === "skill" && (
                <p className="neo-muted mt-1 text-sm">{selected.milestone}</p>
              )}

              <p className="neo-text mt-4 text-sm leading-7">{selected.description}</p>

              {selected.outcome && (
                <p className="neo-muted mt-4 border-l-2 border-[var(--neo-accent)] pl-3 text-sm leading-6">
                  {selected.outcome}
                </p>
              )}

              {selected.type === "root" && selected.branches && (
                <ul className="mt-5 space-y-1">
                  {selected.branches.map((b) => {
                    const bp = getBranchProgress(b, completed);
                    return (
                      <li key={b.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedId(b.id)}
                          className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-white/5 ${
                            selectedId === b.id ? "neo-soft" : ""
                          }`}
                        >
                          <span className="neo-text">{b.milestone}</span>
                          <span className="neo-muted text-xs">{bp.percent}%</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {selected.skills?.length > 0 && (
                <div className="mt-5">
                  <p className="neo-muted mb-2 text-xs font-medium">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.skills.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedId(`${selected.id}:${s}`)}
                        className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium ${
                          completed.has(`${selected.id}:${s}`)
                            ? "neo-badge-match"
                            : "neo-soft"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selected.tasks?.length > 0 && (
                <div className="mt-5">
                  <p className="neo-muted mb-2 text-xs font-medium">Deliverables</p>
                  <ul className="neo-text space-y-2 text-sm">
                    {selected.tasks.map((task) => (
                      <li key={task} className="flex gap-2">
                        <span className="roadmap-stat-accent mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neo-accent)]" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.resources?.length > 0 && (
                <div className="mt-5">
                  <p className="neo-muted mb-2 text-xs font-medium">Resources</p>
                  <ul className="neo-muted space-y-1 text-sm">
                    {selected.resources.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedId !== "root" && (
                <button
                  type="button"
                  onClick={() => toggleNode(selectedId)}
                  className={`mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
                    completed.has(selectedId) ? "neo-secondary" : "neo-primary"
                  }`}
                >
                  <CheckCircle2 size={16} />
                  {completed.has(selectedId) ? "Mark incomplete" : "Mark complete"}
                </button>
              )}
            </>
          ) : (
            <p className="neo-muted text-sm">Select a topic on the roadmap.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
