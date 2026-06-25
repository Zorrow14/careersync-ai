/**
 * Demo personas — switching persona instantly updates all dashboard data.
 * Each persona has a profile, analysis, roadmap, skill gap, interview set,
 * employer fit, and university insight data keyed by persona ID.
 */

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
    institution: "Universiti Teknologi Malaysia",
    targetRole: "Data Analyst",
    avatar: "JL",
  },
  {
    id: "aina",
    name: "Aina Rahman",
    degree: "BEng Software Engineering",
    institution: "Universiti Putra Malaysia",
    targetRole: "Full Stack Developer",
    avatar: "AR",
  },
];

export const DEFAULT_PERSONA = "sarah";
