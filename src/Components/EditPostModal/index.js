import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "Components/Loader";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import AuthAPIs from "../../APIs/auth";

export default function EditPostModal({ post, onUpdate, ...props }) {
  const [selectedImage, setSelectedImage] = useState(post.image || null);
  const [title, setTitle] = useState(post.title || "");
  const [description, setDescription] = useState(post.description || "");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const onClose = () => {
    props.onHide();
    setSelectedImage(post.image || null);
    setTitle(post.title || "");
    setDescription(post.description || "");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Invalid File type.');
      }
    }
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

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("description", title || "");
    data.append("tag_list", description || "");
    console.log("title, ",title)
    console.log(" post.id, ", post.id)
    data.append('post_id', post.id);
    data.append('post_image', post.image);
    if (selectedImage) {
      data.append("post_image", selectedImage);
    }

    const res = await AuthAPIs.updatePost(data);
    if (res) {
      onUpdate(res.data);
      toast.success("Post Updated Successfully");
      onClose();
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <Modal
        className={"EditPostModal"}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton={true}>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Post
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="dotsborder" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <Form>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Control
                type="text"
                placeholder="Edit title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ backgroundColor: '#f8f9fa', color: '#212529' }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTags">
              <Form.Control
                type="text"
                placeholder="Edit tags"
                value={description}
                onChange={handleDescriptionChange}
                style={{ backgroundColor: '#f8f9fa', color: '#212529' }}
              />
            </Form.Group>
          </Form>
          {selectedImage && (
            <div>
              <img src={selectedImage} alt="img" style={{ width: "100%", height: "auto" }} />
            </div>
          )}
          {!selectedImage && (
            <div className="bodyContant">
              <div style={{ textAlign: "center" }}>
                <label
                  htmlFor="imageInput"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    id="imageInput"
                  />
                  <div style={{ textAlign: "center", color: "white" }}>
                    <p>Drag and drop an image, or Browse</p>
                    <ul>
                      <li>High-resolution meme images (png, jpg)</li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 