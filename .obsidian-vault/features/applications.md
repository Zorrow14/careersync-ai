---
type: feature
status: active
updated: 2026-07-13
tags: [feature, applications, candidate, employer]
sources:
  - client/src/pages/candidate/Applications.jsx
  - client/src/data/applicationsData.js
  - client/src/pages/employer/Applications.jsx
---

# Applications

Candidate Applications is a persona-scoped tracker with stage summary cards, filters, pagination, company avatars, dates, match scores, notes, and a visual progression from Applied through Offer or Rejected.

Employer Applications is a separate recruiter-facing view over local employer application data, with candidate identity, role, fit, dates, and workflow context. The two sides communicate the marketplace concept, but they are not currently connected by a shared durable application store. The largest product opportunity is shared demo state; see [[decisions/README]] and [[roadmap]].
