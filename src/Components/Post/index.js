import React from "react";
import classes from "./index.module.scss";
import { Dropdown } from "react-bootstrap";
import like from "../../Images/like.svg";
import message from "../../Images/message.svg";
import send from "../../Images/sendBtn.svg";
const Posts = ({ postData }) => {
  return (
    <>
      {postData.map((item, ind) => {
        return (
          <div key={ind} className={classes.postWrapper}>
            <div className={classes.postHeader}>
              <div className={classes.profile}>
                <div className={classes.imgBox}>
                  <img src={item.user} alt="user" />
                </div>
                <div className={classes.userDetail}>
                  <h6>{item.name}</h6>
                  <p>{item.location}</p>
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
              {}
              {item.postTitle && <p>{item.postTitle}</p>}
              {item.tags && <p className={classes.tags}>{item.tags}</p>}
            </div>
            <div className={classes.imgBox}>
              <img src={item.post} alt="img" />
            </div>

            <ul className={classes.postFooter}>
              <li>
                <img src={like} alt="img" />
                <span> 12.3k</span>
              </li>
              <li>
                <img src={message} alt="img" />
                <span>323</span>
              </li>
              <li>
                <img src={send} alt="img" />
                <span>323</span>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default Posts;
