import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import profile from "../../Images/post2.png"

const FlagPostModal = (props) => {
    const [isFlagSectionVisible, setFlagSectionVisibility] = useState(true);
    const [isConfirmationSectionVisible, setConfirmationSectionVisibility] = useState(false);
  
    const handleFlagClick = () => {
      setFlagSectionVisibility(false);
      setConfirmationSectionVisibility(true);
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
    <img src={profile}/>
   </div>
   {/* <div className='icon-box'> 
<i className="fas fa-download"><span>Download</span></i> 
<i className="far fa-flag"><span>Flag Post </span></i>
<i className="far fa-flag"><span>Flag Post </span></i>
   </div> */}


   {isFlagSectionVisible && (
        <div className='flag-btn mt-5'>
          <p className='mb-4'>Why are you flagging this photo?</p>
          <button>I just don’t like it</button>
          <button>Nudity or sexual activity</button>
          <button>It’s spam</button>
          <button>Suicide or self-injury</button>
          <button>Offensive content</button>
          <a className='btn flag' onClick={handleFlagClick}>Flag</a>
        </div>
      )}
      {isConfirmationSectionVisible && (
        <div className='textBox'>
          <h6>Photo Flagged</h6>
          <p className='text'>Photo successfully flagged. We will review your report. Thank you for your cooperation.</p>
        </div>
      )}

      
   {/* <div className='form'>
   <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={5} />
      </Form.Group>
      <a className='btn flag'>Report</a>
    </Form>
   </div>
   <div className='textBox'>
    <h6>Photo Reported</h6>
    <p className='text'>Photo successfully reported. We will review your report. Thank you for your cooperation.</p>
   </div> */}
        
    </Modal.Body>
</Modal>
  )
}

export default FlagPostModal
