import React from "react";
import { Button } from "react-bootstrap";
import classes from '../index.module.scss'
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import { Link } from "react-router-dom";
import ReactInputVerificationCode from 'react-input-verification-code';


const PhoneVerification = () => {
    return (
        <>
        <Logo start/>
            <div className={classes.loginFrom}>
            <AuthHeader title={'Verify your phone'} description={'Verification code sent to your phone'} phone={'+1 234 567 8901'} margin/>
            <div className="my-3 phonverify">
            <ReactInputVerificationCode length={6}/>
            </div>
            <div className="formHolder">
                    <div className={classes.loginLink}>
                    <p className={ classes.dark}>Didn’t receive code?<Link className={ classes.light} to="/">Resend OTP</Link></p>
                    <Button className="authButton w-100 mt-3 authe-btn">Verify your phone</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhoneVerification;