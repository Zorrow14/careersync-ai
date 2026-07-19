/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { applications as seededApplications, savedJobs as seededSavedJobs } from "../data/applicationsData.js";
import { employerJobs as seededEmployerJobs, pipelineCandidates as seededPipeline } from "../data/employerData.js";
import { personas } from "../data/personas.js";

const DemoWorkflowContext = createContext(null);
const STORAGE_KEY = "careersync_demo_workflow_v1";
const DEMO_DATE = "Jul 19, 2026";

const employerJobToCandidateJobId = { job1: "j1" };
const candidateJobToEmployerJobId = Object.fromEntries(
  Object.entries(employerJobToCandidateJobId).map(([employerId, candidateId]) => [candidateId, employerId])
);

const stageToStatus = {
  Applied: "Applied",
  Screening: "Resume Reviewed",
  Interview: "Interview",
  Offer: "Offer",
  Hired: "Offer",
  Rejected: "Rejected",
};

const statusFeedback = {
  Applied: "Your application was received by TechNova. Their hiring team can now review your evidence.",
  Screening: "Your profile is being reviewed. Prepare a short walkthrough of your strongest project.",
  Interview: "Great news — the employer wants to meet you. Review your project decisions and role requirements.",
  Offer: "You have an offer. Review the details and prepare any questions before responding.",
  Hired: "You have been selected. The employer will share onboarding details next.",
  Rejected: "This role was not the right fit today. Your fastest improvement is still visible in your roadmap.",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function createDemoState() {
  const candidateApplications = clone(seededApplications);
  candidateApplications.sarah = candidateApplications.sarah.filter((application) => application.jobId !== "j1");

  return {
    candidateApplications,
    savedJobs: clone(seededSavedJobs),
    employerJobs: clone(seededEmployerJobs),
    pipelineCandidates: clone(seededPipeline).filter((candidate) => candidate.name !== "Sarah Tan"),
  };
}

function readStoredState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return createDemoState();
    const parsed = JSON.parse(stored);
    if (
      !parsed ||
      !parsed.candidateApplications ||
      !parsed.savedJobs ||
      !parsed.employerJobs ||
      !parsed.pipelineCandidates
    ) {
      return createDemoState();
    }
    return parsed;
  } catch {
    return createDemoState();
  }
}

function candidateForPersona(personaId) {
  return personas.find((persona) => persona.id === personaId);
}

function employerStageForStatus(status) {
  return Object.entries(stageToStatus).find(([, candidateStatus]) => candidateStatus === status)?.[0] ?? "Applied";
}

function buildEmployerApplications(state) {
  const results = [];
  const seen = new Set();
  const techNovaJobs = new Set(
    state.employerJobs
      .filter((job) => job.company === "TechNova Solutions")
      .map((job) => employerJobToCandidateJobId[job.id])
      .filter(Boolean)
  );

  Object.entries(state.candidateApplications).forEach(([personaId, apps]) => {
    const persona = candidateForPersona(personaId);
    if (!persona) return;

    apps.forEach((application) => {
      if (application.company !== "TechNova Solutions" && !techNovaJobs.has(application.jobId)) return;

      const pipeline = state.pipelineCandidates.find(
        (candidate) => candidate.applicationId === application.id
      );
      const key = `${personaId}:${application.id}`;
      seen.add(key);
      results.push({
        id: `app-${personaId}-${application.id}`,
        applicationId: application.id,
        personaId,
        pipelineId: pipeline?.id ?? null,
        candidateId: pipeline?.id ?? personaId,
        candidateName: persona.name,
        avatar: persona.avatar,
        photoUrl: persona.photoUrl,
        university: persona.institution,
        degree: persona.degree,
        role: application.role,
        jobId: application.jobId,
        employerJobId: candidateJobToEmployerJobId[application.jobId] ?? null,
        company: application.company,
        matchScore: application.matchScore,
        candidateStatus: application.status,
        employerStage: pipeline?.stage ?? employerStageForStatus(application.status),
        appliedDate: application.appliedDate,
        notes: application.notes,
        source: "CareerSync AI",
        origin: "candidate",
      });
    });
  });

  state.pipelineCandidates.forEach((candidate) => {
    if (candidate.applicationId) return;
    const persona = personas.find((item) => item.name === candidate.name);
    const key = persona ? `${persona.id}:${candidate.role}` : `pipeline:${candidate.id}`;
    if (seen.has(key)) return;
    const employerJob = state.employerJobs.find(
      (job) => job.company === "TechNova Solutions" && job.title === candidate.role
    );
    results.push({
      id: `pipeline-${candidate.id}`,
      applicationId: candidate.id,
      personaId: persona?.id ?? null,
      pipelineId: candidate.id,
      candidateId: candidate.id,
      candidateName: candidate.name,
      avatar: candidate.avatar,
      photoUrl: candidate.photoUrl ?? persona?.photoUrl ?? null,
      university: persona?.institution ?? "—",
      degree: persona?.degree ?? "—",
      role: candidate.role,
      jobId: employerJob ? employerJobToCandidateJobId[employerJob.id] : null,
      employerJobId: employerJob?.id ?? null,
      company: "TechNova Solutions",
      matchScore: candidate.fitScore,
      candidateStatus: stageToStatus[candidate.stage] ?? "Applied",
      employerStage: candidate.stage,
      appliedDate: candidate.appliedDate,
      notes: "",
      source: candidate.source,
      origin: "pipeline",
    });
  });

  return results.sort((a, b) => Date.parse(b.appliedDate) - Date.parse(a.appliedDate));
}

