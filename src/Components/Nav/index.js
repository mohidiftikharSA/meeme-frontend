import React, { useState } from "react";
import { ButtonGroup, Nav, Navbar } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from 'react-router-dom';
import coin from "../../Images/coin.png";
import avatar from "../../Images/Buy.png";
import home from "../../Images/Home (1).png";
import explore from "../../Images/expore.png";
import trophy from "../../Images/trophies.png";
import Buy from "../../Images/Buy.png";
import judge from "../../Images/judges.png";
import shop from "../../Images/shop.png";
import trophies from "../../Images/trophy (1) 1.png";
import classes from "./index.module.scss";

function Navigation({ header, footer }) {
  const location = useLocation();

  const isLinkActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

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
          : "navBar aside bg-body-tertiary pt-lg-5 pb-lg-3 py-3"
      }
    >
      {header ? (
        <>
          <span
            onClick={toggleActive}
            className={`${isActive ? "d-none" : "d-block"}`}
          >
            <FaBars className="custom-icon1" />
          </span>
          <Navbar className={`responsive-nav ${isActive ? "active" : ""}`}>
            <span
              onClick={toggleActive}
              className={`${isActive ? "d-block" : "d-none"}`}
            >
              <IoClose className="custom-icon2" />
            </span>

            <Nav className="me-auto flex-lg-row flex-column">
              <Nav.Link as={Link} to="/home" className={isLinkActive('/home')}>
                <img src={home} alt="icon" />
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/explore" className={isLinkActive('/explore')}>
                <img src={explore} alt="icon" />
                Explore
              </Nav.Link>
              <Nav.Link as={Link} to="/tornament" className={isLinkActive('/tornament')}>
                <img src={trophy} alt="icon" />
                Tournament
              </Nav.Link>
              <Nav.Link as={Link} to="/BuyCoin" className={isLinkActive('/BuyCoin')}>
                <img src={Buy} alt="icon" />
                Store
              </Nav.Link>
              <ButtonGroup className="align-items-center" id="profile-btn">
                <Link to={"/Purchase"} className={`btn ${classes.iconBtn}`}>
                  <span className={classes.icon}>
                    <i className="fas fa-plus"></i>
                  </span>
                  <span className={classes.text}>75678412</span>
                  <img src={coin} alt="icon" />
                </Link>
                <Link to={"/profile"} className={`btn ${classes.profileBtn}`}>
                  <img src={avatar} alt="icon" />
                </Link>
              </ButtonGroup>
            </Nav>
          </Navbar>
        </>
      ) : (
        <Nav className="me-auto flex-column w-100 nav-links">
          <Nav.Link to="/home" className="mb-3 active home-icon">
            <img src={home} alt="icon" />
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/tornament" className="btn btn-primary btn-bg trophy mb-3">
            <img src={trophies} alt="icon" />
            Tournament
          </Nav.Link>
          <Nav.Link  as={Link} to="/tornament"className="btn btn-primary btn-bg store mb-3">
            <img src={judge} alt="icon" />
            Judge
          </Nav.Link>
          <Nav.Link as={Link} to="/BuyCoin" className="btn btn-primary btn-bg judge mb-3">
            <img src={shop} alt="icon" />
            Store
          </Nav.Link>
          
        </Nav>
      )}
    </Navbar>
  );
}

export default Navigation;
