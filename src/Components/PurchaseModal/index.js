import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import icon from "../../Images/coin.png";
import classes from "./index.module.scss";
import SuccessPurchase from "Components/SuccessPurchase";

const PurchaseModal = (props) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleBuyClick = () => {
    // Perform the purchase logic here
    // Once the purchase is successful, show the success modal
    setShowSuccessModal(true);
    // Close the purchase modal
    props.onHide();
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
            <Button onClick={handleBuyClick}>Buy</Button>
            <Button onClick={props.onHide}>Deny</Button>
          </div>
        </Modal.Body>
      </Modal>
      <SuccessPurchase
        show={showSuccessModal}
        onHide={handleCloseSuccessModal}
      />
    </>
  );
};

export default PurchaseModal;
