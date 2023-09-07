import React from "react";
import classes from "./index.module.scss";
import { Form } from "react-bootstrap";
const ProfilePost = ({data}) => {
  return (
    <div className={classes.postHolder}>
      <div className={classes.header}>
        <h4>45 Posts</h4>
        <Form.Select  className="form" style={{width:"120px"}}>
          <option value="1">April</option>
          <option value="2">May</option>
          <option value="3">June</option>
        </Form.Select>
      </div>
   <div className={classes.box}>
   {
        data.map((item,ind)=>{
            return(
                <div className={classes.imgBox}>
                <img src={item.img} alt=""/>
              </div>
            )
        })
     }
   </div>
    </div>
  );
};

export default ProfilePost;
