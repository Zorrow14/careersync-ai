export default function StatCard({ label, value, description }) {
  return (
    <div className="neo-card rounded-2xl p-6">
      <p className="neo-muted text-sm font-medium">{label}</p>
      <h3 className="neo-title mt-3 text-4xl font-bold">{value}</h3>
      <p className="neo-text mt-3 text-sm leading-6">{description}</p>
    </div>
  );
}