# CareerSync AI — Hackathon Improvement Plan

**Based on:** Talentbank Tech Hackathon 2026 Kick-Off Session Summary  
**Project:** CareerSync AI (Career OS / Career Marketplace)  
**Build phase:** 29 Jun – 26 Jul 2026  
**Last updated:** 26 Jun 2026

---

## 1. Executive Summary

CareerSync AI already meets many hackathon constraints: unified three-sided platform, simulated AI, rich mock modules for candidates, employers, and universities. The biggest gap is not feature count — judges explicitly do **not** score on module quantity — but **judge experience, impact storytelling, and polish on the functional core**.

This plan prioritises improvements aligned with official judging order:

1. Real impact on career planning
2. Unique innovation
3. UI/UX and workflow
4. Functional core (homepage → jobs → company directory → dashboards)

---

## 2. Hackathon Requirements Checklist

| Requirement | Status | Action |
|---|---|---|
| Public clickable prototype link | ❌ Pending | Deploy to Vercel / Netlify |
| Walkthrough video (3–5 min) | ❌ Pending | Record after polish pass |
| One-click login bypass for judges | ⚠️ Partial | Candidate only via "Try Demo" |
| Functional MVP (not perfect code) | ✅ Mostly done | Close core loop gaps |
| Simulated AI (no live API keys) | ✅ Done | Keep mock-ai layer |
| Dummy data (~1,000–2,000 records) | ⚠️ Partial | Scale mock datasets |
| Unified platform, 3 role views | ✅ Done | Add judge entry for all roles |
| Mobile-friendly candidate UX | ⚠️ Weak | Responsive nav needed |
| Clean, editorial design (ages 20–50) | ⚠️ Review | Tone down neo-noir intensity |
| SDG / sustainability framing | ❌ Missing | Add impact section |
| Neutral ad / monetisation space | ❌ Missing | Add reserved placement blocks |

---

## 3. Current Strengths (Keep & Showcase)

- **Three-sided ecosystem** — candidate, employer, university in one app
- **Simulated AI layer** — `mock-ai.js` with loading states; no API keys needed
- **Candidate module** — profile, jobs, applications, analyzer, roadmap, coach, mock interview
- **Employer module** — dashboard, feed, jobs, talent discovery, pipeline, analytics
- **University module** — dashboard, employability tracker, student insights, curriculum, trends, reports
- **Persona switching** — Sarah / Jason / Aina for varied candidate demos
- **Production build** — passing

---

## 4. Improvement Phases

### Phase 1 — Judge Experience (Days 1–2) · P0

**Goal:** A judge opens the link and understands the product within 60 seconds, with zero friction.

#### 1.1 One-click role entry

| Task | Details | Files |
|---|---|---|
| Add 3 demo buttons on landing | "Explore as Candidate", "Explore as Employer", "Explore as University" | `Landing.jsx` |
| Wire each button to `demoLogin(role)` + correct home route | Candidate → `/dashboard`, Employer → `/employer`, University → `/university` | `AuthContext.jsx`, `Landing.jsx` |
| Add instant demo buttons on Login page | Skip email/password entirely | `Login.jsx` |
| Add instant demo on Register page | One click per role, no form fill | `Register.jsx` |
| Optional: query param auto-login | `?demo=candidate` for video/deck links | `App.jsx` or `Landing.jsx` |

**Done when:** Judge never needs to type credentials to see any role.

#### 1.2 Company Directory (missing core module)

| Task | Details | Files |
|---|---|---|
| Create mock company data | 15–25 employers with industry, size, location, open roles, culture tags | `data/companiesData.js` (new) |
| Build Company Directory page | Search, filter by industry, card grid with key stats | `pages/candidate/Companies.jsx` (new) |
| Company detail view | Profile, open jobs, culture highlights, link to job listings | `pages/candidate/CompanyDetails.jsx` (new) |
| Add sidebar + route wiring | `/companies`, `/companies/:id` | `Sidebar.jsx`, `App.jsx` |
| Link from Job Search / Job Details | "View company profile" cross-links | `JobSearch.jsx`, `JobDetails.jsx` |

