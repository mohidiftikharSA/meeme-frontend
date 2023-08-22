import React from "react";
import classes from "./index.module.scss";
import Header from "Components/Header";
import { Container } from "react-bootstrap";


const MainLayout = ({ children }) => {
  return (
    <div id={classes.wrapper}>
      <Header />
      <Container fluid>
        <main id={classes.main}>{children}</main>
      </Container>
    </div>
  );
};

export default MainLayout;
