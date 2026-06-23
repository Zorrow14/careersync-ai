/**
 * Builds the system + user message array for AI Career Coach replies.
 *
 * Inputs:
 *   profile        – candidate profile object
 *   latestAnalysis – most recent job-match analysis (can be null)
 *   roadmap        – most recent roadmap result (can be null)
 *   chatHistory    – array of { role: "user"|"ai", content: string } (last N messages)
 *   message        – the candidate's current message string
 *
 * Expected AI output shape:
 * {
 *   "reply": "",
 *   "suggestedActions": [],
 *   "resourcesToReview": []
 * }
 */
export function buildCoachPrompt({ profile, latestAnalysis, roadmap, chatHistory, message }) {
  const skills = profile?.skills?.join(", ") || "not provided";
  const interests = profile?.careerInterests?.join(", ") || "not provided";

  const analysisContext = latestAnalysis
    ? `Latest Job Match Score: ${latestAnalysis.matchScore ?? "N/A"}
Missing Skills: ${latestAnalysis.missingSkills?.join(", ") || "none"}
Strengths: ${latestAnalysis.strengths?.join(", ") || "none"}`
    : "No job analysis performed yet.";

  const roadmapContext = roadmap
    ? `Current Roadmap: ${roadmap.title || "Untitled"} (${roadmap.duration || ""})`
    : "No roadmap generated yet.";

  const system = `You are CareerSync AI Career Coach, a supportive and knowledgeable career advisor.
You have context about the candidate's profile, their latest job-match analysis, and their current roadmap.
Keep responses concise, encouraging, and actionable.
You MUST respond with a single valid JSON object and nothing else — no markdown, no commentary.
Use this exact structure:
{
  "reply": "<your conversational response, max 3 paragraphs>",
  "suggestedActions": ["<1–3 short actionable next steps>"],
  "resourcesToReview": ["<optional: specific skills, topics, or concepts to explore>"]
}`;

  // Build prior conversation context (last 6 messages max to keep tokens low)
  const historyMessages = (chatHistory || [])
    .slice(-6)
    .map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.content,
    }));

  const contextMessage = {
    role: "user",
    content: `CANDIDATE CONTEXT:
Skills: ${skills}
Career Interests: ${interests}

${analysisContext}
${roadmapContext}

Please keep this context in mind for the entire conversation.`,
  };

  const currentMessage = {
    role: "user",
    content: message,
  };

  return [
    { role: "system", content: system },
    contextMessage,
    ...historyMessages,
    currentMessage,
  ];
}
