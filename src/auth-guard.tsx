import { Navigate, Outlet } from "react-router";

const AuthGuard = () => {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthGuard;
