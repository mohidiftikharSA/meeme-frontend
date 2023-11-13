import Heading from "Components/Heading";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { timeFormat } from "../../Helper/Converters";
import userimg from "../../Images/user1.png";
import classes from "./index.module.scss";
import user2 from "../../Images/avatar.jpg";
import { useSelector } from "react-redux";
import DashboardAPIs from '../../APIs/dashboard/home';


const Comments = ({ data, avatar, postComment, postId, user , setChildCommentCreated}) => {
  const [replayVisible, setReplayVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [childComment, setChildComment] = useState('');
  const [replyCommentId, setReplyCommentId] = useState();
  const { profile } = useSelector((state) => state.auth);


  const handlePostComment = () => {
    if (comment) {
      postComment(comment, postId);
      setComment("");
    }
  };

  const toggleReplayVisibility = () => {
    setReplayVisible(!replayVisible);
  };

  const toggleReplayHolderVisibility = (id) => {
    setReplyCommentId(id);
    setReplayVisible(!replayVisible);
  };

  const submitChildComment = async (commentId) => {
    console.log("Comment id = ", commentId);
    console.log("Post id = ", postId);
    console.log("Reply Comment = ", childComment);
    const data = new FormData();
    data.append('post_id',postId );
    data.append('comment_id', commentId);
    data.append('description', childComment);
    const child = await DashboardAPIs.createChildComment(data);
    if(child){
      setChildCommentCreated(child);
      setChildComment('');
      console.log("Child Comment Successfull = ", child);
    }
  }

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
                  <span onClick={() => { toggleReplayHolderVisibility(item?.id) }}>Reply</span>
                </div>

                {/* Child Comments 
              {item?.child_comment?.map((child)=>{

              })} */}
                {/* <div className={`${classes.flexBox} ${classes.replay}`}>
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
                </div> */}
                <div
                  className={classes.viewmore}
                  onClick={toggleReplayVisibility}
                >
                  {item?.child_comment?.length === 0 ? null : (
                    <span style={{ paddingLeft: "50px" }}>
                      View {item?.child_comment?.length} more replay.....
                    </span>
                  )}
                </div>
                {replayVisible && (
                  <>
                    {item?.child_comment?.map((child) => {
                      return (
                        <>
                          <div className={`${classes.flexBox} ${classes.replay}`}>
                            <div className={classes.userImg}>
                              <img
                                src={child?.user_image || userimg || avatar.avatar || user2}
                                alt="Profile"
                              />
                            </div>
                            <div
                              className={`${classes.commentBox} ${classes.replayBox}`}
                            >
                              <h6 className="mb-0">{child?.user}</h6>
                              <p>{child?.description}</p>
                            </div>
                          </div>
                        </>

                      )
                    })}

                    {replyCommentId === item?.id && <div
                      className={classes.postComment}
                      style={{ padding: "0 50px", marginTop: "10px" }}
                    >
                      <div className={classes.userImg}>
                        <img src={profile?.user_image || userimg} alt="Profile" />
                      </div>
                      <Form>
                        <div className="position-relative">
                          <input
                            type="text"
                            placeholder="Reply to this comment"
                            value={childComment}
                            onChange={(e) => setChildComment(e.target.value)}
                          />
                          <button type="button" onClick={() => { submitChildComment(item?.id) }}>
                            Post
                          </button>
                        </div>
                      </Form>
                    </div>}

                  </>
                )}
              </li>
            );
          })}
      </ul>

      <div className={classes.postComment}>
        <div className={classes.userImg}>
          <img src={profile?.user_image || user2} alt="Profile" />
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
