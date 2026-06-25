export const resumeAnalyses = {
  sarah: {
    matchScore: 82,
    role: "Frontend Developer Intern",
    company: "TechNova Solutions",
    summary: "Strong match for this role. React.js, JavaScript, and UI experience align well with the employer's requirements. Missing DevOps and testing skills can be addressed in 6–8 weeks.",
    matchedSkills: ["React.js", "JavaScript", "HTML", "CSS", "Node.js", "Git", "UI/UX"],
    missingSkills: ["Docker", "CI/CD", "Unit Testing", "AWS Basics"],
    strengths: [
      "Strong frontend development foundation",
      "Relevant React.js project experience",
      "Good understanding of full-stack workflow",
      "Portfolio demonstrates practical implementation ability",
    ],
    weaknesses: [
      "Limited DevOps exposure",
      "No visible testing workflow",
      "Cloud deployment knowledge can be improved",
    ],
    recommendations: [
      "Build one project using Docker and GitHub Actions",
      "Add testing with Vitest or Jest",
      "Deploy a full-stack project using Vercel and Render",
      "Improve portfolio project documentation",
    ],
  },

  jason: {
    matchScore: 74,
    role: "Junior Data Analyst",
    company: "InsightWorks Analytics",
    summary: "Good foundational match for data analyst roles. Strong Python and SQL skills. Needs more experience in cloud platforms and advanced statistical tools to compete for senior positions.",
    matchedSkills: ["Python", "SQL", "Pandas", "Tableau", "Excel", "Statistics"],
    missingSkills: ["Power BI", "BigQuery", "A/B Testing", "Cloud Data Pipelines", "dbt"],
    strengths: [
      "Solid analytical and statistical foundation",
      "Hands-on experience with Tableau dashboards",
      "Project-based ML exposure with scikit-learn",
      "Google Data Analytics certification",
    ],
    weaknesses: [
      "No cloud data platform experience (GCP, AWS, Azure)",
      "Limited experience with production data pipelines",
      "No A/B testing or experimentation framework knowledge",
    ],
    recommendations: [
      "Learn BigQuery or AWS Redshift for cloud data warehousing",
      "Build an end-to-end data pipeline project",
      "Practice A/B test analysis with sample datasets",
      "Add Power BI as a complementary visualization tool",
    ],
  },

  aina: {
    matchScore: 88,
    role: "Full Stack Developer Intern",
    company: "StackBridge Solutions",
    summary: "Excellent match. Strong across both frontend and backend with Docker experience that many candidates lack. Minor gaps in CI/CD and monitoring can be closed quickly.",
    matchedSkills: ["JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Docker", "Git"],
    missingSkills: ["CI/CD Pipelines", "Kubernetes", "Application Monitoring"],
    strengths: [
      "Full-stack JavaScript/TypeScript proficiency",
      "Docker containerization experience — rare for interns",
      "Three substantial portfolio projects with varied tech stacks",
      "AWS Cloud Practitioner certified",
    ],
    weaknesses: [
      "No CI/CD pipeline implementation experience",
      "Missing container orchestration knowledge (Kubernetes)",
      "No experience with observability tools (Datadog, Grafana)",
    ],
    recommendations: [
      "Add GitHub Actions CI/CD to one existing project",
      "Learn Kubernetes basics with Minikube",
      "Set up application logging and monitoring on one project",
    ],
  },
};
