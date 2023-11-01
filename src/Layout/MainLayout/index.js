import React from "react";
import classes from "./index.module.scss";
import Header from "Components/Header";

const MainLayout = ({ children }) => {
  return (
    <div id={classes.wrapper}>
      <Header />
      <main id={classes.main}>{children}</main>
    </div>
  );
};

export default MainLayout;
