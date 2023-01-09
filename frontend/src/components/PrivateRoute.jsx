import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthState";

import React from "react";

const PrivateRoute = () => {
  const { loggedIn, checkStatus } = useAuthStatus();
  if (checkStatus) {
    return <h2>Loading</h2>;
  }
  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
