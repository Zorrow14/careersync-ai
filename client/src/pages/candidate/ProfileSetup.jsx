import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  Link as LinkIcon,
  FileText,
  Target,
  CheckCircle2,
  MapPin,
  Languages,
  Sparkles,
  Settings2,
  ExternalLink,
  Code2,
  Lightbulb,
  Compass,
} from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";
import { getWorkTrait } from "../../data/workTraits.js";
import ProgressBar from "../../components/ui/ProgressBar.jsx";

const priorityColors = {
  high: "neo-danger",
  medium: "neo-blue",
  low: "neo-soft",
};

export default function ProfileSetup() {
  const { persona, profile } = usePersona();
  const workTrait = getWorkTrait(persona.id);

  const completionSuggestions = [
    !profile.portfolioLink && "Add a portfolio link",
    profile.projects.some((p) => !p.demo) && "Add live demos to your projects",
    profile.certifications.length < 2 && "Earn one more certification",
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-5xl pb-16">
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Your Portfolio</p>
        <h1 className="neo-title text-4xl font-bold">Living Profile</h1>
        <p className="neo-text mt-2">
          {persona.name}'s dynamic career profile — the engine behind all your AI features.
        </p>
      </div>

      {/* ─── Profile Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card mb-6 rounded-2xl p-6"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-2xl font-bold text-slate-950">
            {profile.avatar}
          </div>
          <div className="flex-1">
            <h2 className="neo-title text-2xl font-bold">{profile.name}</h2>
            <p className="text-amber-300">{profile.tagline}</p>
            <p className="neo-text mt-2 text-sm leading-6">{profile.about}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs">
              <span className="neo-muted flex items-center gap-1">
                <MapPin size={13} /> {profile.location}
              </span>
              <span className="neo-muted flex items-center gap-1">
                <Languages size={13} /> {profile.languages.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── AI Career Summary + Completion ─── */}
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Section icon={Sparkles} title="AI Career Summary" className="lg:col-span-2 mb-0">
          <p className="neo-text text-sm leading-7">{profile.aiSummary}</p>
        </Section>

        <Section icon={Compass} title="Work Style Snapshot" className="mb-0">
          <p className="neo-muted mb-2 text-xs">Simulated trait profile (not clinical typing)</p>
          <p className="neo-title text-lg font-bold">{workTrait.primary}</p>
          <p className="neo-muted text-sm">with {workTrait.secondary} tendencies</p>
          <p className="neo-text mt-3 text-sm leading-6">{workTrait.description}</p>
        </Section>
      </div>

      <Section icon={CheckCircle2} title="Portfolio Completion" className="mb-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="neo-muted text-xs font-medium">Completeness</span>
              <span className="text-2xl font-bold tabular-nums text-amber-300">{profile.completion}%</span>
            </div>
            <ProgressBar value={profile.completion} size="lg" />
          </div>
          {completionSuggestions.length > 0 && (
            <div className="md:min-w-[14rem] md:border-l md:border-white/10 md:pl-6">
              <p className="neo-muted text-xs font-semibold uppercase tracking-wide">Suggestions</p>
              <div className="mt-3 space-y-2">
                {completionSuggestions.map((s) => (
                  <p key={s} className="neo-text flex items-center gap-2 text-sm">
                    <Lightbulb size={14} className="shrink-0 text-amber-300" /> {s}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* ─── AI Suggestions ─── */}
      <Section icon={Lightbulb} title="AI Recommendations">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {profile.aiSuggestions.map((s, i) => (
            <div key={i} className="neo-soft flex items-start justify-between gap-3 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 rounded-lg bg-amber-500/15 px-2 py-0.5 text-xs font-semibold capitalize text-amber-300">
                  {s.type}
                </span>
                <p className="neo-text text-sm leading-6">{s.text}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${priorityColors[s.priority]}`}>
                {s.priority}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Career Preferences ─── */}
      <Section icon={Settings2} title="Career Preferences">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            ["Target Role", profile.preferences.role],
            ["Industry", profile.preferences.industry],
            ["Work Mode", profile.preferences.workMode],
            ["Location", profile.preferences.location],
            ["Salary Range", profile.preferences.salaryRange],
          ].map(([label, value]) => (
            <div key={label} className="neo-soft rounded-xl p-4">
              <p className="neo-muted text-xs">{label}</p>
              <p className="neo-text mt-1 text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Skills ─── */}
      <Section icon={Award} title="Skills">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span key={skill} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* ─── Career Interests ─── */}
      <Section icon={Target} title="Career Interests">
        <div className="flex flex-wrap gap-2">
          {profile.careerInterests.map((interest) => (
            <span key={interest} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
              {interest}
            </span>
          ))}
        </div>
      </Section>

      {/* ─── Education ─── */}
      <Section icon={GraduationCap} title="Education">
        {profile.education.map((edu, i) => (
          <div key={i} className="neo-soft mb-3 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="neo-title font-semibold">{edu.institution}</p>
              {edu.cgpa && (
                <span className="neo-badge-match rounded-full px-3 py-1 text-xs font-semibold">
                  CGPA {edu.cgpa}
                </span>
              )}
            </div>
            <p className="neo-text text-sm">{edu.degree} in {edu.field}</p>
            <p className="neo-muted text-xs">{edu.startYear} – {edu.endYear}</p>
            {edu.achievements?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {edu.achievements.map((a) => (
                  <span key={a} className="neo-soft rounded-full px-2 py-0.5 text-xs neo-muted">★ {a}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </Section>

      {/* ─── Experience ─── */}
      <Section icon={Briefcase} title="Experience">
        {profile.experience.length > 0 ? profile.experience.map((exp, i) => (
          <div key={i} className="neo-soft mb-3 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <p className="neo-title font-semibold">{exp.role}</p>
              {exp.type && (
                <span className="neo-soft rounded-full px-2 py-0.5 text-xs neo-muted">{exp.type}</span>
              )}
            </div>
            <p className="neo-text text-sm">{exp.company}</p>
            <p className="neo-muted mt-1 text-xs">{exp.description}</p>
            <p className="neo-muted text-xs">{exp.startDate} – {exp.endDate}</p>
          </div>
        )) : (
          <p className="neo-muted text-sm">No experience listed.</p>
        )}
      </Section>

      {/* ─── Projects ─── */}
      <Section icon={FolderGit2} title="Projects">
        {profile.projects.map((proj, i) => (
          <div key={i} className="neo-soft mb-3 rounded-xl p-4">
            <p className="neo-title font-semibold">{proj.title}</p>
            <p className="neo-text mt-1 text-sm">{proj.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {proj.techStack.map((t) => (
                <span key={t} className="neo-badge-match rounded-full px-2 py-0.5 text-xs font-medium">{t}</span>
              ))}
            </div>
            <div className="mt-3 flex gap-4 text-xs">
              {proj.link && (
                <span className="flex items-center gap-1 text-amber-300"><Code2 size={13} /> Repository</span>
              )}
              {proj.demo && (
                <span className="flex items-center gap-1 text-amber-300"><ExternalLink size={13} /> Live Demo</span>
              )}
            </div>
          </div>
        ))}
      </Section>

      {/* ─── Certifications ─── */}
      <Section icon={Award} title="Certifications">
        {profile.certifications.length > 0 ? profile.certifications.map((cert, i) => (
          <div key={i} className="neo-soft mb-3 rounded-xl p-4">
            <p className="neo-title font-semibold">{cert.name}</p>
            <p className="neo-muted text-sm">{cert.issuer} · {cert.year}</p>
          </div>
        )) : (
          <p className="neo-muted text-sm">No certifications listed.</p>
        )}
      </Section>

      {/* ─── Resume ─── */}
      <Section icon={FileText} title="Resume">
        {profile.resumeText ? (
          <div className="neo-soft rounded-xl p-4">
            <div className="mb-2 flex items-center gap-1 text-sm text-emerald-400">
              <CheckCircle2 size={14} /> Resume uploaded & parsed (mock)
            </div>
            <p className="neo-muted whitespace-pre-wrap text-xs leading-relaxed">
              {profile.resumeText}
            </p>
          </div>
        ) : (
          <p className="neo-muted text-sm">No resume text available for this persona.</p>
        )}
      </Section>

      {/* ─── Links ─── */}
      <Section icon={LinkIcon} title="Links">
        <div className="space-y-2 text-sm">
          {profile.githubLink && (
            <p className="neo-text">GitHub: <span className="text-amber-300">{profile.githubLink}</span></p>
          )}
          {profile.portfolioLink && (
            <p className="neo-text">Portfolio: <span className="text-amber-300">{profile.portfolioLink}</span></p>
          )}
          {!profile.githubLink && !profile.portfolioLink && (
            <p className="neo-muted">No links provided.</p>
          )}
        </div>
      </Section>
    </div>
  );
}

function Section({ icon: Icon, title, children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`neo-card mb-6 rounded-2xl p-6 ${className}`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-amber-500/15 p-2 text-amber-300">
          <Icon size={20} />
        </div>
        <h2 className="neo-title text-xl font-bold">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}
