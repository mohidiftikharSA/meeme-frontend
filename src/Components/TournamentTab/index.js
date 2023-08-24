import React, { useState } from "react";
import classes from "./index.module.scss";
import img from "../../Images/tornamentBg.png";
import { BiInfoCircle } from "react-icons/bi";
import { Button } from "react-bootstrap";
import InfoModal from "Components/InfoModal";

const TournamentTabs = () => {
  const [show, setShow] = useState(false);
  return (
    <>
     <div className="text-end">
     <span
        className={classes.icon}
        onClick={() => {
          setShow(true);
        }}
      >
        <BiInfoCircle />
      </span>
     </div>
      <div className={"imgBox mb-4 position-relative"} style={{top:"-30px"}}>
        <img src={img} alt="img" />
        <div className={classes.scoreBoard}>
          <span>100 Particpants</span>
          <span>2,500 Meme Posts</span>
        </div>
      </div>
      <div className="text-center">
        <Button className="w-50 p-2 authButton">Enter Tournament</Button>
      </div>
      <InfoModal show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default TournamentTabs;
