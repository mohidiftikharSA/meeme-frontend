import React from 'react'
import classes from "./index.module.scss"
import { Form } from 'react-bootstrap'
const UploadPost = () => {
  return (
    <div className={classes.postWrapper}>
        <Form.Group className={classes.formGroup}>
            <Form.Control placeholder='Post something'/>
        </Form.Group>
    </div>
  )
}

export default UploadPost