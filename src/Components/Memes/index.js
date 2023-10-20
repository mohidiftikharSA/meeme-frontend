import React, { useState } from "react";
import classes from "./index.module.scss";
import dummyUser from "../../Images/user-dummy.png";
import ViewPost from "Components/ViewPost";

const MemesDetails = ({ newMemesData, explore,avatar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const openModal = (postId) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
    console.log(postId);
  };

  const closeModal = () => {
    //ssetSelectedPostId(null);
    setIsModalOpen(false);
  };
  // Function to determine if the item should be displayed as an image
  function isImage(item) {
    // Check if the 'post_type' field is defined and indicates that the item is an image
    return item.post_type && item.post_type.startsWith("image/");
  }

  return (
    <>
      <div
        className={`${classes.flexBox} ${
          explore ? `${classes.exploreBox}` : ""
        }`}
      >
        {newMemesData.map((item, ind) => (
          <div
            key={ind}
            className={classes.imgBox}
            onClick={() => openModal(item.post.id)}
          >
            {isImage(item) ? (
              <img src={item.compress_image} alt="img" />
            ) : (
              <video controls>
                <source src={item.compress_image} type={item.post_type} />
                Your browser does not support the video tag.
              </video>
            )}
            <div className={classes.profileDetail}>
              <img src={item.user_image || dummyUser} alt="icon" />
              <span>{item.username}</span>x
            </div>
          </div>
        ))}
      </div>
      <ViewPost
        onHide={closeModal}
        show={isModalOpen}
        selectedPostId={selectedPostId}
        postData={newMemesData}
        avatar={avatar}
      />
    </>
  );
};

export default MemesDetails;
