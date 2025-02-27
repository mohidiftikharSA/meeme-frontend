import React from "react";
import { Modal } from "react-bootstrap";
import icon from "../../Images/logo.png";
import classes from "./index.module.scss";
import img1 from "../../Images/tutotial1.png";
import img2 from "../../Images/tutorial2.png";
import img3 from "../../Images/tutorial3.png";
import img4 from "../../Images/tutotial4.png";
import img5 from "../../Images/tutotial5.png";
import img6 from "../../Images/tutotial6.png";
import img7 from "../../Images/tutotial7.png";
import img8 from "../../Images/tutotial8.png";
import img9 from "../../Images/tutotial9.png";
import img10 from "../../Images/tutotial10.png";
import img11 from "../../Images/tutotrial11.png"
const TutorialModals = (props) => {
  return (
    <Modal
      className={"transparentModa"}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{fontFamily: 'Gotham Rounded'}}>
        <div className="mb-4">
          <img width={"120px"} src={icon} alt="icon" />
        </div>
        <h2 className={`text-center ${classes.heading}`}>Welcome to Memee</h2>
        <h5 className="text-light mb-4">Tournament Rules</h5>

        <ul className={`ruleList ${classes.ruleList}`}>
          <li>
          <p className={classes.title}>Memee will have a monthly Tournament that users can join.</p>
            <div className={classes.box}>
              <div className={`imgBox ${classes.spaceImg}`}>
                <img src={img1} alt="" />
              </div>
            </div>
          </li>
          <li>
          <p className={classes.title}> The Tournament starts every first day of the month and winners are
            announced during the last day of each month.</p>
            <div className={classes.box}>
              <div className="imgBox">
                <img src={img3} alt="" />
              </div>
              <div className="imgBox">
                <img src={img2} alt="" />
              </div>
            </div>
          </li>
          <li>
          <p className={classes.title}> End Users can join and post  memes in the tournament as many  as they want. </p>
            <div className={classes.box}>
              <div className={`imgBox ${classes.spaceImg}`}>
                <img src={img4} alt="" />
              </div>
            </div>
          </li>
          <li>
          <p className={classes.title}>  There are also other ways to accumulate coins. Judging is another way of acquiring coins from the app. End Users can judge 25 memes daily and gain 150 coins on a daily basis.</p>
            <div className={classes.box}>
            <div className="imgBox">
                <img src={img11} alt="" />
              </div>
              <div className="imgBox">
                <img src={img5} alt="" />
              </div>
            </div>
          </li>
          <li>
          <p className={classes.title}> Coins can buy icons, themes, profile and background overlays. </p>
            <div className={classes.box}>
              <div className={`imgBox ${classes.spaceImg}`}>
                <img src={img6} alt="" />
              </div>
            </div>
          </li>
          <li>
          <p className={classes.title}>There are hundreds of combination that you can choose from to make a unique experience using the app.</p>
            <div className={`${classes.box} ${classes.centerBox}`}>
              <div className="imgBox">
                <img src={img7} alt="" />
              </div>
              <div className="imgBox">
                <img src={img8} alt="" />
              </div>
            </div>
          </li>
          <li>
          <p className={classes.title}>The top 3 votes are the tournament winners and will be rewarded with Amazon gift cards. </p>
            <div className={`${classes.box} ${classes.centerBox}`}>
              <div className={`imgBox ${classes.spaceImg}`}>
                <img src={img9} alt="" />
              </div>
            </div>
          </li>
          <li>
          <p className={classes.title}>The 4th to 10th place in the tournament will receive coin rewards. </p>
            <div className={`${classes.box} ${classes.centerBox}`}>
              <div className={`imgBox ${classes.spaceImg}`}>
                <img src={img10} alt="" />
              </div>
            </div>
          </li>

        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default TutorialModals;
