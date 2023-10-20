import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReactInputVerificationCode from "react-input-verification-code";
import AuthAPIs from "APIs/auth";
import { toast } from "react-toastify";

const OtpVerfication = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    setEmail(email);
    setPhone(phone);
  }, [location.search]);

  const otpRes = async (data) => {
    try {
      const res = await AuthAPIs.verificationOtp(email, otpValue);
      if (res) {
        navigate(`/restsetPassword?email=${email}`);
        toast.success("Verify Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error while verify:", error);
    }
  };

  const resendOtp = async (event) => {
    try {
        event.preventDefault();
      await AuthAPIs.forgetPassword(email);

      toast.success(
        "Otp is sent to your email",
        {
          position: "top-right",
          autoClose: 2000,
        }
      );
    } catch (error) {
      console.error("Error while resending OTP:", error);
    }
  };

  return (
    <>
      <Logo start />
      <div className={classes.loginFrom}>
        {email ? (
          <AuthHeader
            title={"Verify your Email"}
            description={"Verification code sent to your email"}
            value={email}
            margin
          />
        ) : (
          <AuthHeader
            title={"Verify your phone"}
            description={"Verification code sent to your phone"}
            value={phone}
            margin
          />
        )}

        <div className="formHolder">
          <div className="my-3 phonverify">
            <ReactInputVerificationCode
              length={4}
              value={otpValue} // Pass the state variable as the value
              onChange={(value) => setOtpValue(value)} // Update the state on change
            />
          </div>
          <div className={classes.loginLink}>
            <p className={classes.dark}>
              Didn’t receive code?
              <Link className={classes.light} onClick={resendOtp}>
                <span className={classes.underline}>Resend OTP</span>
              </Link>
            </p>
            <Button
              className="authButton w-100 mt-3 authe-btn"
              onClick={otpRes}
            >
              Verify your email
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerfication;
