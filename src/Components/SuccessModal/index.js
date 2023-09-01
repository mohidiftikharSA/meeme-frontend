import React from 'react'
import {Modal } from 'react-bootstrap'
const SuccessModal = (props) => {
    return (
            <Modal className='successModal'
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className='succcess' >
                <div onClick={props.onHide}><i class="fa fa-check" aria-hidden="true"></i>Account deleted</div>
                </Modal.Body>
                </Modal>
    )
}
export default SuccessModal