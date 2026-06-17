import mongoose from "mongoose";

// Sub-schema for project entries
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    techStack: [{ type: String }],
    link: { type: String, default: "" },
  },
  { _id: false }
);

// Sub-schema for education entries
const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, default: "" },
    degree: { type: String, default: "" },
    field: { type: String, default: "" },
    startYear: { type: String, default: "" },
    endYear: { type: String, default: "" },
  },
  { _id: false }
);

// Sub-schema for experience entries
const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, default: "" },
    role: { type: String, default: "" },
    description: { type: String, default: "" },
    startDate: { type: String, default: "" },
    endDate: { type: String, default: "" },
  },
  { _id: false }
);

// Sub-schema for certification entries
const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    issuer: { type: String, default: "" },
    year: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    // Every profile is owned by a single Firebase user
    firebaseUid: { type: String, required: true, unique: true, index: true },

    // Structured education history
    education: [educationSchema],

    // Career interests / target roles (e.g. "Frontend Developer", "Data Analyst")
    careerInterests: [{ type: String }],

    // Flat skill list (e.g. ["React", "Node.js", "Docker"])
    skills: [{ type: String }],

    // Portfolio projects with tech stack and links
    projects: [projectSchema],

    // Professional certifications
    certifications: [certificationSchema],

    // External links
    githubLink: { type: String, default: "" },
    portfolioLink: { type: String, default: "" },

    // Raw resume text — populated by pdf-parse or manual paste
    resumeText: { type: String, default: "" },

    // Work / internship experience
    experience: [experienceSchema],

    // University/institution name — used for university-level aggregation.
    // UniversityInsight queries group profiles by this field.
    institution: { type: String, default: "" },

    // Controls whether this candidate appears in employer smart matching results.
    // Employer matching queries must filter: { optInForEmployerMatching: true }
    optInForEmployerMatching: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
