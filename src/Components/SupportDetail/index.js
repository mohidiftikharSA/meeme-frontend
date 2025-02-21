import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import pic from "../../Images/icon.png";
import Heading from 'Components/Heading';
import classes from "./index.module.scss";
import { useWizard } from 'react-use-wizard';
import MessageAPIs from '../../APIs/messages';
import { toast } from "react-toastify";
import Loader from 'Components/Loader';

const SupportDetail = () => {
  const { previousStep, nextStep } = useWizard();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('Abuse');
  const [msgError, setMsgError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [msg, setMsg] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (selectedImages.length + files.length > 3) {
      toast.error("You can only upload up to 3 images.");
      return;
    }
    const newImages = files.filter(file => !selectedImages.some(img => img.name === file.name));
    setSelectedImages(prev => [...prev, ...newImages]);
    setSelectedFileNames(prev => [...prev, ...newImages.map(file => file.name)]);
  };

  const removeImage = (index) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newFileNames = selectedFileNames.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setSelectedFileNames(newFileNames);
  };

  const submitHandler = async () => {
    setIsLoading(true);
    if (!selectedSubject) {
      setSubjectError('Subject is required.');
      setIsLoading(false);
      return;
    } else {
      setSubjectError('');
    }
    if (!msg) {
      setMsgError('Message is required.');
      setIsLoading(false);
      return;
    } else {
      setMsgError('');
    }
    const data = new FormData();
    data.append('admin_user_id', 1);
    data.append('body', msg);
    data.append('subject', selectedSubject);
    if (selectedImages.length > 0) {
      selectedImages.forEach(image => {
        data.append("message_images[]", image);
      });
    }
    const createTicket = await MessageAPIs.createTicket(data);
    toast.success("Ticket Created Successfully", {
      position: "top-right",
      autoClose: 2000,
    });
    previousStep();
    setIsLoading(false);
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={classes.supportDropdown}>
        <span style={{ display: "inline-block", width: "105px" }} onClick={() => (previousStep())}>
          <Heading title={'Support'} noLink/>
        </span>
        <Form.Select aria-label="Select Subject" onChange={(e) => { setSelectedSubject(e.target.value); }} value={selectedSubject} >
          <option disabled hidden>Select Subject</option>
          <option value="Abuse">Abuse</option>
          <option value="Payment">Payment</option>
          <option value="Image">Image</option>
          <option value="Profile">Profile</option>
          <option value="Tournament">Tournament</option>
          <option value="Coins">Coins</option>
          <option value="Plagiarism">Plagiarism</option>
        </Form.Select>
        <p className='customeErrors'>{subjectError}</p>

        <div>
          <p className={classes.texts}>Your message</p>
          <Form.Group className="forms textholder mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Type here"
              onChange={(e) => { setMsg(e.target.value); }}
            />
          </Form.Group>
          <p className='customeErrors'>{msgError}</p>
        </div>
      </div>
      <div className={classes.box}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          multiple
          style={{ display: 'none' }}
          id="imageInput"
        />
        <label htmlFor="imageInput" className={classes.imageLabel} style={{ cursor: 'pointer' }}>
          <img src={pic} alt='icon' />
        </label>
        <p className={classes.text}>Attach images or proof</p>
        <div className={classes.previewContainer}>
          {selectedImages.map((image, index) => (
            <div key={index} className={classes.imageWrapper}>
              <img src={URL.createObjectURL(image)} alt={`preview-${index}`} className={classes.imagePreview} />
              <button className={classes.removeButton} onClick={() => removeImage(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 16 16">
                  <path d="M1.5 1.5l13 13m0-13l-13 13" stroke="red" strokeWidth="2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={'postionBottom'}>
        <button
          type="button"
          class="w-100 p-2 mt-4 authButton btn btn-primary"
          onClick={submitHandler}
        >
          Send New Ticket
        </button>
      </div>
    </>
  );
}

export default SupportDetail;
