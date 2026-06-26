import { Link } from "react-router-dom";

/**
 * Dashboard KPI tile with icon, optional link, and hover affordance.
 */
export default function KpiCard({
  label,
  value,
  icon: Icon,
  iconClassName = "text-amber-300",
  hint,
  to,
}) {
  const inner = (
    <>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="neo-muted text-sm font-medium">{label}</p>
        {Icon && <Icon size={18} className={iconClassName} aria-hidden="true" />}
      </div>
      <p className="neo-kpi-value">{value}</p>
      {hint && <p className="neo-muted mt-2 text-xs leading-5">{hint}</p>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="neo-kpi-card neo-interactive block rounded-2xl p-6">
        {inner}
      </Link>
    );
  }

  return <div className="neo-kpi-card rounded-2xl p-6">{inner}</div>;
}
