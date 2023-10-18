import Comments from 'Components/Comments';
import Posts from 'Components/Post';
import React, {useEffect, useState} from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import postAPIs from "../../APIs/dashboard/home";

const ViewPost = (props) => {
  const { selectedPostId, onHide, show, postData, avatar } = props;
  const [commentsData, setCommentsData] = useState([]);
  // Find the selected post by postId
  const selectedPost = postData.find(post => post.post.id === selectedPostId);

  console.log('selectedPost',selectedPost);
  const getComments = async (id) => {
    try {
      const res = await postAPIs.getCommentsByPost(id);
      if (res.status === 200) {
        // Assuming a 200 status code means success
        setCommentsData(res.data.comments);
        // Assuming the data is in a property called 'data'
      } else {
        console.error("Error: Unexpected status code", res.status);
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }

  };
  const postComment = async (description,post_id) => {
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
    if (selectedPostId){
      getComments(selectedPostId);
    }
  }, [selectedPostId]);
  return (
    <Modal
      className={"comment-modal"}
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop
    >
      <Modal.Header closeButton onClick={onHide}></Modal.Header>
      <Modal.Body>
        <Row className='text-start'>
          <Col md={7}>
          <Posts postData={[selectedPost]} avatar={avatar} comment/>
          </Col>
          <Col md={5} className='position-relative'>
            <Comments data={commentsData} avatar={avatar} postComment={postComment} postId={selectedPostId}/>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ViewPost;
