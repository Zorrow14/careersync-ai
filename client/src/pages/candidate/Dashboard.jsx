import StatCard from "../../components/ui/StatCard";
import { dashboardStats } from "../../data/mockData";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold text-amber-300">Welcome back</p>
          <h1 className="neo-title text-4xl font-bold">Career Dashboard</h1>
          <p className="neo-text mt-2">
            Track your career readiness, job fit, and recommended next steps.
          </p>
        </div>

        <Link
          to="/analyzer"
          className="neo-primary rounded-xl px-5 py-3 font-semibold"
        >
          New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="neo-title text-xl font-bold">
              Recommended Career Paths
            </h2>
            <TrendingUp className="text-amber-300" size={22} />
          </div>

          <div className="mt-6 space-y-4">
            {[
              ["Frontend Developer", "92% fit", "Best match"],
              ["Full Stack Developer", "86% fit", "Strong potential"],
              ["UI Engineer", "84% fit", "Good fit"],
              ["DevOps Engineer", "68% fit", "Needs improvement"],
            ].map(([role, score, label]) => (
              <div
                key={role}
                className="neo-soft flex items-center justify-between rounded-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-amber-500/15 p-2 text-amber-300">
                    <Briefcase size={18} />
                  </div>

                  <div>
                    <p className="neo-title font-semibold">{role}</p>
                    <p className="neo-muted text-sm">{label}</p>
                  </div>
                </div>

                <span className="rounded-full bg-amber-500/15 px-4 py-1 text-sm font-semibold text-amber-300">
                  {score}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="neo-card rounded-2xl p-6">
          <div className="w-fit rounded-xl bg-amber-500/15 p-3 text-amber-300">
            <GraduationCap size={24} />
          </div>

          <h2 className="neo-title mt-5 text-xl font-bold">AI Insight</h2>
          <p className="neo-text mt-4 leading-7">
            Your strongest path is frontend development. To increase your
            employability score, focus on Docker, CI/CD, testing, and cloud
            deployment.
          </p>

          <Link
            to="/roadmap"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
          >
            View roadmap <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}