import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { timeAgo, formatNumber } from "../../Helper/Converters";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import classes from "./index.module.scss";
import like from "../../Images/like.svg";
import message from "../../Images/message.svg";
import send from "../../Images/sendbtn.png";
import user2 from "../../Images/avatar.png";
import avatar from "../../Images/avatar.png";
import FlagPostModal from "Components/FlagPostModal";
import ReportPostModal from "Components/ReportPostModal";
import { useDispatch, useSelector } from "react-redux";
import PostsAPIs from '../../APIs/dashboard/home';
import { toast } from "react-toastify";
import { setDeletedPostId } from "Redux/reducers/postDeletionSlice";
import EditPostModal from "Components/EditPostModal";

const PostItem = ({
    item,
    ind,
    likePost,
    downloadMedia,
    redirectToOtherProfile,
    openModal,
    copyToClipboard,
    handleImageLoad,
    handleImageError,
    imagesLoaded,
    comment,
    postRemovalId,
    setIsModalOpen,
    sharePost
}) => {
    const navigate = useNavigate();
    const [FlagPostModalShow, setFlagPostModalShow] = useState(false);
    const [ReportPostModalShow, setReportPostModalShow] = useState(false);
    const { profile } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [editModalShow, setEditModalShow] = useState(false);

    const onClickLikePost = (id) => {
        likePost(id)
    }

    function isImage(item) {
        return item.post_type && item.post_type.startsWith("image/");
    }
    
      const deleteSelectedPosts = async (post_id) => {
        console.log("Deletion IDs: ", post_id);

        const res = await PostsAPIs.deletePosts({ post_ids: [post_id] });
        if (res) {
            toast.success("Post Deleted Successfully.");
            dispatch(
                setDeletedPostId({
                    postId: post_id
                })
            )
          }
      };

    return (
        <>
            <div className={classes.postWrapper} key={ind}>
                <div className={classes.postHeader}>
                    <div className={classes.profile}>
                        <div className={classes.imgBox}>
                            {/* update condition to profile post */}
                            <img src={item?.user_image || (avatar.avatar || user2)}
                                alt="user" />
                        </div>
                        <div className={classes.userDetail}>
                            <h6 onClick={() => {
                                redirectToOtherProfile(item)
                            }}>{item?.username}</h6>
                            <p>{timeAgo(item?.post?.created_at)}</p>
                        </div>
                    </div>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <i className="fas fa-ellipsis-v"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          { profile?.user?.id !== item?.post?.user_id &&
                           <><Dropdown.Item href="#/action-1" onClick={() => {
                                    setFlagPostModalShow(true);
                                } }><i className="far fa-flag"></i> 
                                Flag Post</Dropdown.Item><Dropdown.Item href="#/action-2" onClick={() => {
                                        setReportPostModalShow(true);
                                    } }><i
                                        className="fas fa-exclamation"></i>Report</Dropdown.Item></>}
                            <Dropdown.Item href="#/action-3" onClick={() => {
                                downloadMedia(item.compress_image, item)
                            }}><i className="fas fa-download"></i>Download
                            </Dropdown.Item>
                           {profile?.user?.id === item?.post?.user_id && <Dropdown.Item href="#/action-3" onClick={() => {
                                deleteSelectedPosts(item.post.id)
                            }}><i className="fas fa-trash"></i>Delete
                            </Dropdown.Item>}
                           {profile?.user?.id === item?.post?.user_id && <Dropdown.Item href="#/action-3" onClick={() => {
                                setEditModalShow(true);
                            }}><i className="fas fa-edit"></i>Edit
                            </Dropdown.Item>}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className={classes.PostDetails}>
                    {item.post.description && <p>{item.post.description}</p>}
                    {item.post.tag_list && <p className={classes.tags}>{item.post.tag_list}</p>}
                </div>
                <div className={`${classes.imgBox} memeImg mb-3`}
                    onClick={() => openModal(item.post.id)}>
                    {isImage(item) ? (<div>
                        <div style={{ display: imagesLoaded[ind] ? 'none' : 'block' }}>
                            <Skeleton
                                baseColor="#7c7b7c"
                                highlightColor="#969696"
                                height={300} width="100%"
                                style={{
                                    marginTop: '10px', borderRadius: '20px'
                                }} />
                        </div>
                        <img
                            style={{ display: imagesLoaded[ind] ? 'block' : 'none' }}
                            onLoad={() => handleImageLoad(ind)}
                            onError={() => handleImageError(ind)}
                            src={item.compress_image} alt="img"
                            key={ind}
                        />
                    </div>) : (<video loop muted autoPlay width="100%" height="auto" controls>
                        <source src={item.post_image} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>)} 
                </div>

                <ul className={classes.postFooter}>
                    <li key={item.post.id}
                        className={`item ${item.liked_by_current_user ? `${classes.active}` : ''}`}
                        onClick={() => onClickLikePost(item.post.id)}>
                        <img src={like} alt="img" />
                        <span> {formatNumber(item.post_likes)}</span>
                    </li>
                    {comment ? <li>
                        <img src={message} alt="img" />
                        <span>{formatNumber(item.post_comments_count)}</span>
                    </li> : <li onClick={() => openModal(item.post.id)}>
                        <img src={message} alt="img" />
                        <span>{formatNumber(item.post_comments_count)}</span>
                    </li>}

                    <li>
                        <img onClick={() => {
                            sharePost(item.post.id)
                            copyToClipboard(item.compress_image)
                        }} src={send} alt="img" />
                        <span>{formatNumber(item.post.share_count)}</span>
                    </li>
                </ul>
            </div>
            <FlagPostModal post show={FlagPostModalShow} image={item} postId={item.post.id} onHide={() => setFlagPostModalShow(false)} postRemovalId={postRemovalId} />
            <ReportPostModal post show={ReportPostModalShow} image={item} postId={item.post.id} onHide={() => setReportPostModalShow(false)} postRemovalId={postRemovalId} />
            <EditPostModal
                show={editModalShow}
                onHide={() => setEditModalShow(false)}
                post={{
                    id: item.post.id,
                    image: item.compress_image,
                    title: item.post.description,
                    description: item.post.tag_list
                }}
                onUpdate={(updatedPost) => {
                    // Handle the updated post data here
                    console.log("Updated Post:", updatedPost);
                }}
            />
        </>
    );
};

export default PostItem;
