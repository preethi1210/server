import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux"
const ForgetPassword = () => {
    const [emailSent,setEmailSent]=useState(false);
    const [email,setEmail]=useState("");
    const {loading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmail));
    }
  return (
    <div>
{
    loading?(
        <div>loading...</div>
    ):(
        <div>
        <h1>{
        !emailSent?"Reset your password":"Check your email"
       
     } </h1>
        <p>
        {
            !emailSent? "Have no fear.We'll email you instructions to reset your password.If you dont have access to your email we can try account recovery":`
                we have sent the reset email to ${email}`
        }</p>
        <form onSubmit={handleOnSubmit}>
        {!emailSent && (
            <label>
            <p>Email Address*</p>
            <input required type='email' name='email' val={email} onChange={(e)=>createSerializableStateInvariantMiddleware(e.target.value)} placeholder='Enter your email address' />
          
            </label>
        )

        }
        <button type='submit' >
        {!emailSent?"Reset password":"Resend email"}
        </button>
        </form>
        <div>
        <Link to="/login">
        <p>Back to login</p>
        </Link>
        </div>
        </div>
    )
}

    </div>
  )
}

export default ForgetPassword
