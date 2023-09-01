import React from 'react'
import {ListGroup, Modal } from 'react-bootstrap'
import Profile from "../../Images/Profile.png"
const OrganizeBadges = (props) => {
    return (
            <Modal className='delAccounts'
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
            <Modal.Header>
            <Modal.Title>
                <i className="fa fa-angle-left" aria-hidden="true"></i>
                <h4 className='title'>Organize Badges</h4>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className=''>
        
        </Modal.Body>
                </Modal>
    )
}
export default OrganizeBadges