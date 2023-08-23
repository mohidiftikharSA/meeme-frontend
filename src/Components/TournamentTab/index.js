import React, { useState } from "react";
import classes from "./index.module.scss";
import img from "../../Images/tournament.png";
import { BiInfoCircle } from "react-icons/bi";
import { Button } from "react-bootstrap";
import InfoModal from "Components/InfoModal";
import { style } from "@mui/system";

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
      </div>
      <div className="px-5">
        <Button className="w-100 p-2 authButton">Enter Tournament</Button>
      </div>
      <InfoModal show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default TournamentTabs;
