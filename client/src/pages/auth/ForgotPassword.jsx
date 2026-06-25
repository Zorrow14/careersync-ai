import { useState } from "react";
import { Link } from "react-router-dom";
import { BriefcaseBusiness, Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleReset(e) {
    e.preventDefault();
    setSent(true);
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
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-amber-500/10 p-4 text-amber-300">
              <Mail size={28} />
            </div>
          </div>

          <h1 className="neo-title mb-1 text-center text-2xl font-bold">
            Reset your password
          </h1>
          <p className="neo-muted mb-6 text-center text-sm">
            Enter your email and we will send you a reset link.
          </p>

          {sent ? (
            <div className="neo-good rounded-xl px-4 py-4 text-center text-sm">
              <p className="font-semibold">Reset email sent!</p>
              <p className="neo-muted mt-1">
                Check <span className="text-amber-300">{email}</span> for a password
                reset link. (Demo mode — no real email is sent.)
              </p>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="neo-text mb-1 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="neo-input w-full rounded-xl px-4 py-3 text-sm"
                />
              </div>

              <button
                type="submit"
                className="neo-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
              >
                Send Reset Link
              </button>
            </form>
          )}

          <p className="neo-muted mt-6 text-center text-sm">
            <Link to="/login" className="font-semibold text-amber-400 hover:text-amber-300">
              ← Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
