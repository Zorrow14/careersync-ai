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

    return {
      id: `j${seed}`,
      title,
      company: co.name,
      logo: co.logo,
      location: LOCATIONS[i % LOCATIONS.length],
      workMode: WORK_MODES[i % WORK_MODES.length],
      type: TYPES[i % TYPES.length],
      industry: co.industry,
      experience: i % 2 === 0 ? "0–1 years" : "0–2 years",
      salary,
      postedDate: `${1 + (i % 14)} days ago`,
      description: `${co.name} is hiring for a ${title.toLowerCase()} role. Join a growing team building modern digital products across Malaysia.`,
      requirements: skills.map((s) => `Experience with ${s}`),
      benefits: ["Hybrid work", "Mentorship", "Medical coverage", "Learning budget"],
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
