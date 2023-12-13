import React, { useState } from "react";
import classes from "./index.module.scss";
import img from "../../Images/tornament.png";
import { BiInfoCircle } from "react-icons/bi";
import { Button } from "react-bootstrap";
import InfoModal from "Components/InfoModal";
import PostContentModal from "Components/TournamentModal";

const TournamentTabs = () => {
  const [show, setShow] = useState(false);
  const [tournamentModalShow, settournamentModalShow] = useState(false);
  return (
    <>
     <div className="text-end mb-2">
     <span
        className={classes.icon}
        onClick={() => {
          setShow(true);
        }}
      >
        <BiInfoCircle />
      </span>
     </div>
      <div className={`imgBox mb-4 position-relative ${classes.imgBox}`}>
        <img src={img} alt="img" />
        <div className={classes.scoreBoard}>
          <span>100 Particpants</span>
          <span>2,500 Meme Posts</span>
        </div>
      </div>
      <div className="text-center">
        <Button className={`p-2 authButton ${classes.btn}`} onClick={() => {
          settournamentModalShow(true);
        }}>Enter Tournament</Button>
      </div>
      <InfoModal show={show} onHide={() => setShow(false)} />
      <PostContentModal show={tournamentModalShow} onHide={() => settournamentModalShow(false)} />
    </>
  );
};

export default TournamentTabs;
