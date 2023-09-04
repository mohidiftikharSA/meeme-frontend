import React from 'react'
import { Modal } from 'react-bootstrap'
import classes from "./index.module.scss";
import { LiaTimesSolid } from 'react-icons/lia';
import clapping from '../../Images/clapping.png'
import gift from '../../Images/congrats.png'


const CongratsModal= (props) => {
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
              <div className='imgBox'>
              <img src={gift} alt='gift'></img>
              </div>
               <div>
               <img src={clapping} alt='clapping'></img>
               </div>
                <h4 className='title'>Congratulations</h4>
                <p className='py-2'>You Earn 50 coins for judging!</p>
            </Modal.Body>
        </Modal>
    )
}

export default CongratsModal