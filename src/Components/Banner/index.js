import React, { useState } from "react";
import classes from "./index.module.scss";
import userimg from "../../Images/avatar.jpg";
import { Button } from "react-bootstrap";
import setting from "../../Images/SettingIcon.png";
import edit from "../../Images/editUser.png";
import { useNavigate } from "react-router-dom";
import FollowModal from "Components/FollowModal";


const Banner = ({other , profile}) => {
  const [show, setShow] = useState(false);
  const [follwers, setfollowrshow] = useState(false);
  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`/CustomizeProfile`);
  };


  return (
    <>
    <div className={`banner pb-4 px-2 ${other&& `banner pb-4 otherBanner` }`}>
      <div className="sectionHolder" style={{ maxWidth: "350px" }}>
        <div className={classes.profileDetail}>
          <div className={classes.profileDetails}>
            <img src={profile?.user_image || userimg} alt="" />
            <h4 >{profile?.user?.username}</h4>
          </div>
         {
          other && 
          <div className={classes.btnBox}>
          <Button>Follow</Button>
          <Button>Message</Button>
        </div>
         }
          <ul className={classes.userInfoBox}>
            <li>
              <h5 >
                {profile?.all_post_count} <span>Posts</span>
              </h5>
            </li>
            <li>
              <h5 onClick={() => {setfollowrshow(true)}}>
                {profile?.followers} <span>Followers</span>
              </h5>
            </li>
            <li>
              <h5 onClick={() => {setShow(true)}}>
                {profile?.following} <span>Followings</span>
              </h5>
            </li>
          </ul>
          <h6 className="mb-4 text-center">
            {profile?.user?.bio}
          </h6>
          <div className={classes.btnGroup}>
            <Button onClick={nextPage}>
              <img src={edit} alt="img" />
            </Button>
            <Button>
              <img src={setting} alt="img" />
            </Button>
          </div>
        </div>
      </div>
      
    </div>
    <FollowModal following show={show} onHide={() => setShow(false)} />
    <FollowModal followers show={follwers} onHide={() => setfollowrshow(false)} />
    </>
  );
};

export default Banner;
