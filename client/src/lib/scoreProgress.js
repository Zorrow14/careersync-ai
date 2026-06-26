/**
 * Tracks simulated employability score boosts after AI activities (mock interview, roadmap).
 */

const STORAGE_KEY = "careersync_score_boosts";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

/** @param {"mockInterview" | "roadmap" | "analyzer"} activity */
export function recordScoreBoost(personaId, activity, points) {
  const all = readAll();
  const entry = all[personaId] || { total: 0, activities: [] };
  if (entry.activities.includes(activity)) return entry.total;
  entry.activities.push(activity);
  entry.total = Math.min(12, entry.total + points);
  all[personaId] = entry;
  writeAll(all);
  return entry.total;
}

export function getScoreBoost(personaId) {
  return readAll()[personaId]?.total || 0;
}

export function getCompletedBoostActivities(personaId) {
  return readAll()[personaId]?.activities || [];
}
