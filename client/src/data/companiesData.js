/**
 * Company directory mock data.
 *
 * Companies are cross-linked to job listings (jobsData.js) by company name,
 * so the directory, job search, and job details share a consistent dataset.
 */

import { jobs } from "./jobsData.js";
import { generateExtraCompanies } from "./mockDataExpand.js";
import { getCompanyProfileImage } from "./profileImages.js";

export const industries = [
  "All",
  "Software & Technology",
  "Analytics & Consulting",
  "Artificial Intelligence",
  "Cloud & Infrastructure",
  "Design & Product",
  "Fintech",
  "E-commerce",
  "Healthtech",
];

const baseCompanies = [
  {
    id: "c1",
    name: "TechNova Solutions",
    logo: "TN",
    industry: "Software & Technology",
    size: "150–500 employees",
    location: "Kuala Lumpur",
    founded: 2018,
    website: "https://technova.demo",
    rating: 4.6,
    hiring: true,
    featured: true,
    tagline: "Building the next generation of digital products",
    about:
      "TechNova Solutions builds web and mobile products used by thousands of users across Southeast Asia. We invest heavily in mentorship and ship modern React + Node.js stacks.",
    culture: ["Mentorship", "Hybrid work", "Learning stipend", "Inclusive"],
    techStack: ["React.js", "Node.js", "TypeScript", "AWS"],
    benefits: ["Hybrid work", "Mentorship program", "Learning stipend", "Conversion to full-time"],
  },
  {
    id: "c2",
    name: "InsightWorks Analytics",
    logo: "IW",
    industry: "Analytics & Consulting",
    size: "50–150 employees",
    location: "Penang",
    founded: 2016,
    website: "https://insightworks.demo",
    rating: 4.3,
    hiring: true,
    featured: true,
    tagline: "Turning data into decisions",
    about:
      "InsightWorks helps enterprises make data-driven decisions through dashboards, analytics, and machine learning consulting. A great place to grow as a data professional.",
    culture: ["Data-driven", "Flexible hours", "Training budget", "Collaborative"],
    techStack: ["Python", "SQL", "Tableau", "Power BI"],
    benefits: ["Medical coverage", "Annual bonus", "Training budget", "Flexible hours"],
  },
  {
    id: "c3",
    name: "StackBridge Solutions",
    logo: "SB",
    industry: "Software & Technology",
    size: "20–50 employees",
    location: "Cyberjaya",
    founded: 2020,
    website: "https://stackbridge.demo",
    rating: 4.5,
    hiring: true,
    featured: true,
    tagline: "Full-stack products, shipped fast",
    about:
      "StackBridge is a remote-first product studio building full-stack applications for startups. Interns work end-to-end across React, Node.js, and MongoDB.",
    culture: ["Remote-first", "Ownership", "Fast-paced", "Async"],
    techStack: ["React.js", "Node.js", "MongoDB", "Docker"],
    benefits: ["Fully remote", "Equipment provided", "Flexible hours", "Conversion opportunity"],
  },
  {
    id: "c4",
    name: "Pixel & Co",
    logo: "PC",
    industry: "Design & Product",
    size: "20–50 employees",
    location: "Kuala Lumpur",
    founded: 2019,
    website: "https://pixelandco.demo",
    rating: 4.7,
    hiring: true,
    featured: false,
    tagline: "Where design meets engineering",
    about:
      "Pixel & Co is a design-led product team obsessed with craft. We build design systems and polished interfaces for premium digital products.",
    culture: ["Design-led", "Craft", "Conference budget", "Stock options"],
    techStack: ["React.js", "TypeScript", "Storybook", "Figma"],
    benefits: ["Design system ownership", "Conference budget", "Hybrid work", "Stock options"],
  },
  {
    id: "c5",
    name: "Nexus AI Labs",
    logo: "NA",
    industry: "Artificial Intelligence",
    size: "50–150 employees",
    location: "Remote",
    founded: 2021,
    website: "https://nexusai.demo",
    rating: 4.4,
    hiring: true,
    featured: true,
    tagline: "Applied AI for real-world problems",
    about:
      "Nexus AI Labs builds machine learning pipelines and applied AI products. We offer GPU compute access, research mentorship, and publication opportunities.",
    culture: ["Research-driven", "Remote", "GPU access", "Mentorship"],
    techStack: ["Python", "PyTorch", "scikit-learn", "SQL"],
    benefits: ["Fully remote", "GPU compute access", "Research mentorship", "Publication opportunities"],
  },
  {
    id: "c6",
    name: "CloudNine Tech",
    logo: "CN",
    industry: "Cloud & Infrastructure",
    size: "150–500 employees",
    location: "Cyberjaya",
    founded: 2015,
    website: "https://cloudnine.demo",
    rating: 4.2,
    hiring: true,
    featured: false,
    tagline: "Scalable cloud infrastructure",
    about:
      "CloudNine Tech provides cloud and infrastructure services to enterprise clients. Backend engineers work on scalable REST APIs, caching, and containerized deployments.",
    culture: ["Engineering excellence", "On-site", "Free lunch", "Mentorship"],
    techStack: ["Node.js", "Express.js", "PostgreSQL", "Docker"],
    benefits: ["Mentorship", "Medical coverage", "Free lunch", "Conversion to full-time"],
  },
  {
    id: "c7",
    name: "PayMesh",
    logo: "PM",
    industry: "Fintech",
    size: "150–500 employees",
    location: "Kuala Lumpur",
    founded: 2017,
    website: "https://paymesh.demo",
    rating: 4.5,
    hiring: true,
    featured: false,
    tagline: "Payments infrastructure for Southeast Asia",
    about:
      "PayMesh powers digital payments for thousands of merchants. We care deeply about security, reliability, and clean engineering.",
    culture: ["Security-first", "Hybrid", "Stock options", "Impact"],
    techStack: ["TypeScript", "React.js", "Go", "PostgreSQL"],
    benefits: ["Hybrid work", "Stock options", "Medical coverage", "Annual bonus"],
  },
  {
    id: "c8",
    name: "ShopFront",
    logo: "SF",
    industry: "E-commerce",
    size: "500+ employees",
    location: "Selangor",
    founded: 2014,
    website: "https://shopfront.demo",
    rating: 4.0,
    hiring: true,
    featured: false,
    tagline: "Commerce for everyone",
    about:
      "ShopFront is a leading e-commerce platform in Malaysia. Our teams build high-traffic storefronts, logistics tooling, and seller dashboards.",
    culture: ["Scale", "Data-driven", "Fast-paced", "Hybrid"],
    techStack: ["React.js", "Node.js", "Redis", "AWS"],
    benefits: ["Hybrid work", "Staff discount", "Medical coverage", "Performance bonus"],
  },
  {
    id: "c9",
    name: "MediCare Digital",
    logo: "MD",
    industry: "Healthtech",
    size: "50–150 employees",
    location: "Kuala Lumpur",
    founded: 2019,
    website: "https://medicare.demo",
    rating: 4.6,
    hiring: false,
    featured: false,
    tagline: "Technology for better healthcare",
    about:
      "MediCare Digital builds patient-facing apps and clinic management systems. We blend healthcare domain knowledge with modern engineering.",
    culture: ["Mission-driven", "Hybrid", "Wellness", "Learning budget"],
    techStack: ["React.js", "TypeScript", "Node.js", "MongoDB"],
    benefits: ["Hybrid work", "Wellness program", "Learning budget", "Medical coverage"],
  },
  {
    id: "c10",
    name: "DataForge",
    logo: "DF",
    industry: "Analytics & Consulting",
    size: "20–50 employees",
    location: "Remote",
    founded: 2020,
    website: "https://dataforge.demo",
    rating: 4.3,
    hiring: true,
    featured: false,
    tagline: "Data engineering, simplified",
    about:
      "DataForge helps companies build robust data pipelines and warehouses. Remote-first with a strong async culture and deep technical mentorship.",
    culture: ["Remote-first", "Async", "Mentorship", "Ownership"],
    techStack: ["Python", "SQL", "Airflow", "BigQuery"],
    benefits: ["Fully remote", "Flexible hours", "Learning stipend", "Equipment provided"],
  },
  {
    id: "c11",
    name: "BrightApps",
    logo: "BA",
    industry: "Software & Technology",
    size: "20–50 employees",
    location: "Johor Bahru",
    founded: 2021,
    website: "https://brightapps.demo",
    rating: 4.1,
    hiring: true,
    featured: false,
    tagline: "Mobile-first product studio",
    about:
      "BrightApps builds delightful mobile and web experiences for clients across the region. Great exposure to the full product lifecycle.",
    culture: ["Product-focused", "Hybrid", "Creative", "Mentorship"],
    techStack: ["React Native", "React.js", "Firebase", "TypeScript"],
    benefits: ["Hybrid work", "Flexible hours", "Learning budget", "Conversion opportunity"],
  },
  {
    id: "c12",
    name: "Orbit Security",
    logo: "OS",
    industry: "Cloud & Infrastructure",
    size: "50–150 employees",
    location: "Kuala Lumpur",
    founded: 2018,
    website: "https://orbitsec.demo",
    rating: 4.4,
    hiring: true,
    featured: false,
    tagline: "Securing the cloud-native world",
    about:
      "Orbit Security helps companies secure their cloud infrastructure. We work on monitoring, threat detection, and secure-by-default tooling.",
    culture: ["Security-first", "On-site", "Certifications", "Mentorship"],
    techStack: ["Go", "Python", "Kubernetes", "AWS"],
    benefits: ["Certification budget", "Medical coverage", "Hybrid work", "Performance bonus"],
  },
];

export const companies = [...baseCompanies, ...generateExtraCompanies(13, 10)].map((company) => ({
  ...company,
  profileImageUrl: getCompanyProfileImage(company.name),
}));

/** Jobs posted by a given company (matched by company name). */
export function getCompanyJobs(companyName) {
  return jobs.filter((j) => j.company === companyName);
}

/** Look up a single company by id. */
export function getCompanyById(id) {
  return companies.find((c) => c.id === id);
}

/** Look up a company by exact name (for job → company cross-links). */
export function getCompanyByName(name) {
  return companies.find((c) => c.name === name);
}
