import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import profile from "../../Images/post2.png"

const ReportPostModal = (props) => {
    const [isFlagSectionVisible, setFlagSectionVisibility] = useState(true);
    const [isConfirmationSectionVisible, setConfirmationSectionVisibility] = useState(false);
    const [isFormDisabled, setFormDisabled] = useState(false);
  
    const handleReportClick = () => {
      setFlagSectionVisibility(false);
      setConfirmationSectionVisibility(true);
      setFormDisabled(true);
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
   {isFlagSectionVisible && (
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={7} disabled={isFormDisabled} />
          </Form.Group>
          <a className='btn flag report' onClick={handleReportClick}>Report</a>
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
  )
}

export default ReportPostModal
