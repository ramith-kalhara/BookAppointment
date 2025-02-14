import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = localStorage.getItem("userId"); // Get user ID from localStorage

  return userId ? children : <Navigate to="/loginSignup" replace />;
};

export default ProtectedRoute;
