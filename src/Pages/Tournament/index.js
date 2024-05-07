import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./index.module.scss";
import { useParams } from "react-router-dom";
import Loader from "Components/Loader";

const Tournament = () => {
  let { tab } = useParams();

  const con = ()=>{
    console.log("Tournament useEffect");
  }

  useEffect(()=>{
    con();
  },[])

  return (
    <>
        <section className="py-3">
          <Container>
            <h5 className={classes.heading}>Tournaments</h5>
            <div className={"sectionHolder"}>
              <TabDetails first={`${tab}`} tournament />
            </div>
          </Container>
        </section>
    </>
  );
};

export default Tournament;
