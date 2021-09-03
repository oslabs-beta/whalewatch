import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Auth from "../../Auth";
import logo from '../../assets/logo.gif';
import Cookies from 'js-cookie';
import AuthApi from '../../Context.js'
//unsure if we need the below - more research required
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

  // token
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

  const Auth = React.useContext(AuthApi);
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

  //on submitting login info 
  const [login, { data, loading, error }] =
    useMutation(LOGIN_MUTATION, {
      variables: {
        username: userData.username,
        password: userData.password
      },
      onError: (err) => console.log('there is an error', err),
      onCompleted: (data) => {
        console.log('this is data inside oncompleted', data)
        if(data.validateUser){
          Cookies.set('id', data.validateUser.id)
          console.log('this is my cookie', Cookies.get('access-token'))
          console.log('this is my cookie refresh token', Cookies.get('refresh-token'))
          Auth.value[1](true)
          console.log('inside login component this is currentAuth',Auth)
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