/**
 * Builds the system + user message pair for personalized roadmap generation.
 *
 * Inputs:
 *   profile  – candidate profile object
 *   analysis – job-match analysis result object (missingSkills, suggestedRoadmapFocus, etc.)
 *
 * Expected AI output shape:
 * {
 *   "title": "",
 *   "duration": "",
 *   "steps": [
 *     {
 *       "week": "",
 *       "title": "",
 *       "description": "",
 *       "skills": [],
 *       "tasks": []
 *     }
 *   ]
 * }
 */
export function buildRoadmapPrompt({ profile, analysis }) {
  const missingSkills = analysis?.missingSkills?.join(", ") || "not specified";
  const focus = analysis?.suggestedRoadmapFocus?.join(", ") || "general career growth";
  const currentSkills = profile?.skills?.join(", ") || "not specified";
  const interests = profile?.careerInterests?.join(", ") || "not specified";

  const system = `You are CareerSync AI, an expert career development coach.
Your task is to generate a structured, week-by-week career improvement roadmap.
You MUST respond with a single valid JSON object and nothing else — no markdown, no commentary.
Use this exact structure:
{
  "title": "<roadmap title>",
  "duration": "<e.g. 8 weeks>",
  "steps": [
    {
      "week": "<e.g. Week 1-2>",
      "title": "<phase title>",
      "description": "<2–3 sentence description>",
      "skills": ["<skill to learn>"],
      "tasks": ["<concrete task>"]
    }
  ]
}
Generate 4 to 6 phases. Each phase should be realistic and actionable.`;

  const user = `CANDIDATE:
Current Skills: ${currentSkills}
Career Interests: ${interests}

GAPS TO ADDRESS:
Missing Skills: ${missingSkills}
Suggested Focus Areas: ${focus}

Generate a personalised roadmap to help this candidate close their skill gaps and reach their career goals. Respond with the JSON object only.`;

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}
