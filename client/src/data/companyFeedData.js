/**
 * Company post feed — shared by employer portal (single company)
 * and candidate portal (aggregated multi-company feed).
 */

export const postTypeMeta = {
  announcement: { label: "announcement" },
  culture: { label: "culture" },
  event: { label: "event" },
  milestone: { label: "milestone" },
};

export const allCompanyPosts = [
  {
    id: "post-tn-1",
    companyId: "c1",
    companyName: "TechNova Solutions",
    companyLogo: "TN",
    type: "announcement",
    author: "TechNova HR",
    avatar: "HR",
    date: "2 hours ago",
    title: "We're Hiring! Frontend Developer Internship",
    content:
      "Excited to announce our Q3 internship program is now open! We're looking for passionate frontend developers who love React and modern UI development. Apply through CareerSync AI for instant skill matching.",
    likes: 24,
    comments: 8,
    tags: ["hiring", "internship", "react"],
    jobId: "j1",
  },
  {
    id: "post-iw-1",
    companyId: "c2",
    companyName: "InsightWorks Analytics",
    companyLogo: "IW",
    type: "announcement",
    author: "InsightWorks Talent",
    avatar: "IT",
    date: "5 hours ago",
    title: "Junior Data Analyst — Now Accepting Applications",
    content:
      "Our analytics team is growing! We're hiring Junior Data Analysts who are comfortable with Python, SQL, and dashboard storytelling. Remote-friendly with quarterly team meetups in Penang.",
    likes: 31,
    comments: 11,
    tags: ["hiring", "data", "python"],
    jobId: "j2",
  },
  {
    id: "post-tn-2",
    companyId: "c1",
    companyName: "TechNova Solutions",
    companyLogo: "TN",
    type: "culture",
    author: "Wen Qi, Engineering Lead",
    avatar: "WQ",
    date: "1 day ago",
    title: "Tech Talk Tuesday: Our Migration to TypeScript",
    content:
      "Last week our team completed the migration of 40k+ lines to TypeScript. Here's what we learned about gradual adoption, type safety wins, and the mistakes we made along the way.",
    likes: 56,
    comments: 12,
    tags: ["engineering", "typescript", "culture"],
  },
  {
    id: "post-sb-1",
    companyId: "c3",
    companyName: "StackBridge Solutions",
    companyLogo: "SB",
    type: "culture",
    author: "Priya, Full Stack Lead",
    avatar: "PR",
    date: "1 day ago",
    title: "How We Ship Features in a Remote-First Studio",
    content:
      "Async standups, RFC docs, and demo Fridays — a peek into how StackBridge keeps velocity high while staying fully remote across Malaysia and Singapore.",
    likes: 42,
    comments: 7,
    tags: ["remote", "culture", "fullstack"],
  },
  {
    id: "post-na-1",
    companyId: "c5",
    companyName: "Nexus AI Labs",
    companyLogo: "NA",
    type: "announcement",
    author: "Nexus AI Recruiting",
    avatar: "NR",
    date: "2 days ago",
    title: "ML Engineer Intern — Summer Cohort Open",
    content:
      "Join our applied ML team to work on real production pipelines. You'll pair with senior researchers, get GPU lab access, and present findings at our monthly research review.",
    likes: 67,
    comments: 19,
    tags: ["hiring", "ml", "internship"],
    jobId: "j5",
  },
  {
    id: "post-tn-3",
    companyId: "c1",
    companyName: "TechNova Solutions",
    companyLogo: "TN",
    type: "event",
    author: "TechNova Events",
    avatar: "TE",
    date: "3 days ago",
    title: "Hackathon Results: Team Phoenix Wins!",
    content:
      "Congratulations to Team Phoenix for winning our internal hackathon with an AI-powered code review tool! 12 teams participated over 48 hours. Interns and new grads led three of the top five teams.",
    likes: 89,
    comments: 23,
    tags: ["hackathon", "innovation", "team"],
  },
  {
    id: "post-pc-1",
    companyId: "c4",
    companyName: "Pixel & Co",
    companyLogo: "PC",
    type: "culture",
    author: "Lina, Design Director",
    avatar: "LN",
    date: "4 days ago",
    title: "Inside Our Design System: From Figma to Production",
    content:
      "We open-sourced part of our component library this quarter. Here's how designers and engineers collaborate on tokens, accessibility, and Storybook workflows.",
    likes: 38,
    comments: 9,
    tags: ["design", "storybook", "culture"],
  },
  {
    id: "post-pm-1",
    companyId: "c7",
    companyName: "PayMesh",
    companyLogo: "PM",
    type: "milestone",
    author: "PayMesh Leadership",
    avatar: "PL",
    date: "5 days ago",
    title: "10 Million Transactions Processed This Quarter",
    content:
      "A huge milestone for our payments platform — 10M transactions with 99.97% uptime. Thank you to every engineer who contributed to reliability, observability, and fraud detection improvements.",
    likes: 94,
    comments: 28,
    tags: ["fintech", "milestone", "engineering"],
  },
  {
    id: "post-tn-4",
    companyId: "c1",
    companyName: "TechNova Solutions",
    companyLogo: "TN",
    type: "milestone",
    author: "TechNova CEO",
    avatar: "CEO",
    date: "1 week ago",
    title: "Series B Funding Announcement",
    content:
      "We're thrilled to announce our RM 45M Series B round led by Vertex Ventures. This funding will accelerate our expansion into Southeast Asian markets and grow our engineering team by 40%.",
    likes: 142,
    comments: 34,
    tags: ["funding", "growth", "milestone"],
  },
  {
    id: "post-iw-2",
    companyId: "c2",
    companyName: "InsightWorks Analytics",
    companyLogo: "IW",
    type: "event",
    author: "InsightWorks Academy",
    avatar: "IA",
    date: "1 week ago",
    title: "Free Data Viz Workshop for Students",
    content:
      "We're hosting a half-day Tableau + SQL workshop for university students on July 12. Limited seats — register through CareerSync AI to reserve your spot and get a certificate of completion.",
    likes: 51,
    comments: 15,
    tags: ["event", "workshop", "students"],
  },
  {
    id: "post-tn-5",
    companyId: "c1",
    companyName: "TechNova Solutions",
    companyLogo: "TN",
    type: "culture",
    author: "Amir, DevOps Engineer",
    avatar: "AM",
    date: "1 week ago",
    title: "A Day in the Life of a TechNova DevOps Engineer",
    content:
      "From morning standup to deploying 15 microservices — here's what my typical day looks like. Spoiler: lots of Docker, Kubernetes, and surprisingly good office coffee.",
    likes: 37,
    comments: 9,
    tags: ["devops", "culture", "dayinlife"],
  },
  {
    id: "post-sb-2",
    companyId: "c3",
    companyName: "StackBridge Solutions",
    companyLogo: "SB",
    type: "milestone",
    author: "StackBridge Team",
    avatar: "SB",
    date: "1 week ago",
    title: "We Just Hit 50 Production Deployments This Year",
    content:
      "Fifty client projects shipped in 2026 so far — our intern cohort contributed to 8 of them. Proud of how much ownership we give early-career engineers here.",
    likes: 29,
    comments: 6,
    tags: ["milestone", "internship", "shipping"],
  },
  {
    id: "post-na-2",
    companyId: "c5",
    companyName: "Nexus AI Labs",
    companyLogo: "NA",
    type: "culture",
    author: "Dr. Chen, Research Lead",
    avatar: "DC",
    date: "2 weeks ago",
    title: "Publishing Our First Open-Source NLP Toolkit",
    content:
      "Nexus NLP Kit is live on GitHub — lightweight utilities for Southeast Asian language preprocessing. Interns who contributed are credited as co-authors on the release notes.",
    likes: 73,
    comments: 21,
    tags: ["opensource", "nlp", "research"],
  },
  {
    id: "post-cn-1",
    companyId: "c6",
    companyName: "CloudNine Tech",
    companyLogo: "CN",
    type: "announcement",
    author: "CloudNine HR",
    avatar: "CH",
    date: "2 weeks ago",
    title: "Backend Engineer Intern — Cyberjaya Office",
    content:
      "Looking for backend interns excited about APIs, PostgreSQL, and Docker. You'll work on real client infrastructure projects with weekly architecture reviews.",
    likes: 22,
    comments: 5,
    tags: ["hiring", "backend", "internship"],
    jobId: "j6",
  },
];

