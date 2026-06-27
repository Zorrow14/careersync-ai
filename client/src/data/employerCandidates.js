import { personas } from "./personas.js";
import { userProfiles } from "./userProfile.js";
import { talentPool, pipelineCandidates, resolvePersonaId } from "./employerData.js";
import { getEmployabilityScore } from "./employabilityScore.js";
import { getWorkTrait } from "./workTraits.js";

function buildMinimalProfile(candidate) {
  const role = candidate.targetRole || candidate.role || "Candidate";
  const university = candidate.university || "Malaysia";
  const degree = candidate.degree || "Degree not listed";
  const experience = candidate.experience || "Experience on file";

  return {
    name: candidate.name,
    avatar: candidate.avatar,
    tagline: `${role} · ${university}`,
    about: `${degree} from ${university}. ${experience}. Skills and fit score are sourced from CareerSync talent signals.`,
    location: "Malaysia",
    languages: ["English"],
    institution: university,
    degree,
    targetRole: role,
    completion: Math.min(95, Math.max(40, candidate.fitScore - 5)),
    careerInterests: [role],
    skills: candidate.skills || [],
    education: [
      {
        institution: university,
        degree,
        field: role,
        startYear: "2022",
        endYear: "2026",
        cgpa: "",
        achievements: [],
      },
    ],
    experience: experience.includes("internship")
      ? [
          {
            company: "See screening notes",
            role: `${role} experience`,
            description: experience,
            startDate: "—",
            endDate: "—",
            type: "Internship",
          },
        ]
      : [],
    projects: [],
    certifications: [],
    preferences: {
      role,
      industry: "Software & Technology",
      workMode: "Hybrid",
      location: "Malaysia",
      salaryRange: "—",
    },
    githubLink: "",
    portfolioLink: "",
    resumeText: "",
    aiSummary: `${candidate.name} matches ${candidate.fitScore}% on role requirements based on skills, education, and discovery signals. Request a full fit report for structured screening notes.`,
    aiSuggestions: [],
  };
}

/** Resolve a talent/pipeline row or persona slug to a unified employer candidate record. */
export function findEmployerCandidate(id) {
  if (!id) return null;

  const fromTalent = talentPool.find((c) => c.id === id);
  if (fromTalent) {
    return {
      ...fromTalent,
      role: fromTalent.targetRole,
      personaId: resolvePersonaId(fromTalent.name),
      context: "discovery",
    };
  }

  const fromPipeline = pipelineCandidates.find((c) => c.id === id);
  if (fromPipeline) {
    return {
      ...fromPipeline,
      targetRole: fromPipeline.role,
      personaId: resolvePersonaId(fromPipeline.name),
      context: "pipeline",
    };
  }

  const persona = personas.find((p) => p.id === id);
  if (persona && userProfiles[id]) {
    const linkedTalent = talentPool.find((c) => resolvePersonaId(c.name) === id);
    const linkedPipeline = pipelineCandidates.find((c) => resolvePersonaId(c.name) === id);
    const linked = linkedTalent || linkedPipeline;

    return {
      ...(linked || {}),
      id: linked?.id ?? id,
      name: persona.name,
      avatar: persona.avatar,
      degree: persona.degree,
      university: persona.institution,
      skills: userProfiles[id].skills,
      fitScore: linked?.fitScore ?? 75,
      targetRole: persona.targetRole,
      role: persona.targetRole,
      personaId: id,
      context: linkedPipeline ? "pipeline" : linkedTalent ? "discovery" : "persona",
    };
  }

  return null;
}

/** Full read-only profile payload for employer profile pages. */
export function getCandidateProfileView(candidate) {
  const personaId = candidate.personaId ?? resolvePersonaId(candidate.name);
  const hasFullProfile = Boolean(personaId && userProfiles[personaId]);

  const profile = hasFullProfile ? userProfiles[personaId] : buildMinimalProfile(candidate);

  return {
    personaId,
    hasFullProfile,
    profile,
    employability: personaId ? getEmployabilityScore(personaId) : null,
    workTrait: personaId ? getWorkTrait(personaId) : null,
    fitScore: candidate.fitScore,
    role: candidate.targetRole || candidate.role,
  };
}
