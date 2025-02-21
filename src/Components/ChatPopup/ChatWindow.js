import React, { useEffect, useState, useRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoIosSend } from "react-icons/io";
import classes from "./index.module.scss";
import user2 from "../../Images/avatar.png";
import { CgAttachment } from "react-icons/cg";
import { Form } from "react-bootstrap";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";

const ChatWindow = ({
  isLoading,
  chatToggle,
  selectedChat,
  msgsList,
  inputText,
  handleInputChange,
  handleKeyPress,
  sendMessage,
  user,
  closePreview,
  handleFileInput,
  handleImageUpload,
  handleFileChange,
  fileInputRef,
  setEmoji,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const messagesEndRef = useRef(null); // Ref to track the end of the messages container

  useEffect(() => {
    setMessageText(inputText);
  }, [inputText]);

  /**
   * Scroll to the bottom of the chat messages
   */
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll when the component mounts or updates
  }, [msgsList, previewImage]); // Run on messages or preview changes

  useEffect(() => {
    console.log("Close preview hii");
    setPreviewImage(null);
  }, [closePreview]);

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setEmoji(emoji.emoji);
  };

  const handleFilePreview = (event) => {
    const file = event.target.files[0];
    
    // Check if the selected file is not in HEIC format
    if (file && file.type !== 'image/heic') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      handleFileChange(event);
    } else {
      console.log("HEIC format is not supported.");
      toast.error('File format not supported');
    }
  };

  const removePreviewImage = () => {
    setPreviewImage(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="chat">
      <div className="chat-window">
        <div className="header">
          {selectedChat?.receiver_active_status && (
            <span className="status d-inline-block mx-2"></span>
          )}
          {selectedChat?.sender_id === user.id
            ? selectedChat?.receiver_name
            : selectedChat?.sender_name}
          <span
            className="cancel-icon"
            onClick={chatToggle}
            style={{ cursor: "pointer" }}
          >
            <LiaTimesSolid />
          </span>
        </div>
        <div className="messages">
          {msgsList &&
            msgsList.map((item, index) => (
              <div
                key={`${item.id}_${index}`}
                className={item.sender_id === user.id ? "senderBox" : "receiverBox"}
              >
                <div className="userImg">
                  <img src={item.sender_image || user2} alt="img" />
                </div>
                <div className={`message ${item.sender_id === user.id ? "sent" : "received"}`}>
                  <div className="messageBox">
                    <div className="message-text">{item.body}</div>
                    {item.message_images &&
                      item.message_images.map((img, ind) => (
                        <div key={`${ind}_img`} className="message-user">
                          <img
                            src={typeof img === "string" ? img : img.message_image}
                            alt="attachment"
                            onLoad={scrollToBottom} // Ensure scrolling after the image is loaded
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          {previewImage && (
            <div className="image-preview-chat">
              <img
                src={previewImage}
                alt="preview"
                className="preview-image"
                onLoad={scrollToBottom} // Ensure scrolling after preview image is loaded
              />
              <span className="remove-btn" onClick={removePreviewImage}>
                <LiaTimesSolid />
              </span>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* Marker for the end of the messages */}
        </div>

        <div className="sendBox emoji">
          <Form.Control
            type="text"
            placeholder="Write a message..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <div className="iconBox">
            <span className={classes.smiley} onClick={handleEmojiClick}>
              <FaSmile />
            </span>
            {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} disableAutoFocus />}
            <span className={classes.uploadBtn}>
              <CgAttachment onClick={() => fileInputRef.current.click()} />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFilePreview}
                style={{ display: "none" }}
              />
            </span>
            {isLoading ?
              <MoonLoader
                color={"#FFCD30"}
                loading={isLoading}
                cssOverride={""}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> :
              <IoIosSend color="#ffcd2f" onClick={sendMessage} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
