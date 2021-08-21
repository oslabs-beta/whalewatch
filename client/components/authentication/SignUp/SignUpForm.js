import React, {useState, useEffect} from 'react';
import Validation from './validation.js';
import {useQuery,gql} from '@apollo/client';
import { Link, useHistory } from "react-router-dom";



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

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Note: need to understand this line better to match Rachel's
        setErrors(Validation(inputValues))
        setDataIsCorrect(true);
    };

    useEffect(() => {
    if(Object.keys(errors).length === 0 && dataIsCorrect) {
        submitForm(true);
    }
    }, [errors])

    return (
        <div className='login-page text-center container'>
            <h1 className='SignUpTitle'>Welcome! Create Your Account.</h1>
            <form className='form-group'>
                <div className='name'>
                    <label className='label'>Username:</label>
                    <input className='form-field form-control' type='text' name='username' value={inputValues.username} onChange={handleChange}/>
                    {errors.username && <p className='error-message'>{errors.username}</p>}
                </div>
                <div className='form-group'>
                    <label className='label'>Email</label>
                    <input className='form-field form-control' type='email' name='email' value={inputValues.email} onChange={handleChange}/>
                    {errors.email && <p className='error-message'>{errors.email}</p>}
                </div>
                <div className='form-group'>
                    <label className='label'>Password</label>
                    <input className='form-field form-control' type='password' name='password' value={inputValues.password} onChange={handleChange}/>
                    {errors.password && <p className='error-message'>{errors.password}</p>}
                </div>
                <div>
                    <button className='form-button btn btn-primary' onClick={handleFormSubmit}>Sign Up</button>
                </div>
            </form>
            <Link className="signup-or-login" to='/authentication'>Already Have An Account?</Link>
        </div>
    )
}

export default SignUpForm