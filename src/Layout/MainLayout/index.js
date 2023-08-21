import React from "react";
import classes from "./index.module.scss";
import Header from "Components/Header";
import { Col, Container, Row } from "react-bootstrap";
import { Aside } from "Components/Aside";
import AccordianData from "Components/Accordian";

const MainLayout = ({ children }) => {
  return (
    <div id={classes.wrapper}>
    <Header/>
    <Container fluid>
    <Row>
      <Col md={3} className="p-0">
        <Aside/>
      </Col>
      <Col md={6}> <main id={classes.main}>
          {children}
      </main></Col>
      <Col md={3}>
      <AccordianData following/>
      </Col>
     </Row>
    </Container>
    </div>
  );
};

export default MainLayout;
