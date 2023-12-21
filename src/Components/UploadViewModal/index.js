import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import classes from "./index.module.scss";
import avatar from "../../Images/youuser.png";
import user from "../../Images/avatar.jpg"
// import ReactImageUploading from "react-images-uploading";
// import { height } from "@mui/system";
import api from 'APIs/dashboard/home'
import NotificationService from "../../Services/NotificationService";

const UploadModal = (props) => {
    const {story, title, addStory, storyAdded} = props;
    const [image, setImage] = useState(null)
    const [imageToShow, setImageToShow] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    // const [images, setImages] = React.useState([]);
    // const maxNumber = 1;
    // const onChange = (imageList, addUpdateIndex) => {
    //   setImages(imageList);
    // };
    const bgStyle = {
        backgroundColor: addStory ? '#3c3a40' : '#000'
    }
    const onClickSelectStory = (e) => {
        const file = e.target.files[0];
        console.log("File ", file)
        if (file) {
            setImage(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageToShow(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const onClickPostStory = async () => {
        const data = new FormData();
        data.append('description', '');
        data.append('story_image', image);
        setIsLoading(true)
        const response = await api.postStory(data).finally(() => {
            setIsLoading(false)
        })
        if (response.status == 200) {
            NotificationService.showSuccess('Story posted successfully')
            setImageToShow(null)
            setImageToShow(null);
            props.storyAdded()
            props.onHide()
        }
    }
    return (<Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="uploadModal"
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter modal-title">
                <i
                    className="fa fa-angle-left"
                    aria-hidden="true"
                    onClick={props.onHide}
                ></i>
                {!title ? <h6>Post a content</h6> : <h6>{title}</h6>}
            </Modal.Title>
        </Modal.Header>
        {/* <Modal.Body className="p-0">
        <ReactImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          acceptType={["jpg", "jpeg", "png"]}
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <>
              <div className={classes.preview}>
                {imageList.length > 0 && (
                  <img src={imageList[0]["data_url"]} alt="" />
                )}
              </div>
              <Button className="w-100" onClick={onImageUpload}>
                Post Story
              </Button>
            </>
          )}
        </ReactImageUploading>
      </Modal.Body> */}

        <Modal.Body className="p-0" style={bgStyle}>
            {!addStory ? <>
                <div className={classes.prilfe}>
                    {/* <img src={story?.user_image||avatar} alt="img" /> */}
                    <img src={story?.user_image || user} alt='img' style={{objectFit: "cover"}}/>
                    <p>{story?.username}</p>
                </div>
                <div className={classes.preview}>
                    {story && (<img src={story?.story_image} alt="Selected Story"/>)}
                </div>
            </> : <>

                <div className={classes.preview} style={{cursor: 'pointer'}}>
                    {imageToShow ? <>
                        <div>
                            <img src={imageToShow} alt="img"/>
                        </div>
                    </> : <>
                        <label
                            htmlFor="storyInput"
                            style={{cursor: "pointer", display: "block"}}
                        >
                            <div style={{cursor: 'pointer'}}>
                                Browse Image
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onClickSelectStory}
                                style={{display: "none"}}
                                id="storyInput"
                            />
                        </label>
                    </>}
                </div>
                {imageToShow && <Button
                    onClick={() => setImageToShow(null)}
                    className="btn mt-3 btn-danger" style={{backgroundColor: '#ff0000'}}>
                    Remove Story
                </Button>}
                <Button
                    onClick={onClickPostStory}
                    className="btn mt-3 btn-block" disabled={!imageToShow || isLoading}>
                    Post Story
                </Button>
            </>}
        </Modal.Body>
    </Modal>);
};

export default UploadModal;
