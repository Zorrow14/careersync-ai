export const skillGaps = {
  sarah: {
    currentSkills: ["React.js", "JavaScript", "HTML", "CSS", "Node.js", "Git", "Tailwind CSS", "UI/UX"],
    missingSkills: [
      { skill: "Docker", priority: "high", category: "DevOps" },
      { skill: "CI/CD", priority: "high", category: "DevOps" },
      { skill: "Unit Testing", priority: "high", category: "Quality" },
      { skill: "AWS Basics", priority: "medium", category: "Cloud" },
      { skill: "TypeScript", priority: "medium", category: "Language" },
      { skill: "GraphQL", priority: "low", category: "API" },
    ],
    recommendations: [
      "Start with Vitest — it integrates seamlessly with your Vite projects",
      "Dockerize your TaskFlow project as a learning exercise",
      "Set up GitHub Actions for one repo to learn CI/CD",
      "AWS Free Tier: deploy an S3 static site + Lambda function",
    ],
  },

  jason: {
    currentSkills: ["Python", "SQL", "Pandas", "Tableau", "Excel", "R", "Statistics"],
    missingSkills: [
      { skill: "Power BI", priority: "high", category: "Visualization" },
      { skill: "BigQuery", priority: "high", category: "Cloud Data" },
      { skill: "A/B Testing", priority: "high", category: "Experimentation" },
      { skill: "dbt", priority: "medium", category: "Data Engineering" },
      { skill: "Airflow", priority: "medium", category: "Orchestration" },
      { skill: "Looker", priority: "low", category: "BI" },
    ],
    recommendations: [
      "Take the Google BigQuery specialization on Coursera",
      "Build a dbt project transforming raw CSV data into analytics-ready tables",
      "Practice A/B test analysis using Kaggle datasets",
      "Learn Power BI alongside your Tableau skills for broader employability",
    ],
  },

  aina: {
    currentSkills: ["JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Docker", "Git"],
    missingSkills: [
      { skill: "CI/CD Pipelines", priority: "high", category: "DevOps" },
      { skill: "Kubernetes", priority: "medium", category: "Orchestration" },
      { skill: "Monitoring (Grafana/Datadog)", priority: "medium", category: "Observability" },
      { skill: "Redis", priority: "low", category: "Caching" },
      { skill: "Message Queues", priority: "low", category: "Architecture" },
    ],
    recommendations: [
      "Add GitHub Actions to your MedTrack project — automate testing + deploy",
      "Learn Kubernetes basics with Minikube and deploy your DevBoard app",
      "Set up Prometheus + Grafana on one project for monitoring",
      "Add Redis caching to your Express APIs to learn caching patterns",
    ],
  },
};
