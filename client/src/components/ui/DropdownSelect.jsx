import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

export default function DropdownSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  helperText,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonId = useId();
  const labelId = `${buttonId}-label`;

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) || options[0] || null,
    [options, value]
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      const clickedRoot = rootRef.current && rootRef.current.contains(event.target);
      const clickedMenu = menuRef.current && menuRef.current.contains(event.target);
      if (!clickedRoot && !clickedMenu) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

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
      const menuMaxHeight = 288;
      const padding = 12;
      const desiredLeft = Math.min(
        Math.max(rect.left, padding),
        window.innerWidth - rect.width - padding
      );
      const spaceBelow = window.innerHeight - rect.bottom - padding;
      const spaceAbove = rect.top - padding;
      const openAbove = spaceBelow < 220 && spaceAbove > spaceBelow;
      const top = openAbove
        ? Math.max(padding, rect.top - menuMaxHeight - 8)
        : rect.bottom + 8;

      setMenuStyle({
        position: "fixed",
        top: `${top}px`,
        left: `${desiredLeft}px`,
        width: `${rect.width}px`,
        maxHeight: `${Math.max(180, openAbove ? Math.min(menuMaxHeight, spaceAbove - 8) : Math.min(menuMaxHeight, spaceBelow))}px`,
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

  function handleSelect(nextValue) {
    onChange(nextValue);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={`neo-dropdown ${className}`}>
      {label && (
        <label id={labelId} className="neo-label">
          {label}
        </label>
      )}

      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={helperText ? `${buttonId}-helper` : undefined}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={`neo-dropdown-trigger ${open ? "neo-dropdown-trigger-open" : ""}`}
      >
        <span className="min-w-0 flex-1 truncate text-left">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {helperText && (
        <p id={`${buttonId}-helper`} className="neo-muted mt-2 text-xs leading-5">
          {helperText}
        </p>
      )}

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            aria-labelledby={buttonId}
            className="neo-dropdown-menu"
            style={menuStyle || undefined}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {options.map((option) => {
              const active = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => handleSelect(option.value)}
                  className={`neo-dropdown-option ${active ? "neo-dropdown-option-active" : ""}`}
                >
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block truncate text-sm font-medium">{option.label}</span>
                    {option.description && (
                      <span className="block truncate text-[11px] leading-5 neo-muted">
                        {option.description}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}