**Done when:** Homepage → Jobs → Companies → Dashboard loop is complete.

#### 1.3 Public deployment

| Task | Details |
|---|---|
| Deploy `client/dist` to Vercel or Netlify | Connect GitHub repo, auto-deploy on push |
| Verify all routes work on production URL | SPA fallback config for client-side routing |
| Add demo URL to README | Single line: "Live demo: https://..." |

**Done when:** Shareable public link works without GitHub access.

---

### Phase 2 — Impact Story & Homepage (Days 3–4) · P0

**Goal:** Judges immediately see *why* CareerSync matters, not just *what* it does.

#### 2.1 Homepage restructure

| Section | Content |
|---|---|
| Hero | Problem statement + one-line value prop |
| 3 audience cards | Candidate / Employer / University with demo buttons |
| Impact metrics | Readiness improvement, at-risk students flagged, hiring funnel |
| Core loop visual | Discover jobs → Analyse fit → Build roadmap → Get hired |
| SDG alignment | SDG 4 (Education) + SDG 8 (Decent Work) — 2–3 sentences each |
| Social proof / mock stats | "156 students tracked", "24 employer partners" |

**Files:** `Landing.jsx`, optionally `data/landingStats.js`

#### 2.2 Signature innovation — Explainable Employability Score

| Task | Details | Files |
|---|---|---|
| Define score breakdown model | Skills (30%), Portfolio (25%), Interview (20%), Market Fit (25%) | `data/employabilityScore.js` (new) |
| Show breakdown on candidate dashboard | Visual bars + "why this score" text | `Dashboard.jsx` |
| Show employer view of same score | Fit report references same dimensions | `TalentDiscovery.jsx` or fit data |
| Show university aggregate | Cohort average per dimension | `Dashboard.jsx` (university) |
| Add "score changed" narrative | After mock interview/roadmap, show +X% improvement | `Results.jsx`, `MockInterview.jsx` |

**Done when:** One coherent score story spans all three audiences.

#### 2.3 README judge quick-start

Add a "For Judges" section at the top of README:

```markdown
## For Judges — Quick Start
1. Open [live demo URL]
2. Click "Explore as Candidate" (or Employer / University)
3. Switch personas in sidebar to see different profiles
4. Key flows: Jobs → Analyzer → Results → Roadmap → Mock Interview
```

**Files:** `README.md`

---

### Phase 3 — Mobile & Visual Polish (Days 4–5) · P1

**Goal:** Candidate flows work on phone; dashboards feel professional for ages 20–50.

#### 3.1 Responsive navigation

| Task | Details | Files |
|---|---|---|
| Collapsible sidebar on mobile | Hamburger menu or bottom nav for `< md` breakpoint | `Sidebar.jsx`, `App.jsx` |
| Remove fixed `ml-64` on mobile | Use responsive margin/padding | `App.jsx` |
| Test key candidate pages at 375px width | Dashboard, Jobs, Applications, Profile | Manual QA |

#### 3.2 Design tone adjustment

| Area | Change |
|---|---|
| Dashboard cards | More whitespace, less glow |
| Data tables / charts | Editorial/report style, clearer labels |
| University + employer pages | Institutional, data-forward |
| Landing page | Professional hero, restrained accent colour |
| Keep brand identity | Amber accent + dark theme, but reduce gradient intensity |

**Files:** Global CSS / Tailwind utility classes, page-level card components

#### 3.3 Loading & transition polish

| Task | Details |
|---|---|
| Consistent skeleton/loading states on AI pages | Analyzer, Coach, Mock Interview |
| Page transition animations | Subtle fade on route change (optional) |
| Empty states | Clear CTAs when no data (e.g. no saved jobs) |

---

### Phase 4 — Data Scale & Depth (Days 5–6) · P1

**Goal:** Dashboards feel like a real marketplace, not a toy demo.

#### 4.1 Expand mock datasets

| Dataset | Current | Target | File |
|---|---|---|---|
| Job listings | ~6 | 50–100 | `jobsData.js` |
| Companies | 0 (directory) | 15–25 | `companiesData.js` |
| Talent pool (employer) | Small set | 30–50 candidates | `employerData.js` |
| Pipeline candidates | Small set | 40+ across stages | `employerData.js` |
| University student aggregates | 156 total | Keep aggregate, add faculty/program breakdown | `universityData.js` |
| Applications per persona | Few | 8–12 each | `applicationsData.js` |

**Approach:** Generate data programmatically or via AI prompt, then import as static JS. Use pagination/filtering in UI — do not render 2,000 DOM nodes at once.

#### 4.2 Cross-link data

| Link | Example |
|---|---|
| Company → Jobs | Company detail shows its open roles |
| Job → Company | Job card links to company profile |
| Candidate match → Employer talent | Same fit scores visible both sides |
| University gaps → Employer demand | Shared skill names across modules |

---

### Phase 5 — Differentiators (Days 6–7) · P2

**Goal:** Stand out with 1–2 memorable features judges will remember.

#### 5.1 Career Personality Snapshot (Work Animal-inspired)

| Task | Details | Files |
|---|---|---|
| Define 4–6 work traits | e.g. Builder, Analyst, Collaborator, Explorer, Strategist, Creator | `data/workTraits.js` (new) |
| Mock quiz in profile setup | 5 questions → trait result | `ProfileSetup.jsx` or new step |
| Personalise recommendations | Trait influences job match copy and coach replies | `mock-ai.js`, `jobsData.js` |
| Display trait badge on profile | Small card with description | `ProfileSetup.jsx`, `Dashboard.jsx` |

**Note:** Use Work Animal-style traits, not MBTI/DISC. Keep it clearly labelled as simulated.

#### 5.2 SDG Impact Panel

| Task | Details | Files |
|---|---|---|
| Add "Impact" section to landing or footer | Map features to SDG 4 and SDG 8 | `Landing.jsx` |
| Optional: university reports include SDG metrics | Graduate employment rate, skill equity | `Reports.jsx`, `universityData.js` |

#### 5.3 Neutral monetisation placeholders

| Task | Details | Files |
|---|---|---|
| "Featured Employers" slot on job search | Subtle sponsored card styling | `JobSearch.jsx` |
| "Career Programs" sidebar block | Reserved ad space on landing | `Landing.jsx` |
| Keep visually neutral | No real ads; label as "Sponsored" mock |

---

### Phase 6 — Submission Assets (Day 7) · P0

**Goal:** Complete hackathon deliverables.

#### 6.1 Walkthrough video script (3–5 minutes)

| Segment | Duration | Show |
|---|---|---|
| Problem + landing | 30s | Homepage, impact story, demo buttons |
| Candidate flow | 90s | Dashboard → Jobs → Analyzer → Results → Roadmap → Mock Interview |
| Persona switch | 20s | Sarah → Jason → different scores |
| Employer flow | 45s | Talent discovery → pipeline → analytics |
| University flow | 45s | Tracker → curriculum gaps → industry trends |
| Innovation highlight | 30s | Explainable Employability Score |
| Close | 20s | SDG impact, live URL |

#### 6.2 Checkpoint submissions

| Date | Action |
|---|---|
| 5 Jul (Checkpoint 1) | Submit latest files + confirm team active |
| 12 Jul (Checkpoint 2) | Submit after Phase 3 complete |
| 19 Jul (Checkpoint 3) | Submit after Phase 5 complete |
| 26 Jul (Final) | Public link + walkthrough video |

---

## 5. Priority Matrix

