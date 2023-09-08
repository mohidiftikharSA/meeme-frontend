import Logo from "Components/Logo";
import React from "react";
import classes from "../index.module.scss";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom/dist";
import { MdMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import AuthLayout from "Layout/AuthLayout";

const Login = () => {
  const navigate = useNavigate();
  const nextPage = () => {
    navigate(`/login`);
  };

  return (
    <>
    <AuthLayout showFooter={true}>
    <section className={`${classes.section} ${classes.dotBg} ${classes.reponsive_sec}`} >
        <Logo login />
        <div className={classes.authHolder}>
          <Button variant="outline-light" onClick={nextPage}>
            <MdMail />
            Continue with Email
          </Button>
          <Button variant="outline-light">
            <FcGoogle />
            Continue with Google
          </Button>
          <Button variant="outline-light">
            <BsFacebook style={{ color: "#5090ff" }} />
            Continue with Facebook
          </Button>
          <Button className="mb-0" variant="outline-light">
            <BsTwitter />
            Continue with Twitter
          </Button>
        </div>
        <div className={classes.loginLinks}>
          <p className={classes.dark}>
            New to memee?
            <Link className={classes.light} to="/signUp">
              Sign up
            </Link>
          </p>
          <p className="mb-md-5 mb-0">
            By continuing you agree Memee’s 
            <span>Terms of Services & Privacy Policy.</span>
          </p>
        </div>
      </section>
    </AuthLayout>
     
    </>
  );
};

export default Login;
