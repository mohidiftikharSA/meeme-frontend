import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SuccessPurchae = (props) => {

  const navigate = useNavigate();

  const handleClose = () => {
    console.log("Close clickeed == ");
    navigate('/BuyCoin')
  };

  return (
    <Modal
      className={"transparentModa"}
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop
    >
      <Modal.Header closeButton onHide={handleClose}></Modal.Header>
      <Modal.Body>
        <div className="mb-3"></div>
        {/* <h6>SELECT YOUR CARD</h6> */}
        <p className="text-light">Coins purchased successfully</p>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessPurchae;
