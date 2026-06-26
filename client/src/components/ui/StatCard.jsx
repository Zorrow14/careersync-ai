export default function StatCard({ label, value, description, icon: Icon }) {
  return (
    <div className="neo-kpi-card rounded-2xl p-6">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="neo-muted text-sm font-medium">{label}</p>
        {Icon && <Icon size={18} className="text-amber-300" aria-hidden="true" />}
      </div>
      <p className="neo-kpi-value">{value}</p>
      {description && <p className="neo-text mt-3 text-sm leading-6">{description}</p>}
    </div>
  );
}
