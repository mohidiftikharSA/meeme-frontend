import React from 'react'
import classes from "./index.module.scss";
import { Form } from 'react-bootstrap';
import user from "../../Images/avatar.jpg"
import attachment from "../../Images/attachement.svg";
import { useSelector } from "react-redux";


const UploadPost = () => {
  const { profile } = useSelector((state) => state.auth);

  return (
    <div className={classes.postWrapper}>
        <Form.Group className={classes.formGroup}>
            <Form.Control placeholder='Post something'/>
           <div className='dflex align-items-center'>
           <img className={classes.profile} src={profile?.user_image || user} alt='img'/>
           <img src={attachment} alt='img' className={classes.attachmentes}/>
           </div>

        </Form.Group>
    </div>
  )
}

export default UploadPost