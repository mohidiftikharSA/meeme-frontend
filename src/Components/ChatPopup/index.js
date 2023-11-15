
import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { LiaTimesSolid } from "react-icons/lia";
import user1 from "../../Images/chatuser.png";
import user2 from "../../Images/profile1.png";
import { FiSmile } from 'react-icons/fi';
import { CgAttachment } from 'react-icons/cg';
import { BsFillChatDotsFill } from 'react-icons/bs';

const ChatPopup = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentUser, setCurrentUser] = useState("User1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dummyMessage = [
    { text: "Hi Astro", user: "Randy" },
    { text: "Can you send me a meme" },
  ];

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      text: inputText,
      user: currentUser,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Dropdown className={`chatDropDown ${isOpen ? 'show' : ''}`} show={isOpen} onToggle={onClose}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {isWideScreen ? <><span className="status d-inline-block me-2"></span> Chat (4 Active)</> : <BsFillChatDotsFill size={'18px'} />}
      </Dropdown.Toggle>
      <Dropdown.Menu onClick={(e) => e.stopPropagation()}>
        {isOpen && (
          <div className="chat">
            <div className="chat-window">
              <div className="header">
                <span className="status d-inline-block mx-2"></span>Randy Mark
                <span className="cancel-icon" onClick={onClose} style={{ cursor: "pointer" }}>
                  <LiaTimesSolid />
                </span>
              </div>
              <div className="messages">
                <div className="reciverBox">
                  <div className="userImg">
                    <img src={user1} alt="img" />
                  </div>
                  {dummyMessage.map((item, ind) => {
                    return (
                      <div key={ind} className="message received">
                        <div className="messageBox">
                          <div className="message-user">{item.user}</div>
                          <div className="message-text">{item.text}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="senderBox">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${
                        message.user === currentUser ? "sent" : "received"
                      }`}
                    >
                      <div className="userImg">
                        {message.user === currentUser && (
                          <img src={user2} alt="img" />
                        )}
                      </div>
                      <div className="messageBox">
                        <div className="message-text ">{message.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sendBox">
                <Form.Control
                  type="text"
                  placeholder="Write a comment…"
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyPress={handleInputKeyPress}
                />
                <div className={'iconBox'}>
                  <FiSmile />
                  <CgAttachment />
                </div>
              </div>
            </div>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChatPopup;

