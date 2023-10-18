import React, {useEffect, useState} from "react";
import classes from "./index.module.scss";
import { Dropdown } from "react-bootstrap";
import like from "../../Images/like.svg";
import message from "../../Images/message.svg";
import send from "../../Images/sendBtn.svg";
import ViewPost from "Components/ViewPost";
import {formatNumber} from "../../Helper/Converters";

const Posts = ({ postData,comment,avatar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [followingData, setFollowingData] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const openModal = (postId) => {
    console.log('postId',postId)
    setSelectedPostId(postId);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setSelectedPostId(null);
    setIsModalOpen(false);
  }
  useEffect(() => {
    console.log('selectedPostId',selectedPostId)
  }, [selectedPostId]);

  const toggleActive = () => {
    setIsActive(!isActive);
  };
  const liClass = isActive ? `${classes.active}` : '';  return (
    <>
      {
      postData.map((item, ind) => {
        return (
          <div className={classes.postWrapper} key={ind}>
            <div className={classes.postHeader}>
              <div className={classes.profile}>
                <div className={classes.imgBox}>
                  <img src={item.user_image||avatar.avatar} alt="user" />
                </div>
                <div className={classes.userDetail}>
                  <h6>{item.username}</h6>
                  {/*<p>{item.location}</p>*/}
                </div>
              </div>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <i className="fas fa-ellipsis-v"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1"><i className="far fa-flag"></i> Flag Post</Dropdown.Item>
                  <Dropdown.Item href="#/action-2"><i className="fas fa-exclamation"></i>Report</Dropdown.Item>
                  <Dropdown.Item href="#/action-3"><i className="fas fa-download"></i>Download</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className={classes.PostDetails}>
              {item.post.description && <p>{item.post.description}</p>}
              {item.post.tag_list && <p className={classes.tags}>{item.post.tag_list}</p>}
            </div>
            <div className={`${classes.imgBox} memeImg mb-3`}>
              <img src={item.compress_image} alt="img" />
            </div>

            <ul className={classes.postFooter}>
              <li  className={liClass} onClick={toggleActive} >
                <img src={like} alt="img" />
                <span> {formatNumber(item.post_likes)}</span>
              </li>
              {
                comment? <li>
                <img src={message} alt="img" />
                <span>{formatNumber(item.post_comments_count)}</span>
              </li>:
              <li onClick={() => openModal(item.post.id)}>
              <img src={message} alt="img" />
              <span>{formatNumber(item.post_comments_count)}</span>
            </li>
              }

              <li>
                <img src={send} alt="img" />
                <span>{formatNumber(item.post.share_count)}</span>
              </li>
            </ul>
          </div>
        );
      })

      }

      <ViewPost onHide={closeModal} show={isModalOpen} selectedPostId={selectedPostId} postData={postData} avatar={avatar} />
    </>
  );
};

export default Posts;
