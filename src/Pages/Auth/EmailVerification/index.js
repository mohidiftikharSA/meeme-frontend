import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import { Formik } from "formik";
import * as Yup from "yup"; // Import yup
import AuthAPIs from "APIs/auth";
import { useNavigate } from "react-router-dom";
import ResetEmailModal from "Components/ResetEmailModal";

const EmailVerification = () => {
  const [smShow, setSmShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email address")
    .test('dot-after-at', 'Dot should be present after "@"', function (value) {
      if (value) {
        const atIndex = value.indexOf('@');
        const dotIndex = value.indexOf('.', atIndex);
        return dotIndex > atIndex && dotIndex !== -1;
      }
      return false;
    })
    .required("Email is required"),
  });

  const sendResetPasswordLink = async (data) => {
    try {
      const res =await AuthAPIs.forgetPassword(data.email);
      if(res){
        setSuccess(true);
        setSmShow(true);
          setTimeout(() => {
          setSmShow(false); 
          navigate(`/otpVerification?email=${data.email}`);
        }, 2000);
      }
    
    } catch (error) {
      console.error("Error sending reset password link:", error);
    }
  };

  return (
    <>
      <Logo login start />
      <div className={classes.loginFrom}>
        <AuthHeader
          title={"Continue with"}
          description={
            "Select your email ID associated with your account, and we’ll send a verification code to reset your password"
          }
        />
        <div className="formHolder">
          <Formik
            onSubmit={(value) => {
              sendResetPasswordLink(value);
            }}
            initialValues={{
              email: "",
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  name={"email"}
                  value={values.email}
                  required
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid" className="mb-3">
                  {errors.email}
                </Form.Control.Feedback>
                <Button type="submit" className="authButton w-100">
                  Get Verification Code
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <ResetEmailModal show={smShow} onHide={() => setSmShow(false)} />
    </>
  );
};

export default EmailVerification;
