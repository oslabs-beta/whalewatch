import React from "react";
const jwt = require('jsonwebtoken')
import { Route, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import { useState, useEffect} from 'react';

const ProtectedRoute = ({component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
      //if user is authenticated, return return respective component 
      if(localStorage.getItem('validAuth'))
        return <Component validId={localStorage.getItem('validId')} {...rest}/>
      //else send back to login page 
      else{
        return <Redirect to = {{ pathname: "/login", state: {from: props.location}}}/>
      }
    }} />
  );
}

export default ProtectedRoute;