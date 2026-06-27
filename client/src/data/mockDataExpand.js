/**
 * Programmatic mock data expansion — keeps list UIs feeling like a real marketplace
 * without rendering thousands of DOM nodes (pagination handles display).
 */

const EXTRA_COMPANIES = [
  { name: "TechNova Solutions", logo: "TN", industry: "Software & Technology" },
  { name: "InsightWorks Analytics", logo: "IW", industry: "Analytics & Consulting" },
  { name: "StackBridge Solutions", logo: "SB", industry: "Software & Technology" },
  { name: "Nexus AI Labs", logo: "NA", industry: "Artificial Intelligence" },
  { name: "CloudNine Tech", logo: "CN", industry: "Cloud & Infrastructure" },
  { name: "Pixel & Co", logo: "PC", industry: "Design & Product" },
  { name: "ShopFront", logo: "SF", industry: "E-commerce" },
  { name: "BrightApps", logo: "BA", industry: "Software & Technology" },
  { name: "PayLinx", logo: "PL", industry: "Fintech" },
  { name: "MediCore Digital", logo: "MD", industry: "Healthtech" },
  { name: "DataForge", logo: "DF", industry: "Analytics & Consulting" },
  { name: "Orbit Security", logo: "OS", industry: "Cloud & Infrastructure" },
];

const JOB_TITLES = [
  "Frontend Developer Intern",
  "Junior Data Analyst",
  "Full Stack Developer Intern",
  "Backend Engineer Intern",
  "UI Engineer",
  "DevOps Intern",
  "Product Analyst Intern",
  "QA Engineer Intern",
  "Mobile Developer Intern",
  "Cloud Support Associate",
];

const LOCATIONS = ["Kuala Lumpur", "Penang", "Cyberjaya", "Johor Bahru", "Remote", "Selangor"];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];
const TYPES = ["Internship", "Full-time"];

function pseudoMatch(seed, skills) {
  const base = 45 + (seed * 7) % 48;
  const sarah = Math.min(96, base + (seed % 3) * 8);
  const jason = Math.min(96, base + ((seed + 2) % 5) * 6);
  const aina = Math.min(96, base + ((seed + 1) % 4) * 7);
  const pick = (arr, n) => arr.slice(0, n);
  const matched = pick(skills, 2 + (seed % 3));
  const missing = skills.filter((s) => !matched.includes(s)).slice(0, 2);
  return {
    sarah: { score: sarah, matched, missing },
    jason: { score: jason, matched: pick(skills, 2), missing: skills.slice(2, 4) },
    aina: { score: aina, matched: pick(skills, 3), missing: missing.slice(0, 1) },
    default: { score: base, matched: pick(skills, 1), missing: skills.slice(1, 3) },
  };
}

const ROLE_DESCRIPTIONS = {
  "Frontend Developer Intern":
    "You'll work with designers and senior engineers to build responsive, accessible web interfaces. Day to day you'll implement UI components, fix bugs from QA, and participate in code reviews while learning modern frontend practices.",
  "Junior Data Analyst":
    "Support business teams with SQL queries, dashboard updates, and ad-hoc analyses that inform decisions. You'll clean datasets, document findings, and present insights to stakeholders in clear, visual formats.",
  "Full Stack Developer Intern":
    "Ship features across React frontends and Node.js APIs in a small agile squad. You'll touch databases, write integration tests, and collaborate with product managers on user stories from backlog to deployment.",
  "Backend Engineer Intern":
    "Help design and implement RESTful services, database schemas, and background jobs. You'll pair with mentors on performance tuning, logging, and writing maintainable server-side code.",
  "UI Engineer":
    "Own UI quality across the product — component libraries, design tokens, and pixel-perfect implementation. You'll bridge Figma designs and production code while advocating for accessibility and consistency.",
  "DevOps Intern":
    "Assist with CI/CD pipelines, containerized deployments, and cloud infrastructure monitoring. You'll automate repetitive tasks, document runbooks, and learn how production systems stay reliable at scale.",
  "Product Analyst Intern":
    "Track product metrics, run funnel analyses, and synthesize user feedback for the product team. You'll build reports, support A/B test readouts, and help prioritize features backed by data.",
  "QA Engineer Intern":
    "Design test cases, execute manual and automated checks, and file clear bug reports for engineering. You'll learn regression testing workflows and how quality gates fit into the release cycle.",
  "Mobile Developer Intern":
    "Build and refine mobile app features using React Native alongside iOS/Android best practices. You'll work on navigation flows, API integration, and performance profiling on real devices.",
  "Cloud Support Associate":
    "Monitor cloud workloads, triage incidents, and support internal teams with infrastructure requests. You'll gain hands-on experience with deployment tooling, security baselines, and cost-aware operations.",
};

const REQUIREMENT_TEMPLATES = {
  "Frontend Developer Intern": [
    "Solid HTML, CSS, and JavaScript fundamentals",
    "Exposure to React.js or a similar component framework",
    "Comfortable using Git in a team setting",
    "Attention to detail and willingness to learn from code review",
  ],
  "Junior Data Analyst": [
    "Proficiency in SQL for querying and aggregating data",
    "Experience with spreadsheets or a BI tool (Tableau / Power BI)",
    "Basic statistics and data storytelling skills",
    "Clear written communication for non-technical audiences",
  ],
  "Full Stack Developer Intern": [
    "JavaScript/TypeScript on the frontend and Node.js on the backend",
    "Understanding of REST APIs and relational or document databases",
    "Familiarity with Git and collaborative development workflows",
    "Bonus: Docker or basic deployment experience",
  ],
  "Backend Engineer Intern": [
    "Server-side programming in Node.js, Java, or similar",
    "Database design and query optimization basics",
    "Understanding of REST API conventions and error handling",
    "Interest in testing, logging, and observability",
  ],
  "UI Engineer": [
    "Strong React.js and modern CSS (Flexbox, Grid, responsive design)",
    "Experience implementing designs from Figma or similar tools",
    "Accessibility awareness (WCAG basics)",
    "Bonus: Storybook or design-system experience",
  ],
  "DevOps Intern": [
    "Linux command line and scripting (Bash or Python)",
    "Exposure to Docker, CI/CD, or cloud platforms (AWS/GCP)",
    "Curiosity about monitoring, alerts, and incident response",
    "Documentation habits and teamwork in on-call rotations",
  ],
  "Product Analyst Intern": [
    "SQL and spreadsheet proficiency for exploratory analysis",
    "Basic understanding of product metrics and funnels",
    "Ability to summarize findings for product and engineering partners",
    "Bonus: Python or a visualization library",
  ],
  "QA Engineer Intern": [
    "Methodical test-case design and bug reporting",
    "Familiarity with web or mobile application testing",
    "Basic understanding of automated testing concepts",
    "Strong communication when collaborating with developers",
  ],
  "Mobile Developer Intern": [
    "JavaScript fundamentals and interest in React Native",
    "Understanding of mobile UI patterns and API consumption",
    "Git version control and debugging on emulators/devices",
    "Portfolio or coursework demonstrating shipped UI work",
  ],
  "Cloud Support Associate": [
    "Networking and Linux fundamentals",
    "Scripting ability (Python or Bash) for small automations",
    "Interest in cloud services, security, and reliability",
    "Customer-focused mindset when supporting internal teams",
  ],
};

function buildJobDescription(title, company, industry, location, workMode, type, skills, seed) {
  const roleIntro =
    ROLE_DESCRIPTIONS[title] ||
    `Contribute to ${industry.toLowerCase()} products as part of a cross-functional team. You'll collaborate with engineers, designers, and stakeholders to deliver features that reach real users across Malaysia.`;

  const arrangement =
    workMode === "Remote"
      ? "This is a fully remote role with async-friendly standups and documented workflows."
      : workMode === "Hybrid"
        ? `Based in ${location} with a hybrid schedule — typically 2–3 days in office per week.`
        : `On-site in ${location} with close collaboration alongside mentors and squad leads.`;

  const level =
    type === "Internship"
      ? "Ideal for students or fresh graduates who want structured mentorship and a path to conversion."
      : "Suitable for early-career professionals ready to take ownership of meaningful deliverables.";

  const stackNote = skills.length
    ? `You'll regularly work with ${skills.slice(0, 3).join(", ")}${skills.length > 3 ? `, and related tools` : ""}.`
    : "";

  const variants = [
    `${company.name} is expanding its ${industry.toLowerCase()} team and hiring a ${title.toLowerCase()}. ${roleIntro}`,
    `${roleIntro} ${company.name} builds products in the ${industry.toLowerCase()} space and values learners who ship with quality.`,
  ];

  return [variants[seed % variants.length], arrangement, level, stackNote].filter(Boolean).join(" ");
}

const ROLE_RESPONSIBILITIES = {
  "Frontend Developer Intern": [
    "Implement UI components from Figma designs using React.js",
    "Fix frontend bugs reported by QA and users",
    "Write unit tests for critical UI flows",
    "Participate in code reviews and sprint ceremonies",
  ],
  "Junior Data Analyst": [
    "Write SQL queries to extract and transform business data",
    "Build and maintain dashboards in Tableau or Power BI",
    "Prepare weekly reports for department stakeholders",
    "Document data definitions and analysis methodology",
  ],
  "Full Stack Developer Intern": [
    "Develop React features integrated with Node.js REST APIs",
    "Write database migrations and seed scripts",
    "Add integration tests for new endpoints and UI flows",
    "Deploy features to staging with mentor oversight",
  ],
  "Backend Engineer Intern": [
    "Build and document REST API endpoints",
    "Optimize database queries and indexes",
    "Implement authentication and authorization middleware",
    "Monitor logs and resolve production issues with the team",
  ],
  "UI Engineer": [
    "Maintain and extend the shared component library",
    "Ensure designs meet accessibility standards (WCAG 2.1)",
    "Collaborate with designers on design-token updates",
    "Profile and improve frontend performance bottlenecks",
  ],
  "DevOps Intern": [
    "Maintain CI/CD pipelines and deployment scripts",
    "Containerize services with Docker and compose files",
    "Set up monitoring alerts and dashboards",
    "Document infrastructure changes and runbooks",
  ],
  "Product Analyst Intern": [
    "Track KPIs and product funnel metrics weekly",
    "Run cohort and retention analyses for product reviews",
    "Support A/B test setup and readout documentation",
    "Synthesize user feedback into actionable insights",
  ],
  "QA Engineer Intern": [
    "Create and execute manual test plans for new releases",
    "Log reproducible bug reports with screenshots and steps",
    "Automate regression tests for core user journeys",
    "Verify fixes and sign off on release candidates",
  ],
  "Mobile Developer Intern": [
    "Implement screens and navigation in React Native",
    "Integrate mobile apps with backend REST APIs",
    "Test builds on iOS and Android emulators/devices",
    "Address crash reports and performance issues",
  ],
  "Cloud Support Associate": [
    "Monitor cloud resource health and uptime dashboards",
    "Respond to infrastructure tickets from internal teams",
    "Assist with security patching and access reviews",
    "Contribute to cost-optimization and capacity planning",
  ],
};

function buildJobResponsibilities(title) {
  return (
    ROLE_RESPONSIBILITIES[title] || [
      "Collaborate with cross-functional teams on product deliverables",
      "Contribute to code reviews, documentation, and team rituals",
      "Learn from senior engineers through pairing and mentorship",
      "Ship incremental improvements aligned with sprint goals",
    ]
  );
}

function buildJobRequirements(title, skills) {
  const base = REQUIREMENT_TEMPLATES[title] || [
    `Working knowledge of ${skills[0] || "relevant technologies"}`,
    `Familiarity with ${skills[1] || "modern development tools"}`,
    "Strong problem-solving and communication skills",
    "Eagerness to learn in a collaborative team environment",
  ];
  return base;
}

export function generateExtraJobs(startId, count) {
  const skillsPool = [
    ["React.js", "JavaScript", "CSS", "Git"],
    ["Python", "SQL", "Tableau", "Statistics"],
    ["Node.js", "MongoDB", "Docker", "TypeScript"],
    ["Java", "Spring Boot", "SQL", "Git"],
    ["Figma", "UI/UX", "CSS", "Prototyping"],
  ];

  return Array.from({ length: count }, (_, i) => {
    const seed = startId + i;
    const co = EXTRA_COMPANIES[i % EXTRA_COMPANIES.length];
    const skills = skillsPool[i % skillsPool.length];
    const title = JOB_TITLES[i % JOB_TITLES.length];
    const salary =
      TYPES[i % 2] === "Internship" ? "RM 2,000 – 3,200" : "RM 3,500 – 5,500";

    const location = LOCATIONS[i % LOCATIONS.length];
    const workMode = WORK_MODES[i % WORK_MODES.length];
    const type = TYPES[i % TYPES.length];

    return {
      id: `j${seed}`,
      title,
      company: co.name,
      logo: co.logo,
      location,
      workMode,
      type,
      industry: co.industry,
      experience: i % 2 === 0 ? "0–1 years" : "0–2 years",
      salary,
      postedDate: `${1 + (i % 14)} days ago`,
      description: buildJobDescription(title, co, co.industry, location, workMode, type, skills, seed),
      responsibilities: buildJobResponsibilities(title),
      requirements: buildJobRequirements(title, skills),
      benefits:
        workMode === "Remote"
          ? ["Fully remote", "Flexible hours", "Mentorship", "Learning budget"]
          : type === "Internship"
            ? ["Hybrid work", "Mentorship", "Medical coverage", "Conversion opportunity"]
            : ["Hybrid work", "Medical coverage", "Annual bonus", "Learning budget"],
      skills,
      match: pseudoMatch(seed, skills),
      generated: true,
    };
  });
}

export function generateExtraCompanies(startId, count) {
  const sizes = ["20–50 employees", "50–150 employees", "150–500 employees"];
  const taglines = [
    "Innovation at scale",
    "Data-driven decisions",
    "Building for Southeast Asia",
    "Talent-first culture",
    "Ship fast, learn faster",
  ];

  return Array.from({ length: count }, (_, i) => {
    const seed = startId + i;
    const co = EXTRA_COMPANIES[i % EXTRA_COMPANIES.length];
    const suffix = i >= EXTRA_COMPANIES.length ? ` ${Math.floor(i / EXTRA_COMPANIES.length) + 1}` : "";
    return {
      id: `c${seed}`,
      name: `${co.name.replace(/ Solutions| Analytics| Tech| Digital/g, "")}${suffix}`.trim() || co.name,
      logo: co.logo,
      industry: co.industry,
      size: sizes[i % sizes.length],
      location: LOCATIONS[i % LOCATIONS.length],
      founded: 2015 + (i % 8),
      website: `https://company${seed}.demo`,
      rating: +(3.8 + (i % 8) * 0.1).toFixed(1),
      hiring: i % 5 !== 0,
      featured: false,
      tagline: taglines[i % taglines.length],
      about: `A ${co.industry.toLowerCase()} company hiring through CareerSync AI's talent marketplace.`,
      culture: ["Mentorship", "Hybrid work", "Inclusive", "Learning"],
      techStack: ["React.js", "Node.js", "Python", "SQL"].slice(0, 2 + (i % 3)),
      benefits: ["Hybrid work", "Medical coverage", "Learning stipend"],
      generated: true,
    };
  });
}

export function generateExtraTalentPool(startId, count) {
  const names = [
    "Hafiz Rahman", "Lydia Tan", "Ken Wong", "Siti Aminah", "Raj Kumar",
    "Emily Chua", "Farhan Ali", "Yuki Tanaka", "Nurul Izzah", "Ahmad Faiz",
    "Chen Wei", "Arif Hakim", "Sophia Lee", "Vikram Singh", "Amira Hassan",
    "James Ooi", "Zara Ibrahim", "Kevin Ng", "Fatimah Zulkifli", "Marcus Teo",
  ];
  const universities = [
    "UTM", "Universiti Malaya", "UPM", "MMU", "APU", "Taylor's University",
    "Sunway University", "UTAR", "UiTM", "USM", "INTI International",
  ];
  const targetRoles = [
    "Frontend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Backend Developer",
    "UX Designer",
    "DevOps Engineer",
  ];
  const skillSets = [
    ["React.js", "JavaScript", "TypeScript", "Git"],
    ["Python", "SQL", "Pandas", "Tableau"],
    ["Node.js", "MongoDB", "Docker", "TypeScript"],
    ["Java", "Spring Boot", "PostgreSQL", "Git"],
    ["Figma", "UI/UX", "CSS", "Prototyping"],
    ["AWS", "Docker", "Linux", "CI/CD"],
  ];

  return Array.from({ length: count }, (_, i) => {
    const seed = startId + i;
    const name = names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : "");
    const parts = name.trim().split(" ");
    const avatar = (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
    const skills = skillSets[i % skillSets.length];
    return {
      id: `t${seed}`,
      name: name.trim(),
      degree: i % 2 === 0 ? "BSc Computer Science" : "BEng Software Engineering",
      university: universities[i % universities.length],
      skills,
      fitScore: 52 + (seed * 9) % 44,
      targetRole: targetRoles[i % targetRoles.length],
      experience: i % 3 === 0 ? "2 internships" : i % 2 === 0 ? "1 internship" : "No internship",
      avatar,
    };
  });
}

export function generateExtraPipelineCandidates(startId, count) {
  const names = [
    "Wei Ling Choo", "Rahul Menon", "Priya Sharma", "Daniel Wong", "Mei Xin Lee",
    "Nurul Izzah", "Ahmad Faiz", "Hafiz Rahman", "Lydia Tan", "Ken Wong",
    "Siti Aminah", "Raj Kumar", "Emily Chua", "Farhan Ali", "Yuki Tanaka",
  ];
  const roles = [
    "Frontend Developer Intern",
    "Full Stack Developer Intern",
    "Junior Data Analyst",
    "Backend Engineer Intern",
  ];
  const stages = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"];
  const sources = ["CareerSync AI", "LinkedIn", "JobStreet", "University Referral"];

  return Array.from({ length: count }, (_, i) => {
    const seed = startId + i;
    const name = `${names[i % names.length]} ${seed > 20 ? seed : ""}`.trim();
    const parts = name.split(" ");
    const avatar = (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
    return {
      id: `p${seed}`,
      name,
      role: roles[i % roles.length],
      stage: stages[i % stages.length],
      fitScore: 42 + (seed * 11) % 52,
      appliedDate: `Jun ${1 + (i % 24)}, 2026`,
      avatar,
      source: sources[i % sources.length],
    };
  });
}
