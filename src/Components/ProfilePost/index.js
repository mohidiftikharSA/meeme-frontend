import React from "react";
import classes from "./index.module.scss";
import { Form } from "react-bootstrap";
const ProfilePost = ({data}) => {
  return (
    <div className={classes.postHolder}>
      <div className={classes.header}>
        <h4>45 Posts</h4>
        <Form.Select style={{width:"200px"}}>
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
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
