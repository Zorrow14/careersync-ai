---
type: architecture
status: active
updated: 2026-07-13
tags: [project, architecture, repository]
sources:
  - client/src/App.jsx
  - client/src/components/layout/navConfig.js
---

# Repository map

## Client

- `client/src/App.jsx` - all public, candidate, employer, and university route wiring.
- `client/src/pages/public/` and `client/src/pages/auth/` - landing and demo-mode entry screens.
- `client/src/pages/candidate/` - dashboard, jobs, companies, applications, profile, analyzer, results, roadmap, coach, and interview.
- `client/src/pages/employer/` - dashboard, feed, jobs, applications, talent discovery, pipeline, candidate profile, analytics, and company profile.
- `client/src/pages/university/` - cohort dashboard, tracker, students, curriculum, trends, and reports.
- `client/src/components/layout/` - role-aware nav and mobile bottom navigation.
- `client/src/components/ui/` - reusable cards, avatars, pagination, progress, and controls.
- `client/src/components/employer/` and `pipeline/` - fit report and hiring workflow surfaces.
- `client/src/context/` - `AuthContext` and `PersonaContext`.
- `client/src/routes/` - `ProtectedRoute` and `RoleRoute`.
- `client/src/data/` - jobs, companies, feeds, applications, profiles, personas, scores, gaps, roadmaps, employer, and university datasets.
- `client/src/lib/` - mock AI, demo users, score progress, and local profile edits.
- `client/src/hooks/` - auth and pagination helpers.

## Server scaffold

- `server/src/app.js` - Express middleware and `/api`, `/api/auth`, and `/api/profile` mounting.
- `server/src/routes/` - health, auth, and token-protected profile routes.
- `server/src/controllers/`, `models/`, `services/`, and `prompts/` - future integration seams.

## Important boundaries

The current product path is client-only. `client/src/lib/mock-ai.js` is the sole AI boundary, `PersonaContext` supplies candidate-specific state, and `ProfileAvatar` handles failed remote images with initials fallback. See [[features/ai-career-tools]], [[features/company-profiles]], and [[decisions/README]].
