export const roadmaps = {
  sarah: {
    title: "Frontend Developer Readiness Plan",
    duration: "8 weeks",
    currentScore: 78,
    projectedScore: 91,
    steps: [
      { phase: "Week 1-2", title: "Strengthen React Fundamentals", description: "Improve component structure, props, hooks, routing, and reusable UI patterns.", skills: ["React", "Hooks", "Router"], tasks: ["Refactor TaskFlow components", "Add React Router to PortfolioKit"] },
      { phase: "Week 3-4", title: "Add Testing", description: "Learn unit and integration testing for React applications.", skills: ["Vitest", "React Testing Library"], tasks: ["Write 10 unit tests for TaskFlow", "Add CI test step with GitHub Actions"] },
      { phase: "Week 5-6", title: "DevOps Basics", description: "Learn Docker, GitHub Actions, and deployment workflows.", skills: ["Docker", "CI/CD", "GitHub Actions"], tasks: ["Dockerize TaskFlow", "Set up auto-deploy pipeline"] },
      { phase: "Week 7-8", title: "Portfolio Upgrade", description: "Add case studies, documentation, and deploy all projects.", skills: ["Technical Writing", "Vercel", "Netlify"], tasks: ["Write README case studies", "Deploy all projects live"] },
    ],
  },

  jason: {
    title: "Data Analyst Career Acceleration Plan",
    duration: "8 weeks",
    currentScore: 68,
    projectedScore: 85,
    steps: [
      { phase: "Week 1-2", title: "Cloud Data Fundamentals", description: "Get started with BigQuery and cloud-based data warehousing.", skills: ["BigQuery", "GCP", "SQL"], tasks: ["Complete BigQuery sandbox tutorial", "Migrate COVID Dashboard data to BigQuery"] },
      { phase: "Week 3-4", title: "Data Pipeline with dbt", description: "Learn modern data transformation using dbt.", skills: ["dbt", "Data Modeling", "Jinja"], tasks: ["Build a dbt project from CSV to analytics", "Write reusable dbt macros"] },
      { phase: "Week 5-6", title: "A/B Testing & Experimentation", description: "Learn statistical testing for product analytics.", skills: ["A/B Testing", "Statistics", "Python"], tasks: ["Analyze 3 Kaggle A/B test datasets", "Build a hypothesis testing notebook"] },
      { phase: "Week 7-8", title: "Power BI & Portfolio", description: "Add Power BI to your toolkit and polish your portfolio.", skills: ["Power BI", "DAX", "Portfolio"], tasks: ["Recreate one Tableau dashboard in Power BI", "Document all projects with outcomes"] },
    ],
  },

  aina: {
    title: "Full Stack Developer Mastery Plan",
    duration: "6 weeks",
    currentScore: 84,
    projectedScore: 95,
    steps: [
      { phase: "Week 1-2", title: "CI/CD Pipelines", description: "Automate testing, building, and deployment for existing projects.", skills: ["GitHub Actions", "CI/CD", "Docker Compose"], tasks: ["Add CI/CD to MedTrack", "Add automated testing to DevBoard"] },
      { phase: "Week 3-4", title: "Kubernetes Basics", description: "Learn container orchestration and deployment at scale.", skills: ["Kubernetes", "Minikube", "kubectl"], tasks: ["Deploy MedTrack on Minikube", "Write Kubernetes manifests for DevBoard"] },
      { phase: "Week 5-6", title: "Monitoring & Production Readiness", description: "Add observability and production-grade practices.", skills: ["Grafana", "Prometheus", "Logging"], tasks: ["Set up Prometheus + Grafana for MedTrack", "Add structured logging to all Express APIs"] },
    ],
  },
};
