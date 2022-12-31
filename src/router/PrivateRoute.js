import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return "Loading";
  }

  if (user?.uid) {
    return children;
  }
  return <Navigate to="/signin"></Navigate>;
};

export default PrivateRoute;
