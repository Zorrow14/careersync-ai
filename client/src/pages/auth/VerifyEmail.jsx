import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, MailCheck } from "lucide-react";

export default function VerifyEmail() {
  const navigate = useNavigate();

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

          <h1 className="neo-title mb-2 text-2xl font-bold">Email Verified</h1>
          <p className="neo-text mb-6 text-sm leading-6">
            Demo mode — email verification is skipped. You can sign in directly.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="neo-primary flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
