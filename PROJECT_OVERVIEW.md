# CareerSync AI — Project Overview

## Summary
CareerSync AI is a hackathon-focused, AI-assisted career intelligence platform designed for three user groups:
- **Candidates** (students/fresh graduates)
- **Employers**
- **Universities**

The current repository delivers a polished **frontend prototype** with role-based experiences, rich mock datasets, and simulated AI flows. It is built to demonstrate product vision and UX without requiring live backend services.

## Core Value Proposition
CareerSync AI helps bridge employability gaps by providing:
- Explainable job-fit and readiness insights
- Skill-gap detection and personalized improvement pathways
- AI-assisted coaching and interview practice
- Employer-side talent matching and fit reports
- University-side cohort employability and curriculum alignment insights

## Current Implementation Status
### Active Product Layer (Primary)
- Located in: `./client`
- Fully functional demo experience in-browser
- Uses local mock data and simulated AI responses
- No required API keys, database setup, or backend deployment for demo exploration

### Backend Layer (Scaffold/Future Integration)
- Located in: `./server`
- Express-based scaffold with routes, controllers, models, and AI service abstraction
- Intended for future real API/database integration
- Not the primary runtime dependency for current demo workflows

## Architecture Overview
### Current Demo Flow
1. React frontend application (Vite)
2. Demo authentication/session via `localStorage`
3. Persona and role-based context switching
4. Local mock data + mock AI response layer
5. Role-specific dashboards and feature modules

### Planned Production Direction
1. Frontend + real authentication (JWT/Firebase)
2. Express backend APIs
3. Persistent data store (MongoDB)
4. Real AI provider integrations (e.g., Groq/Azure OpenAI)

## User Role Experiences
### Candidate Portal
- Employability dashboard and readiness indicators
- Job and company browsing
- Application tracking
- JD analysis and skill-gap feedback
- Personalized roadmap generation
- AI career coaching
- Mock interview practice with feedback

### Employer Portal
- Talent discovery and candidate ranking
- Explainable fit report generation
- Hiring pipeline views
- Hiring analytics and trend views

### University Portal
- Cohort employability dashboards
- Student readiness tracking
- Curriculum-to-market skill alignment
- Industry trend and reporting views

## Technology Stack
### Frontend (active)
- React 19
- Vite 8
- Tailwind CSS v4
- React Router 7
- Framer Motion
- Lucide React

### Backend (scaffold)
- Node.js + Express
- MongoDB/Mongoose-ready structure
- Groq/Azure AI integration points
- PDF parsing and profile-related API scaffolding

## Repository Layout
- `./client` — frontend app (primary deliverable)
- `./server` — backend scaffold for future use
- `./README.md` — detailed project narrative and run instructions

## Build & Run Notes
For demo usage, run only the client:
1. `cd ./client`
2. `npm install`
3. `npm run dev`

The backend can be developed separately when moving beyond the mock/demo stage.

## Overall Assessment
CareerSync AI is a strong prototype emphasizing product storytelling, explainable AI-style UX, and multi-sided marketplace thinking. The frontend is near demo-ready maturity, while backend capabilities are intentionally scaffolded for post-hackathon expansion.
