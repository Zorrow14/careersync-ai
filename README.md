# CareerSync AI

CareerSync AI is an AI-powered Career OS platform designed to help students, fresh graduates, internship seekers, employers, and universities make smarter career and hiring decisions.

The platform transforms a candidate’s resume, portfolio, projects, skills, certifications, and experience into a living career profile. It then compares that profile with real employer job descriptions to generate job match scores, skill gap analysis, personalized roadmaps, interview preparation feedback, and employer-ready candidate fit reports.

CareerSync AI was developed for the Talentbank Tech Hackathon as a full-stack Career OS solution using React.js, Node.js, Firebase Authentication, MongoDB / Azure Cosmos DB, and Azure AI services.

---

## Overview

Many students apply for internships and entry-level jobs without knowing whether their current skills, projects, and portfolio actually match the role. Most rejection processes also provide little feedback, leaving students unsure about what to improve.

At the same time, employers spend time manually reviewing candidates, while universities often lack real-time visibility into whether students are industry-ready.

CareerSync AI solves this by connecting three sides of the career ecosystem:

* **Candidates** improve their readiness and understand job fit.
* **Employers** discover suitable talent using AI-powered matching.
* **Universities** monitor student readiness and curriculum-to-market skill gaps.

---

## Core Features

## Candidate Features

### Living Portfolio Profile

Candidates can create a reusable career profile that includes:

* Personal details
* Education background
* Resume information
* Technical skills
* Soft skills
* Projects
* Certifications
* GitHub profile
* Portfolio links
* Career interests
* Work or internship experience

This profile becomes the foundation for all AI analysis inside the platform.

---

### Resume and Portfolio Analyzer

CareerSync AI analyzes a candidate’s resume and portfolio to identify:

* Key technical skills
* Relevant project experience
* Tools and frameworks used
* Career strengths
* Missing profile details
* Employability readiness level

This helps candidates understand how their profile appears from an employer’s perspective.

---

### AI Job Description Analyzer

Candidates can paste a real employer job description into the platform. CareerSync AI compares the job description with the candidate’s living portfolio profile and generates:

* Overall match score
* Matched requirements
* Missing requirements
* Strengths
* Weaknesses
* Role suitability explanation
* Improvement recommendations

This helps candidates stop applying blindly and make better career decisions.

---

### Skill Gap Intelligence

The platform identifies missing skills and groups them into categories such as:

* Technical skills
* Tools and frameworks
* Soft skills
* Certifications
* Experience gaps
* Project evidence gaps

Each gap is also ranked by priority, difficulty, and estimated learning effort.

---

### Career Path Navigator

CareerSync AI recommends realistic career paths based on the candidate’s profile, interests, education, and project evidence.

Example suggested paths:

* Frontend Developer
* Full Stack Developer
* Backend Developer
* DevOps Engineer
* Data Analyst
* UI Engineer
* Product Intern

Each recommendation includes an explanation of why the path fits the candidate.

---

### Personalized Career Roadmap

After analyzing a candidate’s profile and job description, CareerSync AI generates a personalized roadmap.

The roadmap may include:

* Skills to learn
* Projects to build
* Certifications to consider
* Portfolio improvements
* Weekly learning plan
* Estimated improvement timeline

This helps candidates move from “not ready yet” to “ready with a clear action plan.”

---

### AI Career Coach

CareerSync AI includes an AI-powered chatbot that acts as a personal career assistant.

Candidates can ask questions such as:

* Am I suitable for this internship?
* What should I learn next?
* How can I improve my portfolio?
* What career path fits me best?
* Why is my match score low?
* How do I become more employable?

The AI Career Coach responds based on the candidate’s profile, latest job analysis, roadmap, and interview results.

---

### AI Mock Interview Test

CareerSync AI includes a mock interview test feature for candidates.

Users can choose:

* Role-based interview
* Job-description-based interview
* Technical interview
* Behavioral interview
* Project-based interview
* Mixed interview

The system generates interview questions based on the candidate’s target role and profile.

---

### Interview Answer Evaluation

After the candidate answers a question, the AI evaluates the response and provides:

* Answer score
* Strengths
* Weaknesses
* Improved sample answer
* Technical accuracy feedback
* Communication feedback
* Suggested improvement tips

---

### Interview Readiness Score

After completing a mock interview, CareerSync AI generates an interview readiness score based on:

* Technical accuracy
* Communication clarity
* Project explanation
* Problem-solving ability
* Confidence
* Role relevance

The system also recommends a personalized interview practice plan.

---

## Employer Features

### Employer Dashboard

Employers can access a dedicated dashboard to manage job roles, candidate matches, and hiring insights.

The dashboard includes:

* Active job descriptions
* Recommended candidates
* Candidate match scores
* Shortlisted candidates
* AI hiring insights
* Candidate fit summaries

