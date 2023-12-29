import React, {useState, useEffect} from "react";
import classes from "./index.module.scss";
import Heading from "Components/Heading";
import {Card, Form} from "react-bootstrap";
import notification from "../../Images/Notification.png";
import sms from "../../Images/sms.png"
import mail from "../../Images/Email.png"
import api from "../../APIs/settings";
import NotificationService from "../../Services/NotificationService";
import {store} from "Redux/store";
import {togglePushNotification} from "Redux/reducers/notificationSlice";

const NotificationCard = () => {
    const {notifications} = store.getState();
    const [isPushNotificationChecked, setIsPushNotificationChecked] = useState(false);
    const onChangePushNotificationToggle = async () => {
        setIsPushNotificationChecked(!isPushNotificationChecked)
        const res = await api.togglePushNotifications({notification_alert: !isPushNotificationChecked})
        if (res.status == 200) {
            store.dispatch(togglePushNotification({enabled_push_notification: !isPushNotificationChecked}))
        }
    }
    useEffect(() => {
        setIsPushNotificationChecked(notifications.enabled_push_notification)
    }, []);
    return (<Card className="profileCard">
        <Heading title={"Notifications"} linkPath={"home"}/>
        <div className={classes.notificationHolder}>
            <ul>
                <li>
                    <div className={classes.box}>
                        <img src={notification} alt="icon"/>
                        <h6 className="mb-0">Push Notifications</h6>
                    </div>
                    <Form.Check
                        onChange={onChangePushNotificationToggle}
                        type="switch"
                        id="custom-switch"
                        checked={isPushNotificationChecked}
                    />
                </li>
                {/* <li>
                    <div className={classes.box}>
                        <img src={sms} alt="icon"/>
                        <h6 className="mb-0">SMS Alerts</h6>
                    </div>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                    />
                </li>
                <li>
                    <div className={classes.box}>
                        <img src={mail} alt="icon"/>
                        <h6 className="mb-0">Email Reminders</h6>
                    </div>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                    />
                </li> */}
            </ul>
        </div>
    </Card>);
};

export default NotificationCard;
