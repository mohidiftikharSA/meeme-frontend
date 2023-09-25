import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import { Formik } from "formik";
import * as Yup from "yup"; // Import yup

const EmailVerification = () => {
    const [success, setSuccess] = useState(false);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
      });

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
            //   Signup(value);
          }}
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
          }}
          // validationSchema={validationSchema}
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
              <Button type="submit" className="authButton w-100">
                Get New Password
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EmailVerification;
