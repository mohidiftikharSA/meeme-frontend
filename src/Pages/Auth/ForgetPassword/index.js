import React, { useState } from "react";
import { Button } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import ResetEmailModal from "Components/ResetEmailModal";
import { BsCheckLg } from 'react-icons/bs';
import { useNavigate } from "react-router";


const Forgetpassword = () => {
    
    const navigate = useNavigate();
    const nextPage = () => {
      navigate(`/PhoneVerification`);
    };

    const [smShow, setSmShow] = useState(false);
    return (
        <>
            <Logo start />
            <div className={classes.loginFrom}>
                <AuthHeader
                    title={"Forgot Password?"}
                    description={
                        "Select your email ID  or phone number associated with your account, and we’ll send a verification code to reset your password"
                    }
                />
                <div className="formHolder">
                    <Button className="btn-primary icon-btn w-100 p-2 h-auto mt-4" href="#" onClick={() => setSmShow(true)}>
                    <BsCheckLg/> Email Verification
                    </Button>
                    <Button className="btn-primary icon-btn  w-100 p-2 h-auto mt-4" onClick={nextPage}>
                    <BsCheckLg/>  Phone Verification
                    </Button>
                </div>
            </div>
            <ResetEmailModal
                show={smShow}
                onHide={() => setSmShow(false)}
            />
        </>
    );
};

export default Forgetpassword;
