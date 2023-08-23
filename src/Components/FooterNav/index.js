import AboutusModal from "Components/AboutusModal";
import FooterTabs from "Components/FooterTabs";
import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";



const FooterNav = () => {
  const [aboutUsModalShow, setAboutUsModalShow] = useState(false);
  const [show, setshow] = useState(false);
  const [tabTitles, settabTitle] = useState(false);

  const clickHandler = (type)=>{
    setshow(true);
    settabTitle(type)
  }


  return (
    <>
      <Navbar expand="lg" className="navBar aside bg-body-tertiary px-3">
        <Nav className="nav-ps">
          <Nav.Link href="#" onClick={() => setAboutUsModalShow(true)}>
            About Us
          </Nav.Link>
          <Nav.Link href="#" onClick={() => clickHandler('terms')}>
            Terms of Services
          </Nav.Link>
          <Nav.Link href="#" onClick={() => clickHandler('policy')}>
            Privacy Policy
          </Nav.Link>
          <Nav.Link href="#" onClick={() => clickHandler('faq')}>
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
        show={show}
        tabTitles={tabTitles}
        onHide={() => setshow(false)}
      />
      
    </>
  );
};

export default FooterNav;
