import Heading from "Components/Heading";
import React from "react";
import { Card, Form } from "react-bootstrap";
import classes from "./index.module.scss";
import profile from "../../Images/profile1.png";
import { AiFillCamera } from "react-icons/ai";

const EditProfile = () => {
  return (
    <Card className={classes.card}>
      <Heading title={"Edit Profile"} />
      <div className={classes.Profile}>
        <div className={classes.profilDetails}>
          <div className={classes.Uploader}>
            <img src={profile} alt="img" />
            <span className={classes.uploadBtn}>
              <AiFillCamera />
            </span>
          </div>
          <div className={classes.textBox}>
            <h5 className="mb-0">Mr Astronut</h5>
            <p>iammemer@memee.com</p>
          </div>
        </div>

        <div className="userFrom">
          <Form>
            <Form.Group className="form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Name" value={"Mr Astronut"}></Form.Control>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default EditProfile;
