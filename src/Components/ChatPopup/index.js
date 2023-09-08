import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { LiaTimesSolid } from "react-icons/lia";
import user1 from "../../Images/chatuser.png";
import user2 from "../../Images/profile1.png";

const ChatPopup = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentUser, setCurrentUser] = useState("User1"); // Change user names as needed

  // Dummy message from other user
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

  return (
    <Dropdown className="chatDropDown">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <span className="status d-inline-block me-2"></span> Chat (4 Active)
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <div className="chat">
          <div className="chat-window">
            <div className="header">
              <span className="status d-inline-block mx-2"></span>Randy Mark
              <span className="cancel-icon">
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
                    <>
                      <div className="message received">
                        <div className="messageBox">
                          <div className="message-user">{item.user}</div>
                          <div className="message-text">{item.text}</div>
                        </div>
                      </div>
                    </>
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
              {/* Display the dummy message */}
            </div>
            <div className="sendBox">
              <Form.Control
                type="text"
                placeholder="Write a comment…"
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
              />
            </div>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChatPopup;
