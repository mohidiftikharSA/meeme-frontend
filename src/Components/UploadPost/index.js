import React, { useState } from "react";
import classes from "./index.module.scss";
import { Form } from 'react-bootstrap';
import user from "../../Images/avatar.jpg"
import attachment from "../../Images/attachement.svg";
import { useSelector } from "react-redux";
import PostContentModal from "Components/TournamentModal";


const UploadPost = () => {
  const { profile } = useSelector((state) => state.auth);
  const [tournamentModalShow, settournamentModalShow] = useState(false);

  return (
    <>
    <div className={classes.postWrapper}>
        <Form.Group className={classes.formGroup}>
            <Form.Control placeholder='Post something'/>
           <div className='d-flex align-items-center'>
           <img src={profile?.user_image || user} alt='img' style={{objectFit:"cover"}}/>
           <img src={attachment} alt='img' className={classes.attachmentes} onClick={() => {
          settournamentModalShow(true);
        }}/>
           </div>

        </Form.Group>
    </div>
    <PostContentModal show={tournamentModalShow} onHide={() => settournamentModalShow(false)} />
    </>
  )
}

export default UploadPost