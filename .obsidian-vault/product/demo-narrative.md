---
type: product
status: active
updated: 2026-07-13
tags: [product, demo, judging]
sources:
  - README.md
  - client/src/lib/demoUsers.js
  - client/src/lib/mock-ai.js
---

# Judge-facing demo narrative

## Recommended storyline

1. Start at Landing and frame the problem: candidates lack match clarity, employers lack explainable screening, and universities lack cohort visibility.
2. Enter as Candidate with one click. Show Dashboard and explain the score as matched dimensions, work traits, and next actions.
3. Open Jobs, filter by role/work mode/match, open a company-linked role, and submit an application. Show the success toast and tracker concept.
4. Paste or inspect a JD in Analyzer, open AI Results, then move to Roadmap. Emphasize the loop from evidence to gap to action.
5. Use AI Coach or Mock Interview to demonstrate personalized preparation and visible loading/feedback.
6. Switch Sarah to Jason or Aina to show that the same product adapts its scores, gaps, projects, and recommendations.
7. Enter as Employer. Use Talent Discovery filters, open an Explainable Fit Report, move a candidate in Pipeline, and show analytics.
8. Optionally show University Dashboard and Reports to complete the three-sided marketplace story.

## Implemented versus mocked

**Implemented in the current client:** routing, role guards, one-click demo entry, persona switching, responsive navigation, filters, pagination, modal interactions, in-memory application and pipeline interactions, profile edit persistence, theme persistence, image fallback, and page-level loading/feedback states.

**Mocked or local:** jobs, companies, applications, candidates, scores, university metrics, AI responses, interview feedback, and most generated insights. AI functions delay and return local data; they do not call external APIs.

**Scaffolded only:** the Express routes, auth/database models, file upload, and provider-specific AI services under `server/`. Do not present these as live demo dependencies.

The narrative should end on clarity and momentum, not infrastructure. See [[operations/demo-checklist]] and [[decisions/README]].
