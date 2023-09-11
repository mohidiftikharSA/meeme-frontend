import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import home from "../../Images/Home (1).png";
import expore from "../../Images/expore.png";
import trophy from "../../Images/trophies.png";
import Buy from "../../Images/Buy.png";
import judge from "../../Images/judges.png";
import shop from "../../Images/shop.png";
import trophies from "../../Images/trophy (1) 1.png";

const Navigation = ({ header, footer }) => {
  return (
    <Navbar
      expand="lg"
      className={
        header
          ? "navBar bg-body-tertiary"
          : "navBar aside bg-body-tertiary py-lg-5 py-3 "
      }
    >
      {header ? (
        <>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">
                <img src={home} alt="icon"></img> Home
              </Nav.Link>
              <Nav.Link href="/explore">
                {" "}
                <img className="nav-icon" src={expore} alt="icon"></img>Explore
              </Nav.Link>
              <Nav.Link href="/tornament">
                <img src={trophy} alt="icon"></img>Tournament
              </Nav.Link>
              <Nav.Link href="/BuyCoin">
                <img src={Buy} alt="icon"></img>Store
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <Nav className="me-auto flex-column w-100 nav-links">
          <Nav.Link href="/home" className="mb-3 active">
            <img src={home} alt="icon"></img> Home
          </Nav.Link>
          <Nav.Link
            href="/tornament"
            className="btn btn-primary btn-bg trophy mb-3"
          >
            <img src={trophies} alt="icon"></img>Tournament
          </Nav.Link>
          <Nav.Link className="btn btn-primary btn-bg store mb-3">
            <img src={judge} alt="icon"></img>Judge
          </Nav.Link>
          <Nav.Link className="btn btn-primary btn-bg judge mb-3">
            <img src={shop} alt="icon"></img>Store
          </Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};

export default Navigation;
