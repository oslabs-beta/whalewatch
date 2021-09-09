import React, { useState } from 'react'
import SignUpForm from './SignUpForm.js';


const Form = (props) => {
  const [formIsSubmit, setFormIsSubmitted] = useState(false);
  const submitForm = () => {
    setFormIsSubmitted(true);
  };
  return (
    <div>
      <SignUpForm submitForm={submitForm} />
    </div>
  )
};
export default Form;
