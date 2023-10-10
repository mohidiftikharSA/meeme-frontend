import React from 'react';
import classes from './index.module.scss';
import dummyUser from '../../Images/user-dummy.png';

const MemesDetails = ({ newMemesData, explore }) => {
  // Function to determine if the item should be displayed as an image
  function isImage(item) {
    // Check if the 'post_type' field is defined and indicates that the item is an image
    return item.post_type && item.post_type.startsWith('image/');
  }

  return (
    <div className={`${classes.flexBox} ${explore ? `${classes.exploreBox}` : ''}`}>
      {newMemesData.map((item, ind) => (
        <div key={ind} className={classes.imgBox}>
          {isImage(item) ? (
            <img src={item.compress_image} alt="img" />
          ) : (
            <video controls>
              <source src={item.compress_image} type={item.post_type} />
              Your browser does not support the video tag.
            </video>
          )}
          <div className={classes.profileDetail}>
            <img src={item.user_image || dummyUser} alt='icon' />
            <span>{item.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemesDetails;
