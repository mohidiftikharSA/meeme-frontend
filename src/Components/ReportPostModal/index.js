import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import profile from "../../Images/post2.png"
import DashboardAPIs from '../../APIs/dashboard/home';
import Loader from 'Components/Loader'
import { toast } from 'react-toastify';

const ReportPostModal = ({ image, postId, postRemovalId, ...props }) => {

  const [isFlagSectionVisible, setFlagSectionVisibility] = useState(true);
  const [isConfirmationSectionVisible, setConfirmationSectionVisibility] = useState(false);
  const [isFormDisabled, setFormDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [reportSuccess, setReportSuccess] = useState(false);


  const reportPost = async () => {

    if (!message) {
      toast.error('Type any Message to Report.');
      return;
    }
    const data = {
      type: "flag",
      post_id: postId,
      message: message
    };

    setIsLoading(true);
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
              postRemovalId(postId);
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
                <Form.Control className='report_modal' placeholder='Why are you reporting this person?' as="textarea" onChange={(e) => { setMessage(e.target.value) }} rows={7} disabled={isFormDisabled} />
              </Form.Group>
              <a className='btn flag report' onClick={reportPost}>Report</a>
            </Form>
          )}

          {/* Your confirmation section */}
          {isConfirmationSectionVisible && (
            <div className='textBox'>
              <h6>Photo Reported</h6>
              <p className='text'>Photo successfully reported. We will review your report. Thank you for your cooperation.</p>
            </div>
          )}

        </Modal.Body>
      </Modal>
    </>
  )
}

export default ReportPostModal
