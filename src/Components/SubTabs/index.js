import UltraRare from "Components/UltraRare";
import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import img1 from "../../Images/rare1.png";
import img2 from "../../Images/rare1.png";

const data = [
    {
        title:"Sunflower Theme",
        img: img1,
        coin:"100"
    },
    {
        title:"Sunflower Theme",
        img: img2,
        coin:"100"
    },
    {
        title:"Sunflower Theme",
        img: img1,
        coin:"100"
    },
    {
      title:"Sunflower Theme",
      img: img1,
      coin:"100"
  },
  {
    title:"Sunflower Theme",
    img: img1,
    coin:"100"
},
{
  title:"Sunflower Theme",
  img: img1,
  coin:"100"
},
{
  title:"Sunflower Theme",
  img: img1,
  coin:"100"
},
{
  title:"Sunflower Theme",
  img: img1,
  coin:"100"
},
{
  title:"Sunflower Theme",
  img: img1,
  coin:"100"
},

]

const SubTabs = ({ icon }) => {
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
          <UltraRare data={data}/>
          </Tab>
        </Tabs>
      )}
    </>
  );
};

export default SubTabs;
