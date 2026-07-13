---
type: feature
status: active
updated: 2026-07-13
tags: [feature, jobs, candidate]
sources:
  - client/src/pages/candidate/JobSearch.jsx
  - client/src/data/jobsData.js
  - client/src/data/companiesData.js
---

# Job discovery

Job Search maps local jobs to a selected candidate through `getJobMatch`. It supports text search over title, company, and skills; work mode, type, and minimum match filters; pagination; save toggles; Apply Now; View Details; and company links. Cards show matched and missing skills, location, salary, and match score.

The apply modal presents a resume from the living portfolio, a profile, and an optional cover letter. Submission updates local page state and shows an “Added to your tracker” toast, but the current implementation does not persist a new record into the shared `applications` dataset. See [[features/applications]] and [[journeys/candidate-journey]].
