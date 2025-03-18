import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import profile from "../../Images/post2.png"
import DashboardAPIs from '../../APIs/dashboard/home';
import Loader from 'Components/Loader'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ReportPostModal = ({ image, postId, postRemovalId, ...props }) => {

  const [isFlagSectionVisible, setFlagSectionVisibility] = useState(true);
  const [isConfirmationSectionVisible, setConfirmationSectionVisibility] = useState(false);
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);
  const { user } = useSelector(state => state.auth);


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


  const reportPost = async () => {
    if (!message) {
      toast.error('Type any Message to Report.');
      return;
    }
    setIsLoading(true);
    console.log("image ----", image);
    let imageFile;
    if (image?.post_type !== "video/mp4") {
      imageFile = await uploadImageFromUrl(image?.post_image);
    } else {
      imageFile = await uploadImageFromUrl(image?.post_thumbnail);
    }

    console.log("image ----", imageFile);
    const data = new FormData();
    data.append("type", "report");
    data.append("admin_user_id", "1");
    data.append("message_images[]", imageFile);
    data.append("body", message);
    data.append("post_id", postId);
    data.append("user_id", image?.post?.user_id);


    try {
      const res = await DashboardAPIs.flagOrReportPost(data);
      if (res) {
        setReportSuccess(true);
        setFlagSectionVisibility(false);
        setConfirmationSectionVisibility(true);
        setFormDisabled(true);
      }
    } catch (e) {
      console.log("Error  ===", e);
      toast.error("Post Already Flagged");
    }

    setIsLoading(false);
  }

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <Modal className='fade flagPost'
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton
          onHide={() => {
            if (reportSuccess)
              // postRemovalId(postId);
              setConfirmationSectionVisibility(false);
            setReportSuccess(false);
            setFlagSectionVisibility(true);
            setFormDisabled(false);
          }} >
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='imagBox'>
            {image?.post_type !== "video/mp4" && <img src={image?.compress_image || profile} />}
          </div>
          {isFlagSectionVisible && (
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control className='report_modal' placeholder='Why are you reporting this post?' as="textarea" onChange={(e) => { setMessage(e.target.value) }} rows={7} disabled={isFormDisabled} />
              </Form.Group>
              <button className='btn flag report' onClick={reportPost} disabled={isLoading}>{isLoading ? 'Please Wait...' : 'Report'}</button>
            </Form>
          )}

          {/* Your confirmation section */}
          {isConfirmationSectionVisible && (
            <div className='textBox'>
              <h6>{image?.post_type !== "video/mp4" || image?.post_type === 'video/quicktime' ? "Photo" : "Video"} Reported</h6>
              <p className='text'>{image?.post_type !== "video/mp4" || image?.post_type === 'video/quicktime' ? 'Video' : 'Photo'} successfully reported. We will review your report. Thank you for your cooperation.</p>
            </div>
          )}

        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReportPostModal
