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
        <Logo login start/>
            <div className={classes.loginFrom}>
            <AuthHeader title={'Verify your phone'} description={'Verification code sent to your phone'} phone={'+1 234 567 8901'} margin/>
            <div className="my-3 phonverify">
            <ReactInputVerificationCode length={6}/>
            </div>
                <div className="formHolder">
                    <p className={ classes.dark}>Didn’t receive code?<Link className={ classes.light} to="/">  Resend OTP</Link></p>
                    <Button className="btn-primary w-100 p-2 h-auto mt-4">Verify your phone</Button>
                </div>
            </div>
        </>
    );
};

export default PhoneVerification;