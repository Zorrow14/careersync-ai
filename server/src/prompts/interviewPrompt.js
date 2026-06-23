/**
 * Builds prompts for mock interview question generation and answer evaluation.
 *
 * generateInterviewQuestions inputs:
 *   profile       – candidate profile object
 *   jobDescription – job description text (can be empty for general interviews)
 *   interviewType – "technical" | "behavioural" | "general" | "jd-based"
 *
 * Expected questions output shape:
 * {
 *   "targetRole": "",
 *   "interviewType": "",
 *   "questions": [
 *     { "id": 1, "question": "", "category": "", "difficulty": "easy|medium|hard" }
 *   ]
 * }
 *
 * ---
 *
 * evaluateInterviewAnswer inputs:
 *   profile        – candidate profile object
 *   question       – the interview question string
 *   answer         – the candidate's answer string
 *   jobDescription – optional job description for context
 *
 * Expected evaluation output shape:
 * {
 *   "score": 0-100,
 *   "feedback": "",
 *   "strengths": [],
 *   "improvements": [],
 *   "sampleBetterAnswer": ""
 * }
 */

export function buildGenerateQuestionsPrompt({ profile, jobDescription, interviewType }) {
  const skills = profile?.skills?.join(", ") || "not specified";
  const interests = profile?.careerInterests?.join(", ") || "not specified";
  const hasJD = jobDescription && jobDescription.trim().length > 30;

  const typeLabel = {
    technical: "technical skills-focused",
    behavioural: "behavioural / soft-skills-focused",
    "jd-based": "role-specific based on the provided job description",
    general: "general mixed interview",
  }[interviewType] || "general mixed interview";

  const system = `You are CareerSync AI Mock Interview Coach.
Your task is to generate realistic, relevant interview questions.
You MUST respond with a single valid JSON object and nothing else — no markdown, no commentary.
Use this exact structure:
{
  "targetRole": "<inferred or stated role>",
  "interviewType": "${interviewType || "general"}",
  "questions": [
    {
      "id": 1,
      "question": "<question text>",
      "category": "<e.g. React, Leadership, Problem Solving>",
      "difficulty": "<easy|medium|hard>"
    }
  ]
}
Generate exactly 8 questions. Vary difficulty across easy, medium, and hard.`;

  const user = `CANDIDATE:
Skills: ${skills}
Career Interests: ${interests}

INTERVIEW TYPE: ${typeLabel}

${hasJD ? `JOB DESCRIPTION:\n${jobDescription.trim()}\n` : ""}
Generate 8 interview questions suitable for this candidate. Respond with the JSON object only.`;

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}

export function buildEvaluateAnswerPrompt({ profile, question, answer, jobDescription }) {
  const skills = profile?.skills?.join(", ") || "not specified";
  const hasJD = jobDescription && jobDescription.trim().length > 30;

  const system = `You are CareerSync AI Mock Interview Evaluator.
Your task is to evaluate a candidate's interview answer fairly and constructively.
You MUST respond with a single valid JSON object and nothing else — no markdown, no commentary.
Use this exact structure:
{
  "score": <integer 0–100>,
  "feedback": "<2–3 sentence overall feedback>",
  "strengths": ["<what the candidate did well>"],
  "improvements": ["<what to improve>"],
  "sampleBetterAnswer": "<a concise, improved version of the answer>"
}`;

  const user = `CANDIDATE SKILLS: ${skills}

QUESTION: ${question}

CANDIDATE ANSWER: ${answer}

${hasJD ? `ROLE CONTEXT:\n${jobDescription.trim()}\n` : ""}
Evaluate the answer and respond with the JSON object only.`;

  return [
    { role: "system", content: system },
    { role: "user", content: user },
  ];
}
