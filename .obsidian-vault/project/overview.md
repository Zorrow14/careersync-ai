---
type: project
status: active
updated: 2026-07-13
tags: [project, overview, hackathon]
sources:
  - README.md
  - client/src/App.jsx
---

# CareerSync AI overview

CareerSync AI is a three-sided Career OS prototype for the Talentbank Tech Hackathon 2026. It helps candidates understand readiness and job fit, employers discover and screen talent, and universities inspect cohort employability.

## Hackathon positioning

The strongest story is an explainable employability loop: profile signals become a match score, visible skill gaps, a roadmap, interview practice, and employer fit evidence. The product is designed to be judge-friendly rather than production-complete.

## Current strengths

- One-click entry for candidate, employer, and university roles.
- Rich, coherent mock data across dashboards, jobs, companies, applications, pipeline, and cohort views.
- Explainable score language, loading states, filters, pagination, responsive navigation, light/dark mode, and persona switching.
- Cross-linked candidate and employer narratives: Sarah, Jason, and Aina have distinct profiles, scores, gaps, roadmaps, interviews, and fit reports.

## Current risks

- The active frontend uses local mock data and localStorage; it is not a shared multi-user product.
- Applying, saving, following, shortlist, and pipeline edits are primarily in-memory page interactions, so a refresh can reset them.
- External avatar/image URLs can fail or vary by network; UI fallback exists but image availability is demo-dependent.
- The Express/Mongo/auth/AI server is scaffolded but not connected to the demo client.

## High-level map

`Landing -> demo role entry -> protected role portal -> feature pages -> local data/mock AI -> visible insight or action`

See [[project/tech-stack]], [[project/repository-map]], [[product/demo-narrative]], and [[roadmap]].
