import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { LiaTimesSolid } from 'react-icons/lia';


const JudgeModal = ({ ...props }) => {
    return (
        <Modal className={'infoModal judge'}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='justify-content-end'>
                <span className={'closeBtn'} onClick={props.onHide}><LiaTimesSolid /></span>
            </Modal.Header>
            <Modal.Body className='my-3 '>
                <div>
                    <h6>Judge</h6>
                    <p>To qualify for  coin rewards, you need to judge 100 memes per day</p>
                </div>
                <div className='px-5'>
                    <Button className="w-100 p-2 authButton" onClick={props.onHide}>Agree</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default JudgeModal