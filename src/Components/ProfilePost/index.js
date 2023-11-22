import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ViewPost from "Components/ViewPost";
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.jpg"


const ProfilePost = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [followingData, setFollowingData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [postData , setPostData] = useState();


  const openModal = (postId, postData) => {
    console.log('postId', postId);
    console.log("Post Arr == ", data );
    setPostData(postData);
    setSelectedPostId(postId);
    setIsModalOpen(true);
    
  }

console.log("data", data)
  const closeModal = () => {
    setSelectedPostId(null);
    setIsModalOpen(false);
  }
  useEffect(() => {
    setFollowingData(data);
  }, [data]);
  
  return (
    <>
      <div className={classes.postHolder}>
        <div className={classes.header}>
          <h4>{data?.length} Posts</h4>
          <Form.Select className="form" style={{ width: "120px" }}>
            <option value="1">April</option>
            <option value="2">May</option>
            <option value="3">June</option>
          </Form.Select>
        </div>
        <div className={classes.box}>
          {data?.slice()?.reverse()?.map((item, ind) => (
            <div className={classes.imgBox} onClick={() => openModal(item?.post_id, item)}>
              <img src={item?.post_image} alt="" />
            </div>
          ))}
        </div>
      </div>
      {/* <ViewPost profile onHide={closeModal} show={isModalOpen} selectedPostId={selectedPostId} postData={postData} avatar={avatar}  /> */}
    </>
  );
};

export default ProfilePost;
