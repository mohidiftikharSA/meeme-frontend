import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthHeader from "Components/AuthHeader";
import AuthAPIs from "APIs/auth";
import Logo from "Components/Logo";
import classes from "../index.module.scss";
import Loader from "Components/Loader";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // 
  const navigate = useNavigate();

  const Signup = async (data) => {
    setIsSubmitting(true);
    try {
      const authData = {
        username: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      const res = await AuthAPIs.signup(authData);
      if (res) {
        setIsSubmitting(false);
        navigate(`/login`);
        toast.success("Signup successful", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error("Error while signing up:", error);
    } finally {
      setIsSubmitting(false); // Reset the form submission state
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
      .matches(/^[0-9]+$/, "Phone must contain only digits")
      .min(8, "Phone must be at least eight characters long"),
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
          description={"Let's create an account on memee to enjoy memes."}
        />
        <div className="formHolder">
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              Signup(values);
              setSubmitting(false);
            }}
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={touched.name && !!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Control
                    type="number"
                    placeholder="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isValid={touched.phone && !errors.phone}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    isValid={touched.confirmPassword && !errors.confirmPassword}
                    isInvalid={
                      touched.confirmPassword && !!errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid" className="mb-3">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="authButton w-100">
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
          <div className={classes.loginLinks}>
            <p className={classes.dark}>
              Already on memee?{" "}
              <Link className={classes.light} to="/login">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Loader isLoading={isSubmitting}/>
    </>
  );
};

export default Signup;
