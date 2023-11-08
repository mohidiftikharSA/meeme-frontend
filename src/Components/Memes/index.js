import React, {useEffect, useState} from "react";
import classes from "./index.module.scss";
import dummyUser from "../../Images/user-dummy.png";
import defaultImage from "../../Images/default.png";
import ViewPost from "Components/ViewPost";

const MemesDetails = ({ newMemesData, explore,avatar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postData, setPostData] = useState([]);

  const openModal = (postId) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
    console.log(postId);
  };
    useEffect(() => {
        console.log('length',newMemesData.length)
        setPostData(newMemesData)
    }, [newMemesData]);
    // useEffect(() => {
    //     console.log(' postData length',postData.length)
    // }, [postData]);

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
        {postData.map((item, ind) => (
          <div
            key={item.post.id}
            className={classes.imgBox}
            onClick={() => openModal(item.post.id)}
          >
            {isImage(item) ? (
                <img
                    src={item.compress_image}
                    alt="img"
                    onError={(e) => {
                        e.target.src = defaultImage; // Set a placeholder image on error
                    }}
                />

            ) : (
              <video controls>
                <source src={item.compress_image} type={item.post_type} />
                Your browser does not support the video tag.
              </video>
            )}
            <div className={classes.profileDetail}>
              <img src={item.user_image || dummyUser} alt="icon" />
              <span>{item.username}</span>
            </div>
          </div>
        ))}
      </div>
      <ViewPost
        onHide={closeModal}
        show={isModalOpen}
        selectedPostId={selectedPostId}
        postData={postData}
        avatar={avatar}
      />
    </>
  );
};

export default MemesDetails;
