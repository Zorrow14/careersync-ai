/**
 * Consistent empty / no-results state for lists and tables.
 */
export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="neo-empty-state neo-card rounded-2xl p-12 text-center">
      {Icon && (
        <div className="neo-empty-icon mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
          <Icon size={28} className="text-amber-300/80" aria-hidden="true" />
        </div>
      )}
      <h3 className="neo-title text-lg font-bold">{title}</h3>
      {description && <p className="neo-muted mx-auto mt-2 max-w-md text-sm leading-6">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
