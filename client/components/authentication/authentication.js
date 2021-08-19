import React from "react";
import { useState } from 'react';
import { Link, useHistory } from "react-router-dom";



const Authentication = (props) => {
  //add state
  const [userData, setUserData] = useState({ username: '', password: '' });
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

    history.push('/');
  };

  return (
    <div className='login-page'>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          className="form-field"
          type="text"
          name="username"
          placeholder="username"
          value={userData.username}
          onChange={handleUsernameInputChange}
        />
        <input
          id="password"
          className="form-field"
          type="password"
          name="username"
          placeholder="password"
          value={userData.password}
          onChange={handlePasswordInputChange}
        />
        <input className="form-button" type="submit" value="login" />
      </form>
      <Link className="signup-or-login" to='/signup'>Sign up</Link>
    </div>
  )

}





export default Authentication;