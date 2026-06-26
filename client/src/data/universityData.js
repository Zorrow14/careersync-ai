export const universityInsights = {
  institutionName: "Malaysian Universities — Combined Cohort",
  totalStudents: 156,
  averageReadinessScore: 72,
  readinessPercentage: 58,
  studentsNeedingSupport: 34,
  internshipReady: 91,
  graduateOutcomeRate: 78,
  employerPartnerships: 24,
  activePrograms: 6,
  summary: "Cohort shows strong foundation in programming fundamentals and frontend skills. Significant gaps exist in DevOps, cloud platforms, and testing practices - areas increasingly demanded by employers.",

  employabilityOverview: [
    { label: "Career Ready", value: 58, detail: "Students above readiness threshold", color: "amber" },
    { label: "Internship Ready", value: 63, detail: "Students ready for internship placement", color: "blue" },
    { label: "Portfolio Complete", value: 71, detail: "Students with complete living profiles", color: "emerald" },
    { label: "At Risk", value: 22, detail: "Students needing intervention", color: "rose" },
  ],

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

  readinessTracker: {
    readinessBands: [
      { band: "Excellent", range: "85-100", count: 38, color: "emerald" },
      { band: "Ready", range: "70-84", count: 53, color: "amber" },
      { band: "Developing", range: "55-69", count: 43, color: "blue" },
      { band: "Needs Support", range: "<55", count: 22, color: "rose" },
    ],
    internshipPipeline: [
      { stage: "Profile Complete", count: 126, rate: 81 },
      { stage: "Resume Reviewed", count: 112, rate: 72 },
      { stage: "Mock Interview Passed", count: 87, rate: 56 },
      { stage: "Shortlisted", count: 64, rate: 41 },
      { stage: "Offer / Placement", count: 39, rate: 25 },
    ],
    graduateOutcomes: [
      { outcome: "Employed within 6 months", count: 72, rate: 46 },
      { outcome: "Internship converted to full-time", count: 31, rate: 20 },
      { outcome: "Postgraduate study", count: 18, rate: 12 },
      { outcome: "Actively seeking", count: 35, rate: 22 },
    ],
    interventionQueue: [
      { studentGroup: "Year 2 Data Analytics", issue: "Portfolio completion below target", severity: "medium", students: 18 },
      { studentGroup: "Final Year Backend", issue: "Low interview confidence", severity: "high", students: 12 },
      { studentGroup: "Year 3 Cloud Elective", issue: "Missing deployment projects", severity: "high", students: 16 },
      { studentGroup: "Foundation Programming", issue: "Weak Git collaboration evidence", severity: "medium", students: 21 },
    ],
  },

  studentInsights: {
    skillClusters: [
      { skill: "React", students: 84, averageProgress: 82 },
      { skill: "Python", students: 76, averageProgress: 78 },
      { skill: "SQL", students: 68, averageProgress: 74 },
      { skill: "UI/UX", students: 54, averageProgress: 71 },
      { skill: "Node.js", students: 49, averageProgress: 69 },
      { skill: "Docker", students: 28, averageProgress: 48 },
    ],
    interestAreas: [
      { area: "Frontend Engineering", students: 46, growth: "+14%" },
      { area: "Data Analytics", students: 39, growth: "+9%" },
      { area: "AI Product Development", students: 31, growth: "+22%" },
      { area: "Cloud / DevOps", students: 18, growth: "+6%" },
      { area: "Cybersecurity", students: 22, growth: "+11%" },
    ],
    progressTimeline: [
      { month: "Jan", readiness: 61, portfolio: 48, interview: 42 },
      { month: "Feb", readiness: 64, portfolio: 52, interview: 45 },
      { month: "Mar", readiness: 67, portfolio: 57, interview: 49 },
      { month: "Apr", readiness: 70, portfolio: 63, interview: 53 },
      { month: "May", readiness: 72, portfolio: 68, interview: 58 },
      { month: "Jun", readiness: 74, portfolio: 71, interview: 62 },
    ],
    cohortHighlights: [
      "Frontend cohort shows the fastest portfolio completion growth.",
      "Data analytics students demonstrate strong SQL readiness but need storytelling practice.",
      "Cloud/DevOps interest is rising, but practical project evidence remains limited.",
    ],
  },

  curriculumInsights: {
    aiRecommendations: [
      {
        title: "Embed Cloud Deployment Sprint",
        impact: "High",
        description: "Add a two-week Docker, CI/CD, and cloud deployment sprint before capstone submission.",
        targetSkills: ["Docker", "CI/CD", "AWS Basics"],
      },
      {
        title: "Make Testing Part of Every Project Rubric",
        impact: "High",
        description: "Require unit tests and test coverage notes for web, API, and analytics projects.",
        targetSkills: ["Vitest", "Jest", "API Testing"],
      },
      {
        title: "Launch Employer-Led Portfolio Reviews",
        impact: "Medium",
        description: "Invite hiring partners to review final-year portfolios and provide rubric-based feedback.",
        targetSkills: ["Storytelling", "Technical Communication", "Project Scope"],
      },
    ],
    moduleGaps: [
      { module: "Web Application Development", gap: "Testing depth", currentCoverage: 42, recommendedCoverage: 75 },
      { module: "Software Engineering Project", gap: "CI/CD practice", currentCoverage: 28, recommendedCoverage: 70 },
      { module: "Database Systems", gap: "Performance tuning", currentCoverage: 55, recommendedCoverage: 72 },
      { module: "Cloud Computing", gap: "Deployable portfolio artifacts", currentCoverage: 38, recommendedCoverage: 80 },
    ],
    quickWins: [
      "Add GitHub Actions templates to all capstone repositories.",
      "Run monthly mock technical interviews using employer rubrics.",
      "Create a shared portfolio checklist for every final-year student.",
      "Add salary and role demand context to course advising sessions.",
    ],
  },

  industryTrends: {
    inDemandRoles: [
      { role: "Frontend Developer", demand: 88, medianSalary: "RM 4,800", growth: "+18%" },
      { role: "Data Analyst", demand: 82, medianSalary: "RM 4,600", growth: "+15%" },
      { role: "Full Stack Developer", demand: 86, medianSalary: "RM 5,300", growth: "+20%" },
      { role: "Cloud Engineer", demand: 79, medianSalary: "RM 6,200", growth: "+24%" },
      { role: "Cybersecurity Analyst", demand: 74, medianSalary: "RM 5,700", growth: "+17%" },
    ],
    technologies: [
      { tech: "React", demand: 91, salaryLift: "+8%" },
      { tech: "TypeScript", demand: 84, salaryLift: "+10%" },
      { tech: "Docker", demand: 81, salaryLift: "+12%" },
      { tech: "AWS", demand: 78, salaryLift: "+15%" },
      { tech: "Python", demand: 86, salaryLift: "+9%" },
      { tech: "SQL", demand: 83, salaryLift: "+7%" },
    ],
    salaryBands: [
      { level: "Internship", min: 900, max: 1500 },
      { level: "Graduate", min: 3200, max: 4800 },
      { level: "Junior", min: 4200, max: 6200 },
      { level: "Mid-Level", min: 6500, max: 9500 },
    ],
    marketSignals: [
      "Employers increasingly request deployable portfolio links during first screening.",
      "Cloud and testing signals are becoming differentiators for junior roles.",
      "Analytics roles now expect stronger storytelling and dashboard communication.",
    ],
  },

  outcomeMetrics: {
    employedWithin6Months: 72,
    employedWithin6MonthsRate: 46,
    internshipToFullTime: 31,
    internshipConversionRate: 20,
    activelySeeking: 35,
    postgraduateStudy: 18,
    avgSalaryProgression: "+12% YoY",
    lifelongTracking: "156 alumni tracked post-graduation",
  },

  sdgMetrics: [
    { code: "SDG 4", metric: "Curriculum-market alignment score", value: "74%", detail: "Programs mapped to employer skill demand" },
    { code: "SDG 8", metric: "Graduate employment within 6 months", value: "46%", detail: "Up from 38% baseline in 2024" },
    { code: "SDG 8", metric: "Internship placement rate", value: "63%", detail: "91 students internship-ready this semester" },
  ],

  reports: [
    {
      title: "Monthly Employability Summary",
      type: "PDF",
      audience: "Dean, Faculty Leads",
      period: "June 2026",
      status: "Ready",
      metrics: ["Readiness score", "At-risk cohorts", "Placement funnel"],
    },
    {
      title: "Curriculum Gap Analysis",
      type: "PDF",
      audience: "Program Directors",
      period: "Q2 2026",
      status: "Ready",
      metrics: ["Skill gaps", "Market demand", "Module coverage"],
    },
    {
      title: "Industry Demand Dashboard Export",
      type: "CSV",
      audience: "Career Services",
      period: "June 2026",
      status: "Ready",
      metrics: ["Roles", "Technologies", "Salary bands"],
    },
    {
      title: "Student Progress Snapshot",
      type: "XLSX",
      audience: "Academic Advisors",
      period: "Current Semester",
      status: "Generating",
      metrics: ["Portfolio progress", "Interview readiness", "Intervention queue"],
    },
  ],
};
