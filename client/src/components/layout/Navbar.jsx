import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import NavShell, { NavLogo, ThemeToggle } from "./NavShell.jsx";

const anchorLinks = [
  { href: "#audiences", label: "Platform" },
  { href: "#workflow", label: "Workflow" },
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
];

export default function Navbar({ lightMode, setLightMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobilePanel = mobileOpen ? (
    <div className="neo-nav-mobile-panel px-4 py-4 md:hidden">
      <div className="grid gap-1">
        {anchorLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className="neo-text block rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/5"
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
        <Link
          to="/login"
          onClick={() => setMobileOpen(false)}
          className="neo-secondary rounded-lg px-4 py-2.5 text-center text-sm font-semibold"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          onClick={() => setMobileOpen(false)}
          className="neo-primary rounded-lg px-4 py-2.5 text-center text-sm font-semibold"
        >
          Get Started
        </Link>
      </div>
    </div>
  ) : null;

  return (
    <NavShell mobilePanel={mobilePanel}>
      <div className="flex h-14 items-center gap-4 px-4 sm:px-5">
        <Link to="/" className="shrink-0 cursor-pointer">
          <NavLogo subtitle="Career OS for Students & Graduates" />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {anchorLinks.map((item) => (
            <a key={item.href} href={item.href} className="neo-nav-link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle lightMode={lightMode} setLightMode={setLightMode} />

          <Link to="/login" className="neo-nav-link hidden sm:inline-block">
            Sign In
          </Link>

          <Link to="/register" className="neo-primary hidden rounded-lg px-4 py-2 text-sm font-semibold sm:inline-block">
            Get Started
          </Link>

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
  );
}
