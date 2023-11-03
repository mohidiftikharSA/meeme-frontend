import Heading from "Components/Heading";
import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.jpg";
import { AiFillCamera } from "react-icons/ai";
import { useSelector } from "react-redux";


const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const { profile } = useSelector((state) => state.auth);


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

  const showUser = () => {
    console.log("Profile == ", profile);
  }

  return (
    <Card className="profileCard">
      <Heading title={"Edit Profile"} />
      <div className={classes.Profile}>
        <div className={classes.profilDetails}>
          <div className={classes.Uploader}>
            {!selectedImage && !profile?.user_image ?
              <img
                src={avatar}
                alt={"img"}
                onClick={handleImageUpload}
              /> :
              <img
                src={selectedImage ? selectedImage : profile?.user_image}
                alt={"img"}
                onClick={handleImageUpload}
              />
            }

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
