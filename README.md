# CareerSync AI

CareerSync AI is an AI-powered career intelligence platform designed to help students, fresh graduates, and internship seekers understand how well they match real-world job opportunities.

The platform analyzes a user's resume, portfolio, skills, projects, and experience against employer job descriptions to generate a detailed career match report, skill gap analysis, personalized learning roadmap, and AI-powered career guidance.

CareerSync AI was developed as part of the Talentbank Tech Hackathon under the Career OS concept, focusing on improving employability, career readiness, and smarter candidate-job matching.

---

## Overview

Many students apply for internships and jobs without knowing whether their skills truly match the employer's expectations. They often struggle to identify missing skills, improve their portfolio, or understand what they need to learn next.

CareerSync AI solves this by acting as an intelligent career copilot. Users can upload their resume or portfolio, paste a job description, and receive instant AI-generated insights about their suitability for the role.

The platform helps users answer important career questions such as:

- Am I suitable for this job?
- What skills am I missing?
- How can I improve my portfolio?
- What should I learn next?
- How can I become more employable?
- Which career path fits my current profile?

---

## Key Features

### AI Job Match Analyzer

CareerSync AI compares the user's resume, portfolio, projects, and skills against a real employer job description.

The system generates:

- Overall job match percentage
- Matched skills
- Missing skills
- Role suitability summary
- Strengths and weaknesses
- AI-generated improvement suggestions

This helps users stop applying blindly and make better career decisions.

---

### Resume and Portfolio Analysis

Users can submit their resume, portfolio link, GitHub profile, or project details. The system analyzes the candidate profile and identifies the most relevant skills, experiences, and project strengths.

The analysis helps users understand how their current profile appears from an employer's perspective.

---

### Skill Gap Detection

CareerSync AI identifies the difference between the user's current skill set and the skills required by the job description.

Example skill gaps may include:

- Docker
- CI/CD
- Cloud deployment
- Unit testing
- API integration
- Database optimization
- Soft skills or communication skills

The platform does not only list missing skills. It also explains why those skills matter and how they can improve the user's employability.

---

### Personalized Career Roadmap

Based on the user's profile and missing skills, CareerSync AI generates a personalized learning roadmap.

The roadmap may include:

- Recommended skills to learn
- Suggested project ideas
- Certification recommendations
- Weekly learning plan
- Career progression steps
- Estimated improvement timeline

This allows users to move from their current skill level toward their target career path in a structured way.

---

### AI Career Coach Chatbot

CareerSync AI includes an interactive AI chatbot that acts as a personal career assistant.

Users can ask questions such as:

- Am I ready for a frontend developer internship?
- What should I learn to become a full-stack developer?
- How can I improve my resume?
- Which skills are most important for this role?
- How do I increase my job match score?

The chatbot provides personalized answers based on the user's profile, job analysis, and career roadmap.

---

### Employer-Candidate Compatibility Insights

CareerSync AI can also support employers and recruiters by helping them understand how well a candidate matches a role.

The system can highlight:

- Candidate strengths
- Missing requirements
- Suitable roles
- Hiring readiness
- Skills that align with the job description

This feature supports faster and smarter early-stage candidate screening.

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Lucide React Icons
- Framer Motion

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### AI Integration

- Groq API
- Llama / GPT-OSS model via GroqCloud

### Authentication

- JWT / Firebase Auth

### Deployment

- Frontend: Vercel
- Backend: Render / Railway

---

## Main Modules

### 1. Landing Page

Introduces CareerSync AI, explains the problem, and presents the main value proposition of the platform.

### 2. Career Dashboard

Displays the user's career readiness score, recent analyses, recommended career paths, skill gaps, and AI insights.

### 3. Job Description Analyzer

Allows users to paste an employer's job description and compare it with their resume or portfolio.

### 4. AI Analysis Results

Shows the AI-generated job match score, matched skills, missing skills, strengths, weaknesses, and recommendations.

### 5. Career Roadmap

Provides a personalized improvement plan to help users increase their employability score.

### 6. AI Career Coach

An AI chatbot that helps users ask career-related questions and receive personalized guidance.

---

## How It Works

1. The user uploads their resume or enters portfolio details.
2. The user pastes a job description.
3. CareerSync AI analyzes the user's profile against the job requirements.
4. The platform generates a match score and skill gap report.
5. The user receives personalized recommendations and a career roadmap.
6. The user can ask follow-up questions through the AI Career Coach.

---

## Example AI Output

```txt
Role: Frontend Developer Intern
Company: TechNova Solutions

Match Score: 82%

Matched Skills:
- React.js
- JavaScript
- HTML
- CSS
- Node.js
- Git
- UI/UX

Missing Skills:
- Docker
- CI/CD
- Unit Testing
- AWS Basics

AI Summary:
You are a strong match for this role because your React.js, JavaScript, UI development, and full-stack project experience align well with the employer's requirements.

Recommendations:
- Build one project using Docker and GitHub Actions
- Add testing with Vitest or Jest
- Deploy a full-stack project using Vercel and Render
- Improve portfolio project documentation