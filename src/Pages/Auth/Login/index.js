import React from "react";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import { useNavigate } from "react-router";
import AuthAPIs from "APIs/auth";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup"; // Import yup
import { authSuccess } from "Redux/reducers/authSlice";

const LoginFrom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nextPage = () => {
    navigate(`/forgetPassword`);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address") // Specify the error message for invalid email
      .required("Email is required"), // Specify the error message for an empty email
    password: Yup.string().required("Password is required"), // Specify the error message for an empty password
  });

  const loginRes = async (data) => {
    try {
      const res = await AuthAPIs.login(data.email, data.password);
      if (res) {
        dispatch(
          authSuccess({
            user: res.data?.user,
            accessToken: res.data.token,
          })
        );
        navigate(`/home`);
        toast.success("Login Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        localStorage.setItem("accessToken", res.data.token);
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
    
  };

  return (
    <>
      <Logo start />
      <div className={classes.loginFrom}>
        <AuthHeader
          title={"Sign in to your Account"}
          description={"Enter your details below"}
        />
        <Formik
          onSubmit={(values) => {
            loginRes(values);
          }}
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form className="formHolder" noValidate onSubmit={handleSubmit}>
              <Form.Control
                onChange={handleChange}
                type={"email"}
                name={"email"}
                placeholder="Email"
                value={values.email}
                required
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
              <Form.Control
                onChange={handleChange}
                type="password"
                placeholder="Password"
                value={values.password}
                name={"password"}
                required
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
              <p className={classes.password} onClick={nextPage}>
                Forgot password?
              </p>
              <Button type="submit" className="w-100 p-2 authButton">
                Sign in
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginFrom;
