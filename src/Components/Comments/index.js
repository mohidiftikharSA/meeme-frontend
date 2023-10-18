import Heading from "Components/Heading";
import React from "react";
import classes from "./index.module.scss";
import user2 from "../../Images/user10.png";
import { Form } from "react-bootstrap";

const Comments = ({ data }) => {
  return (
    <div className="py-5 px-3">
      <Heading title={"Comments"} />
      <ul className={classes.commentList}>
        {data.map((items, ind) => {
          return (
            <li>
              <div className={classes.flexBox}>
                <div className={classes.userImg}>
                  <img src={items.user_image} alt="img" />
                </div>
                <div className={classes.commentBox}>
                  <h6>{items.user}</h6>
                  <p>{items.description}</p>
                </div>
              </div>
              <div className={classes.bottomBox}>
                <span>18m</span>
                <span>Like</span>
                <span>Replay</span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={classes.postComment}>
        <div className={classes.userImg}>
          <img src={user2} alt="img" />
        </div>
        <Form>
          <div className="position-relative">
            <Form.Control placeholder="Write a comment" />
            <button>Post</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Comments;
