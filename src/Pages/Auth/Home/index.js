import Logo from "Components/Logo";
import React, {useState } from "react";
import classes from "../index.module.scss";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom/dist";
import { MdMail } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import AuthLayout from "Layout/AuthLayout";
import { toast } from "react-toastify";
import GoogleAuth from "../../../Components/Auth/GoogleAuth";
import FooterTabs from "Components/FooterTabs";
import { FaFacebook } from "react-icons/fa";
import FacebookLogin from 'react-facebook-login';
import AuthAPIs from "../../../APIs/auth";
import { authSuccess } from "Redux/reducers/authSlice";
import { useDispatch } from "react-redux";


const Home = () => {
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nextPage = () => {
    navigate(`/login`);
  };

  const comingSoon = async () => {
    toast.error("Coming Soon.");
    return;
  };

  const responseFacebook = (response) => {
    console.log("Facebook Login 000 ===",response?.accessToken);
    handleFacebookLoginSuccess(response?.accessToken);
  }

  const handleFacebookLoginSuccess = async (tokenResponse) => {
    console.log(tokenResponse);
    try {
        const res = await AuthAPIs.socialLogin('facebook', tokenResponse);
        if (res) {
            console.log("Response of Social API = ", res.data);
            if(res.data.token){
              dispatch(
                authSuccess({
                    user: res.data?.user,
                    accessToken: res.data.token,
                })
            );
            navigate(`/home`);
            toast.success("Successful Login", {
                position: "top-right",
                autoClose: 2000,
            });
            localStorage.setItem("accessToken", res.data.token);
            }
           
        }
    } catch (error) {
        console.error("Error while verifying:", error);
    }
};


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
              <GoogleAuth className="google-custom-button"/>
            <div className="custom">
            <FacebookLogin
            appId="655238713421201"
            autoLoad={false}
            fields="name,email,picture"
            cssClass="btn btn-outline-light"
            // onClick={responseFacebook}
            callback={responseFacebook}
            icon={<FaFacebook style={{ color: "#5090ff" }} />}
             />
            </div>
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
