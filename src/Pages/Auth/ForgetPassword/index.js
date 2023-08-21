import React, { useState } from "react";
import { Button } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import ResetEmail from "Components/ResetEmail";

const Forgetpassword = () => {
    const [smShow, setSmShow] = useState(false);
    return (
        <>
            <Logo login start />
            <div className={classes.loginFrom}>
                <AuthHeader
                    title={"Forgot Password?"}
                    description={
                        "Select your email ID  or phone number associated with your account, and we’ll send a verification code to reset your password"
                    }
                />
                <div className="formHolder">
                    <Button className="btn-primary icon-btn w-100 p-2 h-auto mt-5" href="#" onClick={() => setSmShow(true)}>
                        <i class="fa fa-check-circle" aria-hidden="true"></i> Email Verification
                    </Button>
                    <Button className="btn-primary icon-btn  w-100 p-2 h-auto mt-4">
                        Phone Verification
                    </Button>
                </div>
            </div>
            <ResetEmail
                show={smShow}
                onHide={() => setSmShow(false)}
            />
        </>
    );
};

export default Forgetpassword;
