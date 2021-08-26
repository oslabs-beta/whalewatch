import React from "react";
import { useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

//returning a route with a comoponent that is passed in
const ProtectedRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={(props) => {
      //if user is authenticated, return this path
      if(Auth.getAuth()){
        return <Component {...props} />
      }
      else{
        return <Redirect to = {
          {
            pathname:  "/"
          }
        }/>
      }
    
    }} />
      //Auth.getAuth() ? <DashboardContainer {...props} /> : <Redirect to="/login" />} />
  );
}

export default ProtectedRoute;