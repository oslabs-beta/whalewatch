import React from 'react'
import SignUpForm from './SignUpForm';

const Validation = (inputValues) => {
    let errors = {};

    //rules for validation
    if (!inputValues.username) {
 errors.username = "Username is required."
    }
    if (!inputValues.email) {
        errors.email = "Email is required."
    } else if (!/\S+@\S+\.\S+/.test(inputValues.email)) {
        errors.email = "Email is invalid."
    }
    if (!inputValues.password) {
        errors.password = "Password is required."
    } else if (inputValues.password.length < 5){
        errors.password = "Password must be more than 5 characters"
    }

    return errors;
}

export default Validation;
