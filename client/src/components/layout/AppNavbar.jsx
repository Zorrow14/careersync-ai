import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { usePersona } from "../../context/PersonaContext.jsx";
import PersonaSwitcher from "../ui/PersonaSwitcher.jsx";
import ProfileAvatar from "../ui/ProfileAvatar.jsx";
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

function UserMenuDropdown({
  open,
  anchorRef,
  displayName,
  displaySubtitle,
  onLogout,
}) {
  const [menuStyle, setMenuStyle] = useState(null);

  useEffect(() => {
    if (!open) {
      setMenuStyle(null);
      return undefined;
    }

    function updatePosition() {
      const anchor = anchorRef.current;
      if (!anchor) return;

      const rect = anchor.getBoundingClientRect();
      const padding = 12;
      const menuWidth = 200;
      const left = Math.min(
        Math.max(rect.right - menuWidth, padding),
        window.innerWidth - menuWidth - padding
      );

      setMenuStyle({
        position: "fixed",
        top: `${rect.bottom + 8}px`,
        left: `${left}px`,
        width: `${menuWidth}px`,
        zIndex: 70,
      });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, anchorRef]);

  if (!open || !menuStyle || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="menu"
      className="neo-nav-dropdown neo-nav-dropdown--portal neo-nav-dropdown--animate p-2"
      style={menuStyle}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <p className="neo-muted mb-0.5 px-3 py-1 text-xs font-semibold text-amber-300">
        {displayName}
      </p>
      {displaySubtitle && (
        <p className="neo-muted mb-2 px-3 pb-1 text-[11px]">{displaySubtitle}</p>
      )}
      {!displaySubtitle && <div className="mb-2" />}
      <button
        type="button"
        role="menuitem"
        onClick={onLogout}
        className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-500/10"
      >
        <LogOut size={15} />
        Sign Out
      </button>
    </div>,
    document.body
  );
}

export default function AppNavbar({ lightMode, setLightMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();
  const { persona, profile } = usePersona();

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
  const displayName =
    role === "candidate" ? persona.name : user?.displayName || "Demo User";
  const displaySubtitle =
    role === "candidate" ? persona.targetRole : user?.email || null;
  const initial =
    role === "candidate"
      ? persona.avatar
      : displayName.charAt(0).toUpperCase();
  const candidatePhoto = role === "candidate" ? profile.photoUrl : null;

  useEffect(() => {
    setAiOpen(false);
    setUserOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (aiRef.current && !aiRef.current.contains(e.target)) setAiOpen(false);
      if (userRef.current && !userRef.current.contains(e.target)) {
        const portalMenu = document.querySelector(".neo-nav-dropdown--portal");
        if (portalMenu?.contains(e.target)) return;
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    setUserOpen(false);
    logout();
    navigate("/");
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-amber-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to main content
      </a>

      <NavShell>
        <div className="flex h-14 items-center gap-3 px-4 sm:px-5">
          <Link to="/" className="min-w-0 shrink-0 cursor-pointer">
            <NavLogo subtitle={portalLabel} />
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-0.5 overflow-visible md:flex">
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
                    className="neo-nav-dropdown neo-nav-dropdown--animate absolute left-0 top-[calc(100%+0.35rem)] z-[60] min-w-[190px] p-2"
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

            {mainLinks.map((item) => (
              <DesktopNavLink
                key={item.path}
                to={item.path}
                label={item.label}
                active={isActivePath(location.pathname, item.path)}
              />
            ))}
          </div>

          <div className="ml-auto flex min-w-0 items-center gap-2">
            {showAiDropdown && (
              <div className="hidden lg:block">
                <PersonaSwitcher />
              </div>
            )}
            <ThemeToggle lightMode={lightMode} setLightMode={setLightMode} />

            <div className="relative z-50 min-w-0" ref={userRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUserOpen((v) => !v);
                }}
                aria-expanded={userOpen}
                aria-haspopup="menu"
                aria-label="Account menu"
                className="neo-nav-icon-btn !w-auto max-w-[11rem] cursor-pointer gap-2 rounded-full px-1.5 py-1.5 pr-2.5 sm:pr-3"
              >
                {role === "candidate" ? (
                  <ProfileAvatar
                    photoUrl={candidatePhoto}
                    initials={initial}
                    size="xs"
                    alt={displayName}
                  />
                ) : (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                    {initial}
                  </span>
                )}
                <span className="min-w-0 text-left">
                  <span className="neo-text block truncate text-xs font-medium leading-tight">
                    {displayName}
                  </span>
                  {displaySubtitle && (
                    <span className="neo-muted hidden truncate text-[10px] leading-tight sm:block">
                      {displaySubtitle}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </NavShell>

      <UserMenuDropdown
        open={userOpen}
        anchorRef={userRef}
        displayName={displayName}
        displaySubtitle={displaySubtitle}
        onLogout={handleLogout}
      />
    </>
  );
}
