// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router";
import useAuthStore from "../utils/authStore";

const ProtectedRoute = () => {
  const { currentUser } = useAuthStore();
  
  
  if (!currentUser) {
    return <Navigate to="/auth" replace  />;
  }

  return <Outlet />;
}

export default ProtectedRoute;