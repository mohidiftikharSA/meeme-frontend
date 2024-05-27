import React, {useEffect, useRef, useState} from "react";
import {Dropdown, Form} from "react-bootstrap";
import {LiaTimesSolid} from "react-icons/lia";
import {IoIosSend} from "react-icons/io";

import user1 from "../../Images/chatuser.png";
import user2 from "../../Images/profile1.png";
import avatar from '../../Images/avatar.png'
import {FiSmile} from "react-icons/fi";
import {CgAttachment} from "react-icons/cg";
import {BsFillChatDotsFill} from "react-icons/bs";
import classes from "./index.module.scss";
import Search from "Components/Search";
import MessagesAPIs from '../../APIs/messages';
import {timeAgo} from "Helper/Converters";
import {useSelector} from "react-redux";
// import { useChannel } from "Hooks/useChannel";
import {useActionCableHook} from "Hooks/useActionCable";
import {useActionCable, useChannel} from '@aersoftware/react-use-action-cable';


const ChatPopup = ({isOpen, onClose, profile, data}) => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 992);
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [inboxList, setInboxList] = useState([]);
    const [selectedChat, setSelectedChat] = useState();
    const [msgsList, setMsgsList] = useState([]);
    const {user, accessToken} = useSelector((state) => state.auth);
    const [imgForAPI, setImgForAPI] = useState(null);
    const fileInputRef = useRef(null);
    const [msgSent, setMsgSent] = useState();


    const {actionCable} = useActionCable(`wss://v2.meeme.appscorridor.com/cable?token=${accessToken}`);
    const {subscribe, unsubscribe, send} = useChannel(actionCable)


    useEffect(() => {
        setIsChatVisible(isOpen);

        /**
         *   To Do
         */

        // const chat = inboxList.filter(item => item.sender_id === profile?.user?.id || item.receiver_id === profile?.user?.id);
        // console.log("My chat filter  === ", chat);
        // if (chat[0] && chat) {
        //   setSelectedChat(chat);
        // }
        if (data && profile) {
            const obj = {
                sender_id: data?.user?.id,
                conversation_id: null,
                receiver_image: data?.user_image,
                sender_name: data?.user?.username
            }
            setSelectedChat(obj);
        }

    }, [isOpen, profile, data]);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth >= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        getInboxList();
    }, [])

    useEffect(() => {
        getInboxList();
    }, [msgSent])


    useEffect(() => {

        if (selectedChat) {
            if (user.id === selectedChat.sender_id) {
                getChatMessages(selectedChat.receiver_id)
            } else {
                getChatMessages(selectedChat.sender_id)
            }
        }

    }, [selectedChat]);

    const getChatMessages = async (receiverId) => {
        if (receiverId) {
            const msgs = await MessagesAPIs.getChatMessages(receiverId);
            if (msgs) {
                setMsgsList(msgs.data.messages.reverse());
            }
        }
    }

    const getInboxList = async () => {
        const res = await MessagesAPIs.getInboxList();
        if (res) {
            setInboxList(res.data.messages);
        }

    }

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const sendMessage = async () => {
        if (!selectedChat.conversation_id) {
            var res = await MessagesAPIs.createConversation({receiver_id: selectedChat?.sender_id})
            if (res) {
                const resObj = {...selectedChat};
                resObj['conversation_id'] = res.data?.conversation?.id
                console.log("New Response obj of Conversation == ", resObj);
                setSelectedChat(resObj);
            }
        }
        if (inputText.trim() === "") return;
        const data = new FormData();
        data.append('conversation_id', selectedChat.conversation_id || res.data?.conversation?.id);
        data.append('receiver_id', selectedChat.sender_id === user.id ? selectedChat.receiver_id : selectedChat.sender_id);
        data.append('body', inputText);
        if (imgForAPI) {
            data.append("message_images[]", imgForAPI);
        }
        const sendMsg = await MessagesAPIs.sendMessage(data);
        if (sendMsg) {
            setMsgSent(sendMsg.data);
        }
        const newMessage = {
            text: inputText, user: user,
        };
        setImgForAPI(null);
        setInputText("");
    };


    const handleLiClick = (chat) => {
        setIsChatVisible(true);
        setSelectedChat(chat);
    };
    const chatToggle = () => {
        setIsChatVisible(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    /**
     * Chat Socket Implementation.
     */

    useEffect(() => {
        if (selectedChat) {
            try {
                subscribe({
                    channel: `ConversationsChannel`,
                    channel_key: `conversation_${selectedChat.conversation_id}`,
                    conversation_id: selectedChat.conversation_id,
                }, {
                    received: (msg) => {
                        console.log("Recived Messages from Socket - ", msg.body);
                        console.log("Msgs List === ", msgsList);
                        setMsgsList((prevState) => ([...prevState, msg.body]));

                    }, connected: () => {
                        console.log('Socket Connected Successfully');
                    },
                },);
            } catch (err) {
                console.log('err', err);
            }

            return () => {
                unsubscribe();
            };
        }
    }, [selectedChat]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgForAPI(e.target.files[0])
        }
    };

    const handleImageUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("Selected File ==", file);
            setImgForAPI(e.target.files[0])
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };
    function countOnlineUsers() {
        const trueCount = inboxList.reduce((count, item) => {
            if (item.receiver_active_status === true) {
                return count + 1;
            }
            return count;
        }, 0);

        return trueCount;
    }

    return (<>
        <Dropdown
            className={`chatDropDown ${isDropdownOpen ? "show" : ""}`}
            show={isDropdownOpen}
            onToggle={onClose}
        >
            <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                onClick={toggleDropdown}
            >
                {isWideScreen ? (<>
                    <span className="status d-inline-block me-2"></span> Chat ({countOnlineUsers()} Active)
                </>) : (<BsFillChatDotsFill size={"18px"}/>)}
            </Dropdown.Toggle>
            <Dropdown.Menu onClick={(e) => e.stopPropagation()}>
                {isDropdownOpen && (<div className={classes.inbox}>
                    {/* <Search text={"Search"} /> */}
                    <p className="inboxText">Inbox</p>
                    <ul>
                        {inboxList.map((item, ind) => {
                            return (<li key={`${ind}_${item.id}`} onClick={() => {
                                handleLiClick(item)
                            }}>
                                <div className={classes.messageBox}>
                                    <div className={classes.imgBox}>
                                        {item?.receiver_image || item?.sender_image ? <img
                                            src={(item?.sender_id === user.id ? item?.receiver_image : item?.sender_image) || avatar}
                                            alt={"img 11"}/> : <img src={avatar} alt="img"/>}
                                        {item?.sender_id === user.id ? item?.receiver_active_status : item?.sender_active_status && (
                                            <span className="status"></span>)}
                                    </div>

                                    <div className={classes.textBox}>
                                        <div className="d-flex align-items-start justify-content-between">
                                            <h6>{item?.sender_id === user.id ? item?.receiver_name : item?.sender_name}</h6>

                                        </div>

                                        <p className="text-truncate"
                                           style={{maxWidth: "120px"}}>{item?.body}</p>
                                        <span className="d-block text-end"
                                              style={{fontSize: "8px"}}>{timeAgo(item?.created_at)}</span>
                                    </div>
                                </div>
                            </li>);
                        })}
                    </ul>
                </div>)}
            </Dropdown.Menu>
        </Dropdown>
        {isChatVisible && (<div className="chat">
            <div className="chat-window">
                <div className="header">
                    {selectedChat?.receiver_active_status &&
                        <span className="status d-inline-block mx-2"></span>}

                    {selectedChat?.sender_id === user.id ? selectedChat?.receiver_name : selectedChat?.sender_name}
                    <span
                        className="cancel-icon"
                        onClick={chatToggle}
                        style={{cursor: "pointer"}}
                    >
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
                                                    {/* {typeof (img) === 'string' ? <img src={img}/> :
                                                         <img src={img || img?.message_image}/>} */}
                                                         <img src={img || img?.message_image}/>

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
                        <span className={classes.uploadBtn} onChange={handleFileInput}
                              onClick={handleImageUpload}>
                  <CgAttachment/>
                  <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{display: 'none'}}
                  />
                </span>

                        <IoIosSend color="#ffcd2f" onClick={sendMessage}/>

                    </div>
                </div>
            </div>
        </div>)}
    </>);
};

export default ChatPopup;
