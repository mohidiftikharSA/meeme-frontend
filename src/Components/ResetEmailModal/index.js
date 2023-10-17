import React from 'react'
import { Modal } from 'react-bootstrap'
import emailcheck from '../../Images/emailcheck.svg'

const ResetEmailModal = (props) => {
    return (
        <Modal className='alignRight'
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
           
        >
            <Modal.Header closeButton >
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='checkEmail'>
            <img src={emailcheck} alt="check" />
            <p>Your reset password link has been sent to your email.</p>
            </Modal.Body>
        </Modal>
    )
}

export default ResetEmailModal
