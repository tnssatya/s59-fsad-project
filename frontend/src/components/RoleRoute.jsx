import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RoleRoute({ role }) {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (currentUser.role !== role) {
    return (
      <Navigate
        to={currentUser.role === "admin" ? "/admin" : "/student"}
        replace
      />
    );
  }

  return <Outlet />;
}

export default RoleRoute;
