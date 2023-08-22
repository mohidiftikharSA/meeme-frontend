import AccordianData from "Components/Accordian";
import { Aside } from "Components/Aside";
import TabDetails from "Components/Tabs";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";



const LandingPage = () => {
  return (
    <Row>
    <Col md={3} className="p-0">
      <Aside/>
    </Col>
    <Col md={6}> 
    <section>
    <Container>
    <TabDetails first={'following'}/>
    </Container>
  </section>
    </Col>
    <Col md={3}>
    <AccordianData following/>
    </Col>
   </Row>
 
  );
};

export default LandingPage;
