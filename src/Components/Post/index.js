import React, {useEffect, useState} from "react";
import classes from "./index.module.scss";
import {Dropdown} from "react-bootstrap";
import like from "../../Images/like.svg";
import message from "../../Images/message.svg";
import send from "../../Images/sendbtn.png";
import ViewPost from "Components/ViewPost";
import {formatNumber, timeAgo} from "../../Helper/Converters";
import postAPIs from "../../APIs/dashboard/home";

// import avatar from images
import user2 from "../../Images/avatar.jpg";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import SkeletonPostsLoading from '../Loader/SkeletonPostsLoading'
import Skeleton from "react-loading-skeleton";

const Posts = ({postData, comment, avatar, isLoading}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [followingData, setFollowingData] = useState([]);
    const navigate = useNavigate();
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const openModal = (postId) => {
        console.log('postId', postId)
        setSelectedPostId(postId);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    useEffect(() => {
        setFollowingData(postData);
    }, [postData, isLoading]);

    const likePost = async (post_id) => {
        try {
            const res = await postAPIs.likePost({post_id});
            if (res.status === 200) {
                const updatedItems = postData.map(item => {
                    if (item.post.id === post_id) {
                        return {
                            ...item,
                            liked_by_current_user: res.data.type_data.is_liked,
                            post_likes: res.data.likes_count
                        };
                    }
                    return item
                });
                setFollowingData(updatedItems);
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }

    };

    const copyToClipboard = (linkToCopy) => {

        navigator.clipboard.writeText(linkToCopy)
            .then(() => {
                console.log('Link copied to clipboard:', linkToCopy);
                toast.success('Link Copied Successfully', {
                    position: "top-right", autoClose: 2000,
                });

            })
            .catch(err => {
                console.error('Unable to copy link to clipboard', err);
                toast.error('Failed Link Copy', {
                    position: "top-right", autoClose: 2000,
                });
            });
    }


    const toggleActive = (itemId) => {
        const updatedItems = postData.map(item => {
            if (item.post.id === itemId) {
                return {...item, liked_by_current_user: !item.liked_by_current_user};
            }
            return item;
        });
        console.log('updatedItems', updatedItems)
        setFollowingData(updatedItems);
    };

    const redirectToOtherProfile = (data) => {
        console.log("On CLick Data = ", data);
        navigate(`/otherProfile/${data?.post?.user_id}`)
    }

    const downloadMedia = (mediaUrl, id) => {
        console.log("media url === ", mediaUrl);

        const link = document.createElement('a');
        link.href = mediaUrl;
        link.download = 'image.jpg'; // You can set the desired filename here
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleImageLoad = (index) => {
        setImagesLoaded((prevImagesLoaded) => {
            const newImagesLoaded = [...prevImagesLoaded];
            newImagesLoaded[index] = true;
            return newImagesLoaded;
        });
    };

    const handleImageError = (index) => {
        imagesLoaded[index] = true;
        setImagesLoaded(imagesLoaded);
    };
    return (<>
        {isLoading ? <SkeletonPostsLoading/> : followingData.map((item, ind) => {
            return (<div className={classes.postWrapper} key={ind}>
                <div className={classes.postHeader}>
                    <div className={classes.profile}>
                        <div className={classes.imgBox}>
                            {/* update condition to profile post */}
                            <img src={item.user_image || (avatar?.avatar || user2)}
                                 alt="user"/>
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
                        <div style={{display: imagesLoaded[ind] ? 'none' : 'block'}}>
                            <Skeleton
                                height={300} width="100%"
                                style={{
                                    marginTop: '10px', borderRadius: '20px'
                                }}/>
                        </div>
                        <img
                            style={{display: imagesLoaded[ind] ? 'block' : 'none'}}
                            onLoad={() => handleImageLoad(ind)}
                            onError={() => handleImageError(ind)}
                            src={item.compress_image} alt="img"/>
                    </div>) : (<video width="100%" height="auto" controls>
                        <source src={item.post_image} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>)}
                </div>

                <ul className={classes.postFooter}>
                    <li key={item.post.id}
                        className={`item ${item.liked_by_current_user ? `${classes.active}` : ''}`}
                        onClick={() => likePost(item.post.id)}>
                        <img src={like} alt="img"/>
                        <span> {formatNumber(item.post_likes)}</span>
                    </li>
                    {comment ? <li>
                        <img src={message} alt="img"/>
                        <span>{formatNumber(item.post_comments_count)}</span>
                    </li> : <li onClick={() => openModal(item.post.id)}>
                        <img src={message} alt="img"/>
                        <span>{formatNumber(item.post_comments_count)}</span>
                    </li>}

                    <li>
                        <img onClick={() => {
                            copyToClipboard(item.compress_image)
                        }} src={send} alt="img"/>
                        {/* <span>{formatNumber(item.post.share_count)}</span> */}
                    </li>
                </ul>
            </div>);
        })}

        <ViewPost onHide={closeModal} show={isModalOpen} selectedPostId={selectedPostId} postData={postData}
                  avatar={avatar}/>
    </>);
};

export default Posts;
