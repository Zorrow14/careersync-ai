---
type: decisions
status: active
updated: 2026-07-13
tags: [decisions, product, architecture]
---

# Decision log

## Format

For each decision record: **Date**, **Decision**, **Context**, **Choice**, **Consequence**, and **Revisit signal**. Link the decision from affected feature and journey pages. Separate current decisions from recommendations.

## Initial decisions

### 2026-07-13 - Demo-first, no-backend scope

- **Context:** The hackathon needs a reliable, judge-friendly walkthrough.
- **Choice:** Keep the active client browser-only with local mock data, localStorage demo auth, and simulated AI. Treat the server as an optional scaffold.
- **Consequence:** No credentials, database, API keys, or deployment dependency are needed for the main demo; state is not multi-user or durable.
- **Revisit signal:** A post-hackathon requirement for real users, shared state, or live model evidence.

### 2026-07-13 - Shared demo state is the highest-value next improvement

- **Context:** Jobs, applications, profile edits, and pipeline actions can appear disconnected because each feature owns local state or uses separate mock datasets.
- **Choice:** Before production infrastructure, create a small shared demo store so one visible action changes the next screen.
- **Consequence:** The demo gains causality and credibility without changing the backend strategy.
- **Revisit signal:** When the end-to-end candidate-to-employer flow is coherent.

### 2026-07-13 - Local image fallback strategy

- **Context:** Personas and companies use remote image URLs that can fail in a live judging environment.
- **Choice:** Keep recognizable remote images for polish, generate company initials SVGs, and fall back to initials through `ProfileAvatar`; allow local uploaded profile images in localStorage.
- **Consequence:** Broken images do not break the story, while the visual experience remains varied.
- **Revisit signal:** If offline reliability becomes a judging requirement, add committed assets rather than changing application behavior ad hoc.
