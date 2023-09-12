import React, { useState } from "react";
import classes from "./index.module.scss";
import profile from "../../Images/following2.png";
import { Button } from "react-bootstrap";
import setting from "../../Images/SettingIcon.png";
import edit from "../../Images/editUser.png";
import { useNavigate } from "react-router-dom";
import FollowModal from "Components/FollowModal";
const Banner = ({other}) => {
  const [show, setShow] = useState(false);
  const [follwers, setfollowrshow] = useState(false);
  const navigate = useNavigate();
  const nextPage = () => {
    navigate(`/CustomizeProfile`);
  };
  return (
    <>
    <div className={`banner pb-4 px-3 ${other&& `banner pb-4 otherBanner` }`}>
      <div className="sectionHolder" style={{ maxWidth: "350px" }}>
        <div className={classes.profileDetail}>
          <div className={classes.profileDetails}>
            <img src={profile} alt="" />
            <h4>Mr Astronut</h4>
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
                37 <span>Posts</span>
              </h5>
            </li>
            <li>
              <h5 onClick={() => {setfollowrshow(true)}}>
                283k <span>Followers</span>
              </h5>
            </li>
            <li>
              <h5 onClick={() => {setShow(true)}}>
                488 <span>Followings</span>
              </h5>
            </li>
          </ul>
          <h6 className="mb-4 text-center">
            “Like to travel and shoot cinematic videos and love to catpure
            nature”
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
