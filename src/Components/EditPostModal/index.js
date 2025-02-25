import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import AuthAPIs from "../../APIs/auth";
import { setEditedPost } from "Redux/reducers/postEditAndDeletionSlice";

export default function EditPostModal({ post, onUpdate, ...props }) {
    const [selectedImage, setSelectedImage] = useState(post.image || null);
    const [title, setTitle] = useState(post.title || "");
    const [description, setDescription] = useState(post.description || []);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onClose = () => {
        props.onHide();
        setSelectedImage(post.image || null);
        setTitle(post.title || "");
        setDescription(post.description || []);
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
        setDescription(tags);
        post.description = tags;
    };

    const uploadImageFromUrl = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl); // Fetch image as Blob
            const blob = await response.blob();
            return new File([blob], "media.jpg", { type: "image/jpeg" }); // Convert to File
        } catch (error) {
            console.error("Error converting image to Blob:", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        console.log("post ----", post);
        let imageFile;
        if (post.post_type !== "video/mp4") {
            imageFile = await uploadImageFromUrl(post.compress_image);
        } else {
            imageFile = await uploadImageFromUrl(post.image);
        }
        console.log("imageFile ----", post.description);

        const data = {
            post_id: post.id,
            description: title || "",
            tag_list: post.description,
        }

        const res = await AuthAPIs.updatePost(data);
        if (res) {
            console.log("on update post --", res.data?.post.id)
            console.log("on update post --", res.data?.post)
            dispatch(
                setEditedPost({
                    postId: res.data?.post.id,
                    post: res.data?.post
                })
            )
            onUpdate(res.data);
            toast.success("Post Updated Successfully");
            onClose();
        }
        setIsLoading(false);
    };

    return (
        <>
            <Modal
                className={"EditPostModal"}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop={true}
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
                                value={description.join(" ")}
                                onChange={handleDescriptionChange}
                                style={{ backgroundColor: '#f8f9fa', color: '#212529' }}
                            />
                        </Form.Group>
                    </Form>
                    {selectedImage && (
                        <div>
                            <img src={selectedImage} alt="img" style={{ width: "400px", margin: "auto", borderRadius: "8px" }} />
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
                    <Button disabled={isLoading} className="btn" onClick={handleSubmit}>
                        {isLoading ? "Updating..." : "Save Changes"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
} 