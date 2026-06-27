/** Build roadmap.sh-style graph branches from step entries. */
function formatPhaseRange(steps, index) {
  let start = 1;
  for (let j = 0; j < index; j++) start += steps[j].weeks ?? 2;
  const span = steps[index].weeks ?? 2;
  const end = start + span - 1;
  return start === end ? `Week ${start}` : `Weeks ${start}–${end}`;
}

function formatPlanDuration(totalWeeks, hoursPerWeek = 8) {
  if (totalWeeks >= 8) {
    const months = Math.ceil(totalWeeks / 4);
    return `${totalWeeks} weeks (~${months} mo part-time)`;
  }
  return `${totalWeeks} weeks · ~${hoursPerWeek} hrs/week`;
}

function toGraph(rootLabel, steps) {
  const totalWeeks = steps.reduce((acc, s) => acc + (s.weeks ?? 2), 0);

  return {
    rootLabel,
    targetRole: rootLabel,
    totalWeeks,
    durationLabel: formatPlanDuration(totalWeeks),
    branches: steps.map((step, i) => ({
      id: `branch-${i + 1}`,
      index: i + 1,
      phase: step.phase ?? formatPhaseRange(steps, i),
      weeks: step.weeks ?? 2,
      effort: step.weeks ? `~${step.weeks} weeks · 8 hrs/week` : undefined,
      milestone: step.title,
      description: step.description,
      focus: step.focus || step.title,
      outcome: step.outcome || `Complete ${step.title.toLowerCase()} milestones`,
      difficulty: step.difficulty || (i === 0 ? "Foundation" : i < steps.length - 1 ? "Intermediate" : "Capstone"),
      skills: step.skills || [],
      tasks: step.tasks || [],
      resources: step.resources || [],
    })),
  };
}

function buildRoadmap(title, rootLabel, steps, scores) {
  const graph = toGraph(rootLabel, steps);
  return {
    title,
    duration: graph.durationLabel,
    totalWeeks: graph.totalWeeks,
    ...scores,
    graph,
    steps: [],
  };
}

