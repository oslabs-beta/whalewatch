import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Auth from "../../Auth";
import logo from '../../assets/logo.gif';

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

  //const { loading, error, data } = useQuery(GET_CONTAINERS);
  //on submitting login info 


  const [login, { data, loading, called, error }] =
    useMutation(LOGIN_MUTATION, {
      variables: {
        username: userData.username,
        password: userData.password
      },
      onError: () => console.log('there is an error'),
      onCompleted: (data) => {
        console.log('this is data inside oncompleted', data)
        Auth.authenticate();
        history.push('/dashboard')
      }
    })
  //console.log('this is username', userData.username)
  // //NEVER ACTUALLY INVOKE THIS FUNCTION 
  // //if auth is validated, change url using history.push
  // //onError: () => console.log('there is an error'),
  // onCompleted: (data) => {
  //   // console.log('this is user', userData.email)
  //   // console.log('thisis pw', userData.password)
  //   // //something with cookies here
  //   // console.log('in login')
  //   // Auth.isAuthenticated();
  //   // history.push('/dashboard');
  //   console.log('this is data inside on completed', data)
  // }


  //console.log('this is the return query result from login', )
  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  // console.log('this is data', data)
  // console.log('this is user', userData.email)
  // console.log('thisis pw', userData.password)
  //something with cookies here
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   login({username: userData.username, password: userData.password})
  // };

  return (
    <div className='authen-box'>
    <div className='authen-box-color'>
    <img src={logo} className='logo'/>
    <h1 className='welcome'>Welcome back! Please login.</h1>
    
    <div className='login-page container text-center'>

      <form onSubmit={e => {e.preventDefault();login()}} className='form-group col-md-8 col-lg-8 mx-auto text-center'>

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
        <br/>

        <div>
          <input className="form-button btn btn-primary" type="submit" value="Log in" />
        </div>
      </form>
      {/* <Link className="signup-or-login" to='/signup'> Don't have an account?</Link> */}
      </div>
   
    </div>
    </div>
  )

}





export default Login;