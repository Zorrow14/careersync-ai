export const universityInsights = {
  institutionName: "Malaysian Universities — Combined Cohort",
  totalStudents: 156,
  averageReadinessScore: 72,
  readinessPercentage: 58,
  studentsNeedingSupport: 34,
  summary: "Cohort shows strong foundation in programming fundamentals and frontend skills. Significant gaps exist in DevOps, cloud platforms, and testing practices — areas increasingly demanded by employers.",

  trackBreakdown: [
    { track: "Frontend Development", averageScore: 82, studentCount: 48, color: "amber" },
    { track: "Full Stack Development", averageScore: 76, studentCount: 38, color: "blue" },
    { track: "Data Analytics", averageScore: 70, studentCount: 32, color: "emerald" },
    { track: "Backend Development", averageScore: 74, studentCount: 24, color: "purple" },
    { track: "DevOps / Cloud", averageScore: 55, studentCount: 14, color: "rose" },
  ],

  topSkillGaps: [
    { skill: "Docker", affectedCount: 112, priority: "high" },
    { skill: "CI/CD Pipelines", affectedCount: 108, priority: "high" },
    { skill: "Unit Testing", affectedCount: 98, priority: "high" },
    { skill: "Cloud Platforms (AWS/GCP)", affectedCount: 94, priority: "high" },
    { skill: "TypeScript", affectedCount: 72, priority: "medium" },
    { skill: "System Design", affectedCount: 68, priority: "medium" },
    { skill: "API Security", affectedCount: 58, priority: "medium" },
    { skill: "Database Optimization", affectedCount: 45, priority: "low" },
  ],

  taughtSkills: ["HTML", "CSS", "JavaScript", "Python", "Java", "SQL", "React", "Data Structures", "Algorithms"],
  marketDemandedSkills: ["React", "TypeScript", "Docker", "AWS", "CI/CD", "Testing", "Node.js", "PostgreSQL", "Git"],
  curriculumGap: ["Docker", "CI/CD", "TypeScript", "AWS", "Testing Frameworks", "MongoDB"],

  strongestTracks: ["Frontend Development", "Full Stack Development"],

  recommendations: [
    "Add a DevOps/Cloud module to the curriculum covering Docker, CI/CD, and AWS basics",
    "Introduce testing frameworks (Jest, Vitest) as a mandatory component in project courses",
    "Create industry partnership programs for internship pipelines in data analytics",
    "Offer TypeScript workshops as supplementary skill-building sessions",
    "Provide career counseling for the 34 students scoring below readiness threshold",
  ],
};
