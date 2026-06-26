import { getCompanyFeedByName } from "./companyFeedData.js";
import { generateExtraPipelineCandidates, generateExtraTalentPool } from "./mockDataExpand.js";

/* ─── Company Profile ─── */
export const companyProfile = {
  name: "TechNova Solutions",
  tagline: "Building the next generation of digital products",
  industry: "Software & Technology",
  size: "150–500 employees",
  location: "Kuala Lumpur, Malaysia",
  founded: 2018,
  website: "https://technova.my",
};

/* ─── Company Feed (TechNova — employer portal view) ─── */
export const companyFeed = getCompanyFeedByName("TechNova Solutions");

/* ─── Candidate Pipeline ─── */
export const pipelineStages = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"];

const pipelineStageQuotas = [
  ...Array(15).fill("Applied"),
  ...Array(10).fill("Screening"),
  ...Array(10).fill("Interview"),
  ...Array(5).fill("Offer"),
  ...Array(5).fill("Hired"),
];

const basePipeline = [
  { id: "p1", name: "Sarah Tan", role: "Frontend Developer Intern", stage: "Interview", fitScore: 82, appliedDate: "Jun 18, 2026", avatar: "ST", source: "CareerSync AI" },
  { id: "p2", name: "Aina Rahman", role: "Full Stack Developer Intern", stage: "Offer", fitScore: 88, appliedDate: "Jun 15, 2026", avatar: "AR", source: "CareerSync AI" },
  { id: "p3", name: "Jason Lim", role: "Junior Data Analyst", stage: "Screening", fitScore: 74, appliedDate: "Jun 20, 2026", avatar: "JL", source: "LinkedIn" },
  { id: "p4", name: "Wei Ling Choo", role: "Frontend Developer Intern", stage: "Applied", fitScore: 65, appliedDate: "Jun 22, 2026", avatar: "WC", source: "JobStreet" },
  { id: "p5", name: "Rahul Menon", role: "Full Stack Developer Intern", stage: "Interview", fitScore: 79, appliedDate: "Jun 17, 2026", avatar: "RM", source: "CareerSync AI" },
  { id: "p6", name: "Nurul Izzah", role: "Junior Data Analyst", stage: "Rejected", fitScore: 42, appliedDate: "Jun 14, 2026", avatar: "NI", source: "University Referral" },
  { id: "p7", name: "Daniel Wong", role: "Frontend Developer Intern", stage: "Screening", fitScore: 71, appliedDate: "Jun 21, 2026", avatar: "DW", source: "CareerSync AI" },
  { id: "p8", name: "Priya Sharma", role: "Full Stack Developer Intern", stage: "Hired", fitScore: 91, appliedDate: "Jun 10, 2026", avatar: "PS", source: "CareerSync AI" },
  { id: "p9", name: "Ahmad Faiz", role: "Junior Data Analyst", stage: "Applied", fitScore: 58, appliedDate: "Jun 23, 2026", avatar: "AF", source: "LinkedIn" },
  { id: "p10", name: "Mei Xin Lee", role: "Frontend Developer Intern", stage: "Interview", fitScore: 76, appliedDate: "Jun 19, 2026", avatar: "ML", source: "University Referral" },
  ...generateExtraPipelineCandidates(11, 35),
];

export const pipelineCandidates = basePipeline.slice(0, 45).map((c, i) => ({
  ...c,
  stage: pipelineStageQuotas[i] ?? c.stage,
}));

