import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  UserPlus,
  GraduationCap,
  Briefcase,
  Building2,
} from "lucide-react";
import { auth, googleProvider } from "../../lib/firebase.js";
import api from "../../lib/api.js";

const roles = [
  {
    id: "candidate",
    label: "Candidate",
    desc: "Student, grad, or internship seeker",
    icon: GraduationCap,
  },
  {
    id: "employer",
    label: "Employer",
    desc: "Recruiter or hiring manager",
    icon: Briefcase,
  },
  {
    id: "university",
    label: "University",
    desc: "Career office or faculty",
    icon: Building2,
  },
];

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectByRole = (r) => {
    if (r === "employer") navigate("/employer");
    else if (r === "university") navigate("/university");
    else navigate("/dashboard");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name });

      // Send Firebase verification email
      await sendEmailVerification(credential.user);

      // Save role to backend
      await api.post("/api/auth/register-role", { name, email, role });

      // Redirect to verify-email page instead of dashboard
      navigate("/verify-email");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setError("");
    setLoading(true);

    try {
      const credential = await signInWithPopup(auth, googleProvider);
      const user = credential.user;

      // Check if this Google user already has a role in our DB
      try {
        const res = await api.get("/api/auth/me");
        redirectByRole(res.data.role);
        return;
      } catch (apiErr) {
        // 404 means new user — fall through to save their chosen role
        if (apiErr.response?.status !== 404) throw apiErr;
      }

      // New Google user: save role (using the role already selected in the UI)
      await api.post("/api/auth/register-role", {
        name: user.displayName || user.email,
        email: user.email,
        role,
      });

      // Google accounts are pre-verified — go straight to dashboard
      redirectByRole(role);
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.response?.data?.message || err.message || "Google sign-up failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="neo-bg flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-10 flex items-center justify-center gap-3">
          <div className="rounded-xl bg-amber-500 p-2 text-slate-950">
            <BriefcaseBusiness size={22} />
          </div>
          <span className="neo-title text-xl font-bold">CareerSync AI</span>
        </Link>

        <div className="neo-card rounded-2xl p-8">
          <h1 className="neo-title mb-1 text-2xl font-bold">Create account</h1>
          <p className="neo-muted mb-6 text-sm">Choose your role to get started.</p>

          {error && (
            <div className="neo-danger mb-4 rounded-xl px-4 py-3 text-sm">{error}</div>
          )}

          {/* Role selector */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            {roles.map(({ id, label, desc, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center text-xs transition ${
                  role === id
                    ? "border-amber-500 bg-amber-500/10 text-amber-300"
                    : "neo-secondary border-transparent"
                }`}
              >
                <Icon size={22} />
                <span className="font-semibold">{label}</span>
                <span className="neo-muted leading-tight">{desc}</span>
              </button>
            ))}
          </div>

          {/* Google sign-up */}
          <button
            onClick={handleGoogleRegister}
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
            <span className="neo-muted text-xs">or register with email</span>
            <div className="h-px flex-1 bg-slate-700/50" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="neo-text mb-1 block text-sm font-medium">Full name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="neo-input w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>

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
              <label className="neo-text mb-1 block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="neo-input w-full rounded-xl px-4 py-3 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="neo-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-60"
            >
              <UserPlus size={17} />
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="neo-muted mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-amber-400 hover:text-amber-300">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
