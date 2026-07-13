---
type: journey
status: active
updated: 2026-07-13
tags: [journey, employer, product]
sources:
  - client/src/App.jsx
  - client/src/pages/employer/
---

# Employer journey

## Current flow

`Landing -> employer demo login -> Dashboard -> Talent Discovery -> candidate profile / Fit Report -> Applications -> Pipeline -> Analytics`

Talent Discovery searches, filters, sorts, and ranks local candidates. Fit Report presents strengths, risks, dimension breakdown, and a recommendation. Candidate profiles unify talent/pipeline records with persona data where available. Pipeline offers board/list views, counts, stage movement, a funnel, stage stepper, and fit report panel. Employer Jobs, Feed, Profile, Applications, and Analytics provide surrounding portal context.

## Gaps

- Pipeline movement is in-memory and is not shared with a backend or other recruiter session.
- Shortlist and some employer actions are presentation-level rather than durable workflow.
- The fit report is generated from local persona reports or a generic local builder, not live candidate evidence.
- The employer story can become a dashboard tour unless one candidate is followed end-to-end.

## Recommended improvements

Use one named candidate as the demo anchor, show a single fit reason, then move that candidate through two stages and finish with the analytics consequence. See [[features/employer-pipeline]], [[features/applications]], and [[roadmap]].
