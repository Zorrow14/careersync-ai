import mongoose from "mongoose";

// Stores one AI job-description analysis result per candidate per run.
// Each document is private to the firebaseUid that created it.

const skillGapSchema = new mongoose.Schema(
  {
    skill: { type: String, default: "" },
    priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
    difficulty: { type: String, enum: ["hard", "medium", "easy"], default: "medium" },
    category: { type: String, default: "" },
    estimatedWeeks: { type: Number, default: 0 },
  },
  { _id: false }
);

const analysisSchema = new mongoose.Schema(
  {
    // Owner — never expose one user's analysis to another
    firebaseUid: { type: String, required: true, index: true },

    // The raw job description text that was analysed
    jobDescription: { type: String, required: true },

    // Optional: role title extracted or provided by the user
    jobTitle: { type: String, default: "" },

    // 0–100 overall match score returned by Azure AI
    matchScore: { type: Number, default: 0 },

    // Skills from the JD that the candidate already demonstrates
    matchedSkills: [{ type: String }],

    // Skills from the JD that the candidate is missing
    missingSkills: [{ type: String }],

    // Candidate strengths relative to this role
    strengths: [{ type: String }],

    // Candidate weaknesses / risk areas relative to this role
    weaknesses: [{ type: String }],

    // Structured gap details with priority, difficulty, and effort estimate
    skillGaps: [skillGapSchema],

    // Short AI-generated narrative summary of the match
    summary: { type: String, default: "" },

    // Actionable recommendations list
    recommendations: [{ type: String }],

    // Suggested career paths based on this analysis
    suggestedPaths: [{ type: String }],

    // Full raw JSON response from Azure AI (kept for debugging and re-rendering)
    rawAIResponse: { type: mongoose.Schema.Types.Mixed, default: null },
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);
export default Analysis;
