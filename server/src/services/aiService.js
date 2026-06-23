/**
 * AI Service — generic facade for all AI-powered features.
 *
 * This is the only file controllers should import for AI calls.
 * It routes through the active provider (currently Groq) and keeps all
 * AI logic away from controllers.
 *
 * To add Azure OpenAI later:
 *   1. Create server/src/services/azureAIService.js with the same callAI signature.
 *   2. Change the import below based on process.env.AI_PROVIDER.
 *   3. No prompt files, controllers, or routes need to change.
 */

import { callAI } from "./groqService.js";
import { parseAIJson } from "../utils/parseAIJson.js";

import { buildJobMatchPrompt } from "../prompts/jobMatchPrompt.js";
import { buildRoadmapPrompt } from "../prompts/roadmapPrompt.js";
import { buildCoachPrompt } from "../prompts/coachPrompt.js";
import {
  buildGenerateQuestionsPrompt,
  buildEvaluateAnswerPrompt,
} from "../prompts/interviewPrompt.js";
import { buildEmployerFitPrompt } from "../prompts/employerFitPrompt.js";
import { buildUniversityInsightPrompt } from "../prompts/universityInsightPrompt.js";

// ─── Fallback shapes ────────────────────────────────────────────────────────
// Returned when the AI call fails or returns unparseable JSON.
// Controllers should check for the `error` field to detect fallbacks.

const JOB_MATCH_FALLBACK = {
  matchScore: 0,
  summary: "Analysis could not be completed at this time. Please try again.",
  matchedSkills: [],
  missingSkills: [],
  strengths: [],
  weaknesses: [],
  recommendedActions: [],
  suggestedRoadmapFocus: [],
  error: true,
};

const ROADMAP_FALLBACK = {
  title: "Career Roadmap",
  duration: "8 weeks",
  steps: [],
  error: true,
};

const COACH_FALLBACK = {
  reply: "I'm unable to respond right now. Please try again in a moment.",
  suggestedActions: [],
  resourcesToReview: [],
  error: true,
};

const INTERVIEW_QUESTIONS_FALLBACK = {
  targetRole: "",
  interviewType: "general",
  questions: [],
  error: true,
};

const INTERVIEW_EVAL_FALLBACK = {
  score: 0,
  feedback: "Evaluation could not be completed at this time. Please try again.",
  strengths: [],
  improvements: [],
  sampleBetterAnswer: "",
  error: true,
};

const EMPLOYER_FIT_FALLBACK = {
  fitScore: 0,
  summary: "Fit report could not be generated at this time. Please try again.",
  matchedRequirements: [],
  missingRequirements: [],
  strengths: [],
  risks: [],
  growthPotential: "",
  hiringRecommendation: "consider",
  interviewSuggestions: [],
  error: true,
};

const UNIVERSITY_INSIGHT_FALLBACK = {
  averageReadinessScore: 0,
  readinessPercentage: 0,
  summary: "Cohort insights could not be generated at this time. Please try again.",
  topSkillGaps: [],
  strongestTracks: [],
  trackBreakdown: [],
  curriculumGap: [],
  recommendations: [],
  studentsNeedingSupportCount: 0,
  error: true,
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function safeCall(messages, fallback, options = {}) {
  try {
    const raw = await callAI(messages, options);
    const parsed = parseAIJson(raw, null);
    if (!parsed) {
      console.error("[aiService] AI returned unparseable JSON. Using fallback.");
      return { ...fallback };
    }
    return parsed;
  } catch (err) {
    console.error("[aiService] AI call failed:", err.message);
    return { ...fallback };
  }
}

// ─── Exported service functions ───────────────────────────────────────────────

/**
 * Analyse how well a candidate's profile matches a job description.
 * @param {{ profile: object, jobDescription: string }} params
 */
export async function analyzeJobMatch({ profile, jobDescription }) {
  const messages = buildJobMatchPrompt({ profile, jobDescription });
  return safeCall(messages, JOB_MATCH_FALLBACK);
}

/**
 * Generate a personalised week-by-week career improvement roadmap.
 * @param {{ profile: object, analysis: object }} params
 */
export async function generateRoadmap({ profile, analysis }) {
  const messages = buildRoadmapPrompt({ profile, analysis });
  return safeCall(messages, ROADMAP_FALLBACK, { maxTokens: 3000 });
}

/**
 * Get an AI Career Coach reply for a candidate's message.
 * @param {{ profile: object, latestAnalysis: object|null, roadmap: object|null, chatHistory: Array, message: string }} params
 */
export async function getCoachReply({ profile, latestAnalysis, roadmap, chatHistory, message }) {
  const messages = buildCoachPrompt({ profile, latestAnalysis, roadmap, chatHistory, message });
  return safeCall(messages, COACH_FALLBACK, { temperature: 0.5 });
}

/**
 * Generate mock interview questions for a candidate.
 * @param {{ profile: object, jobDescription: string, interviewType: string }} params
 */
export async function generateInterviewQuestions({ profile, jobDescription, interviewType }) {
  const messages = buildGenerateQuestionsPrompt({ profile, jobDescription, interviewType });
  return safeCall(messages, INTERVIEW_QUESTIONS_FALLBACK, { temperature: 0.6 });
}

/**
 * Evaluate a candidate's answer to a single interview question.
 * @param {{ profile: object, question: string, answer: string, jobDescription: string }} params
 */
export async function evaluateInterviewAnswer({ profile, question, answer, jobDescription }) {
  const messages = buildEvaluateAnswerPrompt({ profile, question, answer, jobDescription });
  return safeCall(messages, INTERVIEW_EVAL_FALLBACK);
}

/**
 * Generate an employer-facing candidate fit report.
 * @param {{ candidateProfile: object, job: object }} params
 */
export async function generateEmployerFitReport({ candidateProfile, job }) {
  const messages = buildEmployerFitPrompt({ candidateProfile, job });
  return safeCall(messages, EMPLOYER_FIT_FALLBACK);
}

/**
 * Generate university cohort readiness insights.
 * @param {{ profiles: Array, analyses: Array, institution: string }} params
 */
export async function generateUniversityInsights({ profiles, analyses, institution }) {
  const messages = buildUniversityInsightPrompt({ profiles, analyses, institution });
  return safeCall(messages, UNIVERSITY_INSIGHT_FALLBACK, { maxTokens: 3000 });
}
