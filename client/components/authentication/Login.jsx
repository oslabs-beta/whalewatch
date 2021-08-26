import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Auth from "../../Auth";

//unsure if we need the below - more research required
import {
  useMutation,
  gql
} from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!){
    validateUser(username: $username, password: $password){
      id
      username
      password
    }
  }
`;

const Login = (props) => {
  //add state
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState({ value: '' });
  const history = useHistory();
  //function to handle changing username
  const handleUsernameInputChange = (e) => {
    e.persist();
    console.log('hi from handle username')
    setUserData((userData) => ({
      ...userData, username: e.target.value,
    }));
    console.log('this is username', userData.username)
  };

  const handlePasswordInputChange = (e) => {
    e.persist();
    setUserData((userData) => ({
      ...userData, password: e.target.value,
    }));
  };

  //on submitting login info 
  const [login, {data,loading, error}] = 
  useMutation(LOGIN_MUTATION, {
    variables: {
    username: userData.username,
    password: userData.password
    },
    onError: () => console.log('there is an error'),
    onCompleted: (data) => {
      console.log('this is data inside oncompleted', data)
      Auth.login( () =>{
        history.push('/dashboard')
      })
    }  
  })
  //something with cookies here
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login({username: userData.username, password: userData.password})
  // };

  return (
    <div className='login-page text-center container'>
      <h2>Log In</h2>
      <form onSubmit={e => { e.preventDefault(); login() }}>
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
        <Link className="signup-or-login" to='/signup'> Don't have an account?</Link></div>
    </div>
  )
}

export default Login;