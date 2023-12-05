import React from "react";
import {LiaTimesSolid} from "react-icons/lia";
import {IoIosSend} from "react-icons/io";
import classes from "./index.module.scss";
import user1 from "../../Images/chatuser.png";
import user2 from "../../Images/profile1.png";
import {CgAttachment} from "react-icons/cg";
import {Form} from "react-bootstrap";
import {FiSmile} from "react-icons/fi";

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
    return (
        <div className="chat">
            <div className="chat-window">
                <div className="header">
                    {selectedChat?.receiver_active_status && <span className="status d-inline-block mx-2"></span>}
                    {selectedChat?.sender_id === user.id ? selectedChat?.receiver_name : selectedChat?.sender_name}
                    <span className="cancel-icon" onClick={chatToggle} style={{cursor: "pointer"}}>
            <LiaTimesSolid/>
          </span>
                </div>
                <div className="messages">
                    {msgsList && msgsList.map((item, index) => {
                        return (<>  {item?.sender_id !== user.id ? <>
                            <div className="receiverBox">
                                <div className="userImg">
                                    <img src={item?.sender_image || user1} alt="img"/>
                                </div>
                                <div key={index} className="message received">
                                    <div className="messageBox">
                                        <div className="message-user">{item.body}</div>
                                        {item?.message_images && item?.message_images?.map((img, ind) => {
                                            return (<>
                                                <div className="message-user">
                                                    <img src={img || img?.message_image}/>
                                                </div>
                                            </>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </> : <>
                            <div className="senderBox">
                                <div
                                    key={index}
                                    className={`message ${item.sender_id === user.id ? "sent" : "received"}`}
                                >
                                    <div className="userImg">
                                        <img src={item?.sender_image || user2} alt="img"/>
                                    </div>
                                    <div className="messageBox">
                                        <div className="message-text ">{item?.body}</div>
                                        {item?.message_images && item?.message_images?.map((img, ind) => {
                                            return (<>
                                                <div className="message-user">
                                                    {typeof (img) === 'string' ? <img src={img}/> :
                                                        <img src={img?.message_image}/>}
                                                </div>
                                            </>)
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>} </>);
                    })}
                </div>
                <div className="sendBox">
                    <Form.Control
                        type="text"
                        placeholder="Write a message..."
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                    <div className={"iconBox"}>
                        <FiSmile/>
                        <span className={classes.uploadBtn} onChange={handleFileInput} onClick={handleImageUpload}>
              <CgAttachment/>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange}
                     style={{display: 'none'}}/>
            </span>
                        <IoIosSend color="#ffcd2f" onClick={sendMessage}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
