import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // token is stored on login

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;