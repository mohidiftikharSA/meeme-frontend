import React from "react";
import { Button} from "react-bootstrap";
import classes from '../index.module.scss'
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";

const EmailVerification = () => {
    return (
        <>
        <Logo login start/>
            <div className={classes.loginFrom}>
            <AuthHeader title={'Continue with'} description={'Select your email ID  or phone number associated with your account, and we’ll send a verification code to reset your password'}/>
            </div>
            <div className="formHolder">       
            <Button className="btn-primary icon-btn w-100 p-2 h-auto mt-5 ">
            Email Verification</Button>  
            <Button className="btn-primary icon-btn w-100 p-2 h-auto mt-4"><i className="fa fa-check-circle" aria-hidden="true"></i>Phone Verification</Button>
                </div> 
        </>
    );
};

export default EmailVerification;