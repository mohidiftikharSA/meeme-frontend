import React from "react";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import { useNavigate } from "react-router";

const LoginFrom = () => {
  const navigate = useNavigate();
  const nextPage = () => {
    navigate(`/forgetPassword`);
  };

  return (
    <>
      <Logo start />
      <div className={classes.loginFrom}>
        <AuthHeader
          title={"Sign in to your Account"}
          description={"Enter your detail below"}
        />
        <Form className="formHolder">
          <Form.Control type="text" placeholder="Email" />
          <Form.Control type="password" placeholder="Password" />
          <p className={classes.password} onClick={nextPage}>
            Forgot password?
          </p>
          <Button className="w-100 p-2 authButton">Sign in</Button>
        </Form>
      </div>
    </>
  );
};

export default LoginFrom;
