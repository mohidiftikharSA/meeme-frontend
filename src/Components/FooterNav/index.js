import AboutusModal from "Components/AboutusModal";
import FooterTabs from "Components/FooterTabs";
import TutorialModals from "Components/Tutorial";
import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";

const FooterNav = () => {
  const [aboutUsModalShow, setAboutUsModalShow] = useState(false);
  const [show, setshow] = useState(false);
  const [tutorial, setTutorial] = useState(false);
  const [tabTitles, settabTitle] = useState(false);

  const clickHandler = (type) => {
    setshow(true);
    settabTitle(type);
  };

  return (
    <>
      <Navbar expand="lg" className="navBar aside bg-body-tertiary px-md-3 px-0 ">
        <Nav className="nav-ps flex-sm-row flex-column">
          <Nav.Link onClick={() => setAboutUsModalShow(true)}>
            About Us
          </Nav.Link>
          <Nav.Link onClick={() => clickHandler("terms")}>
            Terms of Services
          </Nav.Link>
          <Nav.Link onClick={() => clickHandler("policy")}>
            Privacy Policy
          </Nav.Link>
          <Nav.Link onClick={() => clickHandler("faq")}>FAQ</Nav.Link>
          <Nav.Link onClick={() => setTutorial(true)}>Tutorial</Nav.Link>
        </Nav>
      </Navbar>

      <AboutusModal
        show={aboutUsModalShow}
        onHide={() => setAboutUsModalShow(false)}
      />

      <FooterTabs
        show={show}
        tabTitles={tabTitles}
        onHide={() => setshow(false)}
      />
      <TutorialModals
        show={tutorial}
        onHide={() => setTutorial(false)}
      />
    </>
  );
};

export default FooterNav;
