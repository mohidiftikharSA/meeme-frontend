import React from "react";
import { Nav, Navbar } from "react-bootstrap";

const Navigation = ({ header, footer }) => {
  return (
    <Navbar expand="lg" className={header? "navBar bg-body-tertiary" : "navBar aside bg-body-tertiary py-5"} >
    {header? 
    <>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/home"><i className="fas fa-home"></i> Home</Nav.Link>
        <Nav.Link href="/explore"> <i className="fas fa-globe-europe"></i>Explore</Nav.Link>
        <Nav.Link href="/tornament"><i className="fas fa-trophy"></i>Tournament</Nav.Link>
        <Nav.Link href="/BuyCoin"><i className="fas fa-shopping-cart"></i> Store</Nav.Link>
      </Nav>
    </Navbar.Collapse> 
    </>
    :
    <Nav className="me-auto flex-column w-100">
    <Nav.Link href="/home" className="mb-3">
      <i className="fas fa-home"></i> Home
    </Nav.Link>
    <Nav.Link href="/tornament" className="btn btn-primary btn-bg trophy mb-3">
      <i className="fas fa-trophy"></i>Tournament
    </Nav.Link>
    <Nav.Link className="btn btn-primary btn-bg store mb-3">
    <i className="far fa-gavel"></i>Judge
    </Nav.Link>
    <Nav.Link className="btn btn-primary btn-bg judge mb-3">
      <i className="fas fa-trophy"></i>Store
    </Nav.Link>
  </Nav>
}
  
  </Navbar>
  );
};

export default Navigation;
