import Logo from "Components/Logo";
import React, { useEffect, useState } from "react";
import classes from "../index.module.scss";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom/dist";
import { MdMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter } from "react-icons/bs";
import AuthLayout from "Layout/AuthLayout";
import {
  googleLogout,
  useGoogleLogin,
  useGoogleOneTapLogin,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../../../config/constants";
import AuthAPIs from "../../../APIs/auth";
import { toast } from "react-toastify";
import { authSuccess } from "../../../Redux/reducers/authSlice";
import { useDispatch } from "react-redux";
import GoogleAuth from "../../../Components/Auth/GoogleAuth";
import FooterTabs from "Components/FooterTabs";
import { FaFacebook } from "react-icons/fa";

const Home = () => {
  const [show, setshow] = useState(false);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/login`);
  };

  const comingSoon = async () => {
    toast.error("Coming Soon.");
    return;
  };

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  useEffect(() => {
    if (user) {
      console.log("User --", user);
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
    onNonOAuthError: (error) => console.log("Login Failed:", error),
  });

 

  return (
    <>
      <AuthLayout showFooter={true} login>
        <section
          className={`${classes.section} ${classes.dotBg} ${classes.reponsive_sec}`}
        >
          <Logo login />
          <div className={classes.authHolder}>
            <Button variant="outline-light" onClick={nextPage}>
              <MdMail />
              Continue with Email
            </Button>
              <GoogleAuth className="google-custom-button" onClick={login}></GoogleAuth>
            <Button
              className="mt-3"
              variant="outline-light"
              onClick={comingSoon}
            >
              <FaFacebook style={{ color: "#5090ff" }} />
              Continue with Facebook
            </Button>
            <Button className="" variant="outline-light" onClick={comingSoon}>
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
              <span onClick={() => setshow(true)} style={{ cursor: "pointer" }}>
                Terms of Services & Privacy Policy.
              </span>
            </p>
          </div>
        </section>
      </AuthLayout>
      <FooterTabs
        show={show}
        tabTitles={"terms"}
        onHide={() => setshow(false)}
      />
    </>
  );
};

export default Home;