---

### Smart Talent Matching

Employers can paste a job description and receive ranked candidate recommendations based on:

* Skill match
* Project relevance
* Experience fit
* Missing requirements
* Growth potential
* Interview readiness

This helps employers identify suitable candidates faster and more accurately.

---

### Candidate Fit Report

For each candidate, CareerSync AI generates an employer-facing report containing:

* Candidate match score
* Relevant skills
* Project evidence
* Strengths
* Risk areas
* Missing requirements
* Recommended hiring decision

Example recommendation:

> This candidate is a strong fit for a Frontend Developer Internship due to React.js, JavaScript, and UI project experience. However, they may need support in testing and CI/CD workflows.

---

### Growth Potential Score

CareerSync AI does not only evaluate where a candidate is today. It also estimates whether the candidate can grow into the role with reasonable training.

The score considers:

* Current skill foundation
* Learning roadmap
* Related project experience
* Transferable skills
* Career direction

---

### AI Interview Question Generator

Employers can generate interview questions based on:

* Job description
* Candidate profile
* Candidate skill gaps
* Required role responsibilities

This helps employers conduct more focused and fair interviews.

---

### Talent Pipeline Board

Employers can manage candidates through a simple hiring pipeline:

* Recommended
* Shortlisted
* Interview
* Offer
* Rejected

Each candidate card displays key information such as match score, readiness level, strongest skills, and AI summary.

---

## University Features

### University Readiness Dashboard

Universities can view aggregated student employability data, including:

* Average career readiness score
* Internship readiness percentage
* Most common missing skills
* Strongest career tracks
* Students needing support
* Cohort-level readiness trends

---

### Adaptive Readiness Profile

Each student can have a readiness profile that grows over time through:

* Coursework
* Projects
* Certifications
* Internships
* Career activities
* Mock interview results
* Portfolio improvements

This helps universities track student employability development continuously.

---

### Curriculum Skill Gap Map

CareerSync AI compares university-taught skills with real employer job requirements.

Example comparison:

**University curriculum:**

* Java
* Database systems
* Web development
* Software engineering principles

**Employer demand:**

* React.js
* Node.js
* Docker
* Cloud deployment
* CI/CD
* Testing

The platform highlights curriculum-to-market gaps and helps universities improve career preparation.

---

### Cohort Employability Heatmap

Universities can view readiness by career track, such as:

* Frontend readiness
* Backend readiness
* Full-stack readiness
* Cloud readiness
* DevOps readiness
* Data readiness
* UI/UX readiness

This gives academic teams better visibility into student strengths and weaknesses.

---

### Internship Matching Support

University career offices can match students to internship opportunities based on:

* Skills
* Readiness score
* Career interests
* Portfolio evidence
* Job requirements

---

## Authentication

CareerSync AI uses Firebase Authentication for secure user login and registration.

Supported authentication features:

* Candidate registration
* Employer registration
* University registration
* Login
* Logout
* Role selection
* Protected routes
* User-owned data access
* Firebase ID token verification through backend

User roles:

```txt
candidate
employer
university
```

Each role is redirected to the correct dashboard after login.

---

## AI and Cloud Architecture

CareerSync AI uses Azure AI services to power the intelligence layer of the platform.

### Azure AI Foundry / Azure OpenAI

Used for:

* Job match analysis
* Skill gap detection
* Roadmap generation
* Career path recommendation
* AI Career Coach responses
* Mock interview feedback
* Employer fit reports

---

### Azure Document Intelligence

Used for extracting structured data from resumes and certificates, including:

* Education
* Skills
* Work experience
* Projects
* Certifications
* Dates
* Resume sections

---

### Azure Blob Storage

Used for storing:

* Resume PDFs
* Certificates
* Portfolio screenshots
* Project evidence files
* Employer job description files

---

### Azure AI Search

Used for profile-based search and retrieval. It helps the AI Career Coach and analysis engine retrieve the most relevant portfolio evidence before generating personalized responses.

---

### Azure Cosmos DB / MongoDB

Used for storing:

* User profiles
* Candidate skills
* Projects
* Job analyses
* Roadmaps
* Chat history
* Mock interview results
* Employer reports
* University readiness data

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Lucide React Icons
* Framer Motion

### Backend

* Node.js
* Express.js

### Authentication

* Firebase Authentication
* Firebase Admin SDK

### Database

* MongoDB
* Azure Cosmos DB for MongoDB API

### AI and Cloud

* Azure AI Foundry / Azure OpenAI
* Azure Document Intelligence
* Azure Blob Storage
* Azure AI Search
* Azure Application Insights

### Deployment

* Azure Static Web Apps
* Azure App Service
* Vercel / Render as optional alternatives

---

## System Architecture

