import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import {
  employerJobs,
  pipelineCandidates,
  hiringAnalytics,
  companyProfile,
} from "../../data/employerData.js";
import { getCompanyFeedByName } from "../../data/companyFeedData.js";
import PageHeader from "../../components/ui/PageHeader.jsx";
import KpiCard from "../../components/ui/KpiCard.jsx";

export default function EmployerDashboard() {
  const activeJobs = employerJobs.filter((j) => j.status === "Active").length;
  const totalApps = hiringAnalytics.totalApplications;
  const recentPipeline = pipelineCandidates.slice(0, 5);
  const recentFeed = getCompanyFeedByName(companyProfile.name).slice(0, 3);

  return (
    <div>
      <PageHeader
        eyebrow="Employer Portal"
        title="Hiring Dashboard"
        description={`${companyProfile.name} — overview of hiring activity and key metrics.`}
        actions={
          <Link to="/employer/jobs" className="neo-primary rounded-xl px-5 py-3 text-sm font-semibold">
            + Post New Job
          </Link>
        }
      />

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active Positions", value: activeJobs, icon: Briefcase, iconClassName: "text-amber-300", to: "/employer/jobs" },
          { label: "Total Applications", value: totalApps, icon: UserPlus, iconClassName: "text-blue-300", to: "/employer/analytics" },
          { label: "Hired This Quarter", value: hiringAnalytics.totalHired, icon: CheckCircle2, iconClassName: "text-emerald-300" },
          { label: "Avg. Time to Hire", value: hiringAnalytics.avgTimeToHire, icon: Clock, iconClassName: "text-purple-300" },
        ].map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ─── Recent Pipeline Activity ─── */}
        <div className="neo-card rounded-2xl p-6 lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="neo-title text-xl font-bold">Recent Pipeline Activity</h2>
            <Link to="/employer/pipeline" className="flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentPipeline.map((c) => (
              <div key={c.id} className="neo-soft flex items-center justify-between rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs font-bold text-amber-300">
                    {c.avatar}
                  </span>
                  <div>
                    <p className="neo-title text-sm font-semibold">{c.name}</p>
                    <p className="neo-muted text-xs">{c.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-300">{c.fitScore}%</span>
                  <StageBadge stage={c.stage} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Company Feed Preview ─── */}
        <div className="neo-card rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="neo-title text-xl font-bold">Company Feed</h2>
            <Link to="/employer/feed" className="flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-amber-200">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentFeed.map((post) => (
              <div key={post.id} className="neo-soft rounded-xl p-4">
                <p className="neo-title text-sm font-semibold leading-tight">{post.title}</p>
                <p className="neo-muted mt-1 text-xs">{post.author} · {post.date}</p>
                <p className="neo-text mt-2 line-clamp-2 text-xs leading-5">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Quick Links ─── */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: "Talent Discovery", path: "/employer/talent", icon: Users },
          { label: "Job Management", path: "/employer/jobs", icon: Briefcase },
          { label: "Candidate Pipeline", path: "/employer/pipeline", icon: TrendingUp },
          { label: "Hiring Analytics", path: "/employer/analytics", icon: TrendingUp },
        ].map(({ label, path, icon: Icon }) => (
          <Link key={path} to={path} className="neo-card neo-interactive flex items-center gap-3 rounded-2xl p-5">
            <div className="rounded-xl bg-amber-500/15 p-2 text-amber-300"><Icon size={20} /></div>
            <div>
              <p className="neo-title text-sm font-semibold">{label}</p>
              <p className="neo-muted text-xs">View →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StageBadge({ stage }) {
  const colors = {
    Applied: "neo-soft",
    Screening: "neo-blue",
    Interview: "bg-purple-500/15 text-purple-300",
    Offer: "neo-good",
    Hired: "bg-emerald-500/15 text-emerald-300",
    Rejected: "neo-danger",
  };
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[stage] || "neo-soft"}`}>
      {stage}
    </span>
  );
}
