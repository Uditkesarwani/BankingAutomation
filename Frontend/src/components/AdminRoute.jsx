import { Navigate } from "react-router-dom";

export default function AdminRoute({ children, user }) {
  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
