import TabDetails from "Components/Tabs";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./index.module.scss";
import { useParams } from "react-router-dom";
import Loader from "Components/Loader";

const Tournament = () => {
  let { tab } = useParams();
  const [active, setActive] = useState();
  console.log("taab  ---", tab)

  return (
    <>
      <section className="py-3">
        <Container>
          <div className={"sectionHolder"}>
            <TabDetails setActive={setActive} first={`${tab}`} tournament />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Tournament;
