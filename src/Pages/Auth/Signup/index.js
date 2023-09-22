import Logo from "Components/Logo";
import React from "react";
import classes from "../index.module.scss";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom/dist";
import AuthHeader from "Components/AuthHeader";
import * as Yup from "yup"; // Import yup
import { Formik } from "formik";
import AuthAPIs from "APIs/auth";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  // const homePage = () => {
  //   navigate(`/home`);
  // };
  const Signup = async (data) => {
    try {
      const authData = {
        username: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      const res = await AuthAPIs.signup(authData);
      if (res) {
        navigate(`/login`);
        toast.success("Signup successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[0-9])[a-zA-Z0-9]*$/,
        "Password must be alphanumeric with at least one number"
      )
      .min(8, "Password must be at least eight characters long"),
    name: Yup.string()
      .required("Username is required")
      .matches(
        /^(?=.*[0-9])[a-zA-Z0-9]*$/,
        "Name must be alphanumeric with at least one number"
      )
      .min(6, "Name must be at least six characters long"),
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Phone must be at least six characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")
      .matches(
        /^(?=.*[0-9])[a-zA-Z0-9]*$/,
        "Password must be alphanumeric with at least one number"
      )
      .min(8, "Password must be at least eight characters long"),
  });
  return (
    <>
      <Logo start />
      <div className={`${classes.loginFrom} ${classes.nobefore}`}>
        <AuthHeader
          title={"Sign Up"}
          description={"Lets create an account on memee to enjoy memes."}
        />
        <div className="formHolder">
          <Formik
            onSubmit={(value) => {
              Signup(value);
            }}
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Control
                  onChange={handleChange}
                  name={"name"}
                  value={values.name}
                  required
                  type="text"
                  placeholder="Username"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  name={"email"}
                  value={values.email}
                  required
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
                <Form.Control
                  type="tel"
                  placeholder="Phone"
                  onChange={handleChange}
                  name={"phone"}
                  value={values.phone}
                  required
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={values.password}
                  required
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  name="confirmPassword"
                  value={values.confirmPassword}
                  required
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid" className="mb-3">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
                <Button type="submit" className="authButton w-100">
                  Sign in
                </Button>
              </Form>
            )}
          </Formik>
          <div className={classes.loginLinks}>
            <p className={classes.dark}>
              Aready in memee?
              <Link className={classes.light} to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
