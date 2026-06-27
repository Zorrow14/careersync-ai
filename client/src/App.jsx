import { Routes, Route, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import AppNavbar from "./components/layout/AppNavbar";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import { useAuth } from "./hooks/useAuth.js";
import { demoUsers } from "./lib/demoUsers.js";

// Public
import Landing from "./pages/public/Landing";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";

// Candidate (existing mock pages)
import Dashboard from "./pages/candidate/Dashboard";
import Analyzer from "./pages/candidate/Analyzer";
import Results from "./pages/candidate/Results";
import Roadmap from "./pages/candidate/Roadmap";
import Chatbot from "./pages/candidate/Chatbot";
import MockInterview from "./pages/candidate/MockInterview";
import ProfileSetup from "./pages/candidate/ProfileSetup";
import JobSearch from "./pages/candidate/JobSearch";
import JobDetails from "./pages/candidate/JobDetails";
import Applications from "./pages/candidate/Applications";
import Companies from "./pages/candidate/Companies";
import CompanyDetails from "./pages/candidate/CompanyDetails";
import CompanyFeed from "./pages/candidate/CompanyFeed";

// Employer
import EmployerDashboard from "./pages/employer/Dashboard";
import EmployerFeed from "./pages/employer/Feed";
import EmployerJobs from "./pages/employer/Jobs";
import TalentDiscovery from "./pages/employer/TalentDiscovery";
import EmployerPipeline from "./pages/employer/Pipeline";
import EmployerCandidateProfile from "./pages/employer/CandidateProfile";
import EmployerAnalytics from "./pages/employer/Analytics";

// University
import UniversityDashboard from "./pages/university/Dashboard";
import EmployabilityTracker from "./pages/university/EmployabilityTracker";
import StudentInsights from "./pages/university/StudentInsights";
import CurriculumInsights from "./pages/university/CurriculumInsights";
import IndustryTrends from "./pages/university/IndustryTrends";
import UniversityReports from "./pages/university/Reports";

// Routes that render WITHOUT the app navbar (full-screen layouts)
const NO_NAV_ROUTES = ["/", "/login", "/register", "/forgot-password", "/verify-email"];

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { demoLogin } = useAuth();
  const isPublic = NO_NAV_ROUTES.includes(location.pathname);

  const [lightMode, setLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    const role = searchParams.get("demo");
    if (role && demoUsers[role]) {
      const u = demoUsers[role];
      demoLogin(u.role, u.name, u.email);
      navigate(u.home, { replace: true });
    }
  }, [searchParams, demoLogin, navigate]);

  useEffect(() => {
    localStorage.setItem("theme", lightMode ? "light" : "dark");
    if (lightMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [lightMode]);

  return (
    <div className="neo-bg min-h-screen transition-colors duration-300">
      {isPublic ? (
        <Routes>
          <Route
            path="/"
            element={<Landing lightMode={lightMode} setLightMode={setLightMode} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      ) : (
        <div className="flex min-h-screen flex-col">
          <AppNavbar lightMode={lightMode} setLightMode={setLightMode} />

          <main
            id="main-content"
            className="neo-page neo-page-app mx-auto w-full max-w-[1600px] flex-1 p-4 sm:p-6 lg:p-8"
          >
            <Routes>
              {/* Candidate routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <Dashboard />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analyzer"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <Analyzer />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <Results />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roadmap"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <Roadmap />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chatbot"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <Chatbot />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/mock-interview"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <MockInterview />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <ProfileSetup />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <JobSearch />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:id"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <JobDetails />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <Applications />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feed"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <CompanyFeed />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companies"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <Companies />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/companies/:id"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="candidate">
                      <CompanyDetails />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />

              {/* Employer routes */}
              <Route
                path="/employer"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="employer">
                      <EmployerDashboard />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/feed"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="employer">
                      <EmployerFeed />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/jobs"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="employer">
                      <EmployerJobs />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/talent"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="employer">
                      <TalentDiscovery />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/pipeline"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="employer">
                      <EmployerPipeline />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/candidates/:candidateId"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="employer">
                      <EmployerCandidateProfile />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employer/analytics"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="employer">
                      <EmployerAnalytics />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />

              {/* University routes */}
              <Route
                path="/university"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="university">
                      <UniversityDashboard />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/university/tracker"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="university">
                      <EmployabilityTracker />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/university/students"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="university">
                      <StudentInsights />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/university/curriculum"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="university">
                      <CurriculumInsights />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/university/trends"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="university">
                      <IndustryTrends />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/university/reports"
                element={
                  <ProtectedRoute>
                    <RoleRoute allowedRole="university">
                      <UniversityReports />
                    </RoleRoute>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <MobileBottomNav />
        </div>
      )}
    </div>
  );
}
