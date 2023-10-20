import React, {useEffect, useState} from "react";
import { Button, Form,  } from "react-bootstrap";
import classes from '../index.module.scss'
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import ResetPasswordModal from "Components/ResetPasswordModal";
import {useLocation, useNavigate} from "react-router-dom";
import AuthAPIs from "../../../APIs/auth";
import {toast} from "react-toastify";

const Restsetpassword = () => {
    const [smShow, setSmShow] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get("email");
        console.log('email',email)
        setEmail(email);
    }, [location.search]);
    const resetPassword = async () => {
        try {
            const res = await AuthAPIs.resetPassword(email, password,passwordConfirmation);
            if (res) {
                navigate(`/login`);
                setSmShow(false)
                toast.success("Password Updated Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error("Error while verify:", error);
        }
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmationChange = (event) => {
        setPasswordConfirmation(event.target.value);
    };
    return (
        <>
        <Logo start/>
            <div className={classes.loginFrom} style={{minWidth:'350px'}}>
            <AuthHeader title={'Reset Password'} description={'Enter your new password below'}/>
                <Form className="formHolder">
                    <Form.Control
                        type="password"
                        placeholder="New Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Form.Control
                        type="password"
                        placeholder="Re-type new password"
                        value={passwordConfirmation}
                        onChange={handlePasswordConfirmationChange}
                    />
                    {/*<p onClick={nextPage} className={ classes.password}>Forgot password?</p>*/}
                    <Button className="btn-primary w-100 p-2 h-auto" href="#" onClick={() => resetPassword()}>Create New Password</Button>
                </Form>
            </div>
            <ResetPasswordModal
            show={smShow}
            onHide={() => setSmShow(false)} />
        </>
    );
};

export default Restsetpassword;