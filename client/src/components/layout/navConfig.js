import {
  LayoutDashboard,
  SearchCheck,
  BarChart3,
  Route,
  Bot,
  Mic,
  Building2,
  UserCircle,
  Newspaper,
  Briefcase,
  Users,
  Kanban,
  TrendingUp,
  Search,
  ClipboardList,
  GraduationCap,
  BookOpen,
  Sparkles,
} from "lucide-react";

export const candidateMainLinks = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/feed", label: "Feed", icon: Newspaper },
  { path: "/jobs", label: "Jobs", icon: Search },
  { path: "/companies", label: "Companies", icon: Building2 },
  { path: "/applications", label: "Applications", icon: ClipboardList },
  { path: "/profile", label: "Profile", icon: UserCircle },
];

export const candidateAiLinks = [
  { path: "/analyzer", label: "JD Analyzer", icon: SearchCheck },
  { path: "/results", label: "AI Results", icon: BarChart3 },
  { path: "/roadmap", label: "Roadmap", icon: Route },
  { path: "/chatbot", label: "AI Coach", icon: Bot },
  { path: "/mock-interview", label: "Mock Interview", icon: Mic },
];

export const employerLinks = [
  { path: "/employer", label: "Dashboard", icon: LayoutDashboard },
  { path: "/employer/feed", label: "Feed", icon: Newspaper },
  { path: "/employer/jobs", label: "Jobs", icon: Briefcase },
  { path: "/employer/talent", label: "Talent", icon: Users },
  { path: "/employer/pipeline", label: "Pipeline", icon: Kanban },
  { path: "/employer/analytics", label: "Analytics", icon: TrendingUp },
];

export const universityLinks = [
  { path: "/university", label: "Dashboard", icon: Building2 },
  { path: "/university/tracker", label: "Tracker", icon: GraduationCap },
  { path: "/university/students", label: "Students", icon: Users },
  { path: "/university/curriculum", label: "Curriculum", icon: BookOpen },
  { path: "/university/trends", label: "Trends", icon: TrendingUp },
  { path: "/university/reports", label: "Insights", icon: Sparkles },
];

export function isActivePath(pathname, path) {
  if (path === "/dashboard" || path === "/employer" || path === "/university") {
    return pathname === path;
  }
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function isAiToolsActive(pathname) {
  return candidateAiLinks.some((l) => isActivePath(pathname, l.path));
}
