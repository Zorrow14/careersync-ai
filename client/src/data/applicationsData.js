/**
 * Application tracker data per persona.
 * Stages: Applied → Resume Reviewed → Interview → Assessment → Offer → Rejected
 */

export const applicationStages = [
  "Applied",
  "Resume Reviewed",
  "Interview",
  "Assessment",
  "Offer",
  "Rejected",
];

export const applications = {
  sarah: [
    { id: "a1", jobId: "j1", company: "TechNova Solutions", logo: "TN", role: "Frontend Developer Intern", matchScore: 92, status: "Interview", appliedDate: "Jun 20, 2026", notes: "Technical interview scheduled for Jun 28." },
    { id: "a2", jobId: "j4", company: "Pixel & Co", logo: "PC", role: "UI Engineer", matchScore: 81, status: "Resume Reviewed", appliedDate: "Jun 18, 2026", notes: "Recruiter viewed portfolio." },
    { id: "a3", jobId: "j3", company: "StackBridge Solutions", logo: "SB", role: "Full Stack Developer Intern", matchScore: 72, status: "Applied", appliedDate: "Jun 22, 2026", notes: "" },
    { id: "a4", jobId: "j6", company: "CloudNine Tech", logo: "CN", role: "Backend Developer Intern", matchScore: 55, status: "Rejected", appliedDate: "Jun 10, 2026", notes: "Looking for stronger backend focus." },
  ],
  jason: [
    { id: "a1", jobId: "j2", company: "InsightWorks Analytics", logo: "IW", role: "Junior Data Analyst", matchScore: 86, status: "Assessment", appliedDate: "Jun 17, 2026", notes: "SQL take-home assessment due Jun 27." },
    { id: "a2", jobId: "j5", company: "Nexus AI Labs", logo: "NA", role: "ML Engineer Intern", matchScore: 79, status: "Interview", appliedDate: "Jun 19, 2026", notes: "First-round call completed." },
    { id: "a3", jobId: "j1", company: "TechNova Solutions", logo: "TN", role: "Frontend Developer Intern", matchScore: 41, status: "Rejected", appliedDate: "Jun 12, 2026", notes: "Not a frontend fit." },
  ],
  aina: [
    { id: "a1", jobId: "j3", company: "StackBridge Solutions", logo: "SB", role: "Full Stack Developer Intern", matchScore: 95, status: "Offer", appliedDate: "Jun 15, 2026", notes: "Offer received! Deadline to accept: Jul 1." },
    { id: "a2", jobId: "j6", company: "CloudNine Tech", logo: "CN", role: "Backend Developer Intern", matchScore: 93, status: "Interview", appliedDate: "Jun 18, 2026", notes: "Final round with engineering lead." },
    { id: "a3", jobId: "j1", company: "TechNova Solutions", logo: "TN", role: "Frontend Developer Intern", matchScore: 84, status: "Resume Reviewed", appliedDate: "Jun 21, 2026", notes: "" },
    { id: "a4", jobId: "j4", company: "Pixel & Co", logo: "PC", role: "UI Engineer", matchScore: 78, status: "Applied", appliedDate: "Jun 23, 2026", notes: "" },
  ],
};

export const savedJobs = {
  sarah: ["j3", "j4"],
  jason: ["j5"],
  aina: ["j1", "j4"],
};
