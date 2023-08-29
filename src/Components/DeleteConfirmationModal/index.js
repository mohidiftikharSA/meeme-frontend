import SuccessModal from 'Components/SuccessModal';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
const DeleteConfirmationModal = (props) => {
    const [successModalModalShow, setSuccessModalShow] = useState(false);
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
                        <h4 className='title'>Confirmation</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='delAccounts' >
                    <p className='py-2'>Please enter the word “DELETE” before we delete your account.</p>
                    <input placeholder="Delete" type="text" class="form-control mb-3"></input>
                    <Button className='del-btn w-100 mb-3'onClick={() => setSuccessModalShow(true)}>Delete</Button><br />
                    <Button onClick={props.onHide} className='del-button'>Cancel</Button>
                </Modal.Body>
                </Modal>
                <SuccessModal
                show={successModalModalShow}
onHide={() => setSuccessModalShow(false)}
                />
                </>
    )
}
export default DeleteConfirmationModal