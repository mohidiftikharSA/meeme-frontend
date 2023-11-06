import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import pic from "../../Images/icon.png";
import Heading from 'Components/Heading';
import classes from "./index.module.scss";
import { useWizard } from 'react-use-wizard';

const SupportDetail = () => {
  const { previousStep, nextStep } = useWizard();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFileName(file.name);
    }
  };

  return (
    <>
      <div className={classes.supportDropdown}>
        <span style={{ display: "inline-block", width: "105px" }} onClick={() => (previousStep())}>
          <Heading title={'Support'} />
        </span>
        <Form.Select aria-label="Select Subject">
          <option>Select Subject</option>
          <option value="1">Abuse</option>
          <option value="2">Payment</option>
          <option value="3">Image</option>
          <option value="1">Profile</option>
          <option value="2">Tournament</option>
          <option value="3">Coins</option>
          <option value="3">Plagiarism</option>
        </Form.Select>
        <div>
          <p className={classes.texts}>Your message</p>
          <Form.Group className="forms mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Type here</Form.Label>
            <Form.Control as="textarea" rows={1} />
          </Form.Group>
        </div>
      </div>
      <div className={classes.box}>
      <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="imageInput"
        />
        <label htmlFor="imageInput" className={classes.imageLabel}>
          <img src={pic} alt='icon' />
        </label>
        <p className={classes.text}>Attach images or proof</p>
        {selectedFileName && <p>{selectedFileName}</p>}
      </div>
      <div className={'postionBottom'}>
            <button
              type="button"
              class="w-100 p-2 mt-4 authButton btn btn-primary"
              onClick={() => nextStep()}
            >
              Send New Ticket
            </button>
          </div>
    </>
  );
}

export default SupportDetail;
