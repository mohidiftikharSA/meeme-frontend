import Comments from 'Components/Comments';
import Posts from 'Components/Post';
import React, {useEffect, useState} from 'react';
import {Modal, Row, Col} from 'react-bootstrap';
import postAPIs from "../../APIs/dashboard/home";
import {useSelector} from "react-redux";

// change code
import user2 from "../../Images/avatar.jpg";


const ViewPost = (props) => {
    const {selectedPostId, onHide, show, postData, avatar, profile} = props;
    const [commentsData, setCommentsData] = useState([]);
    const [childCommentCreated, setChildCommentCreated] = useState();

    // Find the selected post by postId
    var selectedPost = null;
    if (!profile) {
        selectedPost = postData.find(post => post?.post?.id === selectedPostId);
    } else {
        selectedPost = postData
    }
    // const selectedPost = 12
    const {user} = useSelector((state) => state.auth);


    const getComments = async (id) => {
        try {
            const res = await postAPIs.getCommentsByPost(id);
            if (res.status === 200) {
                setCommentsData(res.data.comments);
                console.log("Comments Response  === ", res.data.comments);
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
    }, [selectedPostId, childCommentCreated]);
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
                        <Posts postData={[selectedPost]} avatar={user2} comment/>
                    </Col>
                    <Col lg={5} className='position-relative'>
                        <Comments data={commentsData} avatar={avatar} postComment={postComment} postId={selectedPostId}
                                  user={user} setChildCommentCreated={setChildCommentCreated}/>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ViewPost;
