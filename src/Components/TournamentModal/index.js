import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import icon from "../../Images/imagelogo.png";
import { toast } from "react-toastify";
import Loader from "Components/Loader";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import AuthAPIs from '../../APIs/auth';
import TournamentAPIs from '../../APIs/tournaments';
import PostContentModal from "Components/PostContentModal";

export default function TournamentModal({ tournamentJoined, ...props }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiImg, setApiImg] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [modalType, setModalType] = useState("main");

  const onClose = () => {
    props.onHide();
    setSelectedImage(null);
    setShowForm(false);
    setApiImg(null);
    setModalType("main");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setApiImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (selectedImage) {
      setShowForm(true);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append('description', title || '');
    data.append('tag_list', description || '');
    data.append('post_image', apiImg);

    if (props.post) {
      const res = await AuthAPIs.createPost(data);
      if (res) {
        toast.success('Post Created Successfully');
        props.onHide();
      }
    } else if (props.tournament) {
      const join = await TournamentAPIs.enrollInTournament({ user_id: user?.id, tournament_banner_id: props?.tournamentid });
      if (join) {
        tournamentJoined(true);
        const postImg = await TournamentAPIs.createTournamentPost(data);
        if (postImg) {
          toast.success("Tournament Post Created Successfully");
          props.onHide();
        }
      }
    }

    setIsLoading(false);
  };

  const openPostContentModal = () => {
    setModalType("postContent");
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      {modalType === "main" && (
        <Modal
          className={"PostContentModal"}
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton={false}>
            <Modal.Title id="contained-modal-title-vcenter">
              <i className="fa fa-angle-left" aria-hidden="true" onClick={onClose}>
                <span>Post a content</span>
              </i>
              {!showForm && (
                <Button className="btn" onClick={handleContinue}>
                  Continue
                </Button>
              )}

              {showForm && (
                <>
                  <Button className="btn" onClick={handleSubmit}>
                    Next
                  </Button>
                  <Button className="btn" onClick={openPostContentModal}>
                    Modal
                  </Button>
                </>
              )}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="dotsborder">
            {showForm && (
              <div>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder="Give this meme a title" onChange={(e) => setTitle(e.target.value)} />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                  </Form.Group>
                </Form>
              </div>
            )}
            {selectedImage && (
              <div>
                <img src={selectedImage} alt="img" />
              </div>
            )}
            {!selectedImage && (
              <div className="bodyContant">
                <div style={{ textAlign: "center" }}>
                  <label
                    htmlFor="imageInput"
                    style={{ cursor: "pointer", display: "block" }}
                  >
                    {!selectedImage && (
                      <>
                        <img
                          src={icon}
                          alt="Icon"
                          style={{
                            width: "50px",
                            height: "50px",
                            margin: "0 auto",
                          }}
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: "none" }}
                          id="imageInput"
                        />
                        <div style={{ textAlign: "center", color: "white" }}>
                          <>
                            <p>Drag and drop an image, or Browse</p>
                            <ul>
                              <li>High-resolution meme images (png, jpg)</li>
                              <li>Videos (mp4)</li>
                            </ul>
                          </>
                        </div>
                      </>
                    )}
                  </label>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
     {modalType === "postContent" && (
  <PostContentModal
    show={true}
    onHide={() => {
      setModalType("main");
      props.onHide(); 
    }}
  />
)}
    </>
  );
}





