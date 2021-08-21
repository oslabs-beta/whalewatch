import React, {useState} from 'react';


const SignUpForm = () => {

    const [inputValues, setValues] = useState({
        fullname:'',
        email:'',
        password:''
    });


    const handleChange = (event) => {
        setValues({
            ...inputValues,
            [event.target.name]: event.target.value,
        })

    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <div>
            <h1 className='SignUpTitle'>Welcome! Creat Your Account</h1>
            <form className='SignUpForm'>
                <div className='name'>
                    <label className='label'>Full Name</label>
                    <input className='input' type='text' name='fullName' value={inputValues.fullname}/>
                </div>
                <div className='email'>
                    <label className='label'>Email</label>
                    <input className='input' type='email' name='email' value={inputValues.email}/>
                </div>
                <div className='password'>
                    <label className='label'>Password</label>
                    <input className='input' type='password' name='password' value={inputValues.password} />
                </div>
                <div>
                    <button className='signup-submit-btn' onClick={handleFormSubmit}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm;
