import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  LogIn,
  GraduationCap,
  Briefcase,
  Building2,
  Zap,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";
import { demoUsers } from "../../lib/demoUsers.js";

const roleIcons = {
  candidate: GraduationCap,
  employer: Briefcase,
  university: Building2,
};

export default function Login() {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function enterDemo(roleKey) {
    const u = demoUsers[roleKey];
    demoLogin(u.role, u.name, u.email);
    navigate(u.home);
  }

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const name = email ? email.split("@")[0] : "Demo User";
      demoLogin("candidate", name, email);
      navigate("/dashboard");
    }, 600);
  }

  return (
    <div className="neo-bg neo-page flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-10 flex items-center justify-center gap-3">
          <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
            <BriefcaseBusiness size={22} />
          </div>
          <span className="neo-nav-logo text-xl">
            Career<span className="neo-nav-logo-accent">Sync</span>
          </span>
        </Link>

        <div className="neo-card rounded-2xl p-8">
          <h1 className="neo-title mb-1 text-2xl font-bold">Welcome back</h1>
          <p className="neo-muted mb-6 text-sm">Sign in to your career dashboard.</p>

          {/* ─── One-click demo entry (judge bypass) ─── */}
          <div className="mb-6">
            <div className="mb-3 flex items-center gap-2">
              <Zap size={15} className="text-amber-300" />
              <p className="neo-text text-sm font-semibold">Instant demo — no password needed</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(demoUsers).map(([key, u]) => {
                const Icon = roleIcons[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => enterDemo(key)}
                    className="neo-secondary flex cursor-pointer flex-col items-center gap-2 rounded-xl px-2 py-4 text-center text-xs font-semibold transition hover:bg-amber-500/10 hover:text-amber-300"
                  >
                    <Icon size={20} />
                    {u.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="neo-divider neo-muted mb-6 text-xs">or sign in</div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="neo-label">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="neo-input w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="login-password" className="neo-label !mb-0">Password</label>
                <Link to="/forgot-password" className="neo-link text-xs">
                  Forgot password?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="neo-input w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neo-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-60"
            >
              <LogIn size={17} />
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="neo-muted mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="neo-link text-sm">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
