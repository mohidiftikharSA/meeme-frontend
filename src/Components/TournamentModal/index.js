import { Button, Modal } from "react-bootstrap";
import icon from "../../Images/imagelogo.png";
import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function PostContentModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [continueClicked, setContinueClicked] = useState(false);
  const [PostContentModalShow, setPostContentModalShow] = useState(false);

  const onClose = () => {
    props.onHide();
    setSelectedImage(null);
    setContinueClicked(false);
    setShowForm(false)
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const bodyStyle = selectedImage
    ? {
      backgroundImage: `url(${selectedImage})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }
    : {};

  const handleContinue = () => {
    if (selectedImage) {
      setShowForm(true);
      setContinueClicked(true);
      // PostContentModalShow(true);
    }
  };

  return (
    <>
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
            {!continueClicked && (
              <Button className="btn" onClick={handleContinue}>
                Continue
              </Button>
            )}

            {continueClicked && (
              <Button className="btn">
                Next
              </Button>
            )}


          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="dotsborder" style={bodyStyle}>
          {selectedImage && showForm ? (
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="text" placeholder="Give this meme a title" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control type="text" placeholder="Description" />
              </Form.Group>
            </Form>
          ) : (
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
                            <li>High resolution meme images (png, jpg)</li>
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
    </>
  );
}


