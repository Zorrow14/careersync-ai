import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, LogIn } from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

export default function Login() {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    // Simulate a brief loading state then start the demo session.
    // Role defaults to candidate on the login page (no role selector here).
    setTimeout(() => {
      const name = email ? email.split("@")[0] : "Demo User";
      demoLogin("candidate", name, email);
      navigate("/dashboard");
    }, 600);
  }

  return (
    <div className="neo-bg flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-10 flex items-center justify-center gap-3">
          <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
            <BriefcaseBusiness size={22} />
          </div>
          <span className="neo-title text-xl font-bold">CareerSync AI</span>
        </Link>

        <div className="neo-card rounded-2xl p-8">
          <h1 className="neo-title mb-1 text-2xl font-bold">Welcome back</h1>
          <p className="neo-muted mb-6 text-sm">Sign in to your career dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="neo-text mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="neo-input w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="neo-text text-sm font-medium">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-amber-400 hover:text-amber-300"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="neo-input w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neo-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-60"
            >
              <LogIn size={17} />
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p className="neo-muted mt-6 text-center text-sm">
            No account?{" "}
            <Link to="/register" className="font-semibold text-amber-400 hover:text-amber-300">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
