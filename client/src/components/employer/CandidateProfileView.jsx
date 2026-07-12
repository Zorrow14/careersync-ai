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
  Compass,
  Mic,
  TrendingUp,
} from "lucide-react";
import ProgressBar from "../ui/ProgressBar.jsx";
import ProfileAvatar from "../ui/ProfileAvatar.jsx";

const dimensionIcons = {
  Target,
  FolderGit2,
  Mic,
  TrendingUp,
};

export default function CandidateProfileView({ view }) {
  const { profile, employability, workTrait, fitScore, role, hasFullProfile } = view;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="neo-card rounded-2xl p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <ProfileAvatar
              photoUrl={profile.photoUrl}
              initials={profile.avatar}
              size="xl"
              alt={profile.name}
              className="rounded-2xl"
            />
            <div className="min-w-0">
              <h2 className="neo-title text-2xl font-bold">{profile.name}</h2>
              <p className="text-amber-300">{profile.tagline}</p>
              <p className="neo-text mt-2 text-sm leading-6">{profile.about}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs">
                {profile.location && (
                  <span className="neo-muted flex items-center gap-1">
                    <MapPin size={13} /> {profile.location}
                  </span>
                )}
                {profile.languages?.length > 0 && (
                  <span className="neo-muted flex items-center gap-1">
                    <Languages size={13} /> {profile.languages.join(", ")}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="neo-soft shrink-0 rounded-xl px-5 py-4 text-center">
            <p className="neo-muted text-xs font-semibold uppercase tracking-wide">Role fit</p>
            <p className="mt-1 text-3xl font-bold tabular-nums text-amber-300">{fitScore}%</p>
            <p className="neo-muted mt-1 text-xs">{role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Section icon={Sparkles} title="AI Career Summary" className="lg:col-span-2 mb-0">
          <p className="neo-text text-sm leading-7">{profile.aiSummary}</p>
          {!hasFullProfile && (
            <p className="neo-muted mt-3 text-xs">
              Limited portfolio on file — fit score reflects skills and academic signals from talent discovery.
            </p>
          )}
        </Section>

        {workTrait ? (
          <Section icon={Compass} title="Work Style Snapshot" className="mb-0">
            <p className="neo-muted mb-2 text-xs">Simulated trait profile</p>
            <p className="neo-title text-lg font-bold">{workTrait.primary}</p>
            <p className="neo-muted text-sm">with {workTrait.secondary} tendencies</p>
            <p className="neo-text mt-3 text-sm leading-6">{workTrait.description}</p>
          </Section>
        ) : (
          <Section icon={Compass} title="Work Style Snapshot" className="mb-0">
            <p className="neo-muted text-sm">Work style insights unlock when the candidate completes a mock interview.</p>
          </Section>
        )}
      </div>

      {employability && (
        <Section icon={Target} title="Employability Score">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="neo-muted text-xs font-semibold uppercase tracking-wide">Overall score</p>
              <p className="text-4xl font-bold tabular-nums text-amber-300">{employability.total}</p>
            </div>
            {employability.boost > 0 && (
              <p className="neo-muted text-xs">
                Includes +{employability.boost} from recent candidate activity
              </p>
            )}
          </div>
          <ProgressBar value={employability.total} size="lg" className="mb-6" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {employability.dimensions.map((dim) => {
              const DimIcon = dimensionIcons[dim.icon] || Target;
              return (
                <div key={dim.key} className="neo-soft rounded-xl p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <DimIcon size={14} className="text-amber-300" />
                      {dim.label}
                    </span>
                    <span className="font-bold tabular-nums text-amber-300">{dim.value}</span>
                  </div>
                  <p className="neo-muted text-xs leading-5">{dim.why}</p>
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {profile.completion != null && (
        <Section icon={CheckCircle2} title="Profile Completeness">
          <div className="flex items-center justify-between gap-4">
            <ProgressBar value={profile.completion} size="lg" className="flex-1" />
            <span className="text-2xl font-bold tabular-nums text-amber-300">{profile.completion}%</span>
          </div>
        </Section>
      )}

      <Section icon={Award} title="Skills">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <span key={skill} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {profile.careerInterests?.length > 0 && (
        <Section icon={Target} title="Career Interests">
          <div className="flex flex-wrap gap-2">
            {profile.careerInterests.map((interest) => (
              <span key={interest} className="neo-badge-match rounded-full px-3 py-1 text-xs font-medium">
                {interest}
              </span>
            ))}
          </div>
        </Section>
      )}

      <Section icon={GraduationCap} title="Education">
        {profile.education.map((edu, i) => (
          <div key={i} className="neo-soft mb-3 rounded-xl p-4 last:mb-0">
            <div className="flex items-center justify-between gap-2">
              <p className="neo-title font-semibold">{edu.institution}</p>
              {edu.cgpa && (
                <span className="neo-badge-match rounded-full px-3 py-1 text-xs font-semibold">
                  CGPA {edu.cgpa}
                </span>
              )}
            </div>
            <p className="neo-text text-sm">
              {edu.degree}
              {edu.field ? ` in ${edu.field}` : ""}
            </p>
            {(edu.startYear || edu.endYear) && (
              <p className="neo-muted text-xs">
                {edu.startYear} – {edu.endYear}
              </p>
            )}
            {edu.achievements?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {edu.achievements.map((a) => (
                  <span key={a} className="neo-soft neo-muted rounded-full px-2 py-0.5 text-xs">
                    ★ {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </Section>

      <Section icon={Briefcase} title="Experience">
        {profile.experience.length > 0 ? (
          profile.experience.map((exp, i) => (
            <div key={i} className="neo-soft mb-3 rounded-xl p-4 last:mb-0">
              <div className="flex items-center justify-between gap-2">
                <p className="neo-title font-semibold">{exp.role}</p>
                {exp.type && (
                  <span className="neo-soft neo-muted rounded-full px-2 py-0.5 text-xs">{exp.type}</span>
                )}
              </div>
              <p className="neo-text text-sm">{exp.company}</p>
              {exp.description && <p className="neo-muted mt-1 text-xs">{exp.description}</p>}
              {(exp.startDate || exp.endDate) && (
                <p className="neo-muted text-xs">
                  {exp.startDate} – {exp.endDate}
                </p>
              )}
            </div>
          ))
        ) : (
          <p className="neo-muted text-sm">No experience listed.</p>
        )}
      </Section>

      {profile.projects.length > 0 && (
        <Section icon={FolderGit2} title="Projects">
          {profile.projects.map((proj, i) => (
            <div key={i} className="neo-soft mb-3 rounded-xl p-4 last:mb-0">
              <p className="neo-title font-semibold">{proj.title}</p>
              <p className="neo-text mt-1 text-sm">{proj.description}</p>
              {proj.techStack?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {proj.techStack.map((t) => (
                    <span key={t} className="neo-badge-match rounded-full px-2 py-0.5 text-xs font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex gap-4 text-xs">
                {proj.link && (
                  <span className="flex items-center gap-1 text-amber-300">
                    <Code2 size={13} /> Repository
                  </span>
                )}
                {proj.demo && (
                  <span className="flex items-center gap-1 text-amber-300">
                    <ExternalLink size={13} /> Live Demo
                  </span>
                )}
              </div>
            </div>
          ))}
        </Section>
      )}

      {profile.certifications.length > 0 && (
        <Section icon={Award} title="Certifications">
          {profile.certifications.map((cert, i) => (
            <div key={i} className="neo-soft mb-3 rounded-xl p-4 last:mb-0">
              <p className="neo-title font-semibold">{cert.name}</p>
              <p className="neo-muted text-sm">
                {cert.issuer} · {cert.year}
              </p>
            </div>
          ))}
        </Section>
      )}

      {profile.preferences?.role && (
        <Section icon={Settings2} title="Career Preferences">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              ["Target Role", profile.preferences.role],
              ["Industry", profile.preferences.industry],
              ["Work Mode", profile.preferences.workMode],
              ["Location", profile.preferences.location],
              ["Salary Range", profile.preferences.salaryRange],
            ]
              .filter(([, value]) => value && value !== "—")
              .map(([label, value]) => (
                <div key={label} className="neo-soft rounded-xl p-4">
                  <p className="neo-muted text-xs">{label}</p>
                  <p className="neo-text mt-1 text-sm font-medium">{value}</p>
                </div>
              ))}
          </div>
        </Section>
      )}

      {profile.resumeText && (
        <Section icon={FileText} title="Resume">
          <div className="neo-soft rounded-xl p-4">
            <div className="mb-2 flex items-center gap-1 text-sm text-emerald-400">
              <CheckCircle2 size={14} /> Resume on file
            </div>
            <p className="neo-muted whitespace-pre-wrap text-xs leading-relaxed">{profile.resumeText}</p>
          </div>
        </Section>
      )}

      {(profile.githubLink || profile.portfolioLink) && (
        <Section icon={LinkIcon} title="Links">
          <div className="space-y-2 text-sm">
            {profile.githubLink && (
              <p className="neo-text">
                GitHub: <span className="text-amber-300">{profile.githubLink}</span>
              </p>
            )}
            {profile.portfolioLink && (
              <p className="neo-text">
                Portfolio: <span className="text-amber-300">{profile.portfolioLink}</span>
              </p>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ icon: Icon, title, children, className = "" }) {
  return (
    <section className={`neo-card rounded-2xl p-6 ${className}`}>
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-xl bg-amber-500/15 p-2 text-amber-300">
          <Icon size={20} />
        </div>
        <h2 className="neo-title text-xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  );
}
