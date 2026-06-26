import { useMemo, useState } from "react";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";

const CHART = {
  width: 480,
  height: 220,
  pad: { top: 28, right: 12, bottom: 36, left: 36 },
};

function niceCeil(max) {
  if (max <= 10) return 10;
  if (max <= 20) return 20;
  return Math.ceil(max / 5) * 5;
}

export default function ApplicationsTrendChart({ months }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const stats = useMemo(() => {
    const total = months.reduce((sum, m) => sum + m.count, 0);
    const peak = months.reduce((best, m) => (m.count > best.count ? m : best), months[0]);
    const avg = total / months.length;
    const latest = months[months.length - 1];
    const previous = months[months.length - 2];
    const delta = latest && previous ? latest.count - previous.count : 0;
    return { total, peak, avg, latest, delta };
  }, [months]);

  const yMax = niceCeil(Math.max(...months.map((m) => m.count), 1));
  const plotW = CHART.width - CHART.pad.left - CHART.pad.right;
  const plotH = CHART.height - CHART.pad.top - CHART.pad.bottom;
  const barGap = 14;
  const barW = (plotW - barGap * (months.length - 1)) / months.length;
  const yTicks = [0, yMax * 0.25, yMax * 0.5, yMax * 0.75, yMax];

  const bars = months.map((m, i) => {
    const barH = (m.count / yMax) * plotH;
    const x = CHART.pad.left + i * (barW + barGap);
    const y = CHART.pad.top + plotH - barH;
    return { ...m, i, x, y, barH, barW, isPeak: m.month === stats.peak.month };
  });

  const TrendIcon = stats.delta > 0 ? TrendingUp : stats.delta < 0 ? TrendingDown : Minus;
  const trendLabel =
    stats.delta > 0 ? `+${stats.delta} vs last month` : stats.delta < 0 ? `${stats.delta} vs last month` : "Flat vs last month";

  return (
    <div className="neo-chart-card rounded-2xl p-6">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="neo-title text-xl font-bold">Applications Over Time</h2>
          <p className="neo-muted mt-1 text-sm">Monthly inbound applications · Jan–Jun 2026</p>
        </div>
        <div
          className={`neo-chart-trend inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
            stats.delta > 0
              ? "neo-chart-trend-up"
              : stats.delta < 0
                ? "neo-chart-trend-down"
                : "neo-chart-trend-flat"
          }`}
        >
          <TrendIcon size={14} aria-hidden="true" />
          {trendLabel}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-3">
        {[
          { label: "6-mo total", value: stats.total },
          { label: "Peak month", value: `${stats.peak.month} · ${stats.peak.count}` },
          { label: "Monthly avg", value: stats.avg.toFixed(1) },
        ].map(({ label, value }) => (
          <div key={label} className="neo-chart-stat rounded-xl px-3 py-2.5">
            <p className="neo-muted text-[11px] font-medium uppercase tracking-wide">{label}</p>
            <p className="neo-title mt-0.5 text-lg font-bold tabular-nums">{value}</p>
          </div>
        ))}
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${CHART.width} ${CHART.height}`}
          className="neo-chart-svg w-full"
          role="img"
          aria-label={`Bar chart of applications by month. Peak in ${stats.peak.month} with ${stats.peak.count} applications.`}
        >
          <defs>
            <linearGradient id="appBarFill" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--chart-bar-from)" />
              <stop offset="100%" stopColor="var(--chart-bar-to)" />
            </linearGradient>
            <linearGradient id="appBarPeak" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--chart-bar-peak-from)" />
              <stop offset="100%" stopColor="var(--chart-bar-peak-to)" />
            </linearGradient>
            <filter id="barGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {yTicks.map((tick) => {
            const y = CHART.pad.top + plotH - (tick / yMax) * plotH;
            return (
              <g key={tick}>
                <line
                  x1={CHART.pad.left}
                  y1={y}
                  x2={CHART.width - CHART.pad.right}
                  y2={y}
                  className="neo-chart-grid"
                />
                <text
                  x={CHART.pad.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="neo-chart-axis fill-current text-[10px]"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <line
            x1={CHART.pad.left}
            y1={CHART.pad.top + plotH}
            x2={CHART.width - CHART.pad.right}
            y2={CHART.pad.top + plotH}
            className="neo-chart-axis-line"
          />

          {bars.map((bar) => {
            const isActive = activeIndex === bar.i;
            const isDimmed = activeIndex !== null && activeIndex !== bar.i;
            return (
              <g
                key={bar.month}
                className="neo-chart-bar-group cursor-pointer"
                onMouseEnter={() => setActiveIndex(bar.i)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(bar.i)}
                onBlur={() => setActiveIndex(null)}
                tabIndex={0}
                role="button"
                aria-label={`${bar.month}: ${bar.count} applications`}
              >
                <rect
                  x={bar.x}
                  y={bar.y}
                  width={bar.barW}
                  height={bar.barH}
                  rx={6}
                  fill={bar.isPeak ? "url(#appBarPeak)" : "url(#appBarFill)"}
                  className={`neo-chart-bar transition-all duration-200 ${
                    isActive ? "neo-chart-bar-active" : ""
                  } ${isDimmed ? "opacity-40" : "opacity-100"}`}
                  filter={bar.isPeak || isActive ? "url(#barGlow)" : undefined}
                />
                <text
                  x={bar.x + bar.barW / 2}
                  y={bar.y - 8}
                  textAnchor="middle"
                  className={`neo-chart-value fill-current text-[11px] font-bold tabular-nums ${
                    isDimmed ? "opacity-40" : ""
                  }`}
                >
                  {bar.count}
                </text>
                <text
                  x={bar.x + bar.barW / 2}
                  y={CHART.pad.top + plotH + 22}
                  textAnchor="middle"
                  className={`neo-chart-label fill-current text-[11px] font-medium ${
                    bar.isPeak ? "neo-chart-label-peak" : ""
                  }`}
                >
                  {bar.month}
                </text>
              </g>
            );
          })}
        </svg>

        {activeIndex !== null && bars[activeIndex] && (
          <div
            className="neo-chart-tooltip pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 rounded-lg px-3 py-2 text-center text-xs shadow-lg"
            role="tooltip"
          >
            <p className="font-semibold">{bars[activeIndex].month} 2026</p>
            <p className="neo-chart-tooltip-value text-sm font-bold tabular-nums">
              {bars[activeIndex].count} applications
            </p>
            {bars[activeIndex].isPeak && (
              <p className="mt-0.5 text-[10px] font-medium text-amber-300">Peak month</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
