import React from "react";
import { Dropdown } from "react-bootstrap";
import { timeAgo, formatNumber } from "../../Helper/Converters";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import classes from "./index.module.scss";
import like from "../../Images/like.svg";
import message from "../../Images/message.svg";
import send from "../../Images/sendbtn.png";
import user2 from "../../Images/avatar.jpg";
import avatar from "../../Images/avatar.jpg";

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
    comment
}) => {
    const navigate = useNavigate();

    return (
    <div className={classes.postWrapper} key={ind}>
        <div className={classes.postHeader}>
            <div className={classes.profile}>
                <div className={classes.imgBox}>
                    {/* update condition to profile post */}
                    <img src={item.user_image || (avatar.avatar || user2)}
                        alt="user" />
                </div>
                <div className={classes.userDetail}>
                    <h6 onClick={() => {
                        redirectToOtherProfile(item)
                    }}>{item.username}</h6>
                    <p>{timeAgo(item?.post?.created_at)}</p>
                </div>
            </div>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <i className="fas fa-ellipsis-v"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1"><i className="far fa-flag"></i> Flag
                        Post</Dropdown.Item>
                    <Dropdown.Item href="#/action-2"><i
                        className="fas fa-exclamation"></i>Report</Dropdown.Item>
                    <Dropdown.Item href="#/action-3" onClick={() => {
                        downloadMedia(item.compress_image, item?.id)
                    }}><i className="fas fa-download"></i>Download</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
        <div className={classes.PostDetails}>
            {item.post.description && <p>{item.post.description}</p>}
            {item.post.tag_list && <p className={classes.tags}>{item.post.tag_list}</p>}
        </div>
        <div className={`${classes.imgBox} memeImg mb-3`}
            onClick={() => openModal(item.post.id)}>
            {item.post_type === "image/jpeg" || item.post_type === "image/png" ? (<div>
                <div style={{ display: imagesLoaded[ind] ? 'none' : 'block' }}>
                    <Skeleton
                        height={300} width="100%"
                        style={{
                            marginTop: '10px', borderRadius: '20px'
                        }} />
                </div>
                <img
                    style={{ display: imagesLoaded[ind] ? 'block' : 'none' }}
                    onLoad={() => handleImageLoad(ind)}
                    onError={() => handleImageError(ind)}
                    src={item.compress_image} alt="img" />
            </div>) : (<video width="100%" height="auto" controls>
                <source src={item.post_image} type="video/mp4" />
                Your browser does not support the video tag.
            </video>)}
        </div>

        <ul className={classes.postFooter}>
            <li key={item.post.id}
                className={`item ${item.liked_by_current_user ? `${classes.active}` : ''}`}
                onClick={() => likePost(item.post.id)}>
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
                    copyToClipboard(item.compress_image)
                }} src={send} alt="img" />
                {/* <span>{formatNumber(item.post.share_count)}</span> */}
            </li>
        </ul>
    </div>);
};

export default PostItem;
