import Heading from "Components/Heading";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { timeFormat } from "../../Helper/Converters";
import userimg from "../../Images/user1.png";
import classes from "./index.module.scss";
import user2 from "../../Images/avatar.jpg";
import { useSelector } from "react-redux";
import DashboardAPIs from '../../APIs/dashboard/home';


const Comments = ({ data, avatar, postComment, postId, user, setChildCommentCreated,onHide }) => {
  const [replayVisible, setReplayVisible] = useState(false);
  const [comment, setComment] = useState("");
  const [childComment, setChildComment] = useState('');
  const [replyCommentId, setReplyCommentId] = useState();
  const { profile } = useSelector((state) => state.auth);
  const [allCommentsArr, setAllCommentsArr] = useState([]);
  const [isloading, setIsloading] = useState(false);


  useEffect(() => {
    if (data) {
      setAllCommentsArr(data);
    }
  }, [data])


  const handleSubmit = (event) => {
    event.preventDefault(); 
    handlePostComment();
  };
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
    setIsloading(true);
    const data = new FormData();
    data.append('post_id', postId);
    data.append('comment_id', commentId);
    data.append('description', childComment);
    const child = await DashboardAPIs.createChildComment(data);
    if (child) {
      setIsloading(false);
      setChildCommentCreated(child);
      setChildComment('');
    }
  }

  const likeAndUnlikeComment = async (commentId, action) => {
    const res = await DashboardAPIs.likePost({ type: "comment", comment_id: commentId });
    if (res) {
      // console.log("Like and Dislike response  = ", res.data);
      const selectedComment = allCommentsArr?.findIndex(post => post?.id === commentId);
      allCommentsArr[selectedComment].user_comment_like_status = !allCommentsArr[selectedComment].user_comment_like_status
      if(action === 'like'){
        allCommentsArr[selectedComment].comment_like_count = (allCommentsArr[selectedComment].comment_like_count + 1)
      }else if(action === 'unlike'){
        allCommentsArr[selectedComment].comment_like_count = (allCommentsArr[selectedComment].comment_like_count - 1)
      }
      setAllCommentsArr([...allCommentsArr]);
     
    }
  }
 

  return (
    <div className="py-lg-5 py-3 px-3">
      <Heading title={"Comments"} onHide={onHide} />
      
      <ul className={classes.commentList}>
        {allCommentsArr
          .slice()
          .reverse()
          .map((item, index) => {
            return (
              <li key={index}>
                <div className={`${classes.flexBox}`}>
                  <div className={classes.userImg}>
                    <img
                      src={item.user_image || avatar?.avatar || user2}
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
                  {item?.user_comment_like_status ? <span onClick={() => { likeAndUnlikeComment(item?.id,'unlike') }} >unlike</span> : <span onClick={() => { likeAndUnlikeComment(item?.id,'like') }}>Like</span>}
                  <span>{item?.comment_like_count}</span>
                  <span onClick={() => { toggleReplayHolderVisibility(item?.id) }}>Reply</span>
                </div>
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
                                src={child?.user_image || userimg || avatar?.avatar || user2}
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
                            <button type="button" disabled={isloading} onClick={() => { submitChildComment(item?.id) }}>
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
        <Form onSubmit={handleSubmit}>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" onClick={handlePostComment}>
              Post
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Comments;









