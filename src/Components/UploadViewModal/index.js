import React, {useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import classes from "./index.module.scss";
import avatar from "../../Images/youuser.png";
import user from "../../Images/avatar.jpg"
// import ReactImageUploading from "react-images-uploading";
// import { height } from "@mui/system";
import api from 'APIs/dashboard/home'
import NotificationService from "../../Services/NotificationService";
import SpinnerLoader from "../Loader/SpinnerLoader";

const UploadModal = (props) => {
    const {title, addStory, stories} = props;
    const [image, setImage] = useState(null)
    const [imageToShow, setImageToShow] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [story, setStory] = useState(null);
    const [storyLoaded, setStoryLoaded] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0)
    useEffect(() => {
        setStory(stories[0]);
        setStoryLoaded(false);
        setSelectedIndex(0)
    }, [props.stories]);
    const bgStyle = {
        backgroundColor: addStory ? '#3c3a40' : '#000'
    }
    const onClickSelectStory = (e) => {
        const file = e.target.files[0];
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
        if (response?.status == 200) {
            NotificationService.showSuccess('Story posted successfully')
            setImageToShow(null)
            props.storyAdded()
            props.onHide()
        }
    }

    const handleImageError = () => {
        console.log("Error")
        setStoryLoaded(true)
    }
    const handleImageLoad = () => {
        console.log("Loaded")
        setStoryLoaded(true)
    }
    const onClickStoryImage = (e) => {
        const {clientX, target} = e;
        const {left, width} = target.getBoundingClientRect();
        const clickPosition = clientX - left;
        if (clickPosition > width / 2) {
            if ((selectedIndex + 1) < stories.length) {
                setStoryLoaded(false)
                setStory(stories[selectedIndex + 1])
                setSelectedIndex(prevState => {
                    return prevState + 1;
                })
            }
        } else {
            if (selectedIndex > 0) {
                setStoryLoaded(false)
                setStory(stories[selectedIndex - 1])
                setSelectedIndex(prevState => {
                    return prevState - 1;
                })
            }
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
        <Modal.Body className="p-0" style={bgStyle}>

            {!addStory && <div style={{display: 'flex'}} className="mt-2">
                {stories.map((item, index) => {
                    return (<div key={`user_story_${index}`} style={{
                        flex: 1, height: '2px', backgroundColor: '#ccc', margin: '0 1px',
                    }}>
                    </div>);
                })}
            </div>
            }
            {!addStory ? <>
                <div className={classes.prilfe}>
                    <img src={story?.user_image || user} alt='img' style={{objectFit: "cover"}}/>
                    <p>{story?.username}</p>
                </div>
                <div className={classes.preview}>
                    {story && (<>
                        <div style={{
                            display: storyLoaded ? 'none' : 'block'
                        }}>
                            <SpinnerLoader></SpinnerLoader>
                        </div>
                        <img
                            style={{display: storyLoaded ? 'block' : 'none'}}
                            src={story?.story_image}
                            onClick={onClickStoryImage}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            alt="Selected Story"/>
                    </>)}
                </div>
            </> : <>
                <div className={classes.preview} style={{cursor: 'pointer'}}>
                    {imageToShow ? <>
                        <div>
                            <img src={imageToShow}
                                 alt="img"/>
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