/* ─── Talent Discovery Pool ─── */
export const talentPool = [
  { id: "t1", name: "Sarah Tan", degree: "BSc Computer Science", university: "Universiti Malaya", skills: ["React.js", "JavaScript", "Node.js", "Tailwind CSS", "Git"], fitScore: 82, targetRole: "Frontend Developer", experience: "1 internship", avatar: "ST" },
  { id: "t2", name: "Jason Lim", degree: "BSc Data Science", university: "UTM", skills: ["Python", "SQL", "Pandas", "Tableau", "R"], fitScore: 74, targetRole: "Data Analyst", experience: "1 internship", avatar: "JL" },
  { id: "t3", name: "Aina Rahman", degree: "BEng Software Engineering", university: "UPM", skills: ["TypeScript", "React.js", "Node.js", "Docker", "MongoDB"], fitScore: 88, targetRole: "Full Stack Developer", experience: "1 internship", avatar: "AR" },
  { id: "t4", name: "Wei Ling Choo", degree: "BSc IT", university: "INTI International", skills: ["React.js", "JavaScript", "CSS", "Firebase"], fitScore: 65, targetRole: "Frontend Developer", experience: "No internship", avatar: "WC" },
  { id: "t5", name: "Rahul Menon", degree: "BEng Computer Engineering", university: "Universiti Malaya", skills: ["Java", "Spring Boot", "React.js", "PostgreSQL", "Docker"], fitScore: 79, targetRole: "Full Stack Developer", experience: "2 internships", avatar: "RM" },
  { id: "t6", name: "Priya Sharma", degree: "BSc Software Engineering", university: "APU", skills: ["TypeScript", "Next.js", "Node.js", "MongoDB", "AWS", "Docker"], fitScore: 91, targetRole: "Full Stack Developer", experience: "2 internships", avatar: "PS" },
  { id: "t7", name: "Daniel Wong", degree: "BSc Computer Science", university: "Sunway University", skills: ["React.js", "JavaScript", "Node.js", "Git", "Figma"], fitScore: 71, targetRole: "Frontend Developer", experience: "1 internship", avatar: "DW" },
  { id: "t8", name: "Mei Xin Lee", degree: "BSc Computer Science", university: "USM", skills: ["React.js", "TypeScript", "Tailwind CSS", "Firebase", "Git"], fitScore: 76, targetRole: "Frontend Developer", experience: "1 internship", avatar: "ML" },
  ...generateExtraTalentPool(9, 32),
];

/* ─── Analytics ─── */
export const hiringAnalytics = {
  totalApplications: 47,
  totalHired: 3,
  avgTimeToHire: "18 days",
  offerAcceptRate: "75%",

  applicationsByMonth: [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 8 },
    { month: "Mar", count: 12 },
    { month: "Apr", count: 6 },
    { month: "May", count: 9 },
    { month: "Jun", count: 7 },
  ],

  topDemandedSkills: [
    { skill: "React.js", demand: 92 },
    { skill: "JavaScript", demand: 88 },
    { skill: "TypeScript", demand: 78 },
    { skill: "Node.js", demand: 75 },
    { skill: "Docker", demand: 65 },
    { skill: "Python", demand: 60 },
    { skill: "SQL", demand: 58 },
    { skill: "Git", demand: 55 },
  ],

  sourceBreakdown: [
    { source: "CareerSync AI", count: 22, percentage: 47 },
    { source: "LinkedIn", count: 11, percentage: 23 },
    { source: "JobStreet", count: 7, percentage: 15 },
    { source: "University Referral", count: 5, percentage: 11 },
    { source: "Direct Apply", count: 2, percentage: 4 },
  ],

  stageConversion: [
    { stage: "Applied → Screening", rate: 68 },
    { stage: "Screening → Interview", rate: 52 },
    { stage: "Interview → Offer", rate: 35 },
    { stage: "Offer → Hired", rate: 75 },
  ],

  rolePerformance: [
    { role: "Frontend Developer Intern", applications: 18, hired: 1, avgFitScore: 74 },
    { role: "Full Stack Developer Intern", applications: 15, hired: 1, avgFitScore: 80 },
    { role: "Junior Data Analyst", applications: 14, hired: 1, avgFitScore: 62 },
  ],
};

