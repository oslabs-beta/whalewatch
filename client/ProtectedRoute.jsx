import React from "react";

import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Cookies from 'js-cookie';
import { useState, useEffect, useContext } from 'react';
import AuthApi from './Context.js'
//returning a route with a comoponent that is passed in
const ProtectedRoute = ({auth, userId, component: Component, ...rest }) => {
  console.log('protected route', auth)
  console.log('this is protected route cookie', Cookies.get('refresh-token'))
  const Auth = React.useContext(AuthApi);

  useEffect(() =>{
    const user = Cookies.get('refresh-token')
    console.log('this is protected route cookie', user)
    if(user){
      Auth.value[1](true)
    }
    else Auth.value[1](false)
  })

  return (
    <Route
      {...rest}
      render={(props) => {
      //if user is authenticated, return this path
      if(auth)
        return <Component auth={auth} userId = {userId} {...rest}/>
      else{
        <Redirect to = {{ pathname: "/login", state: {from: props.location}}}/>
      }
    
    }} />
      //Auth.getAuth() ? <DashboardContainer {...props} /> : <Redirect to="/login" />} />
  );
}

export default ProtectedRoute;