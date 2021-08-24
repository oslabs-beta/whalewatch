import React, {useState, useEffect} from 'react';
import Validation from './validation.js';
import {useMutation,gql} from '@apollo/client';
import { Link, useHistory } from "react-router-dom";
import logo from '../../assets/logo.gif';

const REGISTER_USER = gql`
mutation addUser (
  $username: String!
  $email: String!
  $password: String!
) {
  addUser(
      username: $username
      email: $email
      password: $password
    )
}
`

const SignUpForm = (props) => {
    const {submitForm} = props;
    const [inputValues, setValues] = useState({
        username:'',
        email:'',
        password:''
    });

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);

    const handleChange = (event) => {
        setValues({
            ...inputValues,
            // Note: need to understand this line better to match Rachel's
            [event.target.name]: event.target.value,
        })

    };

    const [addUser] = useMutation(REGISTER_USER, {
      variables: inputValues,
      onCompleted:({signup}) => {
        Auth.isAuthenticated();
      history.push('/');
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
    if(Object.keys(errors).length === 0 && dataIsCorrect) {
        submitForm(true);
    }
    }, [errors])




    return (
        <div className='login-page text-center container'>
            <div className='board'>
          <img src={logo} className='logo'/>
            <h1 className='test'>Welcome! Create Your Account.</h1>
            <form className='form-group col-md-5 col-lg-5 mx-auto'>
                <div className='name'>
                    <label className='label'>Username:</label>
                    <input className='form-field form-control' type='text' name='username' value={inputValues.username} onChange={handleChange}/>
                    {errors.username && <p className='error-message'>{errors.username}</p>}
                </div>
                <div className='form-group'>
                    <label className='label'>Email:</label>
                    <input className='form-field form-control' type='email' name='email' value={inputValues.email} onChange={handleChange}/>
                    {errors.email && <p className='error-message'>{errors.email}</p>}
                </div>
                <div className='form-group'>
                    <label className='label'>Password:</label>
                    <input className='form-field form-control' type='password' name='password' value={inputValues.password} onChange={handleChange}/>
                    {errors.password && <p className='error-message'>{errors.password}</p>}
                </div>
                <div>
                    <button className='form-button btn btn-primary' onClick={handleFormSubmit}>Sign Up</button>
                </div>
            </form>
            <Link className="signup-or-login" to='/login'>Already have an cccount?</Link>
        </div>
        </div>


    )
}



export default SignUpForm