import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import logo from '../../assets/logo.gif';
import Cookies from 'js-cookie';
import {
  useMutation,
  gql
} from '@apollo/client';


const style = {
  signupOrLogin: {
    top: '-120px',
    right: '40px',
    color: '#0275d8',
    size: '15px',
  }
};

// mutation to use upon attempting to login 


// GraphQL login mutation query
const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!){
    validateUser(username: $username, password: $password){
      id
      username
      password
    }
  }
`;

const Login = ({ setUserId }) => {
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
  //function to handle changing password
  const handlePasswordInputChange = (e) => {
    e.persist();
    setUserData((userData) => ({
      ...userData, password: e.target.value,
    }));
  };

  //on submitting login info, invoke mutation to send to graphql 
  const [login, { data, loading, error }] =
    useMutation(LOGIN_MUTATION, {
      variables: {
        username: userData.username,
        password: userData.password
      },
      onError: (err) => console.log('there is an error', err),
      onCompleted: (data) => {
        if (data.validateUser) {
          //if user validated, set a cookie using jwt from backend and store in localStorage
          Cookies.set('id', data.validateUser.id)
          localStorage.setItem('validId', data.validateUser.id)
          localStorage.setItem('validAuth', Cookies.get('access-token'))
          history.push('/dashboard')
        }
      }
    })

  return (
    <div>
      <Link className="signupOrLogin" to='/signup' style={style.signupOrLogin}> Don't have an account?</Link>
      <div className='authen-box'>

        <div className='authen-box-color'>
          <img src={logo} className='logo' />

          <h1 className='welcome'>Welcome back! Please login.</h1>

          <div className='login-page container text-center'>

            <form onSubmit={e => { e.preventDefault(); login() }} className='form-group col-md-8 col-lg-8 mx-auto text-center'>

              <div className='form-control-sm'>
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
              <div className='form-control-sm'>
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
              <br />

              <div>
                <input className="form-button btn btn-primary" type="submit" value="Log in" />
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login;