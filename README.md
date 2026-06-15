# CareerSync AI

**CareerSync AI** is an AI-powered Career OS platform designed to help students, fresh graduates, internship seekers, employers, and universities make smarter career decisions. The system converts a candidate’s resume, portfolio, projects, skills, certifications, and career interests into a structured living career profile, then uses AI to analyze job fit, detect skill gaps, generate career roadmaps, support mock interviews, and provide employability insights.

The project was developed for the **Talentbank Tech Hackathon 2026** under the **Career OS / Career Marketplace** direction. CareerSync AI focuses on solving one major problem: many students and fresh graduates apply for roles without clearly understanding whether their skills match employer expectations. At the same time, employers often rely on manual screening or keyword-based filtering, which may overlook project evidence, transferable skills, and growth potential. CareerSync AI bridges this gap by providing explainable, AI-assisted career intelligence.

---

## Table of Contents

* [Overview](#overview)
* [Project Goals](#project-goals)
* [Key Features](#key-features)
* [User Roles](#user-roles)
* [System Architecture](#system-architecture)
* [Tech Stack](#tech-stack)
* [AI Provider Strategy](#ai-provider-strategy)
* [Core Modules](#core-modules)
* [Environment Variables](#environment-variables)
* [Installation](#installation)
* [Running the Project Locally](#running-the-project-locally)
* [API Routes](#api-routes)
* [Database Collections](#database-collections)
* [Authentication Flow](#authentication-flow)
* [Deployment](#deployment)
* [Security Practices](#security-practices)
* [Future Improvements](#future-improvements)
* [Project Status](#project-status)
* [Author](#author)

---

## Overview

CareerSync AI is a three-sided AI career platform for:

1. **Candidates**
   Students, fresh graduates, and internship seekers who want to understand their job readiness, improve their skills, and prepare for interviews.

2. **Employers**
   Recruiters and hiring teams who want to compare candidates against job requirements using skill fit, project evidence, readiness, and growth potential.

3. **Universities**
   Career offices and academic teams that want to understand cohort-level employability, common skill gaps, and curriculum-to-market alignment.

The platform allows a candidate to create a living portfolio profile, paste a job description, and receive an AI-generated employability report. The report includes a match score, matched skills, missing skills, strengths, weaknesses, recommendations, and a personalized roadmap. The system also includes an AI career coach and mock interview module to help candidates improve before applying.

---

## Project Goals

The main goals of CareerSync AI are:

* Help students and fresh graduates stop applying blindly.
* Convert static resumes and portfolios into structured living career profiles.
* Compare candidate profiles against real job descriptions.
* Generate explainable job match reports.
* Identify technical, soft skill, certification, and experience gaps.
* Recommend realistic career paths and learning roadmaps.
* Provide AI-powered mock interview practice.
* Support employers with smart candidate fit reports.
* Support universities with readiness and skill gap insights.
* Demonstrate a scalable AI-powered Career OS architecture.

---

## Key Features

### Candidate Features

* **Living Portfolio Profile**
  Candidates can store education, skills, projects, certifications, resume text, portfolio links, GitHub links, and career interests.

* **Resume and Portfolio Analyzer**
  Extracts and summarizes candidate strengths, tools, experience, and project evidence.

* **AI Job Description Analyzer**
  Compares a candidate profile with a job description and generates an explainable match report.

* **Skill Gap Intelligence**
  Groups missing skills into categories such as technical skills, tools, soft skills, certifications, and experience.

* **Career Path Navigator**
  Suggests realistic career routes such as Frontend Developer, Full Stack Developer, DevOps Engineer, Data Analyst, UI Engineer, or Product Intern.

* **Personalized Career Roadmap**
  Generates a structured improvement plan with recommended skills, projects, certifications, and timelines.

* **AI Career Coach**
  A chatbot that answers career questions based on the user’s profile, latest analysis, skill gaps, and roadmap.

* **AI Mock Interview Test**
  Generates technical, behavioral, project-based, or mixed interview questions based on a role or job description.

* **Interview Answer Evaluation**
  Scores candidate answers and provides strengths, weaknesses, improved sample answers, and practical feedback.

* **Interview Readiness Score**
  Calculates readiness across technical accuracy, communication, project explanation, problem solving, and confidence.

* **Interview Practice Plan**
  Creates a 7-day or 14-day practice plan based on weak areas found during the mock interview.

---

### Employer Features

* **Employer Dashboard**
  Employers can view role requirements, candidate matches, shortlisted candidates, and hiring insights.

* **Smart Talent Matching**
  Ranks candidates based on skill fit, project relevance, readiness, and growth potential.

* **Candidate Fit Report**
  Generates employer-facing summaries with match score, evidence, risks, missing requirements, and hiring recommendations.

* **Growth Potential Score**
  Estimates whether a candidate can grow into a role with reasonable training and support.

* **AI Interview Question Generator**
  Generates interview questions based on the job description, candidate profile, and identified skill gaps.

* **Talent Pipeline Board**
  Displays hiring stages such as Recommended, Shortlisted, Interview, Offer, and Rejected.

* **Candidate Comparison**
  Compares candidates side by side based on skill match, project relevance, gaps, and interview readiness.

---

### University Features

* **University Readiness Dashboard**
  Shows aggregated readiness score, internship readiness, strongest skills, and common gaps.

* **Adaptive Readiness Profile**
  Tracks student readiness growth through coursework, projects, certifications, internships, and career activities.

* **Curriculum Skill Gap Map**
  Compares university-taught skills with real market requirements from job descriptions.

* **Cohort Employability Heatmap**
  Visualizes readiness by career track such as frontend, backend, cloud, DevOps, data, cybersecurity, and UI/UX.

* **Student Progress Tracker**
  Tracks skills gained, projects completed, roadmap progress, mock interview readiness, and employability score changes.

* **Internship Matching Support**
  Matches students to internship roles based on skills, readiness, and interests.

---

## User Roles

CareerSync AI supports three main user roles:

| Role       | Dashboard Access                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------ |
| Candidate  | Candidate dashboard, living portfolio, JD analyzer, roadmap, AI coach, mock interview                  |
| Employer   | Employer dashboard, smart talent matching, candidate fit reports, interview question generator         |
| University | University readiness dashboard, cohort skill insights, curriculum gap map, internship matching support |

Role-based access is handled through Firebase Authentication and backend role verification.

---

## System Architecture

CareerSync AI follows a modern full-stack architecture:

```txt
React Frontend
      ↓
Firebase Authentication
      ↓
Node.js / Express Backend
      ↓
Firebase Admin Token Verification
      ↓
MongoDB / Azure Cosmos DB for MongoDB
      ↓
AI Service Layer
      ↓
Groq API / Azure OpenAI / Azure AI Foundry
      ↓
Structured AI Output
      ↓
Dashboards, Reports, Roadmaps, Chatbot, Mock Interview
```

The frontend handles user interaction and dashboard rendering. The backend handles protected API routes, authentication verification, database operations, and AI provider communication. The AI layer returns structured JSON responses so the frontend can display scores, skill gaps, roadmaps, recommendations, and feedback clearly.

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Lucide React
* Framer Motion
* Axios

### Backend

* Node.js
* Express.js
* Firebase Admin SDK
* MongoDB / Mongoose
* CORS
* Dotenv
* OpenAI SDK / Groq SDK

### Authentication

* Firebase Authentication
* Firebase Admin SDK
* Protected routes
* Role-based access control

### Database

* MongoDB
* Azure Cosmos DB for MongoDB as Azure-aligned option

### AI and Cloud

* Groq API for development and testing
* Azure OpenAI / Azure AI Foundry for final deployment
* Azure Blob Storage for uploaded resumes and documents
* Azure AI Search for future RAG-based retrieval
* Azure Document Intelligence for future resume and certificate extraction
* Azure Application Insights for monitoring

---

## AI Provider Strategy

CareerSync AI uses a flexible AI provider system.

During development, the project can use **Groq API** for fast and low-cost testing. This is useful while improving prompts, testing JSON output, debugging backend logic, and connecting frontend screens.

For the final Azure-aligned version, the system can switch to **Azure OpenAI** or **Azure AI Foundry** by changing environment variables.

```env
AI_PROVIDER=groq
```

or:

```env
AI_PROVIDER=azure
```

This keeps the codebase flexible and avoids hardcoding one AI provider into every backend route.

---

## Core Modules

### 1. Authentication Module

The authentication module allows users to register, log in, log out, and select their role. Firebase Authentication handles user identity, while the Express backend verifies Firebase ID tokens using Firebase Admin SDK.

### 2. Candidate Profile Module

Candidates can create and update their living portfolio profile. This includes education, skills, projects, certifications, resume text, portfolio links, GitHub links, and career interests.

### 3. Job Description Analyzer

The JD Analyzer compares a candidate profile against a pasted job description. It returns:

* Match score
* Matched skills
* Missing skills
* Strengths
* Weaknesses
* Evidence
* Recommendations
* Career roadmap summary

### 4. Skill Gap Analysis

The system identifies gaps and groups them by:

* Technical skills
* Tools and frameworks
* Soft skills
* Certifications
* Experience
* Project evidence

Each gap includes priority, difficulty, and estimated learning effort.

### 5. Career Roadmap Generator

The roadmap generator creates a personalized improvement plan based on the candidate’s current profile and target role. It may include weekly or monthly learning plans, project suggestions, certification recommendations, and practical next steps.

### 6. AI Career Coach

The AI Career Coach answers personalized questions using the candidate’s profile, latest job analysis, roadmap, and previous chat history. It helps users understand their results and plan their next actions.

### 7. Mock Interview Module

The mock interview module generates role-based or JD-based questions. It supports technical, behavioral, project-based, and mixed interview formats.

### 8. Interview Evaluation Module

The system evaluates candidate answers and returns:

* Answer score
* Strengths
* Weaknesses
* Improved sample answer
* Communication feedback
* Readiness score
* Practice plan

### 9. Employer Dashboard

The employer dashboard allows recruiters to view candidate matches, compare candidates, generate fit reports, and create interview questions.

### 10. University Dashboard

The university dashboard provides cohort-level employability insights, skill gap summaries, curriculum gap mapping, and readiness visualizations.

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string

# Firebase Admin
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY="your_firebase_private_key"

# AI Provider
AI_PROVIDER=groq

# Groq
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.1-8b-instant

# Azure OpenAI
AZURE_OPENAI_API_KEY=your_azure_openai_key
AZURE_OPENAI_ENDPOINT=https://your-resource-name.openai.azure.com/
AZURE_OPENAI_DEPLOYMENT=your_deployment_name
AZURE_OPENAI_API_VERSION=2024-10-21

# Azure Storage
AZURE_STORAGE_CONNECTION_STRING=your_azure_storage_connection_string
AZURE_BLOB_CONTAINER=resumes
```

Create a `.env` file inside the frontend folder.

```env
VITE_API_BASE_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Important: AI API keys must only be stored in the backend environment. Never expose Groq or Azure OpenAI API keys inside frontend code.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/careersync-ai.git
cd careersync-ai
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

---

## Running the Project Locally

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend development server:

```bash
cd client
npm run dev
```

The frontend will usually run on:

```txt
http://localhost:5173
```

The backend will usually run on:

```txt
http://localhost:5000
```

---

## API Routes

### Authentication Routes

| Method | Endpoint                  | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| POST   | `/api/auth/register-role` | Save user role after Firebase signup |
| GET    | `/api/auth/me`            | Return authenticated user and role   |

### Candidate Routes

| Method | Endpoint          | Description                           |
| ------ | ----------------- | ------------------------------------- |
| POST   | `/api/profile`    | Create or update candidate profile    |
| GET    | `/api/profile/me` | Fetch authenticated candidate profile |

### AI Analysis Routes

| Method | Endpoint                       | Description                                       |
| ------ | ------------------------------ | ------------------------------------------------- |
| POST   | `/api/analyze`                 | Analyze job description against candidate profile |
| GET    | `/api/analysis/me`             | Fetch saved analyses                              |
| POST   | `/api/coach`                   | Send user question to AI Career Coach             |
| POST   | `/api/mock-interview/generate` | Generate interview questions                      |
| POST   | `/api/mock-interview/evaluate` | Evaluate interview answers                        |

### Employer Routes

| Method | Endpoint                            | Description                                     |
| ------ | ----------------------------------- | ----------------------------------------------- |
| GET    | `/api/employer/matches`             | Return candidate matches for employer dashboard |
| POST   | `/api/employer/fit-report`          | Generate candidate fit report                   |
| POST   | `/api/employer/interview-questions` | Generate interview questions for a candidate    |

### University Routes

| Method | Endpoint                     | Description                              |
| ------ | ---------------------------- | ---------------------------------------- |
| GET    | `/api/university/readiness`  | Return readiness and skill gap insights  |
| GET    | `/api/university/skill-gaps` | Return aggregated skill gap data         |
| GET    | `/api/university/heatmap`    | Return cohort employability heatmap data |

---

## Database Collections

### User

```js
{
  firebaseUid: String,
  name: String,
  email: String,
  role: "candidate" | "employer" | "university",
  createdAt: Date,
  updatedAt: Date
}
```

### CandidateProfile

```js
{
  userId: ObjectId,
  education: Array,
  skills: Array,
  projects: Array,
  certifications: Array,
  resumeText: String,
  portfolioLinks: Array,
  careerInterests: Array,
  createdAt: Date,
  updatedAt: Date
}
```

### Analysis

```js
{
  userId: ObjectId,
  jobDescription: String,
  matchScore: Number,
  matchedSkills: Array,
  missingSkills: Array,
  strengths: Array,
  weaknesses: Array,
  recommendations: Array,
  roadmap: Object,
  createdAt: Date
}
```

### ChatMessage

```js
{
  userId: ObjectId,
  analysisId: ObjectId,
  role: "user" | "assistant",
  message: String,
  createdAt: Date
}
```

### MockInterview

```js
{
  userId: ObjectId,
  role: String,
  jobDescription: String,
  questions: Array,
  answers: Array,
  scores: Object,
  feedback: Array,
  readinessScore: Number,
  practicePlan: Object,
  createdAt: Date
}
```

### EmployerRole

```js
{
  employerUserId: ObjectId,
  jobTitle: String,
  jobDescription: String,
  requirements: Array,
  createdAt: Date
}
```

### CandidateFitReport

```js
{
  employerUserId: ObjectId,
  candidateId: ObjectId,
  roleId: ObjectId,
  matchScore: Number,
  evidence: Array,
  risks: Array,
  recommendation: String,
  createdAt: Date
}
```

### UniversityCohort

```js
{
  universityUserId: ObjectId,
  programme: String,
  cohortName: String,
  readinessMetrics: Object,
  skillGaps: Array,
  heatmapData: Object,
  createdAt: Date
}
```

---

## Authentication Flow

1. User registers or logs in through Firebase Authentication.
2. User selects account type: candidate, employer, or university.
3. The frontend receives a Firebase ID token.
4. The frontend sends the token with protected API requests.
5. The Express backend verifies the token using Firebase Admin SDK.
6. The backend checks the user role in MongoDB or Cosmos DB.
7. The frontend redirects the user to the correct dashboard based on role.

---

## AI Output Format

CareerSync AI requests structured JSON from the AI provider. This makes the output easier to store, validate, and render in the frontend.

Example JD analysis output:

```json
{
  "matchScore": 82,
  "summary": "The candidate is a strong fit for a frontend internship role with good React and project experience.",
  "matchedSkills": ["React", "JavaScript", "Tailwind CSS", "GitHub"],
  "missingSkills": [
    {
      "skill": "Testing",
      "category": "Technical",
      "priority": "Medium",
      "estimatedLearningTime": "1-2 weeks"
    }
  ],
  "strengths": [
    "Strong frontend project experience",
    "Good UI development foundation"
  ],
  "weaknesses": [
    "Limited testing experience",
    "Needs stronger deployment explanation"
  ],
  "recommendations": [
    "Build one project with unit testing",
    "Improve README documentation",
    "Prepare STAR-based project explanations"
  ],
  "roadmap": {
    "week1": "Revise React fundamentals and component structure",
    "week2": "Learn testing basics with Vitest or Jest",
    "week3": "Deploy a polished portfolio project",
    "week4": "Practice mock interviews and project explanation"
  }
}
```

---

## Deployment

The project can be deployed using Azure-aligned services.

### Frontend Deployment

Recommended options:

* Azure Static Web Apps
* Vercel
* Netlify

### Backend Deployment

Recommended options:

* Azure App Service
* Render
* Railway

### Database Deployment

Recommended options:

* MongoDB Atlas
* Azure Cosmos DB for MongoDB

### File Storage

Recommended option:

* Azure Blob Storage

### Monitoring

Recommended option:

* Azure Application Insights

---

## Security Practices

CareerSync AI follows these security practices:

* Firebase ID tokens are verified on the backend.
* Protected API routes require authentication.
* User roles are checked before returning dashboard data.
* AI API keys are stored only in backend environment variables.
* Frontend environment variables only contain public Firebase configuration.
* CORS is configured to allow trusted frontend origins only.
* User data is stored with role-based access control.
* AI prompts avoid exposing unnecessary personal information.
* Stored analysis results are reused to reduce repeated AI requests and token cost.

---

## Token and Cost Optimization

To reduce AI cost, CareerSync AI avoids sending full resume, profile, job description, and roadmap data on every request.

The system uses this strategy:

1. Send full profile and full job description only during the first analysis.
2. Save the structured AI result in the database.
3. Use summarized profile and latest analysis for AI Career Coach.
4. Use job description summaries and key gaps for mock interview generation.
5. Use stored structured results for employer and university dashboards.
6. Limit AI response length using maximum token settings.
7. Use Groq for development testing and Azure OpenAI for final deployment.

---

## Future Improvements

Planned future improvements include:

* Advanced resume parsing with Azure Document Intelligence.
* RAG-based AI coaching using Azure AI Search.
* More detailed employer recruitment workflow.
* Real-time notification system.
* Candidate application tracking.
* University admin management tools.
* More advanced cohort analytics.
* Interview voice practice.
* PDF report export.
* Admin dashboard.
* Payment or subscription system for employers.
* Fine-tuned prompt templates for different industries.

---

## Project Status

CareerSync AI is completed as a functional MVP with:

* Role-based authentication
* Candidate living portfolio
* AI job description analysis
* Skill gap intelligence
* Career roadmap generation
* AI career coach
* Mock interview generation
* Interview answer evaluation
* Employer dashboard
* University readiness dashboard
* Structured AI responses
* MongoDB/Cosmos DB storage
* Groq and Azure AI provider support
* Deployment-ready full-stack architecture

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
