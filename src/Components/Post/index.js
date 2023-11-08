import React, { useEffect, useState } from "react";
import classes from "./index.module.scss";
import { Dropdown } from "react-bootstrap";
import like from "../../Images/like.svg";
import message from "../../Images/message.svg";
import send from "../../Images/sendbtn.png";
import ViewPost from "Components/ViewPost";
import { formatNumber } from "../../Helper/Converters";
import postAPIs from "../../APIs/dashboard/home";

// import avatar from images
import user2 from "../../Images/avatar.jpg";
import { useNavigate } from "react-router-dom";

const Posts = ({ postData, comment, avatar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [followingData, setFollowingData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const openModal = (postId) => {
    console.log('postId', postId)
    setSelectedPostId(postId);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    //setSelectedPostId(null);
    setIsModalOpen(false);
  }
  useEffect(() => {
    console.log('selectedPostId', selectedPostId)
  }, [selectedPostId, followingData]);
  useEffect(() => {
    setFollowingData(postData);
  }, [postData]);
  // const toggleActive = () => {
  //   setIsActive(!isActive);
  // };
  const likePost = async (post_id) => {
    try {
      const res = await postAPIs.likePost({ post_id });
      if (res.status === 200) {
        const updatedItems = postData.map(item => {
          if (item.post.id === post_id) {
            return { ...item, liked_by_current_user: res.data.type_data.is_liked, post_likes: res.data.likes_count };
          }
          return item
        });
        setFollowingData(updatedItems);
      } else {
        console.error("Error: Unexpected status code", res.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }

  };
  const toggleActive = (itemId) => {
    const updatedItems = postData.map(item => {
      if (item.post.id === itemId) {
        return { ...item, liked_by_current_user: !item.liked_by_current_user };
      }
      return item;
    });
    console.log('updatedItems', updatedItems)
    setFollowingData(updatedItems);
  };

  const redirectToOtherProfile = (data) => {
    console.log("On CLick Data = ", data);
    navigate(`/otherProfile/${data?.post?.user_id}`)
  }

  return (
    <>
      {
        followingData.map((item, ind) => {
          return (
            <div className={classes.postWrapper} key={ind}>
              <div className={classes.postHeader}>
                <div className={classes.profile}>
                  <div className={classes.imgBox}>
                    {/* update condition to profile post */}
                    <img src={item.user_image || (avatar.avatar || user2)}
                      alt="user" />
                  </div>
                  <div className={classes.userDetail}>
                    <h6 onClick={() => { redirectToOtherProfile(item) }}>{item.username}</h6>
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
                <li key={item.post.id} className={`item ${item.liked_by_current_user ? `${classes.active}` : ''}`} onClick={() => likePost(item.post.id)} >
                  <img src={like} alt="img" />
                  <span> {formatNumber(item.post_likes)}</span>
                </li>
                {
                  comment ? <li>
                    <img src={message} alt="img" />
                    <span>{formatNumber(item.post_comments_count)}</span>
                  </li> :
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
