import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import profile from "../../Images/post2.png"
import Classes from './index.module.scss'
const FlagPostModal = ({ image, postId, ...props }) => {
  const [isFlagSectionVisible, setFlagSectionVisibility] = useState(true);
  const [isConfirmationSectionVisible, setConfirmationSectionVisibility] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');

  const flagReasons = [
    'I just don’t like it',
    'Nudity or sexual activity',
    'It’s spam',
    'Suicide or self-injury',
    'Offensive content'
  ];

  const handleFlagClick2 = () => {
    // Logic to handle flagging with selectedReason
    console.log('Flagged for:', selectedReason);
    // Add your logic to handle flagging here
  };

  const handleRadioChange = (event) => {
    setSelectedReason(event.target.value);
  };


  const handleFlagClick = () => {
    setFlagSectionVisibility(false);
    setConfirmationSectionVisibility(true);
  };

  const handleReasonClick = (reason) => {
    setSelectedReason(reason === selectedReason ? '' : reason);
  };

  return (
    <Modal className='fade flagPost'
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className='imagBox'>
          <img src={image || profile} />
        </div>
        {/* <div className='icon-box'> 
        <i className="fas fa-download"><span>Download</span></i> 
        <i className="far fa-flag"><span>Flag Post </span></i>
        <i className="far fa-flag"><span>Flag Post </span></i>
         </div> */}



        {!isConfirmationSectionVisible && <div className='flag-btn mt-5'>
          <p className='mb-4'>Why are you flagging this photo?</p>
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
          <a className='btn flag' onClick={handleFlagClick}>Flag</a>
        </div>
      }
      {isConfirmationSectionVisible && (
        <div className='textBox'>
          <h6>Photo Flagged</h6>
          <p className='text'>Photo successfully flagged. We will review your report. Thank you for your cooperation.</p>
        </div>
      )}
        
    </Modal.Body>
</Modal>
  )
}

export default FlagPostModal
