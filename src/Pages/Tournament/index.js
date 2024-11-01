import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./index.module.scss";
import { useParams } from "react-router-dom";
import Loader from "Components/Loader";

const Tournament = () => {
  let { tab } = useParams();
  const [active , setActive ] = useState();
  
  return (
    <>
        <section className="py-3">
          <Container>
            {active === 'tournament' && <h5 className={classes.heading}>Tournaments</h5>}
            <div className={"sectionHolder"}>
              <TabDetails setActive={setActive} first={`${tab}`} tournament  />
            </div>
          </Container>
        </section>
    </>
  );
};

export default Tournament;
