import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PersonaProvider } from "./context/PersonaContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PersonaProvider>
          <App />
        </PersonaProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
