import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  TrendingUp,
  UserCircle,
  Loader2,
} from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import { dashboardStats } from "../../data/mockData";
import { getMyProfile } from "../../services/profileService.js";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch {
        // 404 or error — no profile yet
      } finally {
        setProfileLoading(false);
      }
    })();
  }, []);

  const hasProfile = !!profile;
  const skillCount = profile?.skills?.length || 0;
  const projectCount = profile?.projects?.length || 0;
  const educationCount = profile?.education?.length || 0;
  const experienceCount = profile?.experience?.length || 0;

  const completionItems = [
    !!profile?.resumeText,
    skillCount > 0,
    projectCount > 0,
    educationCount > 0,
    (profile?.careerInterests?.length || 0) > 0,
  ];
  const completionPct = hasProfile
    ? Math.round((completionItems.filter(Boolean).length / completionItems.length) * 100)
    : 0;

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

      {/* ─── Profile Summary / Empty State ─── */}
      {profileLoading ? (
        <div className="neo-card mb-8 flex items-center justify-center rounded-2xl p-10">
          <Loader2 className="animate-spin text-amber-400" size={28} />
        </div>
      ) : hasProfile ? (
        <div className="neo-card mb-8 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-amber-500/15 p-3 text-amber-300">
                <UserCircle size={28} />
              </div>
              <div>
                <h2 className="neo-title text-lg font-bold">Your Living Profile</h2>
                <p className="neo-muted text-sm">
                  {skillCount} skill{skillCount !== 1 && "s"} · {projectCount} project{projectCount !== 1 && "s"} · {educationCount} education · {experienceCount} experience
                </p>
              </div>
            </div>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
            >
              Edit Profile <ArrowRight size={16} />
            </Link>
          </div>

          {/* Completion bar */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="neo-muted text-xs font-medium">Profile Completeness</span>
              <span className="text-xs font-bold text-amber-300">{completionPct}%</span>
            </div>
            <div className="neo-progress-track h-2 overflow-hidden rounded-full">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                style={{ width: `${completionPct}%` }}
              />
            </div>
          </div>

          {/* Quick tags */}
          {skillCount > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.skills.slice(0, 8).map((s) => (
                <span key={s} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
                  {s}
                </span>
              ))}
              {skillCount > 8 && (
                <span className="neo-muted text-xs self-center">+{skillCount - 8} more</span>
              )}
            </div>
          )}

          {profile.resumeText && (
            <p className="neo-muted mt-3 text-xs flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
              Resume uploaded and parsed
            </p>
          )}
        </div>
      ) : (
        <div className="neo-card mb-8 rounded-2xl p-8 text-center">
          <div className="mx-auto w-fit rounded-xl bg-amber-500/15 p-4 text-amber-300">
            <UserCircle size={36} />
          </div>
          <h2 className="neo-title mt-4 text-xl font-bold">
            Complete Your Living Profile
          </h2>
          <p className="neo-text mx-auto mt-2 max-w-md">
            Set up your career profile to unlock personalized AI analysis, smart
            matching, and tailored roadmaps.
          </p>
          <Link
            to="/profile"
            className="neo-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
          >
            Build Your Profile <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* ─── Stats (mock data preserved) ─── */}
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
