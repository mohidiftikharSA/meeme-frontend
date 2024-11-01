import React, { useEffect, useRef, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import memeeimg from "../../Images/memeeimage.png";
import { Button, Modal } from 'react-bootstrap';
import { formatDate } from 'Helper/Converters';
import postAPIs from 'APIs/dashboard/home'
import { toast } from 'react-toastify';

const PostViewModal = ({ data, ...props }) => {
  const [likes, setLikes] = useState(0)
  const [disLikes, setDisLikes] = useState(0)
  // const [LikedByCurrrentUser ,setLikedByCurrrentUser ] = useState(0)
  var LikedByCurrrentUser = useRef(false)
  const onClose = () => {
    props.onHide();
  };

  const likePost = async (post_id) => {
    console.log("data while like  ==", data);
    try {
      const res = await postAPIs.likePost({ post_id });
      if (res.status === 200) {
        console.log("Like success = ", likes);
        console.log("LikedByCurrrentUser = ", LikedByCurrrentUser);
        var total = 0
        if (LikedByCurrrentUser.current) {
          total = likes - 1
          LikedByCurrrentUser.current = false
        } else {
          total = likes + 1;
          LikedByCurrrentUser.current = true;
        }
        console.log("ince =", total);
        setLikes(total);
      } else {
        console.error("Error: Unexpected status code", res.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  useEffect(() => {
    if (data) {
      console.log("In use effect like  =", data);
      setLikes(data?.post_likes);
      setDisLikes(data?.post_dislikes);
      LikedByCurrrentUser.current = data?.like_by_current_user
    }
  }, [data])

  const dislikePosts = ()=>{
    toast.error('Only Tournament Posts can be disliked.')
  }
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
          <i className="fa fa-angle-left back-arrow" aria-hidden="true" onClick={onClose}>
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
          <Button className="green" onClick={() => { likePost(data.post_id) }} ><AiFillHeart />{likes}</Button>
          <Button className="red" onClick={dislikePosts} ><FaTimes />{data?.post_dislikes}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PostViewModal
