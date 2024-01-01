import SuccessModal from 'Components/SuccessModal';
import React, {useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import api from '../../APIs/profile/settings'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "Redux/reducers/authSlice";
import NotificationService from "../../Services/NotificationService";

const DeleteConfirmationModal = (props) => {
    const [successModalShow, setSuccessModalShow] = useState(false);
    const {profile} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [confirmationText, setConfirmationText] = useState("");
    const onClickDelete = async () => {
        console.log("Profile ", confirmationText)
        if (confirmationText == 'DELETE') {
            const response = await api.deleteUserAccount(profile?.user?.id)
            if (response?.status == 200) {
                setSuccessModalShow(true);
                props.onHide();
                setTimeout(()=>{
                    dispatch(logout())
                },1000)
            }
        } else {
            NotificationService.showError('Confirmation word does not match.')
        }


    };
    return (<>
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
            <Modal.Body className='delAccounts'>
                <p className='py-2'>Please enter the word “DELETE” before we delete your account.</p>
                <input placeholder="Delete" value={confirmationText}
                       type="text"
                       onChange={(e) => setConfirmationText(e.target.value)}
                       class="form-control mb-4"></input>
                <Button className='del-btn w-100 mb-2' onClick={onClickDelete}>Delete</Button><br/>
                <Button onClick={props.onHide} className='del-button'>Cancel</Button>
            </Modal.Body>
        </Modal>
        <SuccessModal
            show={successModalShow}
            onHide={() => setSuccessModalShow(false)}
        />
    </>)
}
export default DeleteConfirmationModal