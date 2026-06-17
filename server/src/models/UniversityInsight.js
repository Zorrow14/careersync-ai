import mongoose from "mongoose";

// Stores a snapshot of aggregated readiness analytics for a university cohort.
// One document per university user per generation run.
// University dashboard queries are scoped by firebaseUid (the university account).
//
// Note: profile-level aggregation uses Profile.institution to group students.
// Only profiles where institution === this university's name are included.
// University users cannot access individual candidate profile documents directly.

const trackReadinessSchema = new mongoose.Schema(
  {
    // Career track name (e.g. "Frontend", "Backend", "Data", "DevOps", "UI/UX")
    track: { type: String, default: "" },
    averageScore: { type: Number, default: 0 },   // 0–100
    studentCount: { type: Number, default: 0 },
  },
  { _id: false }
);

const skillGapEntrySchema = new mongoose.Schema(
  {
    skill: { type: String, default: "" },
    // How many students in the cohort are missing this skill
    affectedCount: { type: Number, default: 0 },
    priority: { type: String, enum: ["high", "medium", "low"], default: "medium" },
  },
  { _id: false }
);

const universityInsightSchema = new mongoose.Schema(
  {
    // Owner — the university account's firebaseUid
    firebaseUid: { type: String, required: true, index: true },

    // Display name of the university / institution
    institutionName: { type: String, default: "" },

    // Overall cohort readiness score (0–100)
    averageReadinessScore: { type: Number, default: 0 },

    // Percentage of students deemed employment-ready (score >= threshold)
    readinessPercentage: { type: Number, default: 0 },

    // Total number of students included in this snapshot
    totalStudents: { type: Number, default: 0 },

    // Readiness breakdown by career track (for the heatmap)
    trackBreakdown: [trackReadinessSchema],

    // Top skill gaps across the cohort (for the curriculum gap map)
    topSkillGaps: [skillGapEntrySchema],

    // Skills the university curriculum currently covers (manually entered or AI-extracted)
    taughtSkills: [{ type: String }],

    // Skills employers are currently demanding (aggregated from EmployerJob requiredSkills)
    marketDemandedSkills: [{ type: String }],

    // Skills present in market demand but absent from taughtSkills
    curriculumGap: [{ type: String }],

    // Strongest career tracks by average score
    strongestTracks: [{ type: String }],

    // Student support flags — candidates whose score is below a threshold
    studentsNeedingSupport: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const UniversityInsight = mongoose.model("UniversityInsight", universityInsightSchema);
export default UniversityInsight;
