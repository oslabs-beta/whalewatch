import React from 'react'
import { Link, useHistory } from "react-router-dom";
import {useQuery,gql} from '@apollo/client';

const SignUpSuccess = () => {
    return (
        <div>
            <h1 className='SignUp-Success'>Your Account Is Created!</h1>
        </div>
    )
}

export default SignUpSuccess;
