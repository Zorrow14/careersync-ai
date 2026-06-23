/**
 * Builds the system + user message pair for employer candidate fit reports.
 *
 * Inputs:
 *   candidateProfile – candidate profile object
 *   job              – EmployerJob document (title, jobDescription, requiredSkills, preferredSkills)
 *
 * Expected AI output shape:
 * {
 *   "fitScore": 0-100,
 *   "summary": "",
 *   "matchedRequirements": [],
 *   "missingRequirements": [],
 *   "strengths": [],
 *   "risks": [],
 *   "growthPotential": "",
 *   "hiringRecommendation": "recommend|consider|decline",
 *   "interviewSuggestions": []
 * }
 */
export function buildEmployerFitPrompt({ candidateProfile, job }) {
  const skills = candidateProfile?.skills?.join(", ") || "not specified";
  const interests = candidateProfile?.careerInterests?.join(", ") || "not specified";
  const requiredSkills = job?.requiredSkills?.join(", ") || "not specified";
  const preferredSkills = job?.preferredSkills?.join(", ") || "none";

  const experienceSummary = candidateProfile?.experience?.length
    ? candidateProfile.experience
        .map((e) => `${e.role || ""} at ${e.company || ""}`.trim())
        .filter(Boolean)
        .join("; ")
    : "no experience listed";

  const projectSummary = candidateProfile?.projects?.length
    ? candidateProfile.projects
        .map((p) => p.title || "")
        .filter(Boolean)
        .join(", ")
    : "no projects listed";

  const system = `You are CareerSync AI Talent Intelligence Engine.
Your task is to generate a structured employer-facing candidate fit report.
Be objective, evidence-based, and concise.
You MUST respond with a single valid JSON object and nothing else — no markdown, no commentary.
Use this exact structure:
{
  "fitScore": <integer 0–100>,
  "summary": "<3–4 sentence hiring summary>",
  "matchedRequirements": ["<matched requirement>"],
  "missingRequirements": ["<missing requirement>"],
  "strengths": ["<candidate strength relevant to the role>"],
  "risks": ["<potential concern or gap>"],
  "growthPotential": "<short assessment of growth potential>",
  "hiringRecommendation": "<one of: recommend | consider | decline>",
  "interviewSuggestions": ["<suggested interview question or topic to probe>"]
}`;

  const user = `JOB: ${job?.title || "Not specified"} at ${job?.company || ""}
Required Skills: ${requiredSkills}
Preferred Skills: ${preferredSkills}

JOB DESCRIPTION:
${(job?.jobDescription || "").trim()}

CANDIDATE:
Skills: ${skills}
Career Interests: ${interests}
Experience: ${experienceSummary}
Projects: ${projectSummary}

Generate a fit report for this candidate. Respond with the JSON object only.`;

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}
