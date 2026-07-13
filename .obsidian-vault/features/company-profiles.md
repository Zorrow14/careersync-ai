---
type: feature
status: active
updated: 2026-07-13
tags: [feature, companies, candidate, employer]
sources:
  - client/src/data/companiesData.js
  - client/src/pages/candidate/Companies.jsx
  - client/src/pages/candidate/CompanyDetails.jsx
  - client/src/data/profileImages.js
---

# Company profiles

The company directory uses a shared company dataset cross-linked to jobs by exact company name. Directory and details surfaces show industry, size, location, founded year, rating, hiring status, tagline, about text, tech stack, culture, benefits, website, company updates, open roles, and persona-relative job match.

Company images use initials SVGs from DiceBear, while candidate images use named Unsplash URLs or seeded Pravatar URLs. `ProfileAvatar` switches to initials when an image fails. Candidate and employer profile edit screens can store uploaded image data locally. These choices are useful demo fallbacks but depend on remote image availability unless a user has uploaded a local image. See [[decisions/README]].
