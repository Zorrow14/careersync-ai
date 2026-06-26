const HEIGHT = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
  xl: "h-2.5",
};

/**
 * @param {object} props
 * @param {number} props.value - 0–100
 * @param {"xs"|"sm"|"md"|"lg"|"xl"} [props.size="md"]
 * @param {string} [props.fillClassName="neo-progress-fill"]
 * @param {string} [props.className]
 * @param {boolean} [props.animate=true]
 */
export default function ProgressBar({
  value,
  size = "md",
  fillClassName = "neo-progress-fill",
  className = "",
  animate = true,
}) {
  const pct = Math.min(100, Math.max(0, Number(value) || 0));
  const height = HEIGHT[size] ?? HEIGHT.md;

  return (
    <div className={`neo-progress-track overflow-hidden rounded-full ${height} ${className}`}>
      <div
        className={`h-full min-w-0 rounded-full ${fillClassName} ${animate ? "transition-all duration-700" : ""}`}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
