import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  UserPlus,
  GraduationCap,
  Briefcase,
  Building2,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth.js";

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

const roleHome = {
  candidate: "/dashboard",
  employer: "/employer",
  university: "/university",
};

export default function Register() {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [loading, setLoading] = useState(false);

  function handleRegister(e) {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const displayName = name.trim() || (email ? email.split("@")[0] : "Demo User");
      demoLogin(role, displayName, email);
      navigate(roleHome[role] || "/dashboard");
    }, 600);
  }

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

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="neo-text mb-1 block text-sm font-medium">Full name</label>
              <input
                type="text"
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
