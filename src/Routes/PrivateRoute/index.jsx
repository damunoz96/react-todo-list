/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export function PrivateRoute() {
  const { isAuth } = useUser();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
}