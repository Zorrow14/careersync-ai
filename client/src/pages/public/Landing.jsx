import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Target,
  Route,
  Bot,
  Upload,
  FileSearch,
  CheckCircle2,
  Play,
  GraduationCap,
  Briefcase,
  Building2,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../hooks/useAuth.js";
import { demoUsers } from "../../lib/demoUsers.js";

const audiences = [
  {
    key: "candidate",
    icon: GraduationCap,
    title: "For Candidates",
    desc: "Understand your job fit, close skill gaps, follow a roadmap, and practice interviews.",
    points: ["AI job match & skill gaps", "Personalized roadmaps", "Mock interviews & coach"],
  },
  {
    key: "employer",
    icon: Briefcase,
    title: "For Employers",
    desc: "Discover ranked talent, review explainable fit reports, and track your hiring pipeline.",
    points: ["AI-ranked candidates", "Fit reports & insights", "Pipeline & analytics"],
  },
  {
    key: "university",
    icon: Building2,
    title: "For Universities",
    desc: "Track cohort employability, spot curriculum gaps, and align courses with market demand.",
    points: ["Employability tracker", "Curriculum insights", "Industry trend reports"],
  },
];

const impactStats = [
  { icon: Target, value: "82%", label: "Avg. match clarity before applying" },
  { icon: Users, value: "156", label: "Students tracked across cohorts" },
  { icon: TrendingUp, value: "+13%", label: "Readiness lift over a semester" },
  { icon: Briefcase, value: "24", label: "Employer partners in the network" },
];

const sdgs = [
  {
    code: "SDG 4",
    title: "Quality Education",
    desc: "Universities pinpoint curriculum gaps and align teaching with real industry demand.",
  },
  {
    code: "SDG 8",
    title: "Decent Work & Economic Growth",
    desc: "Candidates reach better-matched roles while employers reduce mismatched hiring.",
  },
];

