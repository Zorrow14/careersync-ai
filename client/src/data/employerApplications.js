import { applications, applicationStages } from "./applicationsData.js";
import { personas } from "./personas.js";
import {
  companyProfile,
  employerJobs,
  pipelineCandidates,
  pipelineStages,
  resolvePersonaId,
  talentPool,
} from "./employerData.js";

/** Maps employer job posting IDs to candidate job search IDs. */
export const employerJobToCandidateJobId = {
  job1: "j1",
};

const candidateJobToEmployerJobId = Object.fromEntries(
  Object.entries(employerJobToCandidateJobId).map(([employerId, candidateId]) => [
    candidateId,
    employerId,
  ])
);

/** Candidate application status → employer pipeline stage. */
export function mapCandidateStatusToEmployerStage(status) {
  const map = {
    Applied: "Applied",
    "Resume Reviewed": "Screening",
    Assessment: "Screening",
    Interview: "Interview",
    Offer: "Offer",
    Rejected: "Rejected",
  };
  return map[status] ?? "Applied";
}

function getEmployerJobIdsForCompany(companyName) {
  return new Set(
    employerJobs
      .filter((job) => job.company === companyName)
      .map((job) => employerJobToCandidateJobId[job.id])
      .filter(Boolean)
  );
}

function findTalentIdForPersona(personaId) {
  const talent = talentPool.find((t) => resolvePersonaId(t.name) === personaId);
  return talent?.id ?? personaId;
}

function findPipelineIdForPersona(personaId) {
  const pipeline = pipelineCandidates.find((c) => resolvePersonaId(c.name) === personaId);
  return pipeline?.id ?? null;
}

/**
 * Applications submitted by demo candidates for roles at the signed-in employer company.
 * Merges candidate-side application data with pipeline applicants for the same roles.
 */
export function getEmployerApplications(companyName = companyProfile.name) {
  const employerJobIds = getEmployerJobIdsForCompany(companyName);
  const seen = new Set();
  const results = [];

  for (const [personaId, personaApps] of Object.entries(applications)) {
    const persona = personas.find((p) => p.id === personaId);
    if (!persona) continue;

    for (const app of personaApps) {
      const isEmployerJob =
        app.company === companyName || employerJobIds.has(app.jobId);
      if (!isEmployerJob) continue;

      const key = `${personaId}:${app.jobId}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const employerJob = employerJobs.find(
        (j) => employerJobToCandidateJobId[j.id] === app.jobId && j.company === companyName
      );

      results.push({
        id: `app-${personaId}-${app.id}`,
        applicationId: app.id,
        personaId,
        candidateId: findTalentIdForPersona(personaId),
        pipelineId: findPipelineIdForPersona(personaId),
        candidateName: persona.name,
        avatar: persona.avatar,
        photoUrl: persona.photoUrl,
        university: persona.institution,
        degree: persona.degree,
        targetRole: persona.targetRole,
        jobId: app.jobId,
        employerJobId: candidateJobToEmployerJobId[app.jobId] ?? employerJob?.id ?? null,
        role: app.role,
        company: app.company,
        matchScore: app.matchScore,
        candidateStatus: app.status,
        employerStage: mapCandidateStatusToEmployerStage(app.status),
        appliedDate: app.appliedDate,
        notes: app.notes,
        source: "CareerSync AI",
        origin: "candidate",
      });
    }
  }

  const employerRoleTitles = new Set(
    employerJobs.filter((j) => j.company === companyName).map((j) => j.title)
  );

  for (const candidate of pipelineCandidates) {
    if (!employerRoleTitles.has(candidate.role)) continue;

    const personaId = resolvePersonaId(candidate.name);
    const key = personaId ? `${personaId}:pipeline-${candidate.role}` : `pipeline:${candidate.id}`;
    if (personaId && [...seen].some((k) => k.startsWith(`${personaId}:`))) continue;
    if (seen.has(key)) continue;
    seen.add(key);

    const persona = personaId ? personas.find((p) => p.id === personaId) : null;
    const employerJob = employerJobs.find(
      (j) => j.title === candidate.role && j.company === companyName
    );

    results.push({
      id: `pipeline-${candidate.id}`,
      applicationId: candidate.id,
      personaId,
      candidateId: candidate.id,
      pipelineId: candidate.id,
      candidateName: candidate.name,
      avatar: candidate.avatar,
      photoUrl: persona?.photoUrl ?? null,
      university: persona?.institution ?? "—",
      degree: persona?.degree ?? "—",
      targetRole: persona?.targetRole ?? candidate.role,
      jobId: employerJob ? employerJobToCandidateJobId[employerJob.id] : null,
      employerJobId: employerJob?.id ?? null,
      role: candidate.role,
      company: companyName,
      matchScore: candidate.fitScore,
      candidateStatus: candidate.stage === "Screening" ? "Resume Reviewed" : candidate.stage,
      employerStage: pipelineStages.includes(candidate.stage)
        ? candidate.stage
        : mapCandidateStatusToEmployerStage(candidate.stage),
      appliedDate: candidate.appliedDate,
      notes: "",
      source: candidate.source,
      origin: "pipeline",
    });
  }

  return results.sort((a, b) => parseAppliedDate(b.appliedDate) - parseAppliedDate(a.appliedDate));
}

function parseAppliedDate(dateStr) {
  const parsed = Date.parse(dateStr.replace(/,/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getEmployerApplicationRoles(companyName = companyProfile.name) {
  const apps = getEmployerApplications(companyName);
  const roles = [...new Set(apps.map((a) => a.role))];
  return roles.sort();
}

export function getEmployerApplicationStats(companyName = companyProfile.name) {
  const apps = getEmployerApplications(companyName);
  const byStage = {};
  for (const stage of pipelineStages) {
    byStage[stage] = apps.filter((a) => a.employerStage === stage).length;
  }
  return {
    total: apps.length,
    byStage,
    byRole: getEmployerApplicationRoles(companyName).reduce((acc, role) => {
      acc[role] = apps.filter((a) => a.role === role).length;
      return acc;
    }, {}),
  };
}

export { applicationStages as candidateApplicationStages };
