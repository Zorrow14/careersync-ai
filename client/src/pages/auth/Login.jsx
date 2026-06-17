import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, LogIn } from "lucide-react";
import { auth, googleProvider } from "../../lib/firebase.js";
import api from "../../lib/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [unverifiedUser, setUnverifiedUser] = useState(null);

  const redirectByRole = (role) => {
    if (role === "employer") navigate("/employer");
    else if (role === "university") navigate("/university");
    else navigate("/dashboard");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setUnverifiedUser(null);
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const user = credential.user;

      if (!user.emailVerified) {
        // Sign them back out so the app stays protected
        await signOut(auth);
        setUnverifiedUser(user);
        setError("Please verify your email before signing in. Check your inbox.");
        setLoading(false);
        return;
      }

      const res = await api.get("/api/auth/me");
      redirectByRole(res.data.role);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setInfo("");
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);

      try {
        const res = await api.get("/api/auth/me");
        redirectByRole(res.data.role);
      } catch (apiErr) {
        if (apiErr.response?.status === 404) {
          // New Google user — needs to pick a role
          navigate("/register");
        } else {
          throw apiErr;
        }
      }
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message || "Google sign-in failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!unverifiedUser) return;
    setInfo("");
    setError("");
    try {
      // Re-sign in temporarily to get a fresh user object for sendEmailVerification
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(credential.user);
      await signOut(auth);
      setInfo("Verification email resent. Please check your inbox.");
    } catch {
      setError("Could not resend verification email. Try again shortly.");
    }
  };

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

          {error && (
            <div className="neo-danger mb-4 rounded-xl px-4 py-3 text-sm">
              {error}
              {unverifiedUser && (
                <button
                  onClick={handleResendVerification}
                  className="ml-2 font-semibold underline hover:no-underline"
                >
                  Resend email
                </button>
              )}
            </div>
          )}

          {info && (
            <div className="neo-good mb-4 rounded-xl px-4 py-3 text-sm">{info}</div>
          )}

          {/* Google sign-in */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="neo-secondary mb-4 flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-60"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l6-6C34.4 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l7 5.1C15 16.1 19.2 13 24 13c3 0 5.7 1.1 7.8 2.9l6-6C34.4 6.5 29.5 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.8 13.6-4.7l-6.3-5.2C29.4 35.7 26.8 36.5 24 36.5c-5.2 0-9.6-3.4-11.2-8l-6.9 5.3C9.5 39.5 16.2 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.5 4.6-4.7 6l6.3 5.2C40.9 35.7 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-700/50" />
            <span className="neo-muted text-xs">or sign in with email</span>
            <div className="h-px flex-1 bg-slate-700/50" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                required
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
