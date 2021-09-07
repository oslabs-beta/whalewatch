import React from "react";
const jwt = require('jsonwebtoken')
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import Cookies from 'js-cookie';
import { useState, useEffect, useContext } from 'react';
import AuthApi from './Context.js'
//returning a route with a comoponent that is passed in
const ProtectedRoute = ({component: Component, ...rest }) => {

  console.log('this is protected route cookie', Cookies.get('refresh-token'))
  const Auth = React.useContext(AuthApi);
  console.log('this is protected route auth',)
  // useEffect(() =>{
  //   const user = Cookies.get('refresh-token')
  //   console.log('this is protected route cookie', user)
  //   if(user){
  //     Auth.value[1](true)
  //     console.log('usertrue')
  //     console.log('protected route auth', Auth)
  //   }
  //   //else Auth.value[1](false)
  // })

  return (
    <Route
      {...rest}
      render={(props) => {
      //if user is authenticated, return this path
      console.log('jwtsign', jwt.sign({ userId: localStorage.getItem('validAuth')}, 'Dockerpalsarecuties', { expiresIn: '15min' }))
      if(localStorage.getItem('validAuth'))
        return <Component validId={localStorage.getItem('validId')} {...rest}/>
        //return <Route {...props}></Route>
      else{
        return <Redirect to = {{ pathname: "/login", state: {from: props.location}}}/>
      }
    
    }} />
      //Auth.getAuth() ? <DashboardContainer {...props} /> : <Redirect to="/login" />} />
  );
}

export default ProtectedRoute;