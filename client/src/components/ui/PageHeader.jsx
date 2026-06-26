/**
 * Unified page header — eyebrow, title, description, optional actions.
 */
export default function PageHeader({ eyebrow, title, description, actions, className = "" }) {
  return (
    <header className={`neo-page-header mb-8 ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          {eyebrow && <p className="neo-eyebrow">{eyebrow}</p>}
          <h1 className="neo-page-title">{title}</h1>
          {description && <p className="neo-page-desc">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
