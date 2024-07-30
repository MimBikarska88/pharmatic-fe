import React from "react";
import { Navigate } from "react-router-dom";

const AuthorizedRoute = ({ component, role, allowedRoles, navigate }) => {
  if (!allowedRoles.includes(role)) {
    return <Navigate to={navigate} replace />;
  }

  return component;
};

export default AuthorizedRoute;
