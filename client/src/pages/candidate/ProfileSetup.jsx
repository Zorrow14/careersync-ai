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
} from "lucide-react";
import { usePersona } from "../../context/PersonaContext.jsx";

export default function ProfileSetup() {
  const { persona, profile } = usePersona();

  return (
    <div className="mx-auto max-w-4xl pb-16">
      <div className="mb-8">
        <p className="text-sm font-semibold text-amber-300">Your Portfolio</p>
        <h1 className="neo-title text-4xl font-bold">Living Profile</h1>
        <p className="neo-text mt-2">
          {persona.name}'s career profile — auto-populated from demo persona data.
        </p>
      </div>

      {/* ─── Resume ─── */}
      <Section icon={FileText} title="Resume">
        {profile.resumeText ? (
          <div className="neo-soft rounded-xl p-4">
            <div className="mb-2 flex items-center gap-1 text-sm text-emerald-400">
              <CheckCircle2 size={14} /> Resume text extracted
            </div>
            <p className="neo-muted whitespace-pre-wrap text-xs leading-relaxed">
              {profile.resumeText}
            </p>
          </div>
        ) : (
          <p className="neo-muted text-sm">No resume text available for this persona.</p>
        )}
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

      {/* ─── Education ─── */}
      <Section icon={GraduationCap} title="Education">
        {profile.education.map((edu, i) => (
          <div key={i} className="neo-soft mb-3 rounded-xl p-4">
            <p className="neo-title font-semibold">{edu.institution}</p>
            <p className="neo-text text-sm">{edu.degree} in {edu.field}</p>
            <p className="neo-muted text-xs">{edu.startYear} – {edu.endYear}</p>
          </div>
        ))}
      </Section>

      {/* ─── Experience ─── */}
      <Section icon={Briefcase} title="Experience">
        {profile.experience.length > 0 ? profile.experience.map((exp, i) => (
          <div key={i} className="neo-soft mb-3 rounded-xl p-4">
            <p className="neo-title font-semibold">{exp.role}</p>
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

function Section({ icon: Icon, title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="neo-card mb-6 rounded-2xl p-6"
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
