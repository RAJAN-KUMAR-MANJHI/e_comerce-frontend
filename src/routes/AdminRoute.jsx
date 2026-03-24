

import { Navigate } from "react-router-dom";

export function AdminRoute({ children }) {

   const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ Not admin
  if (role !== "ROLE_ADMIN") {
    return <Navigate to="/" />;
  }

  // ✅ Admin
  return children;
}