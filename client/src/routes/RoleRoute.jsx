import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const roleDefaults = {
  candidate: "/dashboard",
  employer: "/employer",
  university: "/university",
};

// Use this to guard a route that belongs to a specific role.
// If the logged-in user has a different role they are redirected to their own home.
export default function RoleRoute({ children, allowedRole }) {
  const { user, role, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (role && role !== allowedRole) {
    return <Navigate to={roleDefaults[role] || "/dashboard"} replace />;
  }

  return children;
}
