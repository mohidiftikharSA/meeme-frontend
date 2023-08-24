import React from "react";
import classes from "./index.module.scss";
import Heading from "Components/Heading";
import { Card, Form } from "react-bootstrap";
import notification from "../../Images/Notification.png";

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
        </ul>
      </div>
    </Card>
  );
};

export default NotificationCard;
