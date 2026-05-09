import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Spin } from "antd";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toLowerCase();
  // Treat 'teammember' as 'member'
  const normalizedUserRole = userRole === "teammember" ? "member" : userRole;

  if (allowedRoles && !allowedRoles.map(r => r.toLowerCase()).includes(normalizedUserRole)) {
    if (normalizedUserRole === "admin") return <Navigate to="/admin" replace />;
    if (normalizedUserRole === "manager") return <Navigate to="/manager" replace />;
    if (normalizedUserRole === "member") return <Navigate to="/member" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (user) {
    const userRole = user.role?.toLowerCase();
    const normalizedUserRole = userRole === "teammember" ? "member" : userRole;

    if (normalizedUserRole === "admin") return <Navigate to="/admin" replace />;
    if (normalizedUserRole === "manager") return <Navigate to="/manager" replace />;
    if (normalizedUserRole === "member") return <Navigate to="/member" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