export function DemoWorkflowProvider({ children }) {
  const [state, setState] = useState(readStoredState);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // The workflow remains usable for this session if storage is unavailable.
    }
  }, [state]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const employerApplications = useMemo(() => buildEmployerApplications(state), [state]);
  const employerStats = useMemo(() => {
    const byStage = {};
    employerApplications.forEach((application) => {
      byStage[application.employerStage] = (byStage[application.employerStage] || 0) + 1;
    });
    return { total: employerApplications.length, byStage };
  }, [employerApplications]);

  function applyToJob({ personaId, job, match, coverLetter = "" }) {
    const existing = state.candidateApplications[personaId]?.find((application) => application.jobId === job.id);
    if (existing) {
      setNotice({ type: "info", message: `This application is already in your tracker.` });
      return false;
    }

    const application = {
      id: `demo-${personaId}-${job.id}`,
      jobId: job.id,
      company: job.company,
      logo: job.logo,
      role: job.title,
      matchScore: match.score,
      status: "Applied",
      appliedDate: DEMO_DATE,
      notes: coverLetter
        ? "Application submitted with a tailored note. Employer review is next."
        : statusFeedback.Applied,
    };
    const persona = candidateForPersona(personaId);
    const isTechNova = job.company === "TechNova Solutions" || job.id === "j1";

    setState((current) => ({
      ...current,
      candidateApplications: {
        ...current.candidateApplications,
        [personaId]: [application, ...(current.candidateApplications[personaId] ?? [])],
      },
      pipelineCandidates: isTechNova
        ? [
            {
              id: `pipeline-${application.id}`,
              applicationId: application.id,
              personaId,
              name: persona.name,
              role: job.title,
              stage: "Applied",
              fitScore: match.score,
              appliedDate: DEMO_DATE,
              avatar: persona.avatar,
              photoUrl: persona.photoUrl,
              source: "CareerSync AI",
            },
            ...current.pipelineCandidates,
          ]
        : current.pipelineCandidates,
    }));
    setNotice({
      type: "success",
      message: isTechNova
        ? "Application submitted. It is now in TechNova's inbox and hiring pipeline."
        : "Application submitted and added to your tracker.",
    });
    return true;
  }

  function toggleSavedJob(personaId, jobId) {
    setState((current) => {
      const saved = new Set(current.savedJobs[personaId] ?? []);
      saved.has(jobId) ? saved.delete(jobId) : saved.add(jobId);
      return { ...current, savedJobs: { ...current.savedJobs, [personaId]: [...saved] } };
    });
  }

  function movePipelineCandidate(candidateId, stage) {
    const candidate = state.pipelineCandidates.find((item) => item.id === candidateId);
    if (!candidate || candidate.stage === stage) return;
    const candidateStatus = stageToStatus[stage] ?? "Applied";

    setState((current) => ({
      ...current,
      pipelineCandidates: current.pipelineCandidates.map((item) =>
        item.id === candidateId ? { ...item, stage } : item
      ),
      candidateApplications: candidate.applicationId && candidate.personaId
        ? {
            ...current.candidateApplications,
            [candidate.personaId]: (current.candidateApplications[candidate.personaId] ?? []).map(
              (application) =>
                application.id === candidate.applicationId
                  ? {
                      ...application,
                      status: candidateStatus,
                      notes: statusFeedback[stage] ?? statusFeedback.Applied,
                    }
                  : application
            ),
          }
        : current.candidateApplications,
    }));
    setNotice({
      type: "success",
      message: `${candidate.name} moved to ${stage}. Their candidate tracker has been updated.`,
    });
  }

  function reassemblePipeline() {
    setState((current) => ({
      ...current,
      pipelineCandidates: [...current.pipelineCandidates].sort((a, b) => {
        const stages = ["Applied", "Screening", "Interview", "Offer", "Hired", "Rejected"];
        const stageOrder = stages.indexOf(a.stage) - stages.indexOf(b.stage);
        return stageOrder || b.fitScore - a.fitScore;
      }),
    }));
    setNotice({ type: "success", message: "Pipeline sorted by stage and explainable fit score." });
  }

  function publishJob(draft) {
    const id = `demo-job-${state.employerJobs.length + 1}`;
    const job = {
      id,
      company: "TechNova Solutions",
      status: "Active",
      postedDate: DEMO_DATE,
      applications: 0,
      requiredSkills: draft.requiredSkills,
      preferredSkills: [],
      ...draft,
    };
    setState((current) => ({ ...current, employerJobs: [job, ...current.employerJobs] }));
    setNotice({ type: "success", message: `${job.title} is published locally for this demo session.` });
  }

  function loadDemoScenario() {
    setState(createDemoState());
    setNotice({
      type: "success",
      message: "Demo scenario loaded: apply to TechNova as Sarah, then advance her from the employer pipeline.",
    });
  }

  const value = {
    ...state,
    employerApplications,
    employerStats,
    notice,
    hasChanges: JSON.stringify(state) !== JSON.stringify(createDemoState()),
    applyToJob,
    toggleSavedJob,
    movePipelineCandidate,
    reassemblePipeline,
    publishJob,
    loadDemoScenario,
  };

  return <DemoWorkflowContext.Provider value={value}>{children}</DemoWorkflowContext.Provider>;
}

export function useDemoWorkflow() {
  const context = useContext(DemoWorkflowContext);
  if (!context) throw new Error("useDemoWorkflow must be used inside DemoWorkflowProvider");
  return context;
}
