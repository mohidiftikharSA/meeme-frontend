import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import profile from "../../Images/post2.png"
import Classes from './index.module.scss'
import { toast } from 'react-toastify'
import DashboardAPIs from '../../APIs/dashboard/home';
import Loader from 'Components/Loader'

const FlagPostModal = ({ image, postId, postRemovalId, ...props }) => {
  const [isConfirmationSectionVisible, setConfirmationSectionVisibility] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [flagSuccess, setFlagSuccess] = useState(false);

  const flagReasons = [
    'I just don’t like it',
    'Nudity or sexual activity',
    'It’s spam',
    'Suicide or self-injury',
    'Offensive content'
  ];

  const handleReasonClick = (reason) => {
    setSelectedReason(reason === selectedReason ? '' : reason);
  };

  const flagPost = async () => {

    if (!selectedReason) {
      toast.error('Select Any one reasons');
      return;
    }

    const data = {
      type: "flag",
      post_id: postId,
      message: selectedReason
    }
    setIsLoading(true);
    try {
      const res = await DashboardAPIs.flagOrReportPost(data);
      if (res) {
        setConfirmationSectionVisibility(true);
        setFlagSuccess(true);
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
            if (flagSuccess)
              // postRemovalId(postId);
            setConfirmationSectionVisibility(false);
            setFlagSuccess(false)
          }} >
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className='imagBox'>
            {image?.post_type !== "video/mp4" && <img src={image?.compress_image || profile} />}
          </div>
          {/* <div className='icon-box'> 
        <i className="fas fa-download"><span>Download</span></i> 
        <i className="far fa-flag"><span>Flag Post </span></i>
        <i className="far fa-flag"><span>Flag Post </span></i>
         </div> */}

          {!isConfirmationSectionVisible && <div className='flag-btn mt-5'>
            <p className='mb-4' style={{color:"#fff", fontWeight:"bold"}}>Why are you flagging this post?</p>
            <div className="flag-options">
              {flagReasons?.map((reason, index) => (
                <button
                  key={index}
                  className={selectedReason === reason ? 'flag_selected' : ''}
                  onClick={() => handleReasonClick(reason)}
                >
                  {reason}
                </button>
              ))}
            </div>
            <a className='btn flag' onClick={flagPost}>Flag</a>
          </div>}


          {isConfirmationSectionVisible && (
            <div className='textBox'>
              <h6>Photo Flagged</h6>
              <p className='text'>Photo successfully flagged. We will review your report. Thank you for your cooperation.</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default FlagPostModal
