import React from 'react'
import {Modal } from 'react-bootstrap'
import check from '../../Images/check.png'
const SuccessModal = (props) => {
    return (
            <Modal className='successModal'
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body className='succcess' >
                <div onClick={props.onHide}><img width={'18px'} src={check} alt='check'/>Account deleted</div>
                </Modal.Body>
                </Modal>
    )
}
export default SuccessModal