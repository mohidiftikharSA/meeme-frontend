import Heading from "Components/Heading";
import React, {useState} from "react";
import classes from "./index.module.scss";
import user2 from "../../Images/user10.png";
import { Form } from "react-bootstrap";

const Comments = ({ data, avatar,postComment,postId }) => {
    const [comment, setComment] = useState('');
    const handlePostComment = () => {
        postComment(comment, postId); // Call the postComment function here
        setComment('');
    };
  return (
    <div className="py-lg-5 py-3 px-3">
      <Heading title={"Comments"} />
      <ul className={classes.commentList}>
        {data.reverse().map((items, ind) => {
          return (
            <li key={ind}>
              <div className={classes.flexBox}>
                <div className={classes.userImg}>
                  <img src={items.user_image||avatar.avatar} alt="img" />
                </div>
                <div className={classes.commentBox}>
                  <h6 className="mb-0">{items.user}</h6>
                  <p>{items.description}</p>
                </div>
              </div>
              <div className={classes.bottomBox}>
                <span>18m</span>
                <span>Like</span>
                <span>Reply</span>
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
              <input
                  type="text"
                  placeholder="Write a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
              />
            <button type={"button"} onClick={handlePostComment}>Post</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Comments;
