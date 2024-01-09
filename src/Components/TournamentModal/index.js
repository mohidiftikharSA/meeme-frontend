import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import icon from "../../Images/imagelogo.png";
import { toast } from "react-toastify";
import Loader from "Components/Loader";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import AuthAPIs from "../../APIs/auth";
import TournamentAPIs from "../../APIs/tournaments";
import PostContentModal from "Components/PostContentModal";

export default function TournamentModal({ tournamentJoined, ...props }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiImg, setApiImg] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [modalType, setModalType] = useState("main");
  const [tagError, setTagError] = useState(null);

  const onClose = () => {
    props.onHide();
    setSelectedImage(null);
    setShowForm(false);
    setApiImg(null);
    setModalType("main");
    setTagError(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setApiImg(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Invalid File type.')
      }
    }
  };

  const handleContinue = () => {
    if (selectedImage) {
      setShowForm(true);
    }
  };

  const handleSubmit = async () => {
    if (!apiImg) {
      toast.error("Image not selected.");
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    data.append("description", title || "");
    data.append("tag_list", description || "");
    data.append("post_image", apiImg);

    if (props.post) {
      const res = await AuthAPIs.createPost(data);
      if (res) {
        toast.success("Post Created Successfully");
        props.onHide();
      }
    } else if (props.tournament) {

      const postImg = await TournamentAPIs.createTournamentPost(data);
      if (postImg) {
        toast.success("Tournament Post Created Successfully");
        setModalType("postContent");
        setApiImg(null); 
        props.onHide();
      }

    }

    setIsLoading(false);
  };

  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    const selectionStart = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;

    let tags = inputValue.split(/\s+/).map((tag) => {
      // Ensure tags start with #
      return tag.trim().startsWith("#") ? tag.trim() : `#${tag.trim()}`;
    });
    if (
      e.nativeEvent.inputType === "deleteContentBackward" &&
      selectionStart === selectionEnd
    ) {
      const currentTagStart = inputValue.lastIndexOf("#", selectionStart - 1);
      const currentTagEnd = inputValue.indexOf(" ", selectionStart);
      if (currentTagEnd === -1) {
        tags.pop();
      } else {
        tags = tags.filter((tag) => {
          const tagStart = inputValue.indexOf(tag);
          return tagStart < currentTagStart || tagStart >= currentTagEnd;
        });
      }
    }
    const formattedTags = tags.join(" ");
    setDescription(formattedTags);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    const droppedImage = droppedFiles[0];
    handleImageUpload({ target: { files: [droppedImage] } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
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
              <h5 aria-hidden="true" onClick={onClose} style={{ fontSize: "14px" }} className="d-flex align-items-center">
                <i className="fa fa-angle-left me-2"></i> Post a content
              </h5>

              {!showForm && (
                <Button className="btn" onClick={() => {
                  if (props.tournament) {
                    handleSubmit()
                    return;
                  } else {
                    handleContinue();
                    return;
                  }
                }}>
                  Continue
                </Button>
              )}

              {showForm && (
                <>
                  <Button className="btn" onClick={handleSubmit}>
                    Next
                  </Button>
                </>
              )}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body
            className="dotsborder"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {showForm && !props.tournament ? (
              <div>
                <Form className="">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Give this meme a title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Tags"
                      onChange={handleDescriptionChange}
                      value={description}
                    />
                    {tagError && <p style={{ color: "red" }}>{tagError}</p>}
                  </Form.Group>
                </Form>
              </div>
            ) : ''}
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
                              {/* <li>Videos (mp4)</li> */}
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
