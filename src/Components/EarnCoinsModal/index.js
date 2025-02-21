import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import classes from "./index.module.scss";
import { LiaTimesSolid } from 'react-icons/lia';

const EarnCoinsModal= (props) => {
    return (
        <Modal className={classes.infoModal}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='justify-content-end'>
                <span className={classes.closeBtn} onClick={props.onHide}><LiaTimesSolid /></span>
            </Modal.Header>
            <Modal.Body className='m-0'>
            <h4 className='title'>Judge</h4>
            <p className='text'>To qualify for  coin rewards, you need to judge 25 memes per day</p>
            <Button onClick={props.onHide} className='reset-btn px-4 mt-2'>Agree</Button>
            </Modal.Body>
        </Modal>
    )
}

export default EarnCoinsModal