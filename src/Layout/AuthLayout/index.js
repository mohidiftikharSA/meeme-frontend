import React from "react";
import classes from "./index.module.scss";
import { Col, Row } from "react-bootstrap";
import Footer from "Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for styling


const AuthLayout = ({ children,showFooter,login }) => {
  return (
    <div id={classes.wrapper}>
      <div className="container">
        <Row>
          <Col md={6}></Col>
          <Col md={6}>
            <div className={`${classes.loginFrom} ${login&& classes.minHeight}`}>
              <main id={classes.main}>{children}</main>
            </div>
          </Col>
        </Row>
      </div>
      {showFooter && <Footer />}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AuthLayout;
