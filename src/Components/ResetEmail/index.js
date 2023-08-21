import React from 'react'
import { Modal } from 'react-bootstrap'

const ResetEmail = (props) => {
  return (
    <Modal className='aboutModal alignRight'
            {...props}
            size="s,"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </Modal.Title>
            </Modal.Header>
            <h4 className='title'>About Us</h4>
            <Modal.Body className='subTitle'>
            <div className='aboutLogo py-3'></div>
              
            </Modal.Body>
        </Modal>
  )
}

export default ResetEmail
