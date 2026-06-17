import mongoose from "mongoose";

// Stores job postings created by employer users.
// Smart Talent Matching queries this collection to find candidates
// whose profiles match the job's requiredSkills.

const employerJobSchema = new mongoose.Schema(
  {
    // Owner — the employer's firebaseUid. Never expose to other employers.
    firebaseUid: { type: String, required: true, index: true },

    // Basic job info
    title: { type: String, required: true },
    company: { type: String, default: "" },
    location: { type: String, default: "" },

    // Full job description text — sent to Azure AI for matching
    jobDescription: { type: String, required: true },

    // Skills explicitly required (extracted or manually entered)
    requiredSkills: [{ type: String }],

    // Nice-to-have skills
    preferredSkills: [{ type: String }],

    // "active" jobs are included in matching; "closed" jobs are archived
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },

    // Talent pipeline: array of candidate firebaseUids keyed by stage.
    // Smart Matching populates the "recommended" list.
    // Only candidates with optInForEmployerMatching: true are eligible.
    pipeline: {
      recommended: [{ type: String }],
      shortlisted: [{ type: String }],
      interview: [{ type: String }],
      offer: [{ type: String }],
      rejected: [{ type: String }],
    },
  },
  { timestamps: true }
);

const EmployerJob = mongoose.model("EmployerJob", employerJobSchema);
export default EmployerJob;
