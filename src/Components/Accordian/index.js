import AccordianBadge from "Components/AccordainBadge";
import AccordianPrize from "Components/AccordainPrize";
import BuyCoin from "Components/BuyCoin";
import ContactList from "Components/ContactList";
import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import user from "../../Images/user44.png"

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

const contactData = [
  {
      name: "Jaxson George",
      img: user,
      status: false
  },
  {
      name: "Cheyenne Gouse",
      img: user,
      status: false
  },
  {
      name: "Nolan Botosh",
      img: user,
      status: true
  },
  {
      name: "Ahmad Levin",
      img: user,
      status: true
  },
  {
      name: "Angel Vetrovs",
      img: user,
      status: true
  },
  {
      name: "Giana Curtis",
      img: user,
      status: true
  },
  {
      name: "Kadin Carder",
      img: user,
      status: true
  },
  {
      name: "Charlie Lubin",
      img: user,
      status: true
  },
  {
      name: "Omar Gouse",
      img: user,
      status: true
  },
  {
      name: "Martin Baptista",
      img: user,
      status: true
  },
  {
      name: "Brandon Dokidis",
      img: user,
      status: true
  },

]

const AccordianData = ({ following = "" }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
     {following ? (
        <Accordion className={`${activeIndex !== null ? "active following-active" : ""}`} style={{ height: '100%' }}>
        <div className={`py-5 px-4 following`}>
          <Accordion.Item eventKey="3" style={{background: '#201E23', textAlign:'center'}}>
            <Accordion.Header onClick={() => toggleActive(0)}>
            <span style={{ marginRight: "60px",marginLeft: "20px", color: "#F6CC38",fontWeight:"700",fontSize:"14px"}}>All</span>Followings
            </Accordion.Header>
           <AccordionBody>
           <ContactList contact data={contactData}  /> 
           </AccordionBody>
          </Accordion.Item>
        </div>
          </Accordion>
      ) : (
    
        <Accordion className={`${activeIndex !== null ? "active" : ""}`} style={{ height: '100%' }}>
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
            <Accordion.Body className="p-2 pt-1 pb-3">
            <BuyCoin />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header onClick={() => toggleActive(3)}>
              Ranking Prizes
            </Accordion.Header>
            <AccordianPrize />
          </Accordion.Item>
          </Accordion>
       
      )}
    </>
     
   
  );
};

export default AccordianData;
