import React from "react";
import { Modal } from "react-bootstrap";

const SuccessPurchae = (props) => {
  return (
    <Modal
      className={"transparentModa"}
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="mb-3"></div>
        {/* <h6>SELECT YOUR CARD</h6> */}
        <p className="text-light">Coins purchased successfully</p>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessPurchae;
