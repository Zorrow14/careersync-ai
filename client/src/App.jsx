import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

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

// Employer + University placeholders
import EmployerDashboard from "./pages/employer/Dashboard";
import UniversityDashboard from "./pages/university/Dashboard";

const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/verify-email"];
const PUBLIC_ROUTES = ["/", ...AUTH_ROUTES];

export default function App() {
  const location = useLocation();
  const isPublic = PUBLIC_ROUTES.includes(location.pathname);

  const [lightMode, setLightMode] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

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
        <div className="flex">
          <Sidebar lightMode={lightMode} setLightMode={setLightMode} />

          <main className="ml-64 min-h-screen w-full p-8">
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
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
}