export default function Landing({ lightMode, setLightMode }) {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();
  const [searchParams] = useSearchParams();

  // `?demo=<role>` deep link — lets a video/deck link drop judges straight in.
  useEffect(() => {
    const role = searchParams.get("demo");
    if (role && demoUsers[role]) {
      const u = demoUsers[role];
      demoLogin(u.role, u.name, u.email);
      navigate(u.home);
    }
  }, [searchParams, demoLogin, navigate]);

  function enterDemo(roleKey) {
    const u = demoUsers[roleKey];
    demoLogin(u.role, u.name, u.email);
    navigate(u.home);
  }

  return (
    <div className="neo-page min-h-screen">
      <Navbar lightMode={lightMode} setLightMode={setLightMode} />

      {/* ─── Problem statement ─── */}
      <section className="mx-auto max-w-4xl px-6 pt-10 text-center sm:px-8">
        <p className="text-sm font-semibold text-rose-300">The problem</p>
        <h2 className="neo-title mt-3 text-2xl font-bold leading-snug sm:text-3xl">
          Students apply blind. Employers screen by keywords. Universities lose visibility after graduation.
        </h2>
        <p className="neo-text mx-auto mt-4 max-w-2xl text-sm leading-7 sm:text-base">
          CareerSync AI connects all three sides with one explainable employability score — so every decision
          is based on evidence, not guesswork.
        </p>
      </section>

      {/* ─── Hero ─── */}
      <section
        id="demo"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 inline-flex rounded-full border border-amber-400/25 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
            AI Career OS for Candidates, Employers & Universities
          </p>

          <h2 className="neo-title text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Turn career guesswork into a <span className="neo-gradient-text">clear plan.</span>
          </h2>

          <p className="neo-text mt-6 max-w-xl text-base leading-8 sm:text-lg">
            CareerSync AI turns resumes and portfolios into explainable match scores,
            skill gaps, and roadmaps — helping students get hired, employers hire better,
            and universities close the readiness gap.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => enterDemo("candidate")}
              className="neo-primary flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-semibold"
            >
              <Play size={18} />
              Try Live Demo
            </button>

            <a
              href="#audiences"
              className="neo-secondary flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-semibold"
            >
              Explore the platform <ArrowRight size={18} />
            </a>
          </div>

          <p className="neo-muted mt-4 text-xs">
            No sign-up required — pick a role below to enter instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="neo-card rounded-3xl p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="neo-muted text-sm font-medium">AI Match Score</p>
              <h3 className="neo-title mt-2 text-5xl font-bold">82%</h3>
            </div>
            <div className="neo-good rounded-full px-4 py-2 text-sm font-semibold">Strong Fit</div>
          </div>

          <div className="neo-soft rounded-2xl p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/15 p-2 text-amber-300">
                <FileSearch size={22} />
              </div>
              <div>
                <h4 className="neo-title font-semibold">Frontend Developer Intern</h4>
                <p className="neo-muted text-sm">TechNova Solutions</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                ["React.js", "95%"],
                ["JavaScript", "90%"],
                ["Node.js", "80%"],
                ["UI/UX", "88%"],
                ["Docker", "35%"],
              ].map(([skill, percent]) => (
                <div key={skill}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="neo-text font-medium">{skill}</span>
                    <span className="neo-muted">{percent}</span>
                  </div>
                  <div className="neo-progress-track h-3 overflow-hidden rounded-full">
                    <div className="neo-progress-fill-alt h-full rounded-full" style={{ width: percent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div className="neo-good rounded-2xl p-4">
              <p className="text-sm font-medium">Matched Skills</p>
              <h4 className="mt-2 text-2xl font-bold">7</h4>
            </div>
            <div className="neo-danger rounded-2xl p-4">
              <p className="text-sm font-medium">Missing Skills</p>
              <h4 className="mt-2 text-2xl font-bold">4</h4>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Audience cards (one-click demo per role) ─── */}
      <section id="audiences" className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-amber-300">One platform, three views</p>
          <h2 className="neo-title mt-2 text-3xl font-bold">Choose how you want to explore</h2>
          <p className="neo-text mx-auto mt-3 max-w-2xl">
            A single unified platform with tailored experiences for each audience. Click any role to enter the live demo instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {audiences.map((a) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.key}
                whileHover={{ y: -6 }}
                className="neo-card flex flex-col rounded-2xl p-6"
              >
                <div className="mb-4 inline-flex w-fit rounded-xl bg-amber-500/15 p-3 text-amber-300">
                  <Icon size={24} />
                </div>
                <h3 className="neo-title text-xl font-bold">{a.title}</h3>
                <p className="neo-text mt-2 text-sm leading-6">{a.desc}</p>

                <ul className="mt-4 space-y-2">
                  {a.points.map((p) => (
                    <li key={p} className="neo-muted flex items-center gap-2 text-sm">
                      <CheckCircle2 size={15} className="shrink-0 text-amber-300" /> {p}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => enterDemo(a.key)}
                  className="neo-primary mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold"
                >
                  Enter as {demoUsers[a.key].label} <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── Impact metrics ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20">
        <div className="neo-card rounded-3xl p-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold text-amber-300">Why it matters</p>
            <h2 className="neo-title mt-2 text-3xl font-bold">Built around real career impact</h2>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {impactStats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="neo-soft rounded-2xl p-6 text-center">
                <Icon size={22} className="mx-auto mb-3 text-amber-300" />
                <h3 className="neo-title text-3xl font-bold">{value}</h3>
                <p className="neo-muted mt-2 text-xs leading-5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Career OS module map ─── */}
      <section id="modules" className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-amber-300">Career OS · Starter Kit alignment</p>
          <h2 className="neo-title mt-2 text-3xl font-bold">Our challenge module track</h2>
          <p className="neo-text mx-auto mt-3 max-w-2xl text-sm">
            One signature innovation — Explainable Employability OS — mapped to official hackathon modules.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            {
              audience: "Candidates",
              modules: ["Career Path Navigator", "AI Career Coach", "Mock Interview Practice", "JD Analyzer"],
              color: "text-amber-300",
            },
            {
              audience: "Employers",
              modules: ["Smart Talent Matching", "Explainable Fit Report", "Hiring Pipeline", "Talent Analytics"],
              color: "text-purple-300",
            },
            {
              audience: "Universities",
              modules: ["Adaptive Readiness Profile", "Future-State Curriculum Engine", "Cohort Insights", "Lifelong Outcome Loop"],
              color: "text-blue-300",
            },
          ].map((col) => (
            <div key={col.audience} className="neo-card rounded-2xl p-6">
              <p className={`mb-3 text-xs font-bold uppercase tracking-wider ${col.color}`}>{col.audience}</p>
              <ul className="space-y-2">
                {col.modules.map((m) => (
                  <li key={m} className="neo-text flex items-center gap-2 text-sm">
                    <CheckCircle2 size={14} className="shrink-0 text-emerald-300" /> {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Core loop ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8">
        <div className="neo-card rounded-3xl p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold text-amber-300">Three-sided core loop</p>
            <h2 className="neo-title mt-2 text-2xl font-bold">One score, three views</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-center text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-2">
            {[
              "Discover jobs",
              "Analyze fit",
              "Close skill gaps",
              "Apply",
              "Employer fit report",
              "University cohort gap",
            ].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-2">
                <span className="neo-soft rounded-full px-4 py-2">{step}</span>
                {i < arr.length - 1 && <ArrowRight size={14} className="neo-muted hidden sm:block" />}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Workflow ─── */}
      <section id="workflow" className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20">
        <div className="neo-card rounded-3xl p-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold text-amber-300">How It Works</p>
            <h2 className="neo-title mt-2 text-3xl font-bold">From Portfolio to Career Roadmap</h2>
            <p className="neo-text mx-auto mt-3 max-w-2xl">
              CareerSync AI transforms student profiles into actionable career intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {[
              { icon: Upload, title: "Upload Profile", text: "Add resume, portfolio, skills, and project experience." },
              { icon: FileSearch, title: "Paste Job Description", text: "Compare your profile against real employer requirements." },
              { icon: Brain, title: "AI Analysis", text: "Generate match score, strengths, weaknesses, and gaps." },
              { icon: Route, title: "Career Roadmap", text: "Receive a personalized improvement plan." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="neo-soft rounded-2xl p-6">
                  <div className="mb-4 inline-flex rounded-xl bg-amber-500/15 p-3 text-amber-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="neo-title font-bold">{item.title}</h3>
                  <p className="neo-text mt-2 text-sm leading-6">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section
        id="features"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-16 sm:px-8 sm:pb-20 md:grid-cols-4"
      >
        {[
          { icon: Brain, title: "AI Job Match", text: "Compare your resume and portfolio with employer job descriptions." },
          { icon: Target, title: "Skill Gap Detection", text: "Identify missing skills and technologies needed for the role." },
          { icon: Route, title: "Career Roadmap", text: "Get a personalized roadmap to improve career readiness." },
          { icon: Bot, title: "AI Career Coach", text: "Ask questions about your job fit, skills, and career direction." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.div key={item.title} whileHover={{ y: -6 }} className="neo-card rounded-2xl p-6 transition">
              <div className="mb-4 inline-flex rounded-xl bg-amber-500/15 p-3 text-amber-300">
                <Icon size={24} />
              </div>
              <h3 className="neo-title font-bold">{item.title}</h3>
              <p className="neo-text mt-2 text-sm leading-6">{item.text}</p>
            </motion.div>
          );
        })}
      </section>

      {/* ─── Career programs (monetisation placeholder) ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8">
        <div className="neo-card rounded-2xl border border-dashed border-amber-500/25 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-300">
                Sponsored · Demo placement
              </p>
              <h2 className="neo-title mt-2 text-2xl font-bold">Career Programs & Bootcamps</h2>
              <p className="neo-text mt-2 max-w-xl text-sm leading-6">
                Reserved neutral space for university career fairs, bootcamp partners, and employer branding —
                monetisation-ready without distracting from the core product demo.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {["AWS Educate", "Google Career Certificates", "Talentbank Partners"].map((p) => (
                <span key={p} className="neo-secondary rounded-xl px-4 py-2 text-xs font-semibold">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SDG alignment ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 sm:pb-20">
        <div className="neo-card rounded-3xl p-8">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-3 inline-flex rounded-xl bg-emerald-500/15 p-3 text-emerald-300">
              <Globe size={24} />
            </div>
            <p className="text-sm font-semibold text-emerald-300">Sustainable Impact</p>
            <h2 className="neo-title mt-2 text-3xl font-bold">Aligned with the UN SDGs</h2>
            <p className="neo-text mx-auto mt-3 max-w-2xl">
              CareerSync AI is designed to create measurable social impact across education and employment.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {sdgs.map((s) => (
              <div key={s.code} className="neo-soft rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-emerald-500/15 px-3 py-1 text-sm font-bold text-emerald-300">
                    {s.code}
                  </span>
                  <h3 className="neo-title font-bold">{s.title}</h3>
                </div>
                <p className="neo-text mt-3 text-sm leading-7">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8">
        <div className="neo-card rounded-3xl p-10 text-center">
          <Sparkles className="mx-auto mb-4 text-amber-300" size={36} />
          <h2 className="neo-title text-3xl font-bold">Ready to explore CareerSync AI?</h2>
          <p className="neo-text mx-auto mt-3 max-w-2xl">
            Jump straight into the live prototype and see how AI can make career decisions smarter for everyone.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => enterDemo("candidate")}
              className="neo-primary inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-semibold"
            >
              <Play size={18} /> Try as Candidate
            </button>
            <button
              onClick={() => enterDemo("employer")}
              className="neo-secondary inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-semibold"
            >
              <Briefcase size={18} /> Try as Employer
            </button>
            <button
              onClick={() => enterDemo("university")}
              className="neo-secondary inline-flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-semibold"
            >
              <Building2 size={18} /> Try as University
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
