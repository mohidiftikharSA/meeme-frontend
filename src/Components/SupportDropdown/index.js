import React from 'react'
import Form from 'react-bootstrap/Form';
import pic from "../../Images/icon.png";
import Heading from 'Components/Heading';
import classes from "./index.module.scss";
const SupportDropdown = () => {
    return (
        <>
            <div className={classes.supportDropdown}>
                <Heading title={'Support'} />
                <Form.Select className={classes.select} aria-label="Select Subject">
                <option>Select Subject</option>
                    <option className={classes.option}value="1">Abuse</option>
                    <option value="2">Payment</option>
                    <option value="3">Image</option>
                    <option value="1">Profile</option>
                    <option value="2">Tournament</option>
                    <option value="3">Coins</option>
                    <option value="3">Plagiarism</option>
                </Form.Select>
            </div>
            <div className={classes.box}>
                <img src={pic} alt='icon'/>
                <p className={classes.text}>Attach images or proof</p>
            </div>
        </>
    )
}
export default SupportDropdown
