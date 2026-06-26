/**
 * Work Animal–style career traits (simulated) — not clinical personality typing.
 */

export const workTraits = {
  sarah: {
    primary: "Builder",
    secondary: "Collaborator",
    description:
      "You learn by shipping interfaces and iterating in public. Best fit for product-facing engineering roles.",
    traits: ["Builder", "Collaborator", "Explorer"],
  },
  jason: {
    primary: "Analyst",
    secondary: "Strategist",
    description:
      "You turn messy data into clear stories. Strong alignment with analytics and insight-driven roles.",
    traits: ["Analyst", "Strategist", "Collaborator"],
  },
  aina: {
    primary: "Builder",
    secondary: "Strategist",
    description:
      "You connect frontend, backend, and deployment. Rare full-stack range for early-career candidates.",
    traits: ["Builder", "Strategist", "Explorer"],
  },
};

export function getWorkTrait(personaId) {
  return workTraits[personaId] || workTraits.sarah;
}
