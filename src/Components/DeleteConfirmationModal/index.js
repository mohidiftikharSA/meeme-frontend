import SuccessModal from 'Components/SuccessModal';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
const DeleteConfirmationModal = (props) => {
    const [successModalShow, setSuccessModalShow] = useState(false);
    const handleBuyClick = () => {
        // Perform the purchase logic here
        // Once the purchase is successful, show the success modal
        setSuccessModalShow(true);
        // Close the purchase modal
        props.onHide();
      };
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
                    <input placeholder="Delete" type="text" class="form-control mb-4"></input>
                    <Button className='del-btn w-100 mb-2'onClick={handleBuyClick}>Delete</Button><br />
                    <Button onClick={props.onHide} className='del-button'>Cancel</Button>
                </Modal.Body>
                </Modal>
                <SuccessModal
                show={successModalShow}
onHide={() => setSuccessModalShow(false)}
                />
                </>
    )
}
export default DeleteConfirmationModal