import React from "react";
import classes from "./index.module.scss";
import profile from "../../Images/profile1.png";
import { Button } from "react-bootstrap";
import setting from "../../Images/SettingIcon.png";
import edit from "../../Images/editUser.png";
import { useNavigate } from "react-router-dom";
const Banner = () => {
  const navigate = useNavigate();
  const nextPage = () => {
    navigate(`/CustomizeProfile`);
  };
  return (
    <div className="banner pb-4">
      <div className="sectionHolder" style={{ maxWidth: "350px" }}>
        <div className={classes.profileDetail}>
          <div className={classes.profileDetails}>
            <img src={profile} alt="" />
            <h4>Mr Astronut</h4>
          </div>
          <ul className={classes.userInfoBox}>
            <li>
              <h5>
                37 <span>Posts</span>
              </h5>
            </li>
            <li>
              <h5>
                283k <span>Followers</span>
              </h5>
            </li>
            <li>
              <h5>
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
  );
};

export default Banner;
