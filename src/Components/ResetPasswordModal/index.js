import React from 'react'
import { Button, Modal } from 'react-bootstrap'
const ResetPasswordModal = (props) => {
    return (
        <Modal className='resetPassword'
            {...props}
            size="s,"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className='checkEmail'>
            <i className="fa fa-check" aria-hidden="true"></i>
            <p>Password Reset Successful!</p>
            <Button onClick={props.onHide} className='reset-btn'>Ok</Button>
            </Modal.Body>
        </Modal>
    )
}

export default ResetPasswordModal
