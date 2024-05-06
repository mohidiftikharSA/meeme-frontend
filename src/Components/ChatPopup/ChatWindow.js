import React from "react";
import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoIosSend } from "react-icons/io";
import classes from "./index.module.scss";
import user2 from "../../Images/avatar.jpg";
import { CgAttachment } from "react-icons/cg";
import { Form } from "react-bootstrap";
import { FaSmile } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

const ChatWindow = ({

    chatToggle,
    selectedChat,
    msgsList,
    inputText,
    handleInputChange,
    handleKeyPress,
    sendMessage,
    user,
    handleFileInput,
    handleImageUpload,
    handleFileChange,
    fileInputRef
}) => {
    
    const [replye, setReplye] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleEmojiClick = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiSelect = (emoji) => {
        setReplye(replye + emoji.native);
    };
    return (
        <div className="chat">
            <div className="chat-window">
                <div className="header">
                    {selectedChat?.receiver_active_status && <span className="status d-inline-block mx-2"></span>}
                    {selectedChat?.sender_id === user.id ? selectedChat?.receiver_name : selectedChat?.sender_name}
                    <span className="cancel-icon" onClick={chatToggle} style={{ cursor: "pointer" }}>
                        <LiaTimesSolid />
                    </span>
                </div>
                <div className="messages">
                    {msgsList && msgsList.map((item, index) => {
                        return (<>  {item?.sender_id !== user.id ? <>
                            <div key={`${item.id}_${index}`} className="receiverBox">
                                <div className="userImg">
                                    <img src={item?.sender_image || user2} alt="img" />
                                </div>
                                <div key={index} className="message received">
                                    <div className="messageBox">
                                        <div className="message-user">{item.body}</div>
                                        {item?.message_images && item?.message_images?.map((img, ind) => {
                                            return (<>
                                                <div id={`${ind}_img`} className="message-user">
                                                    {typeof (img) === 'string' ? <img src={img} /> :
                                                        <img src={img?.message_image} />}
                                                </div>
                                            </>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </> : <>
                            <div key={`${item.id}_${index}`} className="senderBox">
                                <div
                                    key={index}
                                    className={`message ${item.sender_id === user.id ? "sent" : "received"}`}
                                >
                                    <div className="userImg">
                                        <img src={item?.sender_image || user2} alt="img" />
                                    </div>
                                    <div className="messageBox">
                                        <div className="message-text ">{item?.body}</div>
                                        {item?.message_images && item?.message_images?.map((img, ind) => {
                                            return (<>
                                                <div key={`${ind}_img`} className="message-user">
                                                    {typeof (img) === 'string' ? <img src={img} /> :
                                                        <img src={img?.message_image} />}
                                                </div>
                                            </>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>} </>);
                    })}
                </div>
                <div className="sendBox emoji">
                    <Form.Control
                        type="text"
                        placeholder="Write a message..."
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                    <div className={"iconBox"}>
                        <span className={classes.smiley} onClick={handleEmojiClick}>
                            <FaSmile />
                        </span>

                        {showEmojiPicker && (
                            <EmojiPicker onEmojiClick={handleEmojiSelect} disableAutoFocus />
                        )}
                        <span className={classes.uploadBtn} onChange={handleFileInput} onClick={handleImageUpload}>
                            <CgAttachment />
                            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange}
                                style={{ display: 'none' }} />
                        </span>
                        <IoIosSend color="#ffcd2f" onClick={sendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
