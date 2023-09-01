import React from 'react'
import Form from 'react-bootstrap/Form';
import pic from "../../Images/icon.png";
import Heading from 'Components/Heading';
import classes from "./index.module.scss";
import { useWizard } from 'react-use-wizard';
const SupportDetail = () => {
    const { previousStep, nextStep } = useWizard();

    return (
        <>
            <div className={classes.supportDropdown}>
                <Heading title={'Support'} />
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
                <img src={pic} alt='icon'/>
                <p className={classes.text}>Attach images or proof</p>
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
    )
}
export default SupportDetail
