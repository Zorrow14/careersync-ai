/**
 * Demo candidate personas — switchable in the candidate portal for judge demos.
 */

export const DEFAULT_PERSONA = "sarah";

export const personas = [
  {
    id: "sarah",
    name: "Sarah Tan",
    degree: "BSc Computer Science",
    institution: "Universiti Malaya",
    targetRole: "Frontend Developer",
    avatar: "ST",
  },
  {
    id: "jason",
    name: "Jason Lim",
    degree: "BSc Data Science",
    institution: "UTM",
    targetRole: "Data Analyst",
    avatar: "JL",
  },
  {
    id: "aina",
    name: "Aina Rahman",
    degree: "BEng Software Engineering",
    institution: "UPM",
    targetRole: "Full Stack Developer",
    avatar: "AR",
  },
];

export const DEMO_PERSONA_ID = DEFAULT_PERSONA;

export const demoPersona = personas.find((p) => p.id === DEFAULT_PERSONA);
