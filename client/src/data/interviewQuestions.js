export const interviewSets = {
  sarah: {
    targetRole: "Frontend Developer Intern",
    interviewType: "technical",
    questions: [
      { id: 1, question: "Tell me about a React project you built. What was your role, what challenges did you face, and how did you solve them?", category: "React", difficulty: "medium" },
      { id: 2, question: "Explain the difference between useEffect and useLayoutEffect. When would you use each?", category: "React Hooks", difficulty: "medium" },
      { id: 3, question: "How would you optimize a React application that has slow rendering performance?", category: "Performance", difficulty: "hard" },
      { id: 4, question: "Describe how you would implement responsive design for a dashboard component.", category: "CSS", difficulty: "easy" },
      { id: 5, question: "Walk me through how you would handle API error states in a React application.", category: "Error Handling", difficulty: "medium" },
      { id: 6, question: "What is your experience with version control? Describe your Git workflow.", category: "Git", difficulty: "easy" },
      { id: 7, question: "Tell me about a time you received critical feedback on your code. How did you handle it?", category: "Behavioral", difficulty: "medium" },
      { id: 8, question: "If given a design mockup, what is your process for converting it to a working React component?", category: "UI Development", difficulty: "medium" },
    ],
    sampleFeedback: {
      score: 78,
      strengths: ["Clear explanation of project purpose", "Mentioned React hooks and component structure"],
      weaknesses: ["Could include more detail on state management", "Did not mention testing or deployment"],
      improvedAnswer: "I built a task management app using React and Context API for state. I faced performance issues with re-renders and solved them using useMemo and useCallback. I deployed it on Vercel with CI/CD via GitHub Actions.",
      tips: ["Use the STAR method (Situation, Task, Action, Result)", "Quantify impact where possible"],
    },
  },

  jason: {
    targetRole: "Junior Data Analyst",
    interviewType: "technical",
    questions: [
      { id: 1, question: "Walk me through how you would clean a messy dataset with missing values and duplicates.", category: "Data Cleaning", difficulty: "easy" },
      { id: 2, question: "Explain the difference between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN with examples.", category: "SQL", difficulty: "medium" },
      { id: 3, question: "How would you design a dashboard to track e-commerce KPIs? What metrics would you include?", category: "Visualization", difficulty: "medium" },
      { id: 4, question: "Describe a situation where your data analysis led to a different conclusion than expected.", category: "Behavioral", difficulty: "medium" },
      { id: 5, question: "What is the difference between correlation and causation? Give a real-world example.", category: "Statistics", difficulty: "easy" },
      { id: 6, question: "How would you approach an A/B test to determine if a new feature improves user engagement?", category: "Experimentation", difficulty: "hard" },
      { id: 7, question: "Explain what a data pipeline is and how you would build one using Python.", category: "Data Engineering", difficulty: "hard" },
      { id: 8, question: "If you found an anomaly in your sales data, what steps would you take to investigate?", category: "Problem Solving", difficulty: "medium" },
    ],
    sampleFeedback: {
      score: 72,
      strengths: ["Good understanding of statistical concepts", "Mentioned practical tools and workflows"],
      weaknesses: ["Answer lacked specific examples from projects", "Did not discuss edge cases in data cleaning"],
      improvedAnswer: "I would first check for missing values using df.isnull().sum(), then decide per-column whether to impute (median for numeric, mode for categorical) or drop rows. I'd remove duplicates with df.drop_duplicates() and validate dtypes before analysis.",
      tips: ["Reference specific projects when answering", "Show your thought process step-by-step"],
    },
  },

  aina: {
    targetRole: "Full Stack Developer Intern",
    interviewType: "technical",
    questions: [
      { id: 1, question: "Explain the request-response lifecycle in an Express.js application with middleware.", category: "Backend", difficulty: "medium" },
      { id: 2, question: "How would you design a database schema for a multi-tenant SaaS application?", category: "Database Design", difficulty: "hard" },
      { id: 3, question: "Describe how you would implement JWT authentication in a Node.js API.", category: "Security", difficulty: "medium" },
      { id: 4, question: "What is Docker and why would you use it? Walk me through Dockerizing a Node.js app.", category: "DevOps", difficulty: "medium" },
      { id: 5, question: "How do you handle database migrations in a production environment?", category: "Database", difficulty: "hard" },
      { id: 6, question: "Tell me about a bug that took you a long time to find. What was the debugging process?", category: "Behavioral", difficulty: "medium" },
      { id: 7, question: "Explain the difference between SQL and NoSQL databases. When would you use each?", category: "Database", difficulty: "easy" },
      { id: 8, question: "How would you design a real-time notification system using WebSockets?", category: "Architecture", difficulty: "hard" },
    ],
    sampleFeedback: {
      score: 85,
      strengths: ["Strong technical depth with real project examples", "Good understanding of deployment and DevOps"],
      weaknesses: ["Could improve explanation of trade-offs between approaches", "Should mention monitoring and observability"],
      improvedAnswer: "I would use jsonwebtoken to sign a JWT on login containing the user ID and role. The token is sent in the Authorization header. Middleware verifies and decodes it on each request. I'd add refresh token rotation and store hashed refresh tokens in the database for security.",
      tips: ["Discuss trade-offs (JWT vs. sessions, SQL vs. NoSQL)", "Mention security considerations proactively"],
    },
  },
};

export const readinessDimensions = {
  sarah: [
    { label: "Technical accuracy", score: 80 },
    { label: "Communication", score: 75 },
    { label: "Project explanation", score: 82 },
    { label: "Problem solving", score: 70 },
    { label: "Confidence", score: 76 },
    { label: "Role relevance", score: 85 },
  ],
  jason: [
    { label: "Technical accuracy", score: 72 },
    { label: "Communication", score: 80 },
    { label: "Project explanation", score: 68 },
    { label: "Problem solving", score: 74 },
    { label: "Confidence", score: 70 },
    { label: "Role relevance", score: 78 },
  ],
  aina: [
    { label: "Technical accuracy", score: 88 },
    { label: "Communication", score: 78 },
    { label: "Project explanation", score: 85 },
    { label: "Problem solving", score: 82 },
    { label: "Confidence", score: 80 },
    { label: "Role relevance", score: 90 },
  ],
};
