import Comments from 'Components/Comments';
import Posts from 'Components/Post';
import React from 'react';
import { Modal, Row, Col } from 'react-bootstrap';

const ViewPost = (props) => {
  const { selectedPostId, onHide, show, postData } = props;

  // Find the selected post by postId
  const selectedPost = postData.find(post => post.id === selectedPostId);

  if (!selectedPost) {
    return null; // Return null if the post is not found
  }

  console.log(selectedPost)

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
          <Col lg={7}>
          <Posts postData={[selectedPost]} comment/>
          </Col>
          <Col lg ={5} className='position-relative'>
            <Comments data={[selectedPost]}/>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default ViewPost;