export const roadmaps = {
  sarah: buildRoadmap(
    "Frontend Developer Readiness Plan",
    "Frontend Developer",
    [
      {
        weeks: 3,
        title: "Strengthen React Fundamentals",
        description:
          "Improve component structure, props, hooks, routing, and reusable UI patterns. Budget ~8–10 hrs/week alongside classes.",
        focus: "Component architecture",
        outcome: "Ship a multi-page React app with clean component boundaries",
        difficulty: "Foundation",
        skills: ["React", "Hooks", "Router"],
        tasks: ["Refactor TaskFlow components", "Add React Router to PortfolioKit"],
        resources: ["React docs — Thinking in React", "PortfolioKit repo"],
      },
      {
        weeks: 3,
        title: "Add Testing",
        description: "Learn unit and integration testing for React applications at a steady practice pace.",
        focus: "Quality engineering",
        outcome: "Demonstrate tested UI flows in your portfolio",
        difficulty: "Intermediate",
        skills: ["Vitest", "React Testing Library"],
        tasks: ["Write 10 unit tests for TaskFlow", "Add CI test step with GitHub Actions"],
        resources: ["Vitest guide", "Testing Library cheatsheet"],
      },
      {
        weeks: 3,
        title: "DevOps Basics",
        description: "Learn Docker, GitHub Actions, and deployment workflows — typically the steepest ramp for frontend interns.",
        focus: "Deployment pipeline",
        outcome: "Deploy TaskFlow with a repeatable CI/CD workflow",
        difficulty: "Intermediate",
        skills: ["Docker", "CI/CD", "GitHub Actions"],
        tasks: ["Dockerize TaskFlow", "Set up auto-deploy pipeline"],
        resources: ["Docker getting started", "GitHub Actions for React"],
      },
      {
        weeks: 3,
        title: "Portfolio Upgrade",
        description: "Polish case studies, documentation, and live deploys — allow time for feedback and iteration.",
        focus: "Employer-ready portfolio",
        outcome: "Present three live projects with case-study write-ups",
        difficulty: "Capstone",
        skills: ["Technical Writing", "Vercel", "Netlify"],
        tasks: ["Write README case studies", "Deploy all projects live"],
        resources: ["Case study template", "Vercel deploy docs"],
      },
    ],
    { currentScore: 78, projectedScore: 91 }
  ),

  jason: buildRoadmap(
    "Data Analyst Career Acceleration Plan",
    "Data Analyst",
    [
      {
        weeks: 3,
        title: "Cloud Data Fundamentals",
        description: "Get started with BigQuery and cloud warehousing — expect a learning curve on GCP console and billing.",
        focus: "Cloud warehousing",
        outcome: "Query and model a dataset in BigQuery end-to-end",
        difficulty: "Foundation",
        skills: ["BigQuery", "GCP", "SQL"],
        tasks: ["Complete BigQuery sandbox tutorial", "Migrate COVID Dashboard data to BigQuery"],
        resources: ["BigQuery sandbox", "GCP free tier"],
      },
      {
        weeks: 4,
        title: "Data Pipeline with dbt",
        description: "Learn modern data transformation using dbt. Most analysts need 3–4 weeks for a first solid project.",
        focus: "Transform layer",
        outcome: "Build a versioned dbt project with documented models",
        difficulty: "Intermediate",
        skills: ["dbt", "Data Modeling", "Jinja"],
        tasks: ["Build a dbt project from CSV to analytics", "Write reusable dbt macros"],
        resources: ["dbt fundamentals", "Jinja in dbt"],
      },
      {
        weeks: 2,
        title: "A/B Testing & Experimentation",
        description: "Apply statistical testing for product analytics — builds on your existing stats foundation.",
        focus: "Experiment design",
        outcome: "Deliver a notebook with hypothesis test readouts",
        difficulty: "Intermediate",
        skills: ["A/B Testing", "Statistics", "Python"],
        tasks: ["Analyze 3 Kaggle A/B test datasets", "Build a hypothesis testing notebook"],
        resources: ["Kaggle A/B datasets", "Stats for analysts"],
      },
      {
        weeks: 3,
        title: "Power BI & Portfolio",
        description: "Add Power BI and document portfolio outcomes — allow time to recreate dashboards properly.",
        focus: "BI storytelling",
        outcome: "Publish a Power BI dashboard with narrative insights",
        difficulty: "Capstone",
        skills: ["Power BI", "DAX", "Portfolio"],
        tasks: ["Recreate one Tableau dashboard in Power BI", "Document all projects with outcomes"],
        resources: ["Power BI learn path", "Portfolio checklist"],
      },
    ],
    { currentScore: 68, projectedScore: 85 }
  ),

  aina: buildRoadmap(
    "Full Stack Developer Mastery Plan",
    "Full Stack Developer",
    [
      {
        weeks: 2,
        title: "CI/CD Pipelines",
        description: "Automate testing, building, and deployment — faster ramp given your existing Docker experience.",
        focus: "Automation",
        outcome: "MedTrack ships through GitHub Actions on every merge",
        difficulty: "Foundation",
        skills: ["GitHub Actions", "CI/CD", "Docker Compose"],
        tasks: ["Add CI/CD to MedTrack", "Add automated testing to DevBoard"],
        resources: ["Actions workflow examples", "Docker Compose docs"],
      },
      {
        weeks: 4,
        title: "Kubernetes Basics",
        description: "Container orchestration at scale — plan four weeks for Minikube setup, manifests, and debugging.",
        focus: "Orchestration",
        outcome: "Run MedTrack on Minikube with declarative manifests",
        difficulty: "Intermediate",
        skills: ["Kubernetes", "Minikube", "kubectl"],
        tasks: ["Deploy MedTrack on Minikube", "Write Kubernetes manifests for DevBoard"],
        resources: ["Kubernetes basics", "Minikube start guide"],
      },
      {
        weeks: 4,
        title: "Monitoring & Production Readiness",
        description: "Observability and production practices — Prometheus/Grafana setup alone often takes 2+ weeks.",
        focus: "Observability",
        outcome: "Dashboard alerts and structured logs for Express APIs",
        difficulty: "Capstone",
        skills: ["Grafana", "Prometheus", "Logging"],
        tasks: ["Set up Prometheus + Grafana for MedTrack", "Add structured logging to all Express APIs"],
        resources: ["Prometheus quickstart", "Structured logging patterns"],
      },
    ],
    { currentScore: 84, projectedScore: 95 }
  ),
};

/** Node ids belonging to one branch (milestone + skills). */
export function getBranchNodeIds(branch) {
  const ids = [branch.id];
  for (const skill of branch.skills || []) {
    ids.push(`${branch.id}:${skill}`);
  }
  return ids;
}

/** All trackable node ids for progress calculation. */
export function getRoadmapNodeIds(graph) {
  const ids = ["root"];
  for (const branch of graph.branches) {
    ids.push(...getBranchNodeIds(branch));
  }
  return ids;
}

export function getBranchProgress(branch, completed) {
  const ids = getBranchNodeIds(branch);
  const done = ids.filter((id) => completed.has(id)).length;
  return { done, total: ids.length, percent: ids.length ? Math.round((done / ids.length) * 100) : 0 };
}

export function findRoadmapNode(graph, nodeId) {
  if (nodeId === "root") {
    return {
      type: "root",
      label: graph.rootLabel,
      description:
        "Your personalized learning path to reach role readiness. Work through each phase in order — milestones unlock the skills employers expect for this role.",
      branches: graph.branches,
    };
  }
  for (const branch of graph.branches) {
    if (branch.id === nodeId) return { type: "milestone", ...branch };
    const skill = branch.skills?.find((s) => `${branch.id}:${s}` === nodeId);
    if (skill) {
      return {
        type: "skill",
        label: skill,
        phase: branch.phase,
        milestone: branch.milestone,
        description: branch.description,
        focus: branch.focus,
        outcome: branch.outcome,
        difficulty: branch.difficulty,
        effort: branch.weeks ? `~${branch.weeks} weeks · 8 hrs/week` : undefined,
        tasks: branch.tasks,
        resources: branch.resources,
      };
    }
  }
  return null;
}

export function findBranchForNode(graph, nodeId) {
  if (nodeId === "root") return null;
  return graph.branches.find(
    (b) => b.id === nodeId || b.skills?.some((s) => `${b.id}:${s}` === nodeId)
  );
}
