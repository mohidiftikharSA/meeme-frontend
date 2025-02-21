import Comments from 'Components/Comments';
import Posts from 'Components/Post';
import React, { useEffect, useState } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import postAPIs from "../../APIs/dashboard/home";
import { useSelector } from "react-redux";
import dummyUser from "../../Images/user-dummy.png";

// change code
import user2 from "../../Images/avatar.png";
import Skeleton from 'react-loading-skeleton';
import MemeItem from 'Components/Memes/MemeItem';


const ViewPost = ({ exploresetIsModalOpen, ...props }) => {
    const { selectedPostId, onHide, show, postData, avatar, profile, likePost, sharePost, explore } = props;
    const [commentsData, setCommentsData] = useState([]);
    const [childCommentCreated, setChildCommentCreated] = useState();
    const [otherPosts, setOtherPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Find the selected post by postId
    var selectedPost = null;
    if (!profile) {
        selectedPost = postData.find(post => post?.post?.id === selectedPostId);
    } else {
        selectedPost = postData
    }
    // const selectedPost = 12
    const { user } = useSelector((state) => state.auth);
    function isImage(item) {
        return item.post_type && item.post_type.startsWith("image/");
    }

    const getComments = async (id) => {
        try {
            const res = await postAPIs.getCommentsByPost(id);
            if (res.status === 200) {
                setCommentsData(res.data.comments);
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }

    };
    const postComment = async (description, post_id) => {
        try {
            const res = await postAPIs.PostComment({
                description,
                post_id
            });
            if (res.status === 200) {
                getComments(post_id);
            } else {
                console.error("Error: Unexpected status code", res.status);
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
        }

    };
    useEffect(() => {
        console.log("ViewPost")
        if (selectedPostId) {
            getComments(selectedPostId);
        }
        /**
         * only get when explore page is true
         */
        if (explore) {
            getOtherPosts();
        }
    }, [selectedPostId, childCommentCreated]);

    const getOtherPosts = async () => {
        setLoading(true);
        try {
            if (selectedPost) {
                const res = await postAPIs.otherPosts({
                    post_id: selectedPostId,
                    tag: selectedPost.post.tag_list[0]
                });
                console.log("res ----", res.data.explore_posts);
                if (res) {
                    setOtherPosts(res.data.explore_posts);
                    setLoading(false);
                }
            }
        } catch (error) {
            console.error("Error while fetching data:", error);
            setOtherPosts([]);
            setLoading(false);
        }

    }

    return (
        <Modal
            className={"comment-modal"}
            show={show}
            onHide={() => onHide(selectedPost)}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            backdrop
        >
            <Modal.Header closeButton onClick={() => onHide(selectedPost)}></Modal.Header>
            <Modal.Body>
                <Row className='text-start'>
                    <Col lg={7} className='view-modal'>
                        <Posts postData={[selectedPost]} avatar={user2} likePost={likePost} sharePost={sharePost} comment setIsModalOpen />
                    </Col>
                    <Col lg={5} className='position-relative'>
                        <Comments data={commentsData} avatar={avatar} postComment={postComment} postId={selectedPostId}
                            user={user} setChildCommentCreated={setChildCommentCreated} onHide={props.onHide} />
                    </Col>
                </Row>
            </Modal.Body>
            {explore && (
                <div className='explore-post text-center'>
                    <h3 className='mb-3'>Explore more posts</h3>
                    <Row className="explore-grid mt-3">
                        {loading ? (
                            <p>Loading other posts...</p>
                        ) : otherPosts[0] && otherPosts ? otherPosts.slice(0, 6).map((item) => (
                            <Col xs={4} key={item?.post?.id} className="explore-item mb-3">
                                <div className="explore-image-container">
                                    {item?.post_type === 'video/mp4' ? (
                                        <video
                                            src={item?.post_image}
                                            alt={`Explore video = ${item?.post_image}`}
                                            className="w-100 h-100 object-fit-cover"
                                            controls
                                            autoPlay
                                        />
                                    ) : (
                                        <img
                                            src={item?.post_image}
                                            alt={`Explore post = ${item?.post_image}`}
                                            className="w-100 h-100 object-fit-cover"
                                        />
                                    )}
                                </div>
                                <div className={"profileDetail"}>
                                    <img src={item.user_image || dummyUser} alt="icon" />
                                    <span>{item?.username}</span>
                                </div>
                            </Col>

                        )) : <p>No similar posts found</p>}
                    </Row>
                </div>

            )}


        </Modal>
    );
};

export default ViewPost;
