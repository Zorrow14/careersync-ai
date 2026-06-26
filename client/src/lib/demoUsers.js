/**
 * Demo entry presets for the judge one-click login bypass.
 *
 * Each role maps to a display name, email, and the landing route after login.
 * Used by the landing page, login, register, and the `?demo=<role>` deep link
 * so judges can enter any view without typing credentials.
 */

export const demoUsers = {
  candidate: {
    role: "candidate",
    name: "Sarah Tan",
    email: "sarah.tan@careersync.demo",
    label: "Candidate",
    desc: "Students & graduates planning their careers",
    home: "/dashboard",
  },
  employer: {
    role: "employer",
    name: "TechNova Recruiter",
    email: "recruiter@technova.demo",
    label: "Employer",
    desc: "Recruiters discovering and tracking talent",
    home: "/employer",
  },
  university: {
    role: "university",
    name: "UM Career Office",
    email: "careers@university.demo",
    label: "University",
    desc: "Faculties tracking cohort employability",
    home: "/university",
  },
};

export const roleHome = {
  candidate: "/dashboard",
  employer: "/employer",
  university: "/university",
};
