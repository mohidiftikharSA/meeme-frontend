
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import img1 from "../../Images/rare1.png";
import img2 from "../../Images/rare2.png";
import img3 from "../../Images/rare3.png";
import img4 from "../../Images/rare4.png";
import img5 from "../../Images/rare5.png";
import img6 from "../../Images/rare6.png";
import img7 from "../../Images/rare7.png";
import img8 from "../../Images/rare8.png";
import img9 from "../../Images/rare9.png";
import UltraRare from "Components/UltraRare";

const data = [
  {
    title: "Sunflower Theme",
    img: img1,
    coin: "100"
  },
  {
    title: "Nature Theme",
    img: img2,
    coin: "100"
  },
  {
    title: "Military Theme",
    img: img3,
    coin: "100"
  },
  {
    title: "Camping Theme",
    img: img4,
    coin: "100"
  },
  {
    title: "Psychedelic Theme",
    img: img5,
    coin: "100"
  },
  {
    title: "Banana Theme",
    img: img6,
    coin: "100"
  },
  {
    title: "Mango Theme",
    img: img7,
    coin: "100"
  },
  {
    title: "Fire Theme",
    img: img8,
    coin: "100"
  },
  {
    title: "Water Theme",
    img: img9,
    coin: "100"
  },

]

const SubTabs = ({ icon ,theme}) => {
  return (
    <>
      {icon && (
        <Tabs
          defaultActiveKey={"ultra"}
          id="uncontrolled-tab-example"
          className="mb-5"
        >
          <Tab eventKey="common" title="Common">
          </Tab>
          <Tab eventKey="rare" title="Rare"></Tab>
          <Tab eventKey="ultra" title="Ultra Rare">
            <UltraRare data={data} />
          </Tab>
        </Tabs>
      )}
      {theme && 
      <Tabs
      defaultActiveKey={"ultra"}
      id="uncontrolled-tab-example"
      className="mb-5"
    >
      <Tab eventKey="common" title="Common">
      </Tab>
      <Tab eventKey="rare" title="Rare"></Tab>
      <Tab eventKey="ultra" title="Ultra Rare">
        
      </Tab>
    </Tabs>}  
    </>
  );
};

export default SubTabs;
