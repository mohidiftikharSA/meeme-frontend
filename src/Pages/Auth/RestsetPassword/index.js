import React, { useState } from "react";
import { Button, Form,  } from "react-bootstrap";
import classes from '../index.module.scss'
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import ResetPasswordModal from "Components/ResetPasswordModal";

const Restsetpassword = () => {
    const [smShow, setSmShow] = useState(false);
    return (
        <>
        <Logo login start/>
            <div className={classes.loginFrom} style={{minWidth:'350px'}}>
            <AuthHeader title={'Reset Password'} description={'Enter your new password below'}/>
                <Form className="formHolder">
                    <Form.Control type="password" placeholder="New Password" />
                    <Form.Control type="password" placeholder="Re-type new password" />
                    <p className={ classes.password}>Forgot password?</p>
                    <Button className="btn-primary w-100 p-2 h-auto" href="#" onClick={() => setSmShow(true)}>Create New Password</Button>
                </Form>
            </div>
            <ResetPasswordModal
            show={smShow}
            onHide={() => setSmShow(false)} />
        </>
    );
};

export default Restsetpassword;