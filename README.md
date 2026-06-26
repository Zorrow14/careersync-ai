# CareerSync AI

**CareerSync AI** is an AI-powered Career OS platform built for the **Talentbank Tech Hackathon 2026** under the **Career OS / Career Marketplace** direction. It helps students, fresh graduates, employers, and universities make smarter career decisions through job match analysis, skill gap detection, career roadmaps, AI coaching, and mock interviews.

The current version is a **hackathon-ready frontend prototype** — it runs entirely in the browser with rich mock data and simulated AI responses. No API keys, database, or backend deployment are required to demo the product.

---

## For Judges — Quick Start

No credentials needed. Enter any role in one click:

1. Open the demo link (or run locally — see [Quick Start](#quick-start))
2. On the landing page, click **Enter as Candidate**, **Employer**, or **University**
   - Or use a deep link: `?demo=candidate`, `?demo=employer`, `?demo=university`
3. Recommended walkthrough:
   - **Candidate:** Dashboard (Explainable Employability Score) → Job Search → Companies → JD Analyzer → Roadmap → Mock Interview
   - Switch personas (Sarah / Jason / Aina) in the sidebar to see different profiles
   - **Employer:** Dashboard → Talent Discovery → Pipeline → Analytics
   - **University:** Dashboard → Employability Tracker → Curriculum Insights → Industry Trends → Reports

Everything runs on simulated AI and mock data — there are no external API calls.

---

## Table of Contents

* [Overview](#overview)
* [Problem Statement](#problem-statement)
* [Demo Flow](#demo-flow)
* [Key Features](#key-features)
* [User Roles](#user-roles)
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

CareerSync AI is a three-sided career intelligence platform:

1. **Candidates** — Understand job readiness, analyze skill gaps, follow personalized roadmaps, practice interviews, and chat with an AI career coach.
2. **Employers** — View candidate rankings, fit scores, and AI-generated hiring recommendations.
3. **Universities** — Monitor cohort readiness, curriculum gaps, and skill demand alignment.

The hackathon MVP focuses on **UX, storytelling, and demo experience**. All AI features are powered by a local mock layer (`client/src/lib/mock-ai.js`) with realistic loading delays, so judges can explore the full product without external services.

---

## Problem Statement

Many students and fresh graduates apply for roles without clearly understanding whether their skills match employer expectations. Employers often rely on manual screening or keyword filtering, which overlooks project evidence, transferable skills, and growth potential.

CareerSync AI bridges this gap by converting resumes and portfolios into structured career profiles, then generating explainable match reports, skill gaps, roadmaps, and interview feedback.

---

## Demo Flow

The fastest way to experience the product:

1. Open the landing page
2. Click **Try Demo** — instantly logs in as **Sarah Tan** (Frontend Developer candidate)
3. Explore the **Career Dashboard** with readiness score, job match, and skill gaps
4. Switch personas in the sidebar (**Sarah**, **Jason**, **Aina**) to see different profiles
5. Navigate through:
   - **JD Analyzer** → **AI Results** → **Roadmap**
   - **AI Coach** (chat with simulated responses)
   - **Mock Interview** (multi-question practice with feedback)
6. Register as **Employer** or **University** to view recruiter and cohort dashboards

No credentials are required — login and registration work in demo mode.

---

## Key Features

### Candidate

| Feature | Description |
| --- | --- |
| Living Profile | Education, skills, projects, certifications, resume text, and links |
| Career Health Score | Single KPI combining readiness, match, and profile completeness |
| JD Analyzer | Paste a job description and get an AI match analysis |
| Skill Gap Detection | Current vs. missing skills with learning recommendations |
| Career Roadmap | Weekly milestones with projected employability improvement |
| AI Career Coach | Chatbot with persona-aware career advice |
| Mock Interview | Role-based questions with scored feedback and readiness dimensions |

### Employer

| Feature | Description |
| --- | --- |
| Talent Dashboard | Open positions with ranked candidate matches |
| Fit Reports | AI summaries with strengths, risks, and interview tips |
| Hiring Recommendations | Recommend / Consider / Decline per candidate |

### University

| Feature | Description |
| --- | --- |
| Cohort Readiness | Aggregated readiness scores across students |
| Track Performance | Breakdown by career track (Frontend, Full Stack, Data, etc.) |
| Curriculum vs. Market | Taught skills vs. industry-demanded skills |
| AI Recommendations | Actionable curriculum improvement suggestions |

---

## User Roles

| Role | Dashboard | Access |
| --- | --- | --- |
| Candidate | `/dashboard` | Full prototype: analyzer, roadmap, coach, mock interview, profile |
| Employer | `/employer` | Talent matching and candidate fit reports |
| University | `/university` | Cohort readiness and curriculum insights |

Role selection happens at registration. Demo auth stores the session in `localStorage` — no Firebase or backend calls.

---

## Architecture

### Current (Hackathon MVP)

```txt
React Frontend (Vite)
      ↓
Demo Auth (localStorage session)
      ↓
Persona Context (Sarah / Jason / Aina)
      ↓
Mock Data Layer (client/src/data/)
      ↓
Mock AI Layer (client/src/lib/mock-ai.js)
      ↓
Dashboards, Reports, Roadmaps, Chatbot, Mock Interview
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
├── client/                          # Frontend (primary — run this for demo)
│   └── src/
│       ├── components/              # UI components, layout, persona switcher
│       ├── context/                   # AuthContext, PersonaContext
│       ├── data/                      # Mock personas, profiles, analyses, roadmaps
│       ├── lib/                       # mock-ai.js (simulated AI responses)
│       ├── pages/
│       │   ├── candidate/             # Dashboard, Analyzer, Results, Roadmap, etc.
│       │   ├── employer/              # Employer talent dashboard
│       │   ├── university/            # University cohort dashboard
│       │   ├── auth/                  # Login, Register (demo mode)
│       │   └── public/                # Landing page with Try Demo
│       └── routes/                    # ProtectedRoute, RoleRoute
│
└── server/                          # Backend scaffold (optional, not needed for demo)
    └── src/
        ├── controllers/               # Profile, auth controllers
        ├── models/                    # Mongoose schemas
        ├── routes/                    # API routes
        ├── services/                  # AI service layer (Groq)
        └── prompts/                   # AI prompt templates
```

---

## Tech Stack

### Frontend (Active)

| Technology | Purpose |
| --- | --- |
| React 19 | UI framework |
| Vite 8 | Build tool and dev server |
| Tailwind CSS v4 | Styling (cinematic neo-noir theme) |
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

Switching personas in the sidebar instantly updates all dashboard data:

| Persona | Background | Target Role | Match Score |
| --- | --- | --- | --- |
| **Sarah Tan** | BSc Computer Science, Universiti Malaya | Frontend Developer | 82% |
| **Jason Lim** | BSc Data Science, UTM | Data Analyst | 74% |
| **Aina Rahman** | BEng Software Engineering, UPM | Full Stack Developer | 88% |

Each persona has unique profiles, analyses, skill gaps, roadmaps, interview questions, and employer fit reports.

---

## Quick Start

**Requirements:** Node.js 18+

```bash
git clone https://github.com/Zorrow14/careersync-ai.git
cd careersync-ai/client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and click **Try Demo**.

That's it — no `.env` files, no database, no API keys.

---

## Build for Production

```bash
cd client
npm run build
npm run preview
```

The production build outputs to `client/dist/`. Deploy to Vercel, Netlify, or Azure Static Web Apps.

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
* Separated prompt files for each AI feature
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
| Landing page with Try Demo | Done |
| Demo auth (localStorage) | Done |
| Persona switching (3 personas) | Done |
| Candidate dashboard + all features | Done |
| Employer talent dashboard | Done |
| University cohort dashboard | Done |
| Mock AI layer with loading animations | Done |
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

CareerSync AI was inspired by the Talentbank Tech Hackathon 2026 Career OS / Career Marketplace challenge. The project explores how AI can improve employability readiness, career guidance, recruitment matching, and university-level skill gap visibility.
