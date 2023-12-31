import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import classes from "./index.module.scss";
import { LiaTimesSolid } from 'react-icons/lia';


const InfoModal = ({ tournament, rules, ...props }) => {
    return (
        <Modal className={'infoModal'}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='justify-content-end'>
                <span className={'closeBtn'} onClick={props.onHide}><LiaTimesSolid /></span>
            </Modal.Header>
            <Modal.Body className='m-0'>
                {tournament && rules ?
                    <div dangerouslySetInnerHTML={{ __html: rules }} />
                    :
                    <p>No Rules Available</p>
                }
                <div className='px-5'>
                    <Button className="w-100 p-2 authButton" onClick={props.onHide}>Agree</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default InfoModal