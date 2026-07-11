import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check, Users } from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { getEmployabilityScore } from "../../data/employabilityScore.js";
import { readProfileEdits } from "../../lib/profileEdits.js";
import ProfileAvatar from "./ProfileAvatar.jsx";

function personaPhotoUrl(persona) {
  return readProfileEdits()[persona.id]?.photoUrl ?? persona.photoUrl ?? null;
}

function PersonaOption({ p, active, onSelect, layout }) {
  const score = getEmployabilityScore(p.id).total;

  if (layout === "card") {
    return (
      <button
        type="button"
        role="option"
        aria-selected={active}
        onClick={() => onSelect(p.id)}
        className={`neo-persona-option w-full cursor-pointer text-left ${active ? "neo-persona-option-active" : ""}`}
      >
        <ProfileAvatar
          photoUrl={personaPhotoUrl(p)}
          initials={p.avatar}
          size="lg"
          alt={p.name}
        />
        <span className="min-w-0 flex-1">
          <span className="neo-title block truncate text-sm font-semibold">{p.name}</span>
          <span className="neo-muted block truncate text-xs">{p.targetRole}</span>
          <span className="neo-muted mt-0.5 block truncate text-[11px]">
            {p.degree} · {p.institution}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-sm font-bold text-amber-300">{score}%</span>
          <span className="neo-muted text-[10px]">readiness</span>
        </span>
        {active && <Check size={16} className="shrink-0 text-amber-300" aria-hidden="true" />}
      </button>
    );
  }

  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={() => onSelect(p.id)}
      className={`neo-persona-chip cursor-pointer ${active ? "neo-persona-chip-active" : ""}`}
    >
      <ProfileAvatar
        photoUrl={personaPhotoUrl(p)}
        initials={p.avatar}
        size="sm"
        alt={p.name}
      />
      <span className="truncate font-semibold">{p.name.split(" ")[0]}</span>
      {active && <Check size={12} className="shrink-0" />}
    </button>
  );
}

export default function PersonaSwitcher({ compact = false }) {
  const { personaId, personas, switchPersona, persona } = usePersona();
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonId = useId();

  useEffect(() => {
    function handleOutsideClick(event) {
      const inRoot = rootRef.current?.contains(event.target);
      const inMenu = menuRef.current?.contains(event.target);
      if (!inRoot && !inMenu) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setMenuStyle(null);
      return undefined;
    }

    function updateMenuPosition() {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const menuWidth = 300;
      const padding = 12;
      const left = Math.min(
        Math.max(rect.right - menuWidth, padding),
        window.innerWidth - menuWidth - padding
      );

      setMenuStyle({
        position: "fixed",
        top: `${rect.bottom + 8}px`,
        left: `${left}px`,
        width: `${menuWidth}px`,
      });
    }

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);
    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open]);

  function handleSelect(id) {
    switchPersona(id);
    setOpen(false);
  }

  if (compact) {
    return (
      <div className="neo-persona-compact">
        <p className="neo-muted mb-2 flex items-center gap-1.5 px-1 text-[11px] font-semibold uppercase tracking-wider">
          <Users size={12} className="text-amber-300" />
          Switch demo candidate
        </p>
        <div className="space-y-2">
          {personas.map((p) => (
            <PersonaOption
              key={p.id}
              p={p}
              active={personaId === p.id}
              onSelect={handleSelect}
              layout="card"
            />
          ))}
        </div>
      </div>
    );
  }

  const menu = open && typeof document !== "undefined" && menuStyle
    ? createPortal(
        <div
          ref={menuRef}
          role="listbox"
          aria-labelledby={buttonId}
          className="neo-persona-menu"
          style={menuStyle}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <p className="neo-muted px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-wider">
            Demo candidates
          </p>
          {personas.map((p) => (
            <PersonaOption
              key={p.id}
              p={p}
              active={personaId === p.id}
              onSelect={handleSelect}
              layout="card"
            />
          ))}
          <p className="neo-muted border-t border-white/10 px-3 py-2 text-[10px] leading-4">
            Scores update across dashboard, jobs, and employer fit reports.
          </p>
        </div>,
        document.body
      )
    : null;

  return (
    <div ref={rootRef} className="neo-persona-switcher">
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Switch demo candidate profile"
        onClick={() => setOpen((v) => !v)}
        className={`neo-persona-trigger ${open ? "neo-persona-trigger-open" : ""}`}
      >
        <ProfileAvatar
          photoUrl={personaPhotoUrl(persona)}
          initials={persona.avatar}
          size="sm"
          alt={persona.name}
        />
        <span className="hidden min-w-0 flex-1 text-left xl:block">
          <span className="neo-text block truncate text-xs font-semibold leading-tight">
            {persona.name.split(" ")[0]}
          </span>
          <span className="neo-muted block truncate text-[10px] leading-tight">
            {persona.targetRole}
          </span>
        </span>
        <ChevronDown
          size={14}
          className={`neo-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {menu}
    </div>
  );
}
