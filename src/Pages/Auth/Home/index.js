import Logo from "Components/Logo";
import React from "react";
import classes from "../index.module.scss";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom/dist";
import { MdMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import AuthLayout from "Layout/AuthLayout";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_CLIENT_ID} from "../../../config/constants";
import AuthAPIs from "../../../APIs/auth";
import {toast} from "react-toastify";
import {authSuccess} from "../../../Redux/reducers/authSlice";
import {useDispatch} from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nextPage = () => {
    navigate(`/login`);
  };

  return (
    <>
    <AuthLayout showFooter={true} login>
    <section className={`${classes.section} ${classes.dotBg} ${classes.reponsive_sec}`} >
        <Logo login />
        <div className={classes.authHolder}>
          <Button variant="outline-light" onClick={nextPage}>
            <MdMail />
            Continue with Email
          </Button>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin
                  onSuccess={async credentialResponse => {
                    try {
                      const res = await AuthAPIs.socialLogin('google', credentialResponse.credential);
                      if (res) {
                        dispatch(
                            authSuccess({
                              user: res.data?.user,
                              accessToken: res.data.token,
                            })
                        );
                        navigate(`/home`);
                        toast.success("Login Successfully", {
                          position: "top-right",
                          autoClose: 2000,
                        });
                        localStorage.setItem("accessToken", res.data.token);
                      }
                    } catch (error) {
                      console.error("Error while verify:", error);
                    }
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
              />;
            </GoogleOAuthProvider>
          <Button variant="outline-light">
            <FcGoogle />
            Continue with Google
          </Button>
          {/*<Button variant="outline-light">*/}
          {/*  <BsFacebook style={{ color: "#5090ff" }} />*/}
          {/*  Continue with Facebook*/}
          {/*</Button>*/}
          {/*<Button className="mb-0" variant="outline-light">*/}
          {/*  <BsTwitter />*/}
          {/*  Continue with Twitter*/}
          {/*</Button>*/}
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

export default Home;
