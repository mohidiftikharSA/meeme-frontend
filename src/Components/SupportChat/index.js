import React, { useEffect, useState, useRef } from "react";
import classes from "./index.module.scss";
import Heading from "Components/Heading";
import user from "../../Images/profile1.png";
import user2 from "../../Images/avatar1.jpg";
import MemeePng from "../../Images/memee.png";
import attachment1 from "../../Images/attachment2.png";
import attachment2 from "../../Images/attachment1.png";
import logo from "../../Images/avatar.png";
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
  const [reply, setReply] = useState('');
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [sent, setSent] = useState();
  const [emojis, setEmojis] = useState([]);
  const emojiPickerRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    getTicketMessages();
  }, [selectedSupportTicket, sent]);

  useEffect(() => {
    scrollToBottom();
  }, [allMsgsArr]);

  const getTicketMessages = async () => {
    setIsLoading(true);
    const data = {
      message_ticket: selectedSupportTicket?.message_ticket,
      admin_user_id: 1,
    };
    const msgs = await MessagesAPIs.getTicketMessages(data);
    if (msgs) {
      const arr = [...msgs?.data?.messages];
      // Sort messages by created_at in ascending order (oldest to newest)
      const sortedMessages = arr.sort((a, b) => 
        new Date(a.created_at) - new Date(b.created_at)
      );
      setAllMsgsArr(sortedMessages);
    }
    setIsLoading(false);
  };

  const sendReply = async () => {
    console.log("Send reply ==", reply)
    console.log("Send selectedSupportTicket ==", selectedSupportTicket)
    if (selectedSupportTicket) {
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
        setPreviewUrl(null)
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
    const selectedFile = e.target.files[0];
    console.log("File selected - ", selectedFile);
    setFile(selectedFile);
    
    // Create preview URL for image
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  // Clean up preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [replye, setReplye] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleEmojiSelect = (emoji) => {
    setReply(reply + emoji.emoji);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      handleEmojiRemove();
    }
  };

  const handleEmojiRemove = () => {
    const currentReplye = replye || '';
    const newReplye = currentReplye.slice(0, -1);
    setReplye(newReplye);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={classes.ChatBoxHolder} ref={chatContainerRef}>
        <span
          style={{ display: "inline-block", width: "105px" }}
          onClick={() => goToStep(0)}
        >
          <Heading title={"Support"} noLink />
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
                  {console.log("item chat support -- ",item)}
                  <div className={classes.textBox}>
                    <div className={classes.profileImg}>
                      <img src={ item?.sender_name === "" ?  MemeePng : item?.sender_image || user2} alt="img" />
                    </div>
                    <div className={classes.userInfo}>
                      <h5>{item?.sender_name === "" ? "Memee Admin" : item?.sender_name}</h5>
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
            Stumble'scom. By accessing this website we assume you accept these
            terms and conditions. Do not continue to use if you do not agree to
            take all of the terms and conditions stated on this page. By
            accessing this
          </p>
        </div> */}
      </div>

      <div className={`postionBottom ${classes.sendBox}`}>
        <span className={classes.previewContainer}>
          {previewUrl && (
            <div className={classes.imagePreview}>
              <img 
                src={previewUrl} 
                alt="Preview"
              />
              <button 
                className={classes.closeButton}
                onClick={() => {
                  setPreviewUrl(null);
                  setFile(null);
                }}
              >
                ×
              </button>
            </div>
          )}
        </span>
        <span className={classes.attachBtn}>
          <span className={classes.attachBtn} onClick={triggerFileInput}>
            <input
              type="file"
              accept="image/*"
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
            value={reply}
            onChange={(e) => { setReply(e.target.value) }}
            onKeyDown={handleKeyDown}
          />
          <span className={classes.smiley} onClick={handleEmojiClick}>
            <FaSmile />
          </span>
          
          {showEmojiPicker && (
            <div 
              ref={emojiPickerRef} 
              style={{ 
                position: "absolute", 
                bottom: "100%",
                right: "0",
                marginBottom: "10px",
                zIndex: 1000
              }}
            >
              <EmojiPicker 
                onEmojiClick={handleEmojiSelect} 
                disableAutoFocus 
              />
            </div>
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
