import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  SearchCheck,
  BarChart3,
  Route,
  Bot,
  Mic,
  BriefcaseBusiness,
  Moon,
  Sun,
  LogOut,
  Building2,
  UserCircle,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import PersonaSwitcher from "../ui/PersonaSwitcher.jsx";

const candidateLinks = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/profile", label: "My Profile", icon: UserCircle },
  { path: "/analyzer", label: "JD Analyzer", icon: SearchCheck },
  { path: "/results", label: "AI Results", icon: BarChart3 },
  { path: "/roadmap", label: "Roadmap", icon: Route },
  { path: "/chatbot", label: "AI Coach", icon: Bot },
  { path: "/mock-interview", label: "Mock Interview", icon: Mic },
];

const employerLinks = [
  { path: "/employer", label: "Employer Dashboard", icon: LayoutDashboard },
];

const universityLinks = [
  { path: "/university", label: "University Dashboard", icon: Building2 },
];

export default function Sidebar({ lightMode, setLightMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/");
  }

  const links =
    role === "employer"
      ? employerLinks
      : role === "university"
        ? universityLinks
        : candidateLinks;

  return (
    <aside className="neo-card fixed left-0 top-0 flex h-screen w-64 flex-col rounded-none border-y-0 border-l-0 p-6">
      <Link to="/" className="mb-10 flex items-center gap-3">
        <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
          <BriefcaseBusiness size={22} />
        </div>

        <div>
          <h1 className="neo-title text-lg font-bold">CareerSync AI</h1>
          <p className="neo-muted text-xs">
            {role === "employer"
              ? "Employer Portal"
              : role === "university"
                ? "University Portal"
                : "Career OS Prototype"}
          </p>
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

      {role === "candidate" && (
        <div className="mt-6">
          <PersonaSwitcher />
        </div>
      )}

      {(role === "employer" || role === "university") && (
        <p className="neo-muted mt-6 text-xs leading-5">
          Full candidate prototype (JD Analyzer, Mock Interview, etc.) is available
          when signed in as a <span className="text-amber-300">Candidate</span> account.
        </p>
      )}

      <div className="mt-auto space-y-2">
        {user && (
          <div className="neo-soft mb-1 flex items-center gap-3 rounded-xl px-4 py-3">
            <UserCircle size={18} className="shrink-0 text-amber-300" />
            <span className="neo-text truncate text-sm font-medium">
              {user.displayName || "Demo User"}
            </span>
          </div>
        )}

        <button
          onClick={() => setLightMode(!lightMode)}
          className="neo-secondary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
        >
          {lightMode ? <Moon size={17} /> : <Sun size={17} />}
          {lightMode ? "Switch to Dark" : "Switch to Light"}
        </button>

        {user && (
          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/10"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        )}
      </div>
    </aside>
  );
}
