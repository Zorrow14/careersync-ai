import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import PersonaSwitcher from "../ui/PersonaSwitcher.jsx";
import {
  getMobileBottomLinks,
  isActivePath,
  isMobileNavItemActive,
} from "./navConfig.js";

function MobileNavSheet({ open, onClose, item, showPersonaSwitcher }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) {
      setVisible(false);
      return undefined;
    }

    setVisible(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !item?.children) return null;

  return (
    <div
      className={`neo-mobile-nav-sheet md:hidden ${visible ? "neo-mobile-nav-sheet--open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.label} menu`}
    >
      <button
        type="button"
        className="neo-mobile-nav-sheet__backdrop"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="neo-mobile-nav-sheet__panel">
        <div className="neo-mobile-nav-sheet__header flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <p className="neo-title text-base font-bold">{item.label}</p>
          <button
            type="button"
            onClick={onClose}
            className="neo-nav-icon-btn cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <div className="neo-scroll-hidden max-h-[min(70vh,32rem)] overflow-y-auto px-3 py-3">
          {item.children.map((child, index) => {
            if (child.section) {
              return (
                <div
                  key={child.section}
                  className="neo-mobile-nav-sheet__section mb-3"
                  style={{ "--sheet-item-index": index }}
                >
                  <p className="neo-muted mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider">
                    {child.section}
                  </p>
                  <div className="grid gap-1">
                    {child.links.map((link, linkIndex) => {
                      const Icon = link.icon;
                      const active = isActivePath(location.pathname, link.path);
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={onClose}
                          className={`neo-mobile-nav-sheet__link ${active ? "neo-mobile-nav-sheet__link-active" : ""}`}
                          style={{ "--sheet-item-index": index + linkIndex + 1 }}
                        >
                          <Icon size={18} className="shrink-0" aria-hidden="true" />
                          <span className="text-sm font-medium">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            const Icon = child.icon;
            const active = isActivePath(location.pathname, child.path);
            return (
              <Link
                key={child.path}
                to={child.path}
                onClick={onClose}
                className={`neo-mobile-nav-sheet__link mb-1 ${active ? "neo-mobile-nav-sheet__link-active" : ""}`}
                style={{ "--sheet-item-index": index }}
              >
                <Icon size={18} className="shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium">{child.label}</span>
              </Link>
            );
          })}

          {showPersonaSwitcher && (
            <div
              className="neo-mobile-nav-sheet__section mt-4 border-t border-white/10 pt-4"
              style={{ "--sheet-item-index": item.children.length + 1 }}
            >
              <p className="neo-muted mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider">
                Demo Profile
              </p>
              <div className="px-1">
                <PersonaSwitcher compact />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MobileBottomNav() {
  const { role } = useAuth();
  const location = useLocation();
  const links = getMobileBottomLinks(role);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    setMenuOpen(null);
  }, [location.pathname]);

  const openMenuItem = links.find((item) => item.id === menuOpen);

  return (
    <>
      <nav className="neo-mobile-bottom-nav md:hidden" aria-label="Primary mobile navigation">
        {links.map((item) => {
          const Icon = item.icon;
          const active = isMobileNavItemActive(location.pathname, item);
          const isMenuOpen = menuOpen === item.id;

          if (item.type === "menu") {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setMenuOpen(isMenuOpen ? null : item.id)}
                aria-expanded={isMenuOpen}
                aria-haspopup="dialog"
                className={`neo-mobile-bottom-nav__item ${active || isMenuOpen ? "neo-mobile-bottom-nav__item-active" : ""}`}
              >
                <Icon
                  size={20}
                  strokeWidth={active || isMenuOpen ? 2.25 : 2}
                  className={isMenuOpen ? "neo-mobile-bottom-nav__icon-pop" : ""}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`neo-mobile-bottom-nav__item ${active ? "neo-mobile-bottom-nav__item-active" : ""}`}
            >
              <Icon size={20} strokeWidth={active ? 2.25 : 2} aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <MobileNavSheet
        open={Boolean(openMenuItem)}
        onClose={() => setMenuOpen(null)}
        item={openMenuItem}
        showPersonaSwitcher={role === "candidate"}
      />
    </>
  );
}
