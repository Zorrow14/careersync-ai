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
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=256&h=256&fit=crop&crop=face",
  },
  {
    id: "jason",
    name: "Jason Lim",
    degree: "BSc Data Science",
    institution: "UTM",
    targetRole: "Data Analyst",
    avatar: "JL",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face",
  },
  {
    id: "aina",
    name: "Aina Rahman",
    degree: "BEng Software Engineering",
    institution: "UPM",
    targetRole: "Full Stack Developer",
    avatar: "AR",
    photoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&fit=crop&crop=face",
  },
];

export const DEMO_PERSONA_ID = DEFAULT_PERSONA;

export const demoPersona = personas.find((p) => p.id === DEFAULT_PERSONA);
