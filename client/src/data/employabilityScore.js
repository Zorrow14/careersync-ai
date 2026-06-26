/**
 * Explainable Employability Score — the signature CareerSync metric.
 *
 * One score, broken into four weighted dimensions, shared across all three
 * audiences (candidate sees their own, employer sees it in fit reports,
 * university sees the cohort average). Each dimension carries a short "why"
 * so the score is always explainable, never a black box.
 */

export const scoreDimensions = [
  { key: "skills", label: "Skills Match", weight: 0.3, icon: "Target" },
  { key: "portfolio", label: "Portfolio Strength", weight: 0.25, icon: "FolderGit2" },
  { key: "interview", label: "Interview Readiness", weight: 0.2, icon: "Mic" },
  { key: "market", label: "Market Alignment", weight: 0.25, icon: "TrendingUp" },
];

export const employabilityScores = {
  sarah: {
    skills: { value: 88, why: "Strong React, JavaScript, and CSS aligned to frontend roles." },
    portfolio: { value: 82, why: "Two polished projects with live demos; add one more for depth." },
    interview: { value: 74, why: "Solid fundamentals; practice system design and behavioral rounds." },
    market: { value: 85, why: "Frontend demand is high (+18%) in your target market." },
  },
  jason: {
    skills: { value: 80, why: "Python, SQL, and Tableau cover core analyst requirements." },
    portfolio: { value: 70, why: "Good dashboards; add a storytelling case study to stand out." },
    interview: { value: 68, why: "Strengthen communication of insights and SQL optimization talk." },
    market: { value: 78, why: "Analytics roles growing (+15%); cloud data skills add an edge." },
  },
  aina: {
    skills: { value: 90, why: "Rare full-stack range: React, Node, MongoDB, and Docker." },
    portfolio: { value: 88, why: "Three substantial full-stack projects with deployments." },
    interview: { value: 80, why: "Confident technical depth; refine CI/CD and scaling answers." },
    market: { value: 86, why: "Full-stack demand is strong (+20%) across the region." },
  },
};

const DEFAULT = {
  skills: { value: 70, why: "Core skills present; keep building depth." },
  portfolio: { value: 65, why: "Add projects with live demos." },
  interview: { value: 60, why: "Practice mock interviews to build confidence." },
  market: { value: 72, why: "Target a growing role for better alignment." },
};

/** Weighted overall score (0–100) plus the per-dimension breakdown. */
export function getEmployabilityScore(personaId) {
  const dims = employabilityScores[personaId] || DEFAULT;
  const total = scoreDimensions.reduce(
    (sum, d) => sum + (dims[d.key]?.value || 0) * d.weight,
    0
  );
  return {
    total: Math.round(total),
    dimensions: scoreDimensions.map((d) => ({
      ...d,
      value: dims[d.key]?.value || 0,
      why: dims[d.key]?.why || "",
    })),
  };
}
