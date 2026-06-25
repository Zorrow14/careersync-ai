import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import { useAuth } from "../../hooks/useAuth.js";

export default function Landing({ lightMode, setLightMode }) {
  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  function handleTryDemo() {
    demoLogin("candidate", "Sarah Tan", "sarah.tan@example.com");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen">
      <Navbar lightMode={lightMode} setLightMode={setLightMode} />

      <section
        id="demo"
        className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 inline-flex rounded-full border border-amber-400/25 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300">
            AI Career OS for Students & Graduates
          </p>

          <h2 className="neo-title text-5xl font-bold leading-tight md:text-6xl">
            Stop applying <span className="neo-gradient-text">blindly.</span>
          </h2>

          <p className="neo-text mt-6 max-w-xl text-lg leading-8">
            CareerSync AI analyzes your resume, portfolio, skills, and job
            descriptions to generate match scores, skill gaps, and personalized
            career roadmaps.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={handleTryDemo}
              className="neo-primary flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
            >
              <Play size={18} />
              Try Demo
            </button>

            <Link
              to="/register"
              className="neo-secondary flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {[
              ["82%", "Job Match"],
              ["4", "Skill Gaps"],
              ["8w", "Roadmap"],
            ].map(([value, label]) => (
              <div key={label} className="neo-card rounded-2xl p-4">
                <h3 className="neo-title text-2xl font-bold">{value}</h3>
                <p className="neo-muted mt-1 text-xs">{label}</p>
              </div>
            ))}
          </div>
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

            <div className="neo-good rounded-full px-4 py-2 text-sm font-semibold">
              Strong Fit
            </div>
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

                  <div className="neo-progress-track h-3 rounded-full">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-blue-400"
                      style={{ width: percent }}
                    />
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

      <section id="workflow" className="mx-auto max-w-7xl px-8 pb-20">
        <div className="neo-card rounded-3xl p-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold text-amber-300">How It Works</p>
            <h2 className="neo-title mt-2 text-3xl font-bold">
              From Portfolio to Career Roadmap
            </h2>
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

      <section
        id="features"
        className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-8 pb-20 md:grid-cols-4"
      >
        {[
          { icon: Brain, title: "AI Job Match", text: "Compare your resume and portfolio with employer job descriptions." },
          { icon: Target, title: "Skill Gap Detection", text: "Identify missing skills and technologies needed for the role." },
          { icon: Route, title: "Career Roadmap", text: "Get a personalized roadmap to improve career readiness." },
          { icon: Bot, title: "AI Career Coach", text: "Ask questions about your job fit, skills, and career direction." },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              whileHover={{ y: -6 }}
              className="neo-card rounded-2xl p-6 transition"
            >
              <div className="mb-4 inline-flex rounded-xl bg-amber-500/15 p-3 text-amber-300">
                <Icon size={24} />
              </div>
              <h3 className="neo-title font-bold">{item.title}</h3>
              <p className="neo-text mt-2 text-sm leading-6">{item.text}</p>
            </motion.div>
          );
        })}
      </section>

      <section className="mx-auto max-w-7xl px-8 pb-20">
        <div className="neo-card rounded-3xl p-10 text-center">
          <CheckCircle2 className="mx-auto mb-4 text-amber-300" size={36} />
          <h2 className="neo-title text-3xl font-bold">Ready to test your career fit?</h2>
          <p className="neo-text mx-auto mt-3 max-w-2xl">
            Try the prototype and see how AI can help students make smarter career decisions.
          </p>

          <button
            onClick={handleTryDemo}
            className="neo-primary mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold"
          >
            <Play size={18} />
            Try Demo Now
          </button>
        </div>
      </section>
    </div>
  );
}
