import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import Results from "./pages/Results";
import Roadmap from "./pages/Roadmap";
import Chatbot from "./pages/Chatbot";

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

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
      {isLanding ? (
        <Routes>
          <Route
            path="/"
            element={
              <Landing lightMode={lightMode} setLightMode={setLightMode} />
            }
          />
        </Routes>
      ) : (
        <div className="flex">
          <Sidebar lightMode={lightMode} setLightMode={setLightMode} />

          <main className="ml-64 min-h-screen w-full p-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analyzer" element={<Analyzer />} />
              <Route path="/results" element={<Results />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/chatbot" element={<Chatbot />} />
            </Routes>
          </main>
        </div>
      )}
    </div>
  );
}