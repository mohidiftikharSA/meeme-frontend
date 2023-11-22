import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { LiaTimesSolid } from "react-icons/lia";
import user1 from "../../Images/chatuser.png";
import user2 from "../../Images/profile1.png";
import avatar from '../../Images/avatar.jpg'
import { FiSmile } from "react-icons/fi";
import { CgAttachment } from "react-icons/cg";
import { BsFillChatDotsFill } from "react-icons/bs";
import classes from "./index.module.scss";
import Search from "Components/Search";
import MessagesAPIs from '../../APIs/messages';
import { timeAgo } from "Helper/Converters";
import { useSelector } from "react-redux";
// import { useChannel } from "Hooks/useChannel";
import { useActionCableHook } from "Hooks/useActionCable";
import { useActionCable, useChannel } from '@aersoftware/react-use-action-cable';




const ChatPopup = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 992);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [inboxList, setInboxList] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [msgsList, setMsgsList] = useState();
  const { user, profile, accessToken } = useSelector((state) => state.auth);

  const { actionCable } = useActionCable(`wss://v2.meeme.appscorridor.com/cable?token=${accessToken}`);
  const { subscribe, unsubscribe, send } = useChannel(actionCable)


  useEffect(() => {
    setIsDropdownOpen(isOpen);
  }, [isOpen]);

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

    if (selectedChat) {
      console.log("Selected Chat === ", selectedChat);
      if (user.id === selectedChat.sender_id) {
        getChatMessages(selectedChat.receiver_id)
      } else {
        getChatMessages(selectedChat.sender_id)
      }
    }

  }, [selectedChat]);

  const getChatMessages = async (receiverId) => {
    const msgs = await MessagesAPIs.getChatMessages(receiverId);
    if (msgs) {
      setMsgsList(msgs.data.messages.reverse());
    }
  }

  const getInboxList = async () => {
    const res = await MessagesAPIs.getInboxList();
    if (res) {
      console.log("Success of Inbox List =", res.data.messages);
      setInboxList(res.data.messages);
    }

  }

  const dummyMessage = [
    { text: "Hi Astro", user: "Randy" },
    { text: "Can you send me a meme" },
  ];

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendMessage = async () => {
    if (inputText.trim() === "") return;
    console.log("Input Text === ", inputText);
    const data = new FormData();
    data.append('conversation_id', selectedChat.conversation_id);
    data.append('receiver_id', selectedChat.sender_id === user.id ? selectedChat.receiver_id : selectedChat.sender_id);
    data.append('body', inputText);
    const sendMsg = await MessagesAPIs.sendMessage(data);
    if (sendMsg) {
      console.log("Message sent Successfully === ");
    }
    const newMessage = {
      text: inputText,
      user: user,
    };

    setInputText("");
  };

  const handleInputKeyPress = (e) => {
    e.preventDefualt();
    console.log("Send Message Enter ===");
    if (e.key === "Enter") {
      sendMessage();
    }
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

  const inboxData = [
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: true,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: true,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: true,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
    {
      userImg: user1,
      name: "Fahad",
      message: "Hello How Are you...",
      time: "a day ago",
      status: false,
    },
  ];

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

            // setMsgsList([...msgsList, msg?.body])
            // handleMessageObj(msg);
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



  return (
    <>
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
          {isWideScreen ? (
            <>
              <span className="status d-inline-block me-2"></span> Chat (4 Active)
            </>
          ) : (
            <BsFillChatDotsFill size={"18px"} />
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu onClick={(e) => e.stopPropagation()}>
          {isDropdownOpen && (
            <div className={classes.inbox}>
              <Search text={"Search"} />
              <ul>
                {inboxList.map((item, ind) => {
                  return (
                    <li key={ind} onClick={() => { handleLiClick(item) }}>
                      <div className={classes.messageBox}>
                        <div className={classes.imgBox}>
                          {item?.receiver_image || item?.sender_image ? <img src={item?.sender_id === user.id ? item?.receiver_image : item?.sender_image} alt="img" /> :
                            <img src={avatar} alt="img" />
                          }
                          {item?.sender_id === user.id ? item?.receiver_active_status : item?.sender_active_status && (
                            <span className="status"></span>
                          )}
                        </div>

                        <div className={classes.textBox}>
                          <div className="d-flex align-items-start justify-content-between">
                            <h6>{item?.sender_id === user.id ? item?.receiver_name : item?.sender_name}</h6>

                          </div>

                          <p>{item?.body}</p>
                          <span className="d-block text-end" style={{ fontSize: "8px" }}>{timeAgo(item?.created_at)}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>
      {isChatVisible && (
        <div className="chat">
          <div className="chat-window">
            <div className="header">
              <span className="status d-inline-block mx-2"></span>{selectedChat?.sender_id === user.id ? selectedChat?.receiver_name : selectedChat?.sender_name}
              <span
                className="cancel-icon"
                onClick={chatToggle}
                style={{ cursor: "pointer" }}
              >
                <LiaTimesSolid />
              </span>
            </div>
            <div className="messages">

              {msgsList && msgsList.map((item, index) => {
                return (
                  <>  {item?.sender_id !== user.id ?
                    <>
                      <div className="receiverBox">
                        <div className="userImg">
                          <img src={item?.sender_image || user1} alt="img" />
                        </div>
                        <div key={index} className="message received">
                          <div className="messageBox">
                            <div className="message-user">{item.body}</div>
                            {item?.message_images &&
                              item?.message_images?.map((img, ind) => {
                                return (
                                  <>
                                    <div className="message-user">
                                      <img src={img?.message_image} />
                                    </div>
                                  </>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                    </>
                    :
                    <>
                      <div className="senderBox">
                        <div
                          key={index}
                          className={`message ${item.sender_id === user.id ? "sent" : "received"}`}
                        >
                          <div className="userImg">
                            <img src={item?.sender_image || user2} alt="img" />
                          </div>
                          <div className="messageBox">
                            <div className="message-text ">{item?.body}</div>
                            {item?.message_images &&
                              item?.message_images?.map((img, ind) => {
                                return (
                                  <>
                                    <div className="message-user">
                                      <img src={img?.message_image} />
                                    </div>
                                  </>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                    </>
                  } </>
                );
              })}

            </div>
            <div className="sendBox">
              <Form.Control
                type="text"
                placeholder="Write a message..."
                value={inputText}
                onChange={handleInputChange}
              />
              <button onClick={sendMessage}>Send</button>
              <div className={"iconBox"}>
                <FiSmile />
                <CgAttachment />
                <input type="file" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPopup;
