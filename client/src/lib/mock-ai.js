/**
 * Mock AI layer — simulates AI responses with realistic delays.
 * No external APIs are called. All data comes from the local mock data files.
 * This file is the only "AI" the frontend ever talks to.
 *
 * To swap in real AI later, replace these functions with fetch calls to the
 * Express backend and keep the same return shapes.
 */

import { resumeAnalyses } from "../data/resumeAnalysis.js";
import { skillGaps } from "../data/skillGap.js";
import { roadmaps } from "../data/roadmapData.js";
import { interviewSets } from "../data/interviewQuestions.js";
import { fitReports } from "../data/employerData.js";
import { universityInsights } from "../data/universityData.js";

function delay(ms = 1200) {
  return new Promise((resolve) => setTimeout(resolve, ms + Math.random() * 600));
}

export async function analyzeResume(personaId) {
  await delay(1500);
  return resumeAnalyses[personaId] ?? resumeAnalyses.sarah;
}

export async function getSkillGap(personaId) {
  await delay(800);
  return skillGaps[personaId] ?? skillGaps.sarah;
}

export async function generateRoadmap(personaId) {
  await delay(1200);
  return roadmaps[personaId] ?? roadmaps.sarah;
}

export async function getCoachReply(personaId, message) {
  await delay(1000);

  const replies = {
    sarah: [
      "Based on your profile, frontend development is your strongest path. React.js and your UI skills give you a solid 82% match for intern roles. Focus on Docker and testing to push that above 90%.",
      "I'd recommend adding unit tests to your TaskFlow project using Vitest. It'll demonstrate quality engineering and fill your biggest skill gap.",
      "Your Meta certification is a great differentiator. Pair it with a deployed, tested project and you'll stand out in applications.",
      "For your next project, consider building something with TypeScript. It's increasingly expected in frontend roles.",
    ],
    jason: [
      "Your data analytics foundation is solid at 74% match. Python, SQL, and Tableau cover the core requirements. BigQuery experience would significantly boost your competitiveness.",
      "I'd suggest focusing on cloud data platforms next. The Google BigQuery specialization pairs well with your existing Google certification.",
      "A/B testing knowledge is becoming essential for analyst roles. Try practicing with Kaggle experimentation datasets.",
      "Your COVID Dashboard project shows good visualization skills. Consider recreating it in Power BI to broaden your toolkit.",
    ],
    aina: [
      "You're in an excellent position at 88% match. Your Docker experience puts you ahead of most intern candidates. CI/CD is the key gap to close.",
      "Adding GitHub Actions to your MedTrack project would demonstrate DevOps maturity. Most employers value pipeline automation highly.",
      "Your dual certifications (AWS + MongoDB) are strong signals. Consider getting a Docker certification to complete the DevOps triangle.",
      "For interview prep, focus on system design questions. Your real-time WebSocket experience with DevBoard is a great talking point.",
    ],
  };

  const personaReplies = replies[personaId] || replies.sarah;
  return {
    reply: personaReplies[Math.floor(Math.random() * personaReplies.length)],
    suggestedActions: ["Update your portfolio", "Practice coding challenges", "Review your roadmap progress"],
  };
}

export async function generateInterviewQuestions(personaId) {
  await delay(1400);
  return interviewSets[personaId] ?? interviewSets.sarah;
}

export async function evaluateAnswer(personaId) {
  await delay(1200);
  const set = interviewSets[personaId] ?? interviewSets.sarah;
  return set.sampleFeedback;
}

export async function generateFitReport(personaId) {
  await delay(1000);
  return fitReports[personaId] ?? fitReports.sarah;
}

export async function generateUniversityInsights() {
  await delay(1500);
  return universityInsights;
}
