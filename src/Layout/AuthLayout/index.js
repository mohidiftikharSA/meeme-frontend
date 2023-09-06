import React from "react";
import classes from "./index.module.scss";
import { Col, Row } from "react-bootstrap";

const AuthLayout = ({ children }) => {
  return (
    <div id={classes.wrapper}>
      <div className="container">
        <Row>
          <Col md={6}></Col>
          <Col md={6}>
            <div className={classes.loginFrom}>
              <main id={classes.main}>{children}</main>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AuthLayout;
