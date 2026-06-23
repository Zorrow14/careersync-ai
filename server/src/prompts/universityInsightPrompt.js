/**
 * Builds the system + user message pair for university cohort readiness insights.
 *
 * Inputs:
 *   profiles    – array of anonymised candidate profile objects from the institution
 *   analyses    – array of recent job-match analysis results from those candidates
 *   institution – institution name string
 *
 * Expected AI output shape:
 * {
 *   "averageReadinessScore": 0-100,
 *   "readinessPercentage": 0-100,
 *   "summary": "",
 *   "topSkillGaps": [{ "skill": "", "affectedCount": 0, "priority": "high|medium|low" }],
 *   "strongestTracks": [],
 *   "trackBreakdown": [{ "track": "", "averageScore": 0, "studentCount": 0 }],
 *   "curriculumGap": [],
 *   "recommendations": [],
 *   "studentsNeedingSupportCount": 0
 * }
 */
export function buildUniversityInsightPrompt({ profiles, analyses, institution }) {
  // Anonymise: only send aggregate, non-identifying info
  const totalStudents = profiles.length;

  // Aggregate skills across all profiles
  const skillFrequency = {};
  for (const p of profiles) {
    for (const s of (p.skills || [])) {
      skillFrequency[s] = (skillFrequency[s] || 0) + 1;
    }
  }
  const topSkills = Object.entries(skillFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([skill, count]) => `${skill} (${count}/${totalStudents} students)`);

  // Aggregate missing skills from analyses
  const missingFrequency = {};
  const scores = [];
  for (const a of analyses) {
    if (typeof a.matchScore === "number") scores.push(a.matchScore);
    for (const s of (a.missingSkills || [])) {
      missingFrequency[s] = (missingFrequency[s] || 0) + 1;
    }
  }
  const topMissing = Object.entries(missingFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([skill, count]) => `${skill} (missing in ${count} analyses)`);

  const avgScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  const system = `You are CareerSync AI University Intelligence Engine.
Your task is to generate a cohort-level career readiness insight report for a university.
Do NOT reference any individual student — only aggregate patterns.
You MUST respond with a single valid JSON object and nothing else — no markdown, no commentary.
Use this exact structure:
{
  "averageReadinessScore": <integer 0–100>,
  "readinessPercentage": <integer 0–100>,
  "summary": "<3–4 sentence cohort overview>",
  "topSkillGaps": [
    { "skill": "<skill name>", "affectedCount": <integer>, "priority": "<high|medium|low>" }
  ],
  "strongestTracks": ["<career track>"],
  "trackBreakdown": [
    { "track": "<track name>", "averageScore": <integer 0–100>, "studentCount": <integer> }
  ],
  "curriculumGap": ["<skill present in market demand but absent from cohort>"],
  "recommendations": ["<curriculum or support recommendation>"],
  "studentsNeedingSupportCount": <integer>
}`;

  const user = `INSTITUTION: ${institution || "Unknown University"}
TOTAL STUDENTS IN COHORT: ${totalStudents}
AVERAGE JOB MATCH SCORE: ${avgScore}

SKILLS PRESENT IN COHORT (top 20):
${topSkills.join("\n") || "No skill data available."}

TOP MISSING SKILLS ACROSS JOB ANALYSES:
${topMissing.join("\n") || "No analysis data available."}

Generate a cohort readiness insight report. Respond with the JSON object only.`;

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}
