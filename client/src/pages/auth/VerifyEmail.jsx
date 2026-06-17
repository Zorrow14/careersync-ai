import { useState } from "react";
import { sendEmailVerification, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, MailCheck } from "lucide-react";
import { auth } from "../../lib/firebase.js";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    setInfo("");
    setError("");
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        setInfo("Verification email resent. Please check your inbox.");
      } else {
        setError("No active session found. Please register again.");
      }
    } catch (err) {
      setError(err.message || "Could not resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async () => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

    // Reload to get the latest emailVerified status from Firebase
    await user.reload();

    if (user.emailVerified) {
      navigate("/login");
    } else {
      setError("Your email has not been verified yet. Please click the link in your inbox.");
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
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

        <div className="neo-card rounded-2xl p-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-2xl bg-amber-500/10 p-4 text-amber-300">
              <MailCheck size={32} />
            </div>
          </div>

          <h1 className="neo-title mb-2 text-2xl font-bold">Check your inbox</h1>
          <p className="neo-text mb-2 text-sm leading-6">
            We sent a verification link to your email address. Click the link
            to activate your account before signing in.
          </p>
          <p className="neo-muted mb-6 text-xs">
            If you don't see it, check your spam folder.
          </p>

          {error && (
            <div className="neo-danger mb-4 rounded-xl px-4 py-3 text-sm">{error}</div>
          )}
          {info && (
            <div className="neo-good mb-4 rounded-xl px-4 py-3 text-sm">{info}</div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleContinue}
              className="neo-primary flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
            >
              I've verified my email — Sign In
            </button>

            <button
              onClick={handleResend}
              disabled={loading}
              className="neo-secondary flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Sending…" : "Resend verification email"}
            </button>

            <button
              onClick={handleSignOut}
              className="neo-muted w-full text-xs hover:text-amber-400"
            >
              Use a different account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
