import AboutusModal from "Components/AboutusModal";
import FooterTabs from "Components/FooterTabs";
import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";

const FooterNav = () => {
  const [aboutUsModalShow, setAboutUsModalShow] = useState(false);
  const [termsOfServiceModalShow, setTermsOfServiceModalShow] = useState(false);
  const [privacyPolicyModalShow, setPrivacyPolicyModalShow] = useState(false);
  const [fAQModalShow, setFAQModalShow] = useState(false);

  return (
    <>
      <Navbar expand="lg" className="navBar aside bg-body-tertiary px-3">
        <Nav className="me-auto nav-ps">
          <Nav.Link href="#" onClick={() => setAboutUsModalShow(true)}>
            About Us
          </Nav.Link>
          <Nav.Link href="#" onClick={() => setTermsOfServiceModalShow(true)}>
            Terms of Services
          </Nav.Link>
          <Nav.Link href="#" onClick={() => setPrivacyPolicyModalShow(true)}>
            Privacy Policy
          </Nav.Link>
          <Nav.Link href="#" onClick={() => setFAQModalShow(true)}>
            FAQ
          </Nav.Link>
          <Nav.Link href="#">Tutorial</Nav.Link>
        </Nav>
      </Navbar>

      <AboutusModal
        show={aboutUsModalShow}
        onHide={() => setAboutUsModalShow(false)}
      />

      <FooterTabs
        show={termsOfServiceModalShow}
        onHide={() => setTermsOfServiceModalShow(false)}
      />
      <FooterTabs
        show={privacyPolicyModalShow}
        onHide={() => setPrivacyPolicyModalShow(false)} 
      />
      <FooterTabs
        show={fAQModalShow}
        onHide={() => setFAQModalShow(false)}
      />
    </>
  );
};

export default FooterNav;
