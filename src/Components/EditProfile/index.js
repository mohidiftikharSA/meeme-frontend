import Heading from "Components/Heading";
import React, { useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import classes from "./index.module.scss";
import avatar from "../../Images/avatar.jpg";
import { AiFillCamera } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import AuthAPIs from '../../APIs/auth'
import Loader from "Components/Loader";
import { setAuthProfile } from "../../Redux/reducers/authSlice";
import { toast } from "react-toastify";


const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgForAPI, setImgForAPI] = useState(null);
  const fileInputRef = useRef(null);
  const { profile } = useSelector((state) => state.auth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();


  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgForAPI(e.target.files[0])
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

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Username is required.")
      .min(5, "Name must be at least five characters long"),
    // .matches(
    //   /^(?=.*[0-9])[a-zA-Z0-9]*$/,
    //   "Name must be alphanumeric with at least one number"
    // )
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone is required")
      .min(10, "Phone must be at least ten characters long"),
    bio: Yup.string()
      .required("Bio is required")
      .min(10, "Bio must be at least ten characters long"),
  });


  const updateProfile = async (values) => {
    setIsSubmitting(true)
    console.log("Update Profile Values = ", values);
    const data = new FormData();
    data.append('username', values.name)
    data.append('email', values.email)
    data.append('phone', values.phone)
    data.append('bio', values.bio)
    if (selectedImage) {
      data.append('profile_image', imgForAPI)
    }

    const update = await AuthAPIs.updateUser(data);
    if (update) {
      setIsSubmitting(false)
      const userDetails = await AuthAPIs.getCurrentUserProfile();
      if (userDetails) {
        dispatch(
          setAuthProfile({
            profile: userDetails.data.profile
          })
        )
        toast.success("Profile Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
    setIsSubmitting(false)

  }


  return (
    <>
      <Loader isLoading={isSubmitting} />
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
            <Formik
              onSubmit={(values, { setSubmitting }) => {
                console.log("Submit =", values);
                updateProfile(values);
                setSubmitting(false);
              }}
              initialValues={{
                name: profile?.user?.username || "",
                email: profile?.user?.email || "",
                phone: profile?.user?.phone || "",
                bio: profile?.user?.bio || "",
              }}
              validationSchema={validationSchema}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="form-group">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                  </Form.Group>
                  <p className="customeErrors">{errors.name}</p>

                  <Form.Group className="form-group">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}
                    />

                  </Form.Group>
                  <p className="customeErrors"> {errors.email}</p>

                  <Form.Group className="form-group">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Phone"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      isValid={touched.phone && !errors.phone}
                      isInvalid={touched.phone && !!errors.phone}
                    />
                  </Form.Group>
                  <p className="customeErrors"> {errors.phone}</p>
                  <Form.Group className="form-group mb-4">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Bio"
                      rows={3}
                      name="bio"
                      value={values.bio}
                      onChange={handleChange}
                      isValid={touched.bio && !errors.bio}
                      isInvalid={touched.bio && !!errors.bio}
                    />
                  </Form.Group>
                  <p className="customeErrors"> {errors.bio}</p>
                  <Button type="submit" className="w-100 authButton" >Save</Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Card>
    </>
  );
};

export default EditProfile;
