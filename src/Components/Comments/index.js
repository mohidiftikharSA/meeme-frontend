import Heading from "Components/Heading";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { timeFormat } from "../../Helper/Converters";
import userimg from "../../Images/user1.png";
import classes from "./index.module.scss";
import user2 from "../../Images/avatar.jpg";

const Comments = ({ data, avatar, postComment, postId, user }) => {
  const [replayVisible, setReplayVisible] = useState(false);
  const [comment, setComment] = useState("");

  const handlePostComment = () => {
    postComment(comment, postId);
    setComment("");
  };

  const toggleReplayVisibility = () => {
    setReplayVisible(!replayVisible);
  };

  const toggleReplayHolderVisibility = () => {
    setReplayVisible(!replayVisible);
  };

  return (
    <div className="py-lg-5 py-3 px-3">
      <Heading title={"Comments"} />
      <ul className={classes.commentList}>
        {data
          .slice()
          .reverse()
          .map((item, index) => {
            return (
              <li key={index}>
                <div className={`${classes.flexBox}`}>
                  <div className={classes.userImg}>
                    <img
                      src={item.user_image || avatar.avatar || user2}
                      alt="Profile"
                    />
                  </div>
                  <div className={classes.commentBox}>
                    <h6 className="mb-0">{item.user}</h6>
                    <p>{item.description}</p>
                  </div>
                </div>
                <div className={classes.bottomBox}>
                  <span>{timeFormat(item.comment_time)}</span>
                  <span>Like</span>
                  <span onClick={toggleReplayHolderVisibility}>Reply</span>
                </div>

                <div className={`${classes.flexBox} ${classes.replay}`}>
                  <div className={classes.userImg}>
                    <img
                      src={userimg || avatar.avatar || user2}
                      alt="Profile"
                    />
                  </div>
                  <div className={`${classes.commentBox} ${classes.replayBox}`}>
                    <h6 className="mb-0">Julia</h6>
                    <p>Hahaha.... You nailed it!</p>
                  </div>
                </div>
                <div
                  className={classes.viewmore}
                  onClick={toggleReplayVisibility}
                >
                  {replayVisible ? null : (
                    <span style={{ paddingLeft: "50px" }}>
                      View 2 more replay.....
                    </span>
                  )}
                </div>
                {replayVisible && (
                  <>
                    <div className={`${classes.flexBox} ${classes.replay}`}>
                      <div className={classes.userImg}>
                        <img
                          src={userimg || avatar.avatar || user2}
                          alt="Profile"
                        />
                      </div>
                      <div
                        className={`${classes.commentBox} ${classes.replayBox}`}
                      >
                        <h6 className="mb-0">Julia</h6>
                        <p>Hahaha.... You nailed it!</p>
                      </div>
                    </div>
                    <div className={`${classes.flexBox} ${classes.replay}`}>
                      <div className={classes.userImg}>
                        <img
                          src={userimg || avatar.avatar || user2}
                          alt="Profile"
                        />
                      </div>
                      <div
                        className={`${classes.commentBox} ${classes.replayBox}`}
                      >
                        <h6 className="mb-0">Julia</h6>
                        <p>Hahaha.... You nailed it!</p>
                      </div>
                    </div>

                    <div
                      className={classes.postComment}
                      style={{ padding: "0 50px",marginTop:"10px" }}
                    >
                      <div className={classes.userImg}>
                        <img src={userimg} alt="Profile" />
                      </div>
                      <Form>
                        <div className="position-relative">
                          <input
                            type="text"
                            placeholder="Write a comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <button type="button" onClick={handlePostComment}>
                            Post
                          </button>
                        </div>
                      </Form>
                    </div>
                  </>
                )}
              </li>
            );
          })}
      </ul>

      <div className={classes.postComment}>
        <div className={classes.userImg}>
          <img src={user2} alt="Profile" />
        </div>
        <Form>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="button" onClick={handlePostComment}>
              Post
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Comments;
