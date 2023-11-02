import Heading from "Components/Heading";
import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import classes from "./index.module.scss";
import profile from "../../Images/profile1.png";
import { AiFillCamera } from "react-icons/ai";

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="profileCard">
      <Heading title={"Edit Profile"} />
      <div className={classes.Profile}>
        <div className={classes.profilDetails}>
        <div className={classes.Uploader}>
      <img
        src={selectedImage || profile}
        alt="img"
        onClick={handleImageUpload}
      />
      <span className={classes.uploadBtn} onClick={handleImageUpload}>
        <AiFillCamera />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
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
              <Form.Control type="text" placeholder="Name" value={"Mr Astronut"}></Form.Control>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={"iammemer@memee.com"}></Form.Control>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Email" value={"+123-555-2514"}></Form.Control>
            </Form.Group>
            <Form.Group className="form-group mb-4">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" value={"'Like to travel and shoot cinematic videos and love to catpure nature'"} rows={3} />
            </Form.Group>
            <Button type="submit" className="w-100 authButton" >Save</Button>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default EditProfile;
