import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import icon from "../../Images/coin.png";
import classes from "./index.module.scss";
import SuccessPurchae from "Components/SuccessPurchase";
const PurchaceModal = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(!show);
  };
  return (
    <>
      <Modal
        className={"transparentModa"}
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <img width={"60px"} src={icon} alt="icon" />
          </div>
          <h2 className="grad-text fw-bold">10,000</h2>
          <p className="text-light fw-bold">
            are you sure you want to buy 10,000 coins for $10?
          </p>
          <div className={classes.btnBox}>
            <Button
              onClick={handleClose}
            >
              Buy
            </Button>
            <Button onClick={props.onHide}>Deny</Button>
          </div>
        </Modal.Body>
      </Modal>
      <SuccessPurchae show={show} onHide={() => setShow(false)} />
    </>
  );
};

export default PurchaceModal;
