import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import ResetPasswordModal from "Components/ResetPasswordModal";
import { useLocation, useNavigate } from "react-router-dom";
import AuthAPIs from "../../../APIs/auth";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";

const ResetPassword = () => {
  const [smShow, setSmShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    setEmail(email);
  }, [location.search]);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])[a-zA-Z0-9]*$/,
        "Password must be alphanumeric with at least one number"
      )
      .min(8, "Password must be at least eight characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")
      .matches(
        /^(?=.*[0-9])[a-zA-Z0-9]*$/,
        "Password must be alphanumeric with at least one number"
      )
      .min(8, "Password must be at least eight characters long"),
  });

  const resetPassword = async (values) => {
    try {
      const res = await AuthAPIs.resetPassword(
        email,
        values.password,
        values.confirmPassword
      );
      if (res) {
        navigate(`/login`);
        setSmShow(false);
        toast.success("Password Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error while verify:", error);
    }
  };

  return (
    <>
      <Logo start />
      <div className={classes.loginFrom} style={{ minWidth: "350px" }}>
        <AuthHeader
          title={"Reset Password"}
          description={"Enter your new password below"}
        />
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => resetPassword(values)}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form className="formHolder" noValidate onSubmit={handleSubmit}>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
              <Form.Control
                type="password"
                placeholder="Re-type new password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
              <Button className="btn-primary w-100 p-2 h-auto" type="submit">
                Create New Password
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <ResetPasswordModal show={smShow} onHide={() => setSmShow(false)} />
    </>
  );
};

export default ResetPassword;
