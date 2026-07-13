---
type: feature
status: active
updated: 2026-07-13
tags: [feature, employer, pipeline, ai]
sources:
  - client/src/pages/employer/Pipeline.jsx
  - client/src/data/employerData.js
  - client/src/components/employer/FitReportPanel.jsx
---

# Employer pipeline

The employer pipeline uses local candidates across `Applied`, `Screening`, `Interview`, `Offer`, `Hired`, and `Rejected`. It provides board/list views, stage counts, a funnel, candidate selection, stage stepper, fit score bars, reassembly by stage and score, stage movement, and a link to the full candidate profile.

Selecting a candidate opens an explainable fit report. Persona-linked candidates receive local fit report data; others use a generic report builder. Movement and reassembly are visible interactions held in component state, not persisted workflow.
