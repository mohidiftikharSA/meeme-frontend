import AccordianData from "Components/Accordian";
import { Aside } from "Components/Aside";
import ChatPopup from "Components/ChatPopup";
import TabDetails from "Components/Tabs";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const LandingPage = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <Row>
        <Col xl={3} md={4} className={`pe-0 aside-responsive ${isActive ? "active" : ""}`}>
          <Aside isActive={isActive} toggleActive={toggleActive} />         
        </Col>
        <Col xl={6} md={8} className={`p-lg-0 content-responsive ${isActive ? "active" : ""}`}>
          <section>
            <Container>
              <TabDetails first={"following"} main />
            </Container>
          </section>
        </Col>
        <Col xl={3} className="d-xl-block d-none">
          <AccordianData following />
        </Col>
      </Row>
      <ChatPopup />
    </>
  );
};

export default LandingPage;
