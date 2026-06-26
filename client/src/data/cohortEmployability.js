import { employabilityScores, scoreDimensions } from "./employabilityScore.js";

/** Cohort-weighted employability dimension averages (demo personas stand in for cohort sample). */
const COHORT_WEIGHTS = { sarah: 48, jason: 32, aina: 38 };

export function getCohortEmployabilityDimensions() {
  const totalWeight = Object.values(COHORT_WEIGHTS).reduce((a, b) => a + b, 0);

  return scoreDimensions.map((dim) => {
    let weighted = 0;
    for (const [personaId, count] of Object.entries(COHORT_WEIGHTS)) {
      const val = employabilityScores[personaId]?.[dim.key]?.value ?? 70;
      weighted += val * count;
    }
    const value = Math.round(weighted / totalWeight);
    return {
      ...dim,
      value,
      why: `Cohort average across ${totalWeight} tracked students in CS, data, and software engineering programs.`,
    };
  });
}

export function getCohortEmployabilityTotal() {
  const dims = getCohortEmployabilityDimensions();
  return Math.round(
    dims.reduce((sum, d) => sum + d.value * d.weight, 0)
  );
}
