import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import classes from "./index.module.scss";
import { LiaTimesSolid } from 'react-icons/lia';


const InfoModal = (props) => {
  return (
    <Modal className={'infoModal'}
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='justify-content-end'>
                <span className={'closeBtn'} onClick={props.onHide}><LiaTimesSolid/></span>
            </Modal.Header>
            <Modal.Body className='m-0'>
                <h6 className={classes.rule}>Rules & Regulations</h6>
                <ul className={`ruleList mb-4`}>
                    <li>Meme user can post their memes and join the tournament.</li>
                    <li>To qualify for coin rewards, you need to judge 100 memes per day.</li>
                    <li>The judging of memes resets daily.</li>
                    <li>You need to have the highest number of likes to win the tournament.</li>
                    <li>Meme Users will have a chance to win Amazon Gift cards or coins when they are the successful winner of the tournament. First, second and third in votes will win Amazon Gift cards, while the 4th to 10th place will get Memee coins.</li>
                </ul>
                <div className='px-5'>
        <Button className="w-100 p-2 authButton" onClick={props.onHide}>Agree</Button>
        </div>
            </Modal.Body>
        </Modal>
  )
}

export default InfoModal