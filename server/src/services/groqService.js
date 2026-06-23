/**
 * Groq provider adapter.
 *
 * This module is the only place in the codebase that imports groq-sdk or
 * references GROQ_API_KEY. Swapping to a different AI provider only requires
 * adding a new *Service.js and updating aiService.js — no prompt files or
 * controller logic needs to change.
 */

import Groq from "groq-sdk";

// Default model — llama-3.3-70b-versatile is fast and handles JSON well.
// Override via GROQ_MODEL in server/.env
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

if (!process.env.GROQ_MODEL) {
  // Non-fatal: server still starts, just uses the default.
  console.warn(
    `[groqService] GROQ_MODEL is not set in environment variables. ` +
    `Defaulting to "${DEFAULT_MODEL}".`
  );
}

const MODEL = process.env.GROQ_MODEL || DEFAULT_MODEL;

let groqClient = null;

function getClient() {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error(
        "[groqService] GROQ_API_KEY is not set. Add it to server/.env before calling AI features."
      );
    }
    // apiKey is read from env inside the SDK constructor — never log it.
    groqClient = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return groqClient;
}

/**
 * Send a messages array to Groq and return the raw response text.
 *
 * @param {Array<{role: string, content: string}>} messages
 * @param {object} [options]
 * @param {number} [options.temperature=0.3]   Lower = more deterministic JSON
 * @param {number} [options.maxTokens=2048]
 * @returns {Promise<string>}
 */
export async function callAI(messages, { temperature = 0.3, maxTokens = 2048 } = {}) {
  const client = getClient();

  const completion = await client.chat.completions.create({
    model: MODEL,
    messages,
    temperature,
    max_tokens: maxTokens,
    // Ask the model to return JSON — Groq supports this natively on most models.
    response_format: { type: "json_object" },
  });

  const text = completion.choices?.[0]?.message?.content ?? "";
  return text;
}