const FEED_STORAGE_KEY = "careersync.company-feed-posts";

function clonePost(post) {
  return {
    ...post,
    tags: [...(post.tags || [])],
  };
}

function clonePosts(posts) {
  return posts.map(clonePost);
}

function readFeedStorage() {
  if (typeof window === "undefined") {
    return clonePosts(allCompanyPosts);
  }

  try {
    const raw = window.localStorage.getItem(FEED_STORAGE_KEY);
    if (!raw) return clonePosts(allCompanyPosts);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return clonePosts(allCompanyPosts);
    return clonePosts(parsed);
  } catch {
    return clonePosts(allCompanyPosts);
  }
}

export function saveCompanyFeed(posts) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(posts));
}

export function getAllCompanyPosts(posts) {
  return clonePosts(posts || readFeedStorage());
}

export function createCompanyPost({
  companyId,
  companyName,
  companyLogo,
  type,
  author,
  avatar,
  title,
  content,
  tags,
  jobId,
}) {
  return {
    id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    companyId,
    companyName,
    companyLogo,
    type,
    author,
    avatar,
    date: "Just now",
    title,
    content,
    likes: 0,
    comments: 0,
    tags,
    jobId,
  };
}

export function getCompanyFeedById(companyId, posts) {
  return getAllCompanyPosts(posts).filter((p) => p.companyId === companyId);
}

export function getCompanyFeedByName(companyName, posts) {
  return getAllCompanyPosts(posts).filter((p) => p.companyName === companyName);
}

export function getFeedCompanies(posts) {
  const source = getAllCompanyPosts(posts);
  const seen = new Map();
  for (const post of source) {
    if (!seen.has(post.companyId)) {
      seen.set(post.companyId, {
        id: post.companyId,
        name: post.companyName,
        logo: post.companyLogo,
      });
    }
  }
  return Array.from(seen.values());
}

export function getTrendingTags(postsOrLimit = undefined, limit = 10) {
  const posts = Array.isArray(postsOrLimit) ? postsOrLimit : getAllCompanyPosts();
  const max = Array.isArray(postsOrLimit) ? limit : postsOrLimit ?? limit;
  const counts = {};
  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([tag]) => tag);
}
