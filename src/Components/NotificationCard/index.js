import React from "react";
import classes from "./index.module.scss";
import Heading from "Components/Heading";
import { Card, Form } from "react-bootstrap";
import notification from "../../Images/Notification.png";
import sms from "../../Images/sms.png"
import mail from "../../Images/Email.png"

const NotificationCard = () => {
  return (
    <Card className="profileCard">
      <Heading title={"Notifications"} />
      <div className={classes.notificationHolder}>
        <ul>
          <li>
            <div className={classes.box}>
              <img src={notification} alt="icon" />
              <h6 className="mb-0">Push Notifications</h6>
            </div>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
            />
          </li>
            <li>
            <div className={classes.box}>
              <img src={sms} alt="icon" />
              <h6 className="mb-0">SMS Alerts</h6>
            </div>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
            />
          </li>
            <li>
            <div className={classes.box}>
              <img src={mail} alt="icon" />
              <h6 className="mb-0">Email Reminders</h6>
            </div>
            <Form.Check // prettier-ignore
              type="switch"
              id="custom-switch"
            />
          </li>
        </ul>
      </div>
    </Card>
  );
};

export default NotificationCard;
