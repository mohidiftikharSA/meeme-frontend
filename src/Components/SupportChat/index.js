import React, { useEffect, useState, useRef } from "react";
import classes from "./index.module.scss";
import Heading from "Components/Heading";
import user from "../../Images/profile1.png";
import attachment1 from "../../Images/attachment2.png";
import attachment2 from "../../Images/attachment1.png";
import logo from "../../Images/scondaryLogo.png";
import { BsImage } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import { FaSmile } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { useWizard } from "react-use-wizard";
import MessagesAPIs from "../../APIs/messages";
import Loader from "Components/Loader";
import EmojiPicker from "emoji-picker-react";

const SupportChat = ({ selectedSupportTicket }) => {
  const { goToStep } = useWizard();
  const [allMsgsArr, setAllMsgsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState();
  const [file, setFile] = useState();
  const [sent, setSent] = useState();

  useEffect(() => {
    getTicketMessages();
  }, [selectedSupportTicket, sent]);

  const getTicketMessages = async () => {
    setIsLoading(true);
    const data = {
      message_ticket: selectedSupportTicket?.message_ticket,
      admin_user_id: 1,
    };
    console.log("Data --- ", data);
    const msgs = await MessagesAPIs.getTicketMessages(data);
    if (msgs) {
      console.log("Ticket messages successfull - ", msgs?.data?.messages);
      const arr = [...msgs?.data?.messages];
      setAllMsgsArr(arr.reverse());
    }
    setIsLoading(false);
  };

  const sendReply = async () => {
    if (reply && selectedSupportTicket) {
      setIsLoading(true);
      setIsLoading(true);
      const data = new FormData();
      data.append("conversation_id", selectedSupportTicket?.conversation_id);
      data.append("admin_user_id", 1);
      data.append("body", reply);
      if (file) {
        data.append("message_images[]", file);
      }
      const send = await MessagesAPIs.replySupportChat(data);
      if (send) {
        setSent(send.data);
        setReply("");
        setFile(null);
        console.log("Reply sent successfully = ", send.data);
      }
    }
    setIsLoading(false);
  };

  function formatDate(inputDate) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateObj = new Date(inputDate);
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    return formattedDate;
  }

  const fileInputRef = useRef(null);

  const fileInputHandler = (e) => {
    console.log("File selected - ", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [replye, setReplye] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setReplye(replye + emoji.native);
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={classes.ChatBoxHolder}>
        <span
          style={{ display: "inline-block", width: "105px" }}
          onClick={() => goToStep(0)}
        >
          <Heading title={"Support"} />
        </span>

        {allMsgsArr?.map((item, index) => {
          return (
            <>
              <div className={classes.sender}>
                <div
                  className={
                    "d-flex align-items-start justify-content-between mb-3"
                  }
                >
                  <div className={classes.textBox}>
                    <div className={classes.profileImg}>
                      <img src={item?.sender_image || user} alt="img" />
                    </div>
                    <div className={classes.userInfo}>
                      <h5>{item?.sender_name}</h5>
                      <p>{formatDate(item?.created_at)}</p>
                    </div>
                  </div>
                  <span className={classes.status}>
                    {item?.status === "Ongoing" ? "Pending" : item?.status}
                  </span>
                </div>
                <p className={classes.msg}>{item?.body}</p>
                {item && (
                  <div className={classes.attachment}>
                    {item?.message_images?.map((img) => {
                      return <img src={img?.message_image} alt="img" />;
                    })}
                  </div>
                )}
              </div>
            </>
          );
        })}

        {/* <div className={`${classes.sender} ${classes.recive}`}>
          <div
            className={"d-flex align-items-start justify-content-between mb-3"}
          >
            <div className={classes.textBox}>
              <div className={classes.profileImg}>
                <img src={logo} alt="img" />
              </div>
              <div className={classes.userInfo}>
                <h5>Memee Admin</h5>
                <p>April 25, 2022</p>
              </div>
            </div>
            <span className={classes.status}>Pending</span>
          </div>
          <p className={classes.msg}>
            These rules and regulations for the use of Memee, located at
            Stumble’scom. By accessing this website we assume you accept these
            terms and conditions. Do not continue to use if you do not agree to
            take all of the terms and conditions stated on this page. By
            accessing this
          </p>
        </div> */}
      </div>

      <div className={`postionBottom ${classes.sendBox}`}>
        <span>
          <p className="overflowText">{file ? file?.name : ""}</p>
        </span>
        <span className={classes.attachBtn}>
          <span className={classes.attachBtn} onClick={triggerFileInput}>
            <input
              type="file"
              onChange={fileInputHandler}
              ref={fileInputRef}
              style={{ display: "none" }}
            />
            <BsImage />
          </span>
        </span>
        <div className={classes.sendBox}>
          <Form.Control
            placeholder="Aa"
            value={replye}
            onChange={(e) => setReplye(e.target.value)}
          />
          <span className={classes.smiley} onClick={handleEmojiClick}>
            <FaSmile />
          </span>

          {showEmojiPicker && (
            <EmojiPicker onEmojiClick={handleEmojiSelect} disableAutoFocus />
          )}
        </div>
        <span
          className={classes.sendBtn}
          onClick={() => {
            sendReply();
          }}
        >
          <IoMdSend />
        </span>
      </div>
    </>
  );
};

export default SupportChat;
