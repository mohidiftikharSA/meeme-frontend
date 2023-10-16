import React from "react";
import { Modal } from "react-bootstrap";
import classes from "./index.module.scss";
// import ReactImageUploading from "react-images-uploading";
// import { height } from "@mui/system";
const UploadModal = (props) => {
  const { story } = props;
  // const [images, setImages] = React.useState([]);
  // const maxNumber = 1;
  // const onChange = (imageList, addUpdateIndex) => {
  //   setImages(imageList);
  // };

  return (
    <Modal
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
          <h6>Post a content</h6>
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

      <Modal.Body className="p-0">
         <div className={classes.preview}>
      {story && (
        <img src={story.story_image} alt="Selected Story" />
        )}
        </div>

      </Modal.Body>
    </Modal>
  );
};

export default UploadModal;