```txt
React Frontend
        ↓
Firebase Authentication
        ↓
Node.js + Express Backend
        ↓
Firebase Admin Token Verification
        ↓
MongoDB / Azure Cosmos DB
        ↓
Azure AI Foundry / Azure OpenAI
        ↓
Career Match Results, Roadmaps, AI Coach, Mock Interview Feedback
```

---

## Main User Flow

### Candidate Flow

```txt
Register / Login
→ Create Living Portfolio
→ Upload Resume / Add Skills
→ Paste Job Description
→ Generate AI Match Analysis
→ View Skill Gaps
→ Generate Career Roadmap
→ Practice Mock Interview
→ Ask AI Career Coach
```

### Employer Flow

```txt
Register / Login
→ Create Employer Profile
→ Add Job Description
→ View Candidate Matches
→ Open Candidate Fit Report
→ Generate Interview Questions
→ Manage Talent Pipeline
```

### University Flow

```txt
Register / Login
→ View Readiness Dashboard
→ Monitor Student Skill Gaps
→ Review Cohort Heatmap
→ Analyze Curriculum Gaps
→ Support Internship Matching
```

---

## Example AI Job Match Output

```json
{
  "role": "Frontend Developer Intern",
  "company": "TechNova Solutions",
  "matchScore": 82,
  "matchedSkills": [
    "React.js",
    "JavaScript",
    "HTML",
    "CSS",
    "Node.js",
    "Git"
  ],
  "missingSkills": [
    "Docker",
    "CI/CD",
    "Unit Testing",
    "AWS Basics"
  ],
  "summary": "The candidate is a strong match for this role due to relevant frontend development experience and practical React.js projects.",
  "recommendations": [
    "Build one project using Docker",
    "Add unit testing with Vitest or Jest",
    "Deploy a full-stack project",
    "Improve portfolio documentation"
  ]
}
```

---

## Installation and Setup

Clone the repository:

```bash
git clone https://github.com/your-username/careersync-ai.git
```

Navigate into the project folder:

```bash
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

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

AZURE_OPENAI_ENDPOINT=your_azure_openai_endpoint
AZURE_OPENAI_API_KEY=your_azure_openai_api_key
AZURE_OPENAI_DEPLOYMENT=your_model_deployment_name
AZURE_OPENAI_API_VERSION=your_api_version

AZURE_STORAGE_CONNECTION_STRING=your_azure_blob_storage_connection_string
AZURE_AI_SEARCH_ENDPOINT=your_azure_ai_search_endpoint
AZURE_AI_SEARCH_KEY=your_azure_ai_search_key

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_BASE_URL=http://localhost:5000

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

## Run the Project

Start the backend server:

```bash
cd server
npm run dev
```

Start the frontend:

```bash
cd client
npm run dev
```

Open the application:

```txt
http://localhost:5173
```

---

## API Modules

### Authentication

```txt
POST /api/auth/register-role
GET /api/auth/me
```

### Candidate Profile

```txt
POST /api/profile
GET /api/profile/me
PUT /api/profile/me
```

### Job Analysis

```txt
POST /api/analyze
GET /api/analysis/me
GET /api/analysis/:id
```

### AI Career Coach

```txt
POST /api/coach
GET /api/coach/history
```

### Mock Interview

```txt
POST /api/interview/generate
POST /api/interview/evaluate
GET /api/interview/history
```

### Employer

```txt
POST /api/employer/jobs
GET /api/employer/matches
GET /api/employer/candidate/:id
POST /api/employer/interview-questions
```

### University

```txt
GET /api/university/readiness
GET /api/university/skill-gaps
GET /api/university/cohort-heatmap
GET /api/university/curriculum-gap
```

---

## Project Goals

CareerSync AI aims to:

* Help students apply for jobs with confidence
* Turn resumes and portfolios into living career profiles
* Provide explainable job match analysis
* Identify realistic skill gaps
* Generate personalized learning roadmaps
* Help candidates prepare for interviews
* Help employers discover suitable talent
* Help universities understand employability readiness
* Support Talentbank’s Career OS vision

---

## Future Improvements

Planned improvements include:

* LinkedIn profile import
* GitHub repository analysis
* Real-time job market trend analysis
* Employer-candidate messaging
* University admin role management
* Advanced analytics dashboard
* AI-generated cover letters
* Video-based mock interview analysis
* Certification recommendation engine
* Multi-language career coaching

---

## Hackathon Context

CareerSync AI was created for the Talentbank Tech Hackathon as a Career OS solution.

The project references multiple challenge modules, including:

* Career OS / Career Marketplace
* Career Path Navigator
* Living Portfolio
* AI Career Coach
* Smart Talent Matching
* Adaptive Readiness Profile

---

## License

This project is for educational, portfolio, and hackathon purposes.

---

## Author

Developed by Htet Aung Lwin.
