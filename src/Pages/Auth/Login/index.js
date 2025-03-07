import React, { useState, CSSProperties, useEffect } from "react";
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
import ClipLoader from "react-spinners/ClipLoader";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";

const LoginFrom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userLogin , setUserLogin ] = useState({
    email:'',
    password:'',
    remember: false
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nextPage = () => {
    navigate(`/forgetPassword`);
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(()=>{
    checkRemeberlogins()
  },[])

  const checkRemeberlogins= ()=>{
    const user =  localStorage.getItem('user_login');
    console.log(JSON.parse(user));
    setUserLogin(JSON.parse(user));
  }

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
    password: Yup.string().required("Password is required"),
  });

  const loginRes = async (data) => {
    console.log("data  -", data);
    const { remember, ...rest } = data
    if (remember) {
      console.log("storing local")
      localStorage.setItem("user_login", JSON.stringify(data));
    }else if(!remember){
      localStorage.clear();
    }
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
        dispatch(coinsBuy(res.data?.user.coins));

        navigate(`/home`);
        toast.success("Successful Login", {
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
            email: userLogin?.email || "",
            password: userLogin?.password || "" ,
            remember: userLogin?.remember || false
          }}
          validationSchema={validationSchema}
          validateOnChange={false}
          enableReinitialize={true}
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
              <div className={classes.eye}>
                <Form.Control
                  onChange={handleChange}
                  type={isOpen ? "text" : "password"}
                  placeholder="Password"
                  value={values.password}
                  name={"password"}
                  required
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback className="mb-2" type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <span style={{ display: errors.password && !!errors.password ? "none" : "block" }} onClick={handleClick}>
                  {isOpen ? <IoEyeOutline /> : <FiEyeOff />}
                </span>
              </div>
              <div className="check">
                <span>
                  <Form.Check
                    type="checkbox"
                    id="remember"
                    label="Remember me"
                    name="remember"
                    className={classes.customCheckbox}
                    checked={values.remember}
                    onChange={handleChange}
                  />
                </span>
                <p className={classes.password} onClick={nextPage}>
                  Forgot password?
                </p>
              </div>

              {isLoading ? (
                <Button type="submit" disabled className="w-100 p-2 authButton">
                  <ClipLoader className="mt-1 btn-loading" color="#000000" />
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
