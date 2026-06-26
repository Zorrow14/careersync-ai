# CareerSync AI

**CareerSync AI** is an AI-powered Career OS platform built for the **Talentbank Tech Hackathon 2026** under the **Career OS / Career Marketplace** direction. It helps students, fresh graduates, employers, and universities make smarter career decisions through explainable job match analysis, skill gap detection, career roadmaps, AI coaching, mock interviews, and cohort employability tracking.

**Live demo:** [https://careersync-ai-demo.vercel.app/](https://careersync-ai-demo.vercel.app/)

The current version is a **hackathon-ready frontend prototype** — it runs entirely in the browser with rich mock data and simulated AI responses. No API keys, database, or backend deployment are required to explore the product.

---

## For Judges — Quick Start

No credentials needed. Enter any role in one click:

1. Open the **[live demo](https://careersync-ai-demo.vercel.app/)** (or run locally — see [Quick Start](#quick-start))
2. On the landing page, click **Enter as Candidate**, **Employer**, or **University**
   - Or use a deep link: `?demo=candidate`, `?demo=employer`, `?demo=university`
3. Recommended walkthrough:
   - **Candidate:** Dashboard (Explainable Employability Score) → Jobs → Companies → Applications → JD Analyzer → Roadmap → Mock Interview → Profile
   - Switch personas (**Sarah / Jason / Aina**) in the **navbar** to see different profiles and scores
   - **Employer:** Dashboard → Talent Discovery → Pipeline (generate Fit Report) → Analytics
   - **University:** Dashboard (Generate Cohort Insights) → Employability Tracker → Curriculum Insights → Industry Trends → Reports

Everything runs on simulated AI and mock data — there are no external API calls in the demo build.

---

## Table of Contents

* [Overview](#overview)
* [Live Demo Analysis](#live-demo-analysis)
* [Problem Statement](#problem-statement)
* [Demo Flow](#demo-flow)
* [Key Features](#key-features)
* [User Roles & Routes](#user-roles--routes)
* [Architecture](#architecture)
* [Project Structure](#project-structure)
* [Tech Stack](#tech-stack)
* [Demo Personas](#demo-personas)
* [Quick Start](#quick-start)
* [Build for Production](#build-for-production)
* [Backend (Future / Optional)](#backend-future--optional)
* [Future Roadmap](#future-roadmap)
* [Project Status](#project-status)
* [Author](#author)

---

## Overview

CareerSync AI is a **three-sided career intelligence platform** with a unified design system and role-specific portals:

1. **Candidates** — Understand job readiness, browse jobs and companies, track applications, analyze skill gaps, follow personalized roadmaps, practice interviews, and chat with an AI career coach.
2. **Employers** — Discover ranked talent, review explainable AI fit reports, manage a hiring pipeline, and view hiring analytics.
3. **Universities** — Monitor cohort employability, generate AI cohort insights, identify curriculum gaps, track industry trends, and export outcome reports aligned with SDG metrics.

The hackathon MVP focuses on **UX, storytelling, and demo experience**. All AI features are powered by a local mock layer (`client/src/lib/mock-ai.js`) with realistic loading delays, so judges can explore the full product without external services.

**Design:** Classic premium SaaS UI — charcoal/slate surfaces, glass cards, bronze/champagne accents, **Inter** + **Space Grotesk** typography, and light/dark mode toggle.

---

## Live Demo Analysis

The deployed prototype at [careersync-ai-demo.vercel.app](https://careersync-ai-demo.vercel.app/) presents:

| Section | What judges see |
| --- | --- |
| **Hero** | Value proposition, live match score preview (82% Frontend Developer Intern), matched vs. missing skills |
| **Role entry** | Three cards — Candidate, Employer, University — one-click demo login |
| **Impact stats** | Match clarity, cohort size, readiness lift, employer network (storytelling KPIs) |
| **Core loop** | Upload Profile → Paste JD → AI Analysis → Career Roadmap |
| **Feature grid** | Job match, skill gaps, roadmap, AI coach |
| **SDG alignment** | SDG 4 (Quality Education) and SDG 8 (Decent Work) for university / impact narrative |
| **CTA footer** | Direct entry links for all three roles |

After entering a portal, users get the full in-app experience: floating navbar, persona switcher (candidates), paginated lists, progress indicators, and AI panels with loading states.

---

## Problem Statement

Many students and fresh graduates apply for roles without clearly understanding whether their skills match employer expectations. Employers often rely on manual screening or keyword filtering, which overlooks project evidence, transferable skills, and growth potential. Universities lack a unified view of how cohort readiness aligns with real market demand.

CareerSync AI bridges this gap by converting resumes and portfolios into **structured career profiles**, then generating **explainable** match reports, skill gaps, roadmaps, interview feedback, and cohort-level insights — using the same employability model across all three audiences.

---

## Demo Flow

The fastest way to experience the product:

1. Open [https://careersync-ai-demo.vercel.app/](https://careersync-ai-demo.vercel.app/)
2. Click **Try Live Demo** or **Enter as Candidate** — instantly logs in as a demo candidate
3. Explore the **Career Dashboard** with explainable employability score, dimensions, and work-trait snapshot
4. Switch personas in the **navbar** (**Sarah**, **Jason**, **Aina**) to see different profiles, scores, and AI outputs
5. Navigate through:
   - **Jobs / Companies / Applications** — marketplace-style browsing with pagination
   - **JD Analyzer** → **AI Results** → **Roadmap**
   - **AI Coach** (chat with simulated responses)
   - **Mock Interview** (scored feedback + readiness improvement narrative)
   - **Profile** — living portfolio with completion progress
6. Enter as **Employer** or **University** from the landing page to view recruiter and cohort dashboards

No credentials are required — login and registration work in demo mode (`localStorage` session).

---

## Key Features

### Candidate

| Feature | Description |
| --- | --- |
| Living Profile | Education, skills, projects, certifications, work traits, and portfolio completion |
| Explainable Employability Score | Weighted dimensions shared with employer fit reports and university cohort views |
| Job Marketplace | Job search, company directory, applications tracker, and company feed |
| JD Analyzer | Paste a job description and get an AI match analysis |
| Skill Gap Detection | Current vs. missing skills with learning recommendations |
| Career Roadmap | Weekly milestones with projected employability improvement |
| AI Career Coach | Chatbot with persona-aware career advice |
| Mock Interview | Role-based questions with scored feedback and score-boost narrative |
| Persona Switching | Sarah / Jason / Aina — instant profile, score, and AI data swap |

### Employer

| Feature | Description |
| --- | --- |
| Talent Dashboard | Open positions, pipeline summary, and hiring KPIs |
| Talent Discovery | AI-ranked candidates with filters, sorting, and pagination |
| Explainable Fit Report | AI-generated strengths, risks, dimension breakdown, and hiring recommendation |
| Hiring Pipeline | Kanban board, funnel view, stage stepper, and candidate detail panel |
| Analytics | Skill demand, source breakdown, and conversion metrics |

### University

| Feature | Description |
| --- | --- |
| Generate Cohort Insights | AI-powered dashboard generation with loading flow |
| Cohort Employability | Aggregated readiness scores and dimension breakdown |
| Employability Tracker | Readiness bands, placement funnel, and intervention signals |
| Student Insights | Skill distribution and progress timeline |
| Curriculum vs. Market | Taught skills vs. industry-demanded skills with coverage bars |
| Industry Trends | Role and technology demand trends |
| Reports | Outcome metrics and SDG-aligned impact reporting |

### Cross-Cutting

| Feature | Description |
| --- | --- |
| Mock AI Layer | Simulated delays for analyze, fit report, cohort insights, coach, and interview |
| Scaled Mock Data | 60+ jobs, 22+ companies, 45+ pipeline candidates |
| Pagination | Job Search, Companies, Applications, and other list views |
| Light / Dark Mode | Theme toggle persisted in `localStorage` |
| Responsive UI | Mobile-friendly navbar, persona switcher, and dashboard layouts |

---

## User Roles & Routes

| Role | Entry | Key Routes |
| --- | --- | --- |
| **Candidate** | `/dashboard` | `/jobs`, `/companies`, `/applications`, `/feed`, `/profile`, `/analyzer`, `/results`, `/roadmap`, `/chatbot`, `/mock-interview` |
| **Employer** | `/employer` | `/employer/talent`, `/employer/pipeline`, `/employer/analytics`, `/employer/jobs`, `/employer/feed` |
| **University** | `/university` | `/university/tracker`, `/university/students`, `/university/curriculum`, `/university/trends`, `/university/reports` |

Role selection happens at registration or via landing-page demo buttons. Demo auth stores the session in `localStorage` — no Firebase or backend calls in the current build.

---

## Architecture

### Current (Hackathon MVP)

```txt
React Frontend (Vite)
      ↓
Demo Auth (localStorage session)
      ↓
Persona Context (Sarah / Jason / Aina — candidates only)
      ↓
Mock Data Layer (client/src/data/)
      ↓
Mock AI Layer (client/src/lib/mock-ai.js)
      ↓
Role Dashboards, Fit Reports, Cohort Insights, Roadmaps, Chatbot, Mock Interview
```

### Future (Post-Hackathon)

```txt
React Frontend
      ↓
JWT / Firebase Authentication
      ↓
Express Backend
      ↓
MongoDB Atlas
      ↓
AI Service Layer (Groq / Azure OpenAI)
```

The `server/` folder contains a scaffolded Express backend with Mongoose models, profile routes, and a modular Groq AI service layer. It is **not required** for the current demo but is kept for future integration.

---

## Project Structure

```txt
careersync-ai/
├── client/                              # Frontend (primary — run this for demo)
│   └── src/
│       ├── components/
│       │   ├── layout/                  # AppNavbar, NavShell, navConfig
│       │   ├── ui/                      # PersonaSwitcher, Pagination, ProgressBar, KpiCard
│       │   ├── employer/                # FitReportPanel
│       │   └── pipeline/                # PipelineFunnel, PipelineStageStepper
│       ├── context/                     # AuthContext, PersonaContext
│       ├── data/                        # Personas, jobs, companies, employer/university data
│       ├── hooks/                       # useAuth, usePagination
│       ├── lib/                         # mock-ai.js, scoreProgress.js, demoUsers.js
│       ├── pages/
│       │   ├── candidate/               # Dashboard, Jobs, Companies, Profile, AI tools
│       │   ├── employer/                # Dashboard, Talent, Pipeline, Analytics
│       │   ├── university/              # Dashboard, Tracker, Reports, Trends
│       │   ├── auth/                    # Login, Register (demo mode)
│       │   └── public/                  # Landing page with role entry + SDG block
│       └── routes/                      # ProtectedRoute, RoleRoute
│
└── server/                              # Backend scaffold (optional, not needed for demo)
    └── src/
        ├── controllers/                   # Profile, auth controllers
        ├── models/                        # Profile, Analysis, MockInterview, EmployerJob, etc.
        ├── routes/                        # API routes
        ├── services/                      # aiService.js → groqService.js
        └── prompts/                       # AI prompt templates per feature
```

---

## Tech Stack

### Frontend (Active)

| Technology | Purpose |
| --- | --- |
| React 19 | UI framework |
| Vite 8 | Build tool and dev server |
| Tailwind CSS v4 | Utility styling + design tokens (`index.css`) |
| React Router 7 | Client-side routing |
| Framer Motion | Landing page animations |
| Lucide React | Icons |

### Backend (Scaffold — Optional)

| Technology | Purpose |
| --- | --- |
| Node.js + Express | REST API |
| MongoDB + Mongoose | Data persistence |
| Groq SDK | AI provider (development) |
| Firebase Admin | Auth verification (legacy scaffold) |
| Multer + pdf-parse | Resume upload and text extraction |

---

## Demo Personas

Switching personas in the **navbar** instantly updates dashboard data, employability scores, AI outputs, and employer fit reports:

| Persona | Background | Target Role | Match Score |
| --- | --- | --- | --- |
| **Sarah Tan** | BSc Computer Science, Universiti Malaya | Frontend Developer | 82% |
| **Jason Lim** | BSc Data Science, UTM | Data Analyst | 74% |
| **Aina Rahman** | BEng Software Engineering, UPM | Full Stack Developer | 88% |

Each persona has unique profiles, analyses, skill gaps, roadmaps, interview questions, work traits, and employer fit reports.

---

## Quick Start

**Requirements:** Node.js 18+

```bash
git clone https://github.com/Zorrow14/careersync-ai.git
cd careersync-ai/client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and click **Try Live Demo** or enter via a role card.

That's it — no `.env` files, no database, no API keys.

---

## Build for Production

```bash
cd client
npm run build
npm run preview
```

The production build outputs to `client/dist/`. The live demo is deployed on **Vercel** at [careersync-ai-demo.vercel.app](https://careersync-ai-demo.vercel.app/).

---

## Backend (Future / Optional)

If you want to run the backend scaffold separately:

```bash
cd server
npm install
```

Create `server/.env` from `server/.env.example` with your MongoDB URI, Firebase credentials, and Groq API key. Then:

```bash
npm run dev
```

The backend includes:

* Profile CRUD with resume PDF parsing
* Modular AI service layer (`aiService.js` → `groqService.js`)
* Separated prompt files for job match, roadmap, coach, interview, employer fit, and university insights
* Safe JSON parser for AI responses

The frontend does **not** call these APIs in the current hackathon build.

---

## Future Roadmap

Post-hackathon improvements planned:

* Connect frontend to real backend APIs
* JWT or Firebase authentication with MongoDB user storage
* Live Groq / Azure OpenAI integration
* Resume parsing with Azure Document Intelligence
* RAG-based AI coaching
* PDF report export
* Real-time notifications
* Payment / subscription for employer tier

---

## Project Status

| Area | Status |
| --- | --- |
| Live demo (Vercel) | [careersync-ai-demo.vercel.app](https://careersync-ai-demo.vercel.app/) |
| Landing page + role entry + SDG block | Done |
| Demo auth (localStorage) | Done |
| Persona switching (navbar, 3 personas) | Done |
| Candidate portal (dashboard, jobs, companies, applications, AI tools) | Done |
| Explainable employability score (cross-portal) | Done |
| Employer portal (talent, fit reports, pipeline, analytics) | Done |
| University portal (cohort insights, tracker, reports) | Done |
| Mock AI layer with loading animations | Done |
| Scaled mock data + pagination | Done |
| Classic premium theme (light/dark) | Done |
| Production build | Passing |
| Backend API integration | Scaffolded, not connected |
| Live AI / database / auth | Future work |

---

## Author

**Htet Aung Lwin**
Software Engineering Student
Interested in Software Development, React, Full-Stack Development, AI-assisted systems, and career technology platforms.

---

## License

This project is developed for educational, portfolio, and hackathon purposes.

---

## Acknowledgement

CareerSync AI was inspired by the **Talentbank Tech Hackathon 2026** Career OS / Career Marketplace challenge. The project explores how AI can improve employability readiness, career guidance, recruitment matching, and university-level skill gap visibility.
