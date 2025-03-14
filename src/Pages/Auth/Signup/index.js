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
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";

const Signup = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClick2 = () => {
    setIsOpen2(!isOpen2);
  };
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
      .test('dot-after-at', 'Dot should be present after "@"', function (value) {
        if (value) {
          const atIndex = value.indexOf('@');
          const dotIndex = value.indexOf('.', atIndex);
          return dotIndex > atIndex && dotIndex !== -1;
        }
        return false;
      })
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
      .min(6, "Name must be at least six characters long"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone must contain only digits") // Allows only digits (no spaces, letters, or symbols)
      .min(8, "Phone must be at least 8 characters long")
      .max(15, "Phone must be at most 15 characters long")
      .required("Phone is required"),
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
                    // isValid={touched.name && !errors.name}
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
                    // isValid={touched.email && !errors.email}
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
                    maxLength={15}
                    value={values.phone}
                    onChange={handleChange}
                    // isValid={touched.phone && !errors.phone}
                    isInvalid={touched.phone && !!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className={classes.eye}>
                  <Form.Group className="password" controlId="password" >
                    <Form.Control
                      type={isOpen ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      // isValid={touched.password && !errors.password}
                      isInvalid={touched.password && !!errors.password}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                    <span style={{ display: touched.password && !!errors.password ? "none" : "block" }} onClick={handleClick}>
                      {isOpen ? <IoEyeOutline /> : <FiEyeOff />}
                    </span>
                  </Form.Group>
                </div>
                <div className={classes.eye}>
                  <Form.Group className="password" controlId="confirmPassword">
                    <Form.Control
                      type={isOpen2 ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      // isValid={touched.confirmPassword && !errors.confirmPassword}
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                    />

                    <Form.Control.Feedback type="invalid" className="mb-3">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                    <span style={{ display: touched.password && !!errors.password ? "none" : "block" }} onClick={handleClick2}>
                      {isOpen2 ? <IoEyeOutline /> : <FiEyeOff />}
                    </span>
                  </Form.Group>
                </div>
                <Button type="submit" className="authButton w-100">
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
          <div className={classes.loginLinks}>
            <p className={classes.dark}>
              Already on memee?{" "}
              <Link className={classes.light} to="/">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Loader isLoading={isSubmitting} />
    </>
  );
};

export default Signup;

