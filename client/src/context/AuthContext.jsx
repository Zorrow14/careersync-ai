/**
 * Demo-mode AuthContext.
 *
 * Stores the session entirely in localStorage — no Firebase, no backend calls.
 * The public API (user, role, loading, logout) is identical to the original so
 * that every other file (ProtectedRoute, RoleRoute, Sidebar, useAuth) keeps
 * working without changes beyond removing Firebase-specific checks.
 *
 * demoLogin(role, name) — call this from Login / Register to create a session.
 * logout()              — clears the session and returns to /.
 */

import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const SESSION_KEY = "careersync_demo_session";

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession());

  // Derive the same shape the rest of the app expects:
  //   user   — truthy when logged in; exposes displayName and email
  //   role   — "candidate" | "employer" | "university"
  //   loading — always false (no async init needed)
  const user = session
    ? { displayName: session.name, email: session.email || "" }
    : null;
  const role = session?.role ?? null;

  function demoLogin(role, name = "Demo User", email = "") {
    const newSession = { role, name, email };
    saveSession(newSession);
    setSession(newSession);
  }

  function logout() {
    clearSession();
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ user, role, loading: false, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