| Priority | Item | Effort | Impact |
|---|---|---|---|
| **P0** | One-click login (3 roles) | Low | High |
| **P0** | Company Directory | Medium | High |
| **P0** | Public deployment | Low | High |
| **P0** | Homepage impact story | Medium | High |
| **P0** | Walkthrough video | Medium | High |
| **P1** | Explainable Employability Score | Medium | High |
| **P1** | Mobile responsive nav | Medium | High |
| **P1** | Scale mock data | Medium | Medium |
| **P1** | Visual polish (editorial tone) | Medium | Medium |
| **P2** | Career Personality Snapshot | Medium | Medium |
| **P2** | SDG impact panel | Low | Medium |
| **P2** | Monetisation placeholders | Low | Low |
| **Skip** | Live AI / Firebase / MongoDB | High | Low (for judging) |
| **Skip** | Real auth / PDPA compliance | High | Low (for judging) |
| **Skip** | More modules beyond plan | High | Low |

---

## 6. What NOT to Build

Per hackathon guidance — avoid spending time on:

- Live Groq, Azure, or any paid AI API integration
- Real authentication or database persistence
- Custom ML models
- PDPA / legal compliance implementation
- Monetisation business model or pricing
- Additional modules just to increase feature count
- Backend API connection (keep scaffold, don't wire frontend)
- Domain purchase (optional, not required)

---

## 7. Success Criteria

The improvement plan is complete when:

- [ ] Judge opens public URL and enters any role with one click
- [ ] Core loop works: Homepage → Jobs → Companies → Role dashboards
- [ ] Walkthrough video recorded and linked in README
- [ ] One signature innovation (Employability Score) visible across all 3 audiences
- [ ] Candidate pages usable on mobile (375px)
- [ ] Mock data feels realistic (50+ jobs, 15+ companies, expanded talent pool)
- [ ] Homepage communicates impact in under 10 seconds
- [ ] SDG framing present
- [ ] Design feels professional and editorial, not overly flashy
- [ ] All checkpoint submissions made on schedule

---

## 8. File Change Map (Estimated)

### New files
```
client/src/data/companiesData.js
client/src/data/employabilityScore.js
client/src/data/workTraits.js          (optional, Phase 5)
client/src/pages/candidate/Companies.jsx
client/src/pages/candidate/CompanyDetails.jsx
```

### Modified files
```
client/src/pages/public/Landing.jsx     — demo buttons, impact story, SDG
client/src/pages/auth/Login.jsx         — instant demo buttons
client/src/pages/auth/Register.jsx      — instant demo buttons
client/src/pages/candidate/Dashboard.jsx — employability score breakdown
client/src/pages/candidate/JobSearch.jsx — company links, featured slot
client/src/pages/candidate/JobDetails.jsx — company profile link
client/src/components/layout/Sidebar.jsx — companies nav, mobile nav
client/src/App.jsx                      — new routes, responsive layout
client/src/data/jobsData.js             — expanded listings
client/src/data/employerData.js         — expanded talent/pipeline
client/src/data/universityData.js       — richer aggregates
README.md                               — judge quick-start, live demo URL
```

---

## 9. Weekly Schedule

| Week | Dates | Focus | Deliverable |
|---|---|---|---|
| Week 1 | 29 Jun – 5 Jul | Phase 1 + start Phase 2 | Judge entry, company directory, deploy, checkpoint 1 |
| Week 2 | 6 – 12 Jul | Phase 2 + Phase 3 | Homepage, employability score, mobile nav, checkpoint 2 |
| Week 3 | 13 – 19 Jul | Phase 4 + Phase 5 | Data scale, personality snapshot, SDG, checkpoint 3 |
| Week 4 | 20 – 26 Jul | Phase 6 | Video, final polish, final submission |

---

## 10. Risk Register

| Risk | Mitigation |
|---|---|
| Too many features, none polished | Stick to this plan; no new modules after Phase 1 |
| Judges can't find demo entry | Giant demo buttons on landing + README judge section |
| Mobile UX breaks on judge's phone | Test on real device before submission |
| Walkthrough video rushed | Script it in Phase 2, record in Phase 6 |
| Design too flashy for 20–50 audience | Phase 3 polish pass with editorial restraint |
| Mock data feels fake | Cross-link companies, jobs, and fit scores consistently |

---

*This plan is a living document. Update checkboxes and status as each phase completes.*
