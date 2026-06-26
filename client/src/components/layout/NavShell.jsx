/**
 * Shared floating navbar shell — portfolio-style glass pill.
 * Used by public Navbar and authenticated AppNavbar.
 */
export default function NavShell({ children, mobilePanel }) {
  return (
    <>
      <div className="neo-nav-shell">
        <div className="neo-nav-wrap">
          <nav className="neo-nav overflow-hidden md:overflow-visible" aria-label="Site navigation">
            {children}
            {mobilePanel}
          </nav>
        </div>
      </div>
      <div className="neo-nav-spacer" aria-hidden="true" />
    </>
  );
}

export function NavLogo({ subtitle }) {
  return (
    <div className="min-w-0">
      <span className="neo-nav-logo">
        Career<span className="neo-nav-logo-accent">Sync</span>
      </span>
      {subtitle && (
        <p className="neo-muted hidden truncate text-[10px] leading-tight sm:block">{subtitle}</p>
      )}
    </div>
  );
}

export function ThemeToggle({ lightMode, setLightMode, className = "" }) {
  return (
    <button
      type="button"
      onClick={() => setLightMode(!lightMode)}
      title={lightMode ? "Switch to dark mode" : "Switch to light mode"}
      aria-label={lightMode ? "Switch to dark mode" : "Switch to light mode"}
      className={`neo-nav-icon-btn ${className}`}
    >
      {lightMode ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      )}
    </button>
  );
}
