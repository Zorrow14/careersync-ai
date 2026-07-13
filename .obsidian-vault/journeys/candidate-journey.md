---
type: journey
status: active
updated: 2026-07-13
tags: [journey, candidate, product]
sources:
  - client/src/App.jsx
  - client/src/pages/candidate/
---

# Candidate journey

## Current flow

`Landing -> candidate demo login -> Dashboard -> Jobs / Companies / Feed -> Job Details -> Apply -> Applications -> Analyzer -> Results -> Roadmap -> Coach / Mock Interview -> Profile`

Dashboard shows a persona profile, explainable employability dimensions, work traits, recommended jobs, and progress. Jobs are searchable and filterable by work mode, type, and match score. Companies cross-link to jobs and company updates. Applications show stage counts, match score, notes, and a progress track.

Analyzer, Results, Roadmap, Coach, and Mock Interview form the preparation loop. Profile supports a living portfolio and local edits. Persona switching changes the candidate data set.

## Gaps

- New applications and saved jobs are not a durable shared state and can reset on refresh or route lifecycle.
- The analyzer/results contract is demo-oriented; there is no server persistence or real resume/JD extraction in the active client.
- Feed follow and similar actions are visually present but are not a complete social graph.
- The route is rich, so judges can miss the core loop without a guided path.

## Recommended improvements

Make the core state visibly shared across Jobs, Applications, Dashboard, and Results; add a compact “next best action” rail; and preserve the current story while making success states more obvious. See [[features/job-discovery]], [[features/ai-career-tools]], and [[roadmap]].
