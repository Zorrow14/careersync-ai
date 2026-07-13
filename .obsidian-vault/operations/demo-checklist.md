---
type: operations
status: active
updated: 2026-07-13
tags: [operations, demo, checklist]
sources:
  - README.md
  - client/src/context/AuthContext.jsx
  - client/src/context/PersonaContext.jsx
---

# Demo checklist

## Before the demo

- Confirm the live URL or run the client with `npm run dev:client`.
- Prefer a stable browser window and test the landing page plus one role entry.
- Check that remote avatars and company images render; initials fallback should still be acceptable.
- Use `?demo=candidate`, `?demo=employer`, or `?demo=university` for direct entry.
- Candidate path: Dashboard -> Jobs -> a company/job -> Apply -> Applications -> Analyzer -> Results -> Roadmap.
- Employer path: Dashboard -> Talent -> Fit Report -> Pipeline stage move -> Analytics.
- If time permits, show University Dashboard -> Reports.

## Recovery and reset

- Use the navbar logout and re-enter a role if the current session is confusing.
- To reset demo auth, remove `careersync_demo_session` from browser localStorage.
- To reset selected candidate, remove `careersync_persona`.
- To reset theme, remove `theme`.
- To reset locally edited profiles, remove the profile-edit storage key used by `client/src/lib/profileEdits.js`.
- Refresh after reset and use the role deep link again.

Do not claim that reset creates server state; it only clears browser state. See [[product/demo-narrative]] and [[project/overview]].
