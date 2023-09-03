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
const TutorialModals = (props) => {
  return (
    <Modal
      className={"transparentModa"}
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="mb-3">
          <img width={"120px"} src={icon} alt="icon" />
        </div>
        <h2 className=" fw-bold mb-4">Welcome to Memee</h2>
        <h5 className="text-light mb-3">Tournament Rules</h5>

        <ul className={`ruleList ${classes.ruleList}`}>
          <li>
            Memee will have a monthly Tournament that users can join.
            <div className={classes.box}>
              <div className="imgBox">
                <img src={img1} alt="" />
              </div>
            </div>
          </li>
          <li>
            The Tournament starts every first day of the month and winners are
            announced during the last day of each month.
            <div className={classes.box}>
              <div className="imgBox">
                <img src={img2} alt="" />
              </div>
              <div className="imgBox">
                <img src={img3} alt="" />
              </div>
            </div>
          </li>
          <li>
            The Tournament starts every first day of the month and winners are
            announced during the last day of each month.
            <div className={classes.box}>
              <div className="imgBox">
                <img src={img4} alt="" />
              </div>
            </div>
          </li>
          <li>
            The Tournament starts every first day of the month and winners are
            announced during the last day of each month.
            <div className={classes.box}>
              <div className="imgBox">
                <img src={img5} alt="" />
              </div>
              <div className="imgBox">
                <img src={img6} alt="" />
              </div>
            </div>
          </li>
          <li>
            The Tournament starts every first day of the month and winners are
            announced during the last day of each month.
            <div className={classes.box}>
              <div className="imgBox">
                <img src={img7} alt="" />
              </div>
            </div>
          </li>
          <li>
            The Tournament starts every first day of the month and winners are
            announced during the last day of each month.
            <div className={classes.box}>
              <div className="imgBox">
                <img src={img8} alt="" />
              </div>
              <div className="imgBox">
                <img src={img9} alt="" />
              </div>
            </div>
          </li>
          <li>
            The Tournament starts every first day of the month and winners are
            announced during the last day of each month.
            <div className={classes.box}>
              <div className="imgBox">
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