/* ─── Job Listings (existing, enhanced) ─── */
export const employerJobs = [
  {
    id: "job1",
    title: "Frontend Developer Intern",
    company: "TechNova Solutions",
    location: "Kuala Lumpur",
    type: "Internship",
    status: "Active",
    postedDate: "Jun 10, 2026",
    deadline: "Jul 10, 2026",
    applications: 18,
    description: "We are looking for a Frontend Developer Intern with experience in React.js, JavaScript, HTML, CSS, Git, REST API integration, and basic Node.js.",
    requiredSkills: ["React.js", "JavaScript", "HTML", "CSS", "Git"],
    preferredSkills: ["TypeScript", "Docker", "CI/CD"],
    candidates: [
      { personaId: "sarah", name: "Sarah Tan", fitScore: 82, recommendation: "recommend", topStrength: "Strong React.js project experience" },
      { personaId: "aina", name: "Aina Rahman", fitScore: 78, recommendation: "consider", topStrength: "Full-stack with Docker experience" },
      { personaId: "jason", name: "Jason Lim", fitScore: 45, recommendation: "decline", topStrength: "Good analytical thinking" },
    ],
  },
  {
    id: "job2",
    title: "Junior Data Analyst",
    company: "InsightWorks Analytics",
    location: "Penang",
    type: "Full-time",
    status: "Active",
    postedDate: "Jun 5, 2026",
    deadline: "Jul 5, 2026",
    applications: 14,
    description: "Seeking a Junior Data Analyst to work with Python, SQL, and Tableau to build dashboards and support data-driven decision making.",
    requiredSkills: ["Python", "SQL", "Tableau", "Statistics"],
    preferredSkills: ["Power BI", "BigQuery", "A/B Testing"],
    candidates: [
      { personaId: "jason", name: "Jason Lim", fitScore: 74, recommendation: "recommend", topStrength: "Certified data analytics professional" },
      { personaId: "sarah", name: "Sarah Tan", fitScore: 38, recommendation: "decline", topStrength: "Strong problem-solving mindset" },
      { personaId: "aina", name: "Aina Rahman", fitScore: 42, recommendation: "decline", topStrength: "PostgreSQL and data modeling experience" },
    ],
  },
  {
    id: "job3",
    title: "Full Stack Developer Intern",
    company: "StackBridge Solutions",
    location: "Cyberjaya",
    type: "Internship",
    status: "Closed",
    postedDate: "May 20, 2026",
    deadline: "Jun 20, 2026",
    applications: 15,
    description: "Looking for a Full Stack Developer Intern who can work across React, Node.js, and MongoDB with deployment experience.",
    requiredSkills: ["JavaScript", "Node.js", "React.js", "MongoDB"],
    preferredSkills: ["Docker", "TypeScript", "PostgreSQL"],
    candidates: [
      { personaId: "aina", name: "Aina Rahman", fitScore: 88, recommendation: "recommend", topStrength: "Docker + full-stack TypeScript proficiency" },
      { personaId: "sarah", name: "Sarah Tan", fitScore: 72, recommendation: "consider", topStrength: "React.js and Node.js experience" },
      { personaId: "jason", name: "Jason Lim", fitScore: 35, recommendation: "decline", topStrength: "Python data processing skills" },
    ],
  },
];

/** Maps demo pipeline/talent names to candidate persona IDs for shared employability data. */
export const candidatePersonaMap = {
  "Sarah Tan": "sarah",
  "Jason Lim": "jason",
  "Aina Rahman": "aina",
};

export function resolvePersonaId(name) {
  return candidatePersonaMap[name] ?? null;
}

