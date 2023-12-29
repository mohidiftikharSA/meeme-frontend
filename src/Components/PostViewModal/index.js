import React from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import memeeimg from "../../Images/memeeimage.png";
import { Button, Modal } from 'react-bootstrap';
import { formatDate } from 'Helper/Converters';

const PostViewModal = ({ data, ...props }) => {
  const onClose = () => {
    props.onHide();
  }; 

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
            {data?.post_time ? formatDate(data?.post_time) : ""}
          </span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="imagBox" style={{ padding: "10px" }} >
          <img src={data?.post_image || memeeimg} alt="img" />
        </div>
        <div >
          <Button className="green" ><AiFillHeart />{data?.post_likes}</Button>
          <Button className="red"><FaTimes />{data?.post_dislikes}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PostViewModal
