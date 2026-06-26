import {
  Inbox,
  Filter,
  Video,
  FileCheck,
  Trophy,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { hiringAnalytics } from "../../data/employerData.js";

const STAGE_FLOW = ["Applied", "Screening", "Interview", "Offer", "Hired"];

const stageIcons = {
  Applied: Inbox,
  Screening: Filter,
  Interview: Video,
  Offer: FileCheck,
  Hired: Trophy,
  Rejected: XCircle,
};

const stageAccent = {
  Applied: "neo-pipeline-applied",
  Screening: "neo-pipeline-screening",
  Interview: "neo-pipeline-interview",
  Offer: "neo-pipeline-offer",
  Hired: "neo-pipeline-hired",
  Rejected: "neo-pipeline-rejected",
};

export { stageIcons, stageAccent, STAGE_FLOW };

export default function PipelineFunnel({ stageCounts }) {
  const conversions = hiringAnalytics.stageConversion;

  return (
    <div className="neo-pipeline-funnel neo-card mb-6 rounded-2xl p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="neo-title text-lg font-bold">Pipeline funnel</h2>
          <p className="neo-muted text-sm">Stage volume and conversion rates across your active hiring flow</p>
        </div>
        <p className="neo-muted text-xs">
          <span className="font-semibold text-amber-300">
            {stageCounts.Hired ?? 0}
          </span>{" "}
          hired of{" "}
          <span className="font-semibold">{Object.values(stageCounts).reduce((a, b) => a + b, 0)}</span>{" "}
          in pipeline
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
        {STAGE_FLOW.map((stage, i) => {
          const Icon = stageIcons[stage];
          const count = stageCounts[stage] ?? 0;
          const maxInFlow = Math.max(...STAGE_FLOW.map((s) => stageCounts[s] ?? 0), 1);
          const widthPct = Math.max(28, (count / maxInFlow) * 100);
          const conversion = conversions[i];

          return (
            <div key={stage} className="flex min-w-0 flex-1 items-center gap-2">
              <div className={`neo-pipeline-funnel-stage ${stageAccent[stage]} min-w-0 flex-1 rounded-xl p-3`}>
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold">
                    <Icon size={14} aria-hidden="true" />
                    {stage}
                  </span>
                  <span className="text-lg font-bold tabular-nums">{count}</span>
                </div>
                <div className="neo-progress-track h-1.5 overflow-hidden rounded-full">
                  <div
                    className="neo-pipeline-funnel-bar h-full rounded-full transition-all duration-300"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
              {conversion && (
                <div className="hidden shrink-0 flex-col items-center gap-0.5 lg:flex" aria-hidden="true">
                  <ChevronRight size={16} className="neo-muted" />
                  <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    {conversion.rate}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ul className="neo-muted mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs lg:hidden">
        {conversions.map((c) => (
          <li key={c.stage}>
            <span className="font-medium text-amber-300">{c.rate}%</span> {c.stage}
          </li>
        ))}
      </ul>
    </div>
  );
}
