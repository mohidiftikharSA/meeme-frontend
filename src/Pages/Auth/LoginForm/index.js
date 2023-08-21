import React from "react";
import { Button, Form,  } from "react-bootstrap";
import classes from '../index.module.scss'
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";

const LoginFrom = () => {
    return (
        <>
        <Logo login start/>
            <div className={classes.loginFrom}>
            <AuthHeader title={'Sign in to your Account'} description={'Enter your detail below'}/>
                <Form className="formHolder">
                    <Form.Control type="text" placeholder="Email" />
                    <Form.Control type="password" placeholder="Password" />
                    <p className={ classes.password}>Forgot password?</p>
                    <Button className="btn-primary w-100 p-2 h-auto">Sign in</Button>
                </Form>
            </div>
        </>
    );
};

export default LoginFrom;
