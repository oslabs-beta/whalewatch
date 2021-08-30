import Auth from "./Auth";
import React from 'react';
import Login from "./components/authentication/Login";

export const withAuth = (Component) => {
  return () => {
    console.log('this is component', Component)
    // Check if Authenticated
    const user = Auth.getAuth();
    console.log('Authorization is', user)
    // If Logged in, it will render the Component.
    if (user) {
      console.log('in user')
      return <Component user={user} />;
    } else {
      console.log('why did user change', user)
      return <Login />
    }
  };
};