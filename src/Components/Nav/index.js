import React, { useState } from "react";
import { ButtonGroup, Nav, Navbar } from "react-bootstrap";
import home from "../../Images/Home (1).png";
import expore from "../../Images/expore.png";
import trophy from "../../Images/trophies.png";
import Buy from "../../Images/Buy.png";
import judge from "../../Images/judges.png";
import shop from "../../Images/shop.png";
import trophies from "../../Images/trophy (1) 1.png";
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Link } from "react-router-dom";
import coin from "../../Images/coin.png";
import profile from "../../Images/profile1.png"
import classes from "./index.module.scss"


const Navigation = ({ header, footer }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
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
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          <span onClick={toggleActive} className={`${isActive ? "d-none" : "d-block"}`}><FaBars className="custom-icon1" /></span>
          <Navbar className={`responsive-nav ${isActive ? "active" : ""}`}>
          <span onClick={toggleActive} className={`${isActive ? "d-block" : "d-none"}`}><IoClose className="custom-icon2" /></span>

            <Nav className="me-auto flex-lg-row flex-column">
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
              <ButtonGroup className="align-items-center" id="profile-btn">
              <Link to={"/Purchase"} className={`btn ${classes.iconBtn}`}>
                <span className={classes.icon}>
                <i className="fas fa-plus"></i>
                </span>
                <span className={classes.text}>7412</span>
                <img src={coin} alt="icon" />
              </Link>

              <Link to={"/profile"} className={`btn ${classes.profileBtn}`}>
                <img src={profile} alt="icon" />
              </Link>
            </ButtonGroup>
            </Nav>
          </Navbar>
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
