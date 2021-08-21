import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Auth from "../../Auth";
//unsure if we need the below - more research required
import {
  useQuery,
  gql
} from '@apollo/client';


const Login = (props) => {
  //add state
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ value: '' });
  const history = useHistory();
  //function to handle changing username
  const handleUsernameInputChange = (e) => {
    e.persist();
    setUserData((userData) => ({
      ...userData, username: e.target.value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    e.persist();
    setUserData((userData) => ({
      ...userData, password: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //do some graphql request here
    //if successful, invoke authenticate
    Auth.authenticate();
    history.push('/');
  };

  return (
    <div className='login-page text-center container'>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>

        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="form-field form-control"
            type="text"
            name="username"
            placeholder="username"
            value={userData.username}
            onChange={handleUsernameInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="form-field form-control"
            type="password"
            name="username"
            placeholder="password"
            value={userData.password}
            onChange={handlePasswordInputChange}
          />
        </div>
        <input className="form-button btn btn-primary" type="submit" value="Log in" />

      </form>
      <div>
        <Link className="signup-or-login" to='/signup'>Sign up</Link></div>
    </div>
  )

}





export default Login;