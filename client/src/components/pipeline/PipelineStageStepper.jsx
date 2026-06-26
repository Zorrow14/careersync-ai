import { STAGE_FLOW, stageIcons, stageAccent } from "./PipelineFunnel.jsx";

export default function PipelineStageStepper({ currentStage }) {
  const isRejected = currentStage === "Rejected";
  const currentIndex = STAGE_FLOW.indexOf(currentStage);

  return (
    <div className="neo-pipeline-stepper">
      <p className="neo-muted mb-3 text-[11px] font-semibold uppercase tracking-wider">Progress</p>
      <ol className="flex items-center gap-1">
        {STAGE_FLOW.map((stage, i) => {
          const Icon = stageIcons[stage];
          const done = !isRejected && currentIndex > i;
          const active = !isRejected && currentIndex === i;
          const upcoming = isRejected || currentIndex < i;

          return (
            <li key={stage} className="flex min-w-0 flex-1 items-center">
              <div
                className={`flex flex-col items-center gap-1 ${active ? stageAccent[stage] : ""}`}
                title={stage}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs transition ${
                    done
                      ? "border-emerald-500/50 bg-emerald-500/15 text-emerald-300"
                      : active
                        ? "border-amber-500/60 bg-amber-500/20 text-amber-300 ring-2 ring-amber-500/25"
                        : upcoming
                          ? "border-slate-600/40 bg-slate-800/30 text-slate-500"
                          : ""
                  }`}
                >
                  <Icon size={14} aria-hidden="true" />
                </span>
                <span
                  className={`hidden truncate text-[9px] font-medium sm:block ${
                    active ? "text-amber-300" : "neo-muted"
                  }`}
                >
                  {stage}
                </span>
              </div>
              {i < STAGE_FLOW.length - 1 && (
                <div
                  className={`mx-0.5 h-0.5 flex-1 rounded-full ${
                    done ? "bg-emerald-500/40" : "bg-slate-600/30"
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
      {isRejected && (
        <p className="mt-2 text-xs font-medium text-rose-300">Candidate removed from active pipeline</p>
      )}
    </div>
  );
}
