---
type: feature
status: active
updated: 2026-07-13
tags: [feature, ai, candidate, university]
sources:
  - client/src/lib/mock-ai.js
  - client/src/pages/candidate/Analyzer.jsx
  - client/src/pages/candidate/Roadmap.jsx
  - client/src/pages/candidate/Chatbot.jsx
  - client/src/pages/candidate/MockInterview.jsx
---

# AI career tools

The candidate AI surface includes JD Analyzer and Results, skill-gap analysis, Roadmap, AI Coach, and Mock Interview. The university Reports page also uses generated cohort insights. Employer Fit Report uses the same local AI boundary.

`client/src/lib/mock-ai.js` is the active seam. It adds realistic delays and returns local persona data for resume analysis, gaps, roadmaps, coach replies, interview questions/feedback, employer fit, and university insights. This gives the demo a convincing interaction rhythm without API keys. It is not evidence of live model inference, uploaded resume parsing, or persistent AI history.
