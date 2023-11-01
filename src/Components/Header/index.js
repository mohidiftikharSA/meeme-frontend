import Logo from "Components/Logo";
import React, { useEffect, useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import classes from "./index.module.scss";
import Search from "Components/Search";
import Navigation from "Components/Nav";
import { Link } from "react-router-dom";
import coin from "../../Images/coin.png";
import profile from "../../Images/profile1.png"

const Header = () => {
  const [scrolling, setScrolling] = useState(false);
  
  
  const handleScroll = () => {
    if (window.scrollY > 80) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  return (
    <header  className={`${scrolling ? `${classes.headerFixed} ${classes.header}` : classes.header}`}>
      <Container fluid>
        <div className="d-flex align-items-center justify-content-between">
          <Logo link={'/home'} />
          <div className={classes.rightSide}>
            <Search text={"Search"} />
            <Navigation header/>
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
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
