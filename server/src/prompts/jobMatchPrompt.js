/**
 * Builds the system + user message pair for job-match analysis.
 *
 * Inputs:
 *   profile        – candidate profile object (skills, experience, projects, etc.)
 *   jobDescription – raw job description text
 *
 * Expected AI output shape:
 * {
 *   "matchScore": 0-100,
 *   "summary": "",
 *   "matchedSkills": [],
 *   "missingSkills": [],
 *   "strengths": [],
 *   "weaknesses": [],
 *   "recommendedActions": [],
 *   "suggestedRoadmapFocus": []
 * }
 */
export function buildJobMatchPrompt({ profile, jobDescription }) {
  const candidateSummary = buildCandidateSummary(profile);

  const system = `You are CareerSync AI, an expert career intelligence engine.
Your task is to analyse how well a candidate's profile matches a job description.
You MUST respond with a single valid JSON object and nothing else — no markdown, no commentary.
Use this exact structure:
{
  "matchScore": <integer 0–100>,
  "summary": "<2–3 sentence narrative>",
  "matchedSkills": ["<skill>"],
  "missingSkills": ["<skill>"],
  "strengths": ["<strength>"],
  "weaknesses": ["<weakness>"],
  "recommendedActions": ["<action>"],
  "suggestedRoadmapFocus": ["<focus area>"]
}`;

  const user = `CANDIDATE PROFILE:
${candidateSummary}

JOB DESCRIPTION:
${jobDescription.trim()}

Analyse the match and respond with the JSON object only.`;

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}

function buildCandidateSummary(profile) {
  const lines = [];

  if (profile.skills?.length)
    lines.push(`Skills: ${profile.skills.join(", ")}`);

  if (profile.careerInterests?.length)
    lines.push(`Career Interests: ${profile.careerInterests.join(", ")}`);

  if (profile.education?.length) {
    const edu = profile.education
      .map((e) => `${e.degree || ""} ${e.field || ""} at ${e.institution || ""}`.trim())
      .filter(Boolean)
      .join("; ");
    if (edu) lines.push(`Education: ${edu}`);
  }

  if (profile.experience?.length) {
    const exp = profile.experience
      .map((e) => `${e.role || ""} at ${e.company || ""}`.trim())
      .filter(Boolean)
      .join("; ");
    if (exp) lines.push(`Experience: ${exp}`);
  }

  if (profile.projects?.length) {
    const proj = profile.projects
      .map((p) => `${p.title || ""}${p.techStack?.length ? ` (${p.techStack.join(", ")})` : ""}`.trim())
      .filter(Boolean)
      .join("; ");
    if (proj) lines.push(`Projects: ${proj}`);
  }

  if (profile.certifications?.length) {
    const certs = profile.certifications.map((c) => c.name).filter(Boolean).join(", ");
    if (certs) lines.push(`Certifications: ${certs}`);
  }

  return lines.length ? lines.join("\n") : "No profile details provided.";
}