export function buildGenericFitReport({ name, fitScore, role }) {
  const hiringRecommendation =
    fitScore >= 80 ? "recommend" : fitScore >= 60 ? "consider" : "decline";
  const growthPotential =
    fitScore >= 85
      ? "Very High — Strong portfolio and skill alignment for the role"
      : fitScore >= 70
        ? "High — Solid foundation with addressable gaps"
        : fitScore >= 55
          ? "Moderate — May need mentoring before full role readiness"
          : "Low — Significant skill or experience gaps for this role";

  return {
    fitScore,
    summary: `${name} scores ${fitScore}% against the ${role} requirements. CareerSync AI weighed portfolio evidence, skill coverage, and growth signals to produce this explainable fit assessment.`,
    matchedRequirements: ["Core role skills partially aligned", "Academic background relevant", "Portfolio or project evidence on file"],
    missingRequirements:
      fitScore >= 75
        ? ["Advanced tooling or deployment workflow", "Production-scale project evidence"]
        : ["Several preferred technical skills", "Stronger portfolio depth", "Interview readiness signals"],
    strengths: [
      `${fitScore}% overall alignment with role requirements`,
      "Profile data available for structured screening",
    ],
    risks:
      fitScore >= 70
        ? ["Some preferred skills not yet demonstrated in projects"]
        : ["Below target fit threshold for competitive shortlisting", "Limited evidence on advanced requirements"],
    growthPotential,
    hiringRecommendation,
    interviewSuggestions: [
      "Walk through a recent project and their specific contributions",
      "Probe depth on the top missing technical requirements",
      "Assess learning velocity and communication clarity",
    ],
  };
}

export const fitReports = {
  sarah: {
    fitScore: 82,
    summary: "Sarah is a strong match for the Frontend Developer Intern role. Her React.js project experience, Meta certification, and UI/UX skills demonstrate readiness. Key gaps in DevOps and testing are addressable within 4–6 weeks.",
    matchedRequirements: ["React.js", "JavaScript", "HTML/CSS", "Git", "UI/UX Design"],
    missingRequirements: ["Docker", "CI/CD", "Unit Testing"],
    strengths: ["Two well-documented React projects", "Meta Front-End Developer certification", "Internship experience at TechStart Labs"],
    risks: ["No production deployment experience", "No testing workflow established"],
    growthPotential: "High — Strong learning trajectory with active project building",
    hiringRecommendation: "recommend",
    interviewSuggestions: ["Ask about React state management patterns", "Probe deployment experience", "Discuss approach to debugging"],
  },
  jason: {
    fitScore: 74,
    summary: "Jason has solid analytical fundamentals for a Junior Data Analyst role. Python, SQL, and Tableau experience align with core requirements. Needs cloud data platform exposure for competitive positioning.",
    matchedRequirements: ["Python", "SQL", "Pandas", "Tableau", "Statistics"],
    missingRequirements: ["Power BI", "BigQuery", "A/B Testing"],
    strengths: ["Google Data Analytics certification", "Tableau dashboard projects", "Scikit-learn ML exposure"],
    risks: ["No cloud platform experience", "Limited production data pipeline work"],
    growthPotential: "Moderate — Strong foundation, needs cloud and pipeline exposure",
    hiringRecommendation: "recommend",
    interviewSuggestions: ["Ask about data cleaning methodology", "Discuss dashboard design decisions", "Probe SQL query optimization knowledge"],
  },
  aina: {
    fitScore: 88,
    summary: "Aina is an excellent match for Full Stack Developer positions. Rare combination of frontend, backend, and Docker skills for an intern. Two AWS/MongoDB certifications add credibility. Minor CI/CD gaps are easily addressed.",
    matchedRequirements: ["JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", "MongoDB", "Docker"],
    missingRequirements: ["CI/CD Pipelines", "Kubernetes"],
    strengths: ["Three substantial full-stack projects", "Docker containerization — rare for interns", "Dual certifications (AWS + MongoDB)"],
    risks: ["No CI/CD implementation experience yet", "Missing container orchestration knowledge"],
    growthPotential: "Very High — Already operating above intern level in several areas",
    hiringRecommendation: "recommend",
    interviewSuggestions: ["Ask about Docker workflow and deployment strategy", "Discuss database design trade-offs (SQL vs NoSQL)", "Probe experience with real-time systems (WebSockets)"],
  },
};
