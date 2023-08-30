import DeleteConfirmationModal from 'Components/DeleteConfirmationModal'
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
const DeleteAccountModal = (props) => {
const [modalShow, setModalShow] = useState(false);
    return (
<>
        <Modal className='delAccountModal'
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header>
                <Modal.Title>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                    <h4 className='title'>Delete Account</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='delAccounts' >
            <p className='py-2'>Deleting your account will remove all of your account’s data, contacts, and other information. Are you sure you want to proceed?</p>
            <Button className='del-btn w-100 mb-2' onClick={() => setModalShow(true)}>Delete</Button><br />
            <Button onClick={props.onHide} className='del-button'>Cancel</Button>
            </Modal.Body>
        </Modal>
        <DeleteConfirmationModal
show={modalShow}
onHide={() => setModalShow(false)}/> 
</>
    )
}

export default DeleteAccountModal