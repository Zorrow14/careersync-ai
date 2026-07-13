---
type: roadmap
status: active
updated: 2026-07-13
tags: [roadmap, hackathon, product]
---

# Hackathon roadmap

| Priority | Improvement | Impact | Effort | Rationale | Acceptance signal |
| --- | --- | --- | --- | --- | --- |
| P0 | Shared demo state for apply, save, profile, and pipeline actions | High | Medium | Makes the story causal across screens without backend work | Apply on Jobs appears in Applications; profile edit affects score/profile; pipeline movement survives navigation |
| P0 | Guided judge path and visible next action | High | Low | Prevents feature-tour drift | A new judge can complete the candidate loop in under five minutes |
| P0 | Offline-safe image fixtures or deterministic fallback check | High | Low | Remote images are a demo reliability risk | No broken avatar or company logo on a disconnected run |
| P1 | Stronger analyzer input/result handoff | High | Medium | Makes “paste JD -> insight -> roadmap” feel like one product loop | Entered JD label appears in Results and Roadmap context |
| P1 | One employer anchor candidate across discovery, fit, pipeline, and analytics | High | Low | Gives judges a memorable recruiting narrative | Same candidate name, score, stage, and outcome are visible end-to-end |
| P1 | University story pass with one intervention outcome | Medium | Low | Completes the three-sided marketplace narrative | Dashboard insight links to a tracker or curriculum action |
| P2 | Interaction polish: toast language, empty states, keyboard focus, reset affordance | Medium | Low | Visible quality matters at hackathon scale | Every major demo action has clear success, failure, and reset feedback |
| P2 | Live backend and model integration | Medium after demo | High | Valuable only after the prototype story is coherent | Explicit API contract and one end-to-end persisted flow |

Prioritize demo clarity, visible interactions, and polish over production auth, database, billing, or infrastructure. See [[decisions/README]], [[product/demo-narrative]], and [[operations/demo-checklist]].
