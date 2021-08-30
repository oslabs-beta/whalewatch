import React, { useState, useEffect } from 'react';
import Validation from './validation.js';
import { useMutation, gql } from '@apollo/client';
import { Link, useHistory } from "react-router-dom";
import logo from '../../assets/logo.gif';
import Auth from '../../Auth.js';


const style = {
  signupOrLogin: {
    top: '-120px',
    right: '40px',
    color: '#0275d8',
    size: '15px',
  }
};

const REGISTER_USER = gql`
mutation addUser ($username: String!, $email: String!, $password: String!) {
  addUser(
      username: $username
      email: $email
      password: $password
    ){
      id
      username
      email
      password  
    }
}
`;

const SignUpForm = (props) => {
  const { submitForm } = props;
  const { setUserId } = props.route;
  const [inputValues, setValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);
  const history = useHistory();

  const handleChange = (event) => {
    //same as writing setValues({username: e.target.value})
    setValues({
      ...inputValues,
      // Note: need to understand this line better to match Rachel's
      [event.target.name]: event.target.value,
    })

  };

  const [addUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    variables: inputValues,
    onCompleted: (data) => {
      setUserId(data.id);
      Auth.login(() => {
        history.push('/dashboard')
      })
    }
  })

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Note: need to understand this line better to match Rachel's
    setErrors(Validation(inputValues))
    setDataIsCorrect(true);
    addUser();

  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      submitForm(true);
    }
  }, [errors])




  return (
    <div>
      <Link className="signup-or-login" to='/login' style={style.signupOrLogin}>Already have an account?</Link>
      <div className='authen-box '>
        <div className='authen-box-color'>
          <img src={logo} className='logo' />
          <h1 className='welcome'>Welcome! Create Your Account.</h1>

          <div className='login-page container'>

            <form className='form-group col-md-8 col-lg-8 mx-auto text-center'>

              <div className='form-control-sm'>
                <label className='label'>Username</label>
                <input className='form-field form-control' type='text' name='username' value={inputValues.username} onChange={handleChange} />
                {errors.username && <p className='error-message'>{errors.username}</p>}
              </div>
              <div className='form-control-sm'>
                <label className='label'>Email</label>
                <input className='form-field form-control' type='email' name='email' value={inputValues.email} onChange={handleChange} />
                {errors.email && <p className='error-message'>{errors.email}</p>}
              </div>
              <div className='form-control-sm'>
                <label className='label'>Password</label>
                <input className='form-field form-control' type='password' name='password' value={inputValues.password} onChange={handleChange} />
                {errors.password && <p className='error-message'>{errors.password}</p>}
              </div>
              <br />

              <div>
                <button className='form-button btn btn-primary' onClick={handleFormSubmit}>Sign Up</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}



export default SignUpForm