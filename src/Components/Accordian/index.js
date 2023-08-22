import AccordianBadge from "Components/AccordainBadge";
import AccordianPrize from "Components/AccordainPrize";
import BuyCoin from "Components/BuyCoin";
import ContactList from "Components/ContactList";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

const data = [
  {
    title: "Funny",
  },
  {
    title: "CanadaPolitics",
  },
  {
    title: "TrumpSeason",
  },
  {
    title: "XaviarQuotes",
  },
  {
    title: "SmilyCats",
  },
];

const AccordianData = ({ following = "" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Accordion className={`${activeIndex !== null ? "active" : ""}`} style={{ height: '100%' }}>
      {following ? (
        <div className={`py-5 px-4 following`}>
          <Accordion.Item eventKey="3">
            <Accordion.Header onClick={() => toggleActive(0)}>
              Followings
            </Accordion.Header>
            <ContactList /> 
          </Accordion.Item>
        </div>
      ) : (
        <>
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={() => toggleActive(1)}>
              Trending Tags
            </Accordion.Header>
            <AccordionBody>
            <AccordianBadge data={data}/>
            </AccordionBody>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header onClick={() => toggleActive(2)}>
              Buy Coins
            </Accordion.Header>
            <BuyCoin />
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header onClick={() => toggleActive(3)}>
              Ranking Prizes
            </Accordion.Header>
            <AccordianPrize />
          </Accordion.Item>
        </>
      )}
    </Accordion>
  );
};

export default AccordianData;
