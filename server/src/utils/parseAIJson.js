/**
 * Safely parse a JSON string returned by an AI model.
 *
 * AI models sometimes wrap JSON in markdown fences (```json ... ```) or add
 * commentary before / after the object. This utility strips common artifacts
 * and attempts to extract a valid JSON object or array.
 *
 * Returns `fallback` if parsing fails at every attempt.
 */
export function parseAIJson(raw, fallback = null) {
  if (!raw || typeof raw !== "string") return fallback;

  let text = raw.trim();

  // Strip markdown code fences: ```json ... ``` or ``` ... ```
  text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();

  // If the model prepended a sentence before the JSON, try to find the
  // first `{` or `[` and slice from there.
  const firstBrace = text.search(/[{[]/);
  if (firstBrace > 0) {
    text = text.slice(firstBrace);
  }

  // Trim trailing content after the final closing brace / bracket.
  const lastBrace = Math.max(text.lastIndexOf("}"), text.lastIndexOf("]"));
  if (lastBrace !== -1 && lastBrace < text.length - 1) {
    text = text.slice(0, lastBrace + 1);
  }

  try {
    return JSON.parse(text);
  } catch {
    // Last resort: try the original trimmed string in case slicing made it worse.
    try {
      return JSON.parse(raw.trim());
    } catch {
      console.warn("[parseAIJson] Failed to parse AI response as JSON. Raw snippet:",
        raw.slice(0, 200));
      return fallback;
    }
  }
}
