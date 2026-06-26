import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import PersonaSwitcher from "../ui/PersonaSwitcher.jsx";
import NavShell, { NavLogo, ThemeToggle } from "./NavShell.jsx";
import {
  candidateMainLinks,
  candidateAiLinks,
  employerLinks,
  universityLinks,
  isActivePath,
  isAiToolsActive,
} from "./navConfig.js";

function DesktopNavLink({ to, label, active }) {
  return (
    <Link to={to} className={`neo-nav-link ${active ? "neo-nav-link-active" : ""}`}>
      {label}
    </Link>
  );
}

function MobileNavLink({ to, label, active, onNavigate }) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition ${
        active ? "bg-amber-500/15 text-amber-300" : "neo-text hover:bg-white/5"
      }`}
    >
      {label}
    </Link>
  );
}

export default function AppNavbar({ lightMode, setLightMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const aiRef = useRef(null);
  const userRef = useRef(null);

  const portalLabel =
    role === "employer"
      ? "Employer Portal"
      : role === "university"
        ? "University Portal"
        : "Candidate Portal";

  const mainLinks =
    role === "employer"
      ? employerLinks
      : role === "university"
        ? universityLinks
        : candidateMainLinks;

  const showAiDropdown = role === "candidate";
  const aiActive = isAiToolsActive(location.pathname);
  const displayName = user?.displayName || "Demo User";
  const initial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    setMobileOpen(false);
    setAiOpen(false);
    setUserOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (aiRef.current && !aiRef.current.contains(e.target)) setAiOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  const mobilePanel = mobileOpen ? (
    <div className="neo-nav-mobile-panel px-4 py-4 md:hidden">
      <div className="grid gap-1">
        {mainLinks.map((item) => (
          <MobileNavLink
            key={item.path}
            to={item.path}
            label={item.label}
            active={isActivePath(location.pathname, item.path)}
            onNavigate={() => setMobileOpen(false)}
          />
        ))}
        {showAiDropdown && (
          <>
            <p className="neo-muted mb-1 mt-3 px-3 text-[11px] font-semibold uppercase tracking-wider">
              Demo Profile
            </p>
            <div className="px-3 pb-2">
              <PersonaSwitcher compact />
            </div>
            <p className="neo-muted mb-1 mt-2 px-3 text-[11px] font-semibold uppercase tracking-wider">
              AI Tools
            </p>
            {candidateAiLinks.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                label={item.label}
                active={isActivePath(location.pathname, item.path)}
                onNavigate={() => setMobileOpen(false)}
              />
            ))}
          </>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={() => setLightMode(!lightMode)}
          className="neo-secondary flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold"
        >
          {lightMode ? "Dark mode" : "Light mode"}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="neo-secondary flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-rose-400"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to main content
      </a>

      <NavShell mobilePanel={mobilePanel}>
        <div className="flex h-14 items-center gap-3 px-4 sm:px-5">
          <Link to="/" className="shrink-0 cursor-pointer">
            <NavLogo subtitle={portalLabel} />
          </Link>

          {/* Desktop links — text only, centered */}
          <div className="hidden flex-1 items-center justify-center gap-0.5 overflow-visible md:flex">
            {mainLinks.map((item) => (
              <DesktopNavLink
                key={item.path}
                to={item.path}
                label={item.label}
                active={isActivePath(location.pathname, item.path)}
              />
            ))}

            {showAiDropdown && (
              <div className="relative z-50" ref={aiRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAiOpen((v) => !v);
                  }}
                  aria-expanded={aiOpen}
                  aria-haspopup="menu"
                  className={`neo-nav-link flex cursor-pointer items-center gap-1 ${
                    aiActive || aiOpen ? "neo-nav-link-active" : ""
                  }`}
                >
                  AI Tools
                  <ChevronDown size={14} className={`transition ${aiOpen ? "rotate-180" : ""}`} />
                </button>

                {aiOpen && (
                  <div
                    role="menu"
                    className="neo-nav-dropdown absolute left-1/2 top-[calc(100%+0.35rem)] z-[60] min-w-[190px] -translate-x-1/2 p-2"
                  >
                    {candidateAiLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setAiOpen(false)}
                        className={`block rounded-lg px-3 py-2 text-sm transition ${
                          isActivePath(location.pathname, item.path)
                            ? "bg-amber-500/15 text-amber-300"
                            : "neo-text hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            {showAiDropdown && (
              <div className="hidden lg:block">
                <PersonaSwitcher />
              </div>
            )}
            <ThemeToggle lightMode={lightMode} setLightMode={setLightMode} className="hidden sm:inline-flex" />

            <div className="relative z-50 hidden sm:block" ref={userRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserOpen((v) => !v);
                }}
                aria-expanded={userOpen}
                className="neo-nav-icon-btn !w-auto cursor-pointer gap-2 rounded-full px-1.5 py-1.5 pr-3"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-slate-950">
                  {initial}
                </span>
                <span className="neo-text max-w-[100px] truncate text-xs font-medium">{displayName}</span>
              </button>

              {userOpen && (
                <div className="neo-nav-dropdown absolute right-0 top-full z-50 mt-2 min-w-[180px] p-2">
                  <p className="neo-muted mb-2 px-3 py-1 text-xs">{displayName}</p>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-400 hover:bg-rose-500/10"
                  >
                    <LogOut size={15} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            <div className="neo-nav-mobile-toggle-wrap">
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="neo-nav-icon-btn"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </NavShell>
    </>
  );
}
