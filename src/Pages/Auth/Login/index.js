import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "../index.module.scss";
import Logo from "Components/Logo";
import AuthHeader from "Components/AuthHeader";
import { Link, useNavigate } from "react-router-dom/dist";
import AuthAPIs from "APIs/auth";
import ConisAPIs from "../../../APIs/coins";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup"; 
import { authSuccess } from "Redux/reducers/authSlice";
import { fetchCardId } from "Redux/reducers/fetchCardID";
import { coinsBuy } from "Redux/reducers/buyCoins";

const LoginFrom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nextPage = () => {
    navigate(`/forgetPassword`);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginRes = async (data) => {
    setIsLoading(true);
    try {
      const res = await AuthAPIs.login(data?.email, data?.password);
      if (res) {
        setIsLoading(false);
        localStorage.setItem("accessToken", res.data.token);
        dispatch(
          authSuccess({
            user: res.data?.user,
            accessToken: res.data.token,
          })
        );
        dispatch(coinsBuy(res.data?.user.coins))

        navigate(`/home`);
        toast.success("Login Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error while logging in:", error);
    }
    setIsLoading(false);
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
              <div className="check">
                <span>
                  <Form.Check
                    type="checkbox"
                    id="check"
                    label="Remember me"
                    className={classes.customCheckbox}
                  />
                </span>
                <p className={classes.password} onClick={nextPage}>
                  Forgot password?
                </p>
              </div>

              {isLoading ? (
                <Button type="submit" className="w-100 p-2 authButton" disabled>
                  Sign in
                </Button>
              ) : (
                <Button type="submit" className="w-100 p-2 authButton">
                  Sign in
                </Button>
              )}
            </Form>
          )}
        </Formik>
        <p
          style={{ textAlign: "center", paddingTop: "10px" }}
          className={classes.dark}
        >
          New to memee?
          <Link className={classes.light} to="/signUp">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginFrom;
