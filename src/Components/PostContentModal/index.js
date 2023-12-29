import { Modal } from "react-bootstrap";
import { LiaTimesSolid } from "react-icons/lia";
import React, { useState } from "react";

export default function PostContentModal(props) {
  const [modalShow, setModalShow] = useState(false);
  const clickHandler = () =>{
    setModalShow(true)
    props.onHide()
  }
  return (
    <>
      <Modal 
        className={"infoModal black"} 
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="justify-content-end header">
          <span className={"closeBtn"} onClick={clickHandler}>
            <LiaTimesSolid />
          </span>
        </Modal.Header>
        <Modal.Body className="m-0 congrats tournament">
          <div
            className="imgBox  mb-4"
            style={{ width: "75px", margin: "auto", marginTop: "150px" }}
          >
          </div>
          <h4  style={{paddingTop: "100px" }} className="title">Congratulations</h4>
          <p className="m-0">Congrats, You joined the Tournament</p>
        </Modal.Body>
      </Modal>
    </>
  )
}



