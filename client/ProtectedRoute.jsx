import React from "react";
import { useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

const ProtectedRoute = ({ component: DashboardContainer, ...rest }) => {

  return (
    <Route {...rest} render={(props) => Auth.getAuth() ? <DashboardContainer {...props} /> : <Redirect to="/login" />} />
  );
}

export default ProtectedRoute;