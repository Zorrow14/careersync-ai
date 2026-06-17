import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

// Redirects unauthenticated users to /login.
// Shows nothing while Firebase auth state is loading.
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
