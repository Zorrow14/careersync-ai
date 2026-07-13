---
type: feature
status: active
updated: 2026-07-13
tags: [feature, feed, networking, companies]
sources:
  - client/src/pages/candidate/CompanyFeed.jsx
  - client/src/pages/employer/Feed.jsx
  - client/src/data/companyFeedData.js
  - client/src/components/feed/CompanyPostCard.jsx
---

# Feeds and networking

Candidate and employer portals include company feeds. Company detail pages show a short set of company updates and link to the broader feed. Post cards use company identity and profile image helpers. The feature supports the “discover companies, not only jobs” narrative.

Current scope is curated local posts and presentation-level feed interaction. Follow and networking actions should be described as demo affordances, not as a persisted social network. A high-value polish improvement is to connect a visible follow action to a local feed filter or notification cue.
