import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import { Formik } from "formik";
import * as Yup from "yup"; // Import yup
import AuthAPIs from "APIs/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResetEmailModal from "Components/ResetEmailModal";

const EmailVerification = () => {
  const [smShow, setSmShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const sendResetPasswordLink = async (data) => {
    try {
      await AuthAPIs.forgetPassword(data.email);
      setSuccess(true);
      setSmShow(true);
  
      // Delay navigation for a few seconds (e.g., 2 seconds)
      setTimeout(() => {
        setSmShow(false); // Hide the modal
        navigate(`/otpVerification?email=${data.email}`);
      }, 2000); // 2000 milliseconds (2 seconds)
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
      </div>
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
      <ResetEmailModal show={smShow} onHide={() => setSmShow(false)} />
    </>
  );
};

export default EmailVerification;
