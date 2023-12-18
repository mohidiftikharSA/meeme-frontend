import React from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import memeeimg from "../../Images/memeeimage.png";

const PostViewModal = () => {
    return (
        <Modal
        className={"PostContentModal postView"}
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={false}>
          <Modal.Title id="contained-modal-title-vcenter">
            <i className="fa fa-angle-left" aria-hidden="true" onClick={onClose}>
              <span>Details</span>
            </i>
            <span className="data">
              January 1,2022
            </span>
          </Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <div className="imagBox">
            <img src={memeeimg} alt="img" />
          </div>
          <div >
            <Button className="green" ><AiFillHeart />324</Button>
            <Button className="red"><FaTimes />12</Button>
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default PostViewModal
