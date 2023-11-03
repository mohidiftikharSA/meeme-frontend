import Heading from "Components/Heading";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.jpg";
import { AiFillCamera } from "react-icons/ai";
import { useSelector } from "react-redux";


const EditProfile = () => {

  const { profile } = useSelector((state) => state.auth);

  const showUser = () => {
    console.log("Users In Setting ==", profile);
  }

  return (
    <Card className="profileCard">
      <Heading title={"Edit Profile"} linkPath={"home"} />
      <div className={classes.Profile}>
        <div className={classes.profilDetails}>
          <div className={classes.Uploader}>
            <img src={profile?.user_image || avatar} alt="img" />
            {/* <span className={classes.uploadBtn}>
              <AiFillCamera />
            </span> */}
          </div>
          <div className={classes.textBox}>
            <h5 className="mb-0" onClick={showUser}>{profile?.user?.username || "name"}</h5>
            <p>{profile?.user?.email}</p>
          </div>
        </div>

        <div className="userFrom">
          <Form>
            <Form.Group className="form-group">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" defaultValue={profile?.user?.username}></Form.Control>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" defaultValue={profile?.user?.email}></Form.Control>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Phone" defaultValue={profile?.user?.phone}></Form.Control>
            </Form.Group>
            <Form.Group className="form-group mb-4">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" defaultValue={profile?.user?.bio} rows={3} />
            </Form.Group>
            <Button type="submit" className="w-100 authButton" >Save</Button>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default EditProfile;
