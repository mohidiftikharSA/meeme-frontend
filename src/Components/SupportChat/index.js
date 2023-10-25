import React from "react";
import classes from "./index.module.scss";
import Heading from "Components/Heading";
import user from "../../Images/profile1.png";
import attachment1 from "../../Images/attachment2.png";
import attachment2 from "../../Images/attachment1.png";
import logo from "../../Images/scondaryLogo.png";
import { BsImage } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaSmile } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { useWizard } from "react-use-wizard";

const SupportChat = () => {
  const { previousStep } = useWizard();
  return (
    <>
      <div className={classes.ChatBoxHolder}>
      <span style={{display:"inline-block", width:"105px"}} onClick={()=>(previousStep())}>
        <Heading title={"Support"} />
        </span>
        <div className={classes.sender}>
          <div
            className={"d-flex align-items-start justify-content-between mb-3"}
          >
            <div className={classes.textBox}>
              <div className={classes.profileImg}>
                <img src={user} alt="img" />
              </div>
              <div className={classes.userInfo}>
                <h5>Plagiarism</h5>
                <p>9UF39HJ3HJ</p>
              </div>
            </div>
            <span className={classes.status}>Pending</span>
          </div>
          <p className={classes.msg}>
            These rules and regulations for the use of Memee, located at
            Stumble’scom. By accessing this website we assume you accept these
            terms and conditions. Do not continue to use if you do not agree to
            take all of the terms and conditions stated on this page. By
            accessing this
          </p>
          <div className={classes.attachment}>
            <img src={attachment1} alt="img" />
            <img src={attachment2} alt="img" />
          </div>
        </div>
        <div className={`${classes.sender} ${classes.recive}`}>
          <div
            className={"d-flex align-items-start justify-content-between mb-3"}
          >
            <div className={classes.textBox}>
              <div className={classes.profileImg}>
                <img src={logo} alt="img" />
              </div>
              <div className={classes.userInfo}>
                <h5>Memee Admin</h5>
                <p>April 25, 2022</p>
              </div>
            </div>
            <span className={classes.status}>Pending</span>
          </div>
          <p className={classes.msg}>
            These rules and regulations for the use of Memee, located at
            Stumble’scom. By accessing this website we assume you accept these
            terms and conditions. Do not continue to use if you do not agree to
            take all of the terms and conditions stated on this page. By
            accessing this
          </p>
        </div>
      </div>

      <div className={`postionBottom ${classes.sendBox}`}>
        <span className={classes.attachBtn}>
          <BsImage />
        </span>
        <div className={classes.sendBox}>
        <Form.Control placeholder="Aa"/>
        <span className={classes.smiley}>
          <FaSmile/>
        </span>
        </div>
        <span className={classes.sendBtn}>
        <IoMdSend/>
        </span>
      </div>
    </>
  );
};

export default SupportChat;
