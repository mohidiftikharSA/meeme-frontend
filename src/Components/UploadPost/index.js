import React from 'react'
import classes from "./index.module.scss";
import { Form } from 'react-bootstrap';
import user from "../../Images/profile1.png"
import attachment from "../../Images/attachement.svg"
const UploadPost = () => {
  return (
    <div className={classes.postWrapper}>
        <Form.Group className={classes.formGroup}>
            <Form.Control placeholder='Post something'/>
           <div className='dflex align-items-center'>
           <img src={user} alt='img'/>
           <img src={attachment} alt='img' className={classes.attachmentes}/>
           </div>

        </Form.Group>
    </div>
  )
}

export default UploadPost