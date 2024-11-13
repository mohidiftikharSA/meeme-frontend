import React, { useState } from "react";
import classes from "./index.module.scss";
import { Form } from 'react-bootstrap';
import user from "../../Images/avatar.png"
import attachment from "../../Images/attachement.svg";
import { useSelector } from "react-redux";
import PostContentModal from "Components/TournamentModal";


const UploadPost = ({setNewPost}) => {
  const { profile } = useSelector((state) => state.auth);
  const [tournamentModalShow, settournamentModalShow] = useState(false);

  return (
    <>
      <div className={classes.postWrapper} onClick={() => {
              settournamentModalShow(true);
            }}>
        <Form.Group className={classes.formGroup}>
          <div className={classes.createPost}>
            <span>Post Something</span>
          </div>

          <div className='d-flex align-items-center'>
            <img src={profile?.user_image || user} alt='img' style={{ objectFit: "cover" }} />
            <img src={attachment} alt='img' className={classes.attachmentes}  />
          </div>

        </Form.Group>
      </div>
      <PostContentModal setNewPost={setNewPost} post show={tournamentModalShow} onHide={() => settournamentModalShow(false)} />
    </>
  )
}

export default UploadPost