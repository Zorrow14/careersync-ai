import { Link } from "react-router-dom";
import { BriefcaseBusiness, Moon, Sun } from "lucide-react";

export default function Navbar({ lightMode, setLightMode }) {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
      <Link to="/" className="flex items-center gap-3">
        <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
          <BriefcaseBusiness size={22} />
        </div>

        <div>
          <h1 className="neo-title text-xl font-bold">CareerSync AI</h1>
          <p className="neo-muted text-xs">Cinematic Career OS Prototype</p>
        </div>
      </Link>

      <div className="hidden items-center gap-8 text-sm font-medium md:flex">
        <a href="#features" className="neo-text hover:text-amber-400">
          Features
        </a>
        <a href="#workflow" className="neo-text hover:text-amber-400">
          Workflow
        </a>
        <a href="#demo" className="neo-text hover:text-amber-400">
          Demo
        </a>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setLightMode(!lightMode)}
          className="neo-secondary flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
        >
          {lightMode ? <Moon size={17} /> : <Sun size={17} />}
          {lightMode ? "Switch to Dark" : "Switch to Light"}
        </button>

        <Link
          to="/dashboard"
          className="neo-primary rounded-xl px-5 py-2.5 text-sm"
        >
          Open Prototype
        </Link>
      </div>
    </nav>
  );
}