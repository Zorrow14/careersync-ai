import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  SearchCheck,
  BarChart3,
  Route,
  Bot,
  BriefcaseBusiness,
  Moon,
  Sun,
} from "lucide-react";

const links = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/analyzer", label: "JD Analyzer", icon: SearchCheck },
  { path: "/results", label: "AI Results", icon: BarChart3 },
  { path: "/roadmap", label: "Roadmap", icon: Route },
  { path: "/chatbot", label: "AI Coach", icon: Bot },
];

export default function Sidebar({ lightMode, setLightMode }) {
  const location = useLocation();

  return (
    <aside className="neo-card fixed left-0 top-0 flex h-screen w-64 flex-col rounded-none border-y-0 border-l-0 p-6">
      <Link to="/" className="mb-10 flex items-center gap-3">
        <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
          <BriefcaseBusiness size={22} />
        </div>

        <div>
          <h1 className="neo-title text-lg font-bold">CareerSync AI</h1>
          <p className="neo-muted text-xs">Career OS Prototype</p>
        </div>
      </Link>

      <nav className="space-y-2">
        {links.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-amber-500/15 text-amber-300"
                  : "neo-text hover:bg-white/5 hover:text-amber-300"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => setLightMode(!lightMode)}
          className="neo-secondary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
        >
          {lightMode ? <Moon size={17} /> : <Sun size={17} />}
          {lightMode ? "Switch to Dark" : "Switch to Light"}
        </button>
      </div>
    </aside>
  );
}