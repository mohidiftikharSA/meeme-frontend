import React, { useEffect, useRef, useState } from "react";
import MessagesAPIs from "../../APIs/messages";
import { useSelector } from "react-redux";
import {
  ActionCableConsumer,
  ActionCableProvider,
} from "react-actioncable-provider";
import ChatDropdown from "./ChatDropdown";
import ChatWindow from "./ChatWindow";
import { MoonLoader } from "react-spinners";

const ChatPopup = ({ isOpen, onClose, profile, data }) => {
  const [inputText, setInputText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 992);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [inboxList, setInboxList] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [msgsList, setMsgsList] = useState([]);
  const { user, accessToken } = useSelector((state) => state.auth);
  const [imgForAPI, setImgForAPI] = useState(null);
  const fileInputRef = useRef(null);
  const [msgSent, setMsgSent] = useState();
  const [subscriptionEstablished, setSubscriptionEstablished] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [closePreview, setClosePreview] = useState();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsChatVisible(isOpen);

    if (data && profile) {
      const obj = {
        sender_id: data?.user?.id,
        conversation_id: null,
        receiver_image: data?.user_image,
        sender_name: data?.user?.username,
      };
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
  }, []);

  useEffect(() => {
    getInboxList();
  }, [msgSent]);

  useEffect(() => {
    if (selectedChat && !subscriptionEstablished) {
      if (user.id === selectedChat.sender_id) {
        getChatMessages(selectedChat.receiver_id);
      } else {
        getChatMessages(selectedChat.sender_id);
      }
    }
  }, [selectedChat, subscriptionEstablished]);

  const getChatMessages = async (receiverId) => {
    if (receiverId) {
      const msgs = await MessagesAPIs.getChatMessages(receiverId);
      if (msgs) {
        setMsgsList(msgs.data.messages.reverse());
        setSubscriptionEstablished(true);
      }
    }
  };

  const getInboxList = async () => {
    const res = await MessagesAPIs.getInboxList();
    if (res) {
      setInboxList(res.data.messages);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    console.log("EMoji in useEffect =", emoji);
    setInputText((prevText) => prevText + emoji);
  }, [emoji])

  const sendMessage = async () => {
    setIsLoading(true);
    console.log("Send Message ");
    if (!selectedChat.conversation_id) {
      var res = await MessagesAPIs.createConversation({
        receiver_id: selectedChat?.sender_id,
      });
      if (res) {
        const resObj = { ...selectedChat };
        resObj["conversation_id"] = res.data?.conversation?.id;
        console.log("New Response obj of Conversation == ", resObj);
        setSelectedChat(resObj);
      }
    }
    if (inputText.trim() === "" && !imgForAPI) {
      console.log("Emptyy message ", imgForAPI)
      setIsLoading(false);
      return
    }
    const data = new FormData();
    data.append(
      "conversation_id",
      selectedChat.conversation_id || res.data?.conversation?.id
    );
    setIsLoading(false);
    data.append(
      "receiver_id",
      selectedChat.sender_id === user.id
        ? selectedChat.receiver_id
        : selectedChat.sender_id
    );
    data.append("body", inputText);
    console.log("Set close the prreview w===", inputText)

    if (imgForAPI) {
      data.append("message_images[]", imgForAPI);
    }
    const sendMsg = await MessagesAPIs.sendMessage(data);
    if (sendMsg) {
      setMsgSent(sendMsg.data);
    }
    const newMessage = {
      text: inputText,
      user: user,
    };
    setImgForAPI(null);
    setClosePreview(Math.floor(Math.random() * 10))
    setInputText("");
  };

  const handleClick = async (chat) => {
    setIsChatVisible(true);
    setSelectedChat(chat);
    if (user.id === chat.sender_id) {
      getChatMessages(chat.receiver_id);
    } else {
      getChatMessages(chat.sender_id);
    }
  };

  const chatToggle = () => {
    setIsChatVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleReceivedMessage = (response) => {
    /**
     * Sometime message replicates that's why there's check implemented
     * if message already exists in the Messages array then don't add in list
     */
    let isExist = msgsList?.some((obj) => obj?.id === response?.body?.id);
    console.log("Message Exist == ", isExist);
    if (!isExist) {
      setMsgsList((prevState) => [...prevState, response.body]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgForAPI(e.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected File ==", file);
      setImgForAPI(e.target.files[0]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  function countOnlineUsers() {
    const trueCount = inboxList.reduce((count, item) => {
      if (
        item.receiver_active_status === true &&
        item?.receiver_id !== user?.id
      ) {
        return count + 1;
      } else if (
        item.sender_active_status === true &&
        item?.sender_id !== user?.id
      ) {
        return count + 1;
      }
      return count;
    }, 0);

    return trueCount;
  }



  return (
    <>
      <ActionCableProvider
        url={`${process.env.REACT_APP_WS_URL}/cable?token=${accessToken}`}
      >
        <ChatDropdown
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          countOnlineUsers={countOnlineUsers}
          isWideScreen={isWideScreen}
          isOpen={isOpen}
          inboxList={inboxList}
          handleClick={handleClick}
          user={user}
        />
        {isChatVisible && (
          <ChatWindow
            isLoading={isLoading}
            isChatVisible={isChatVisible}
            chatToggle={chatToggle}
            selectedChat={selectedChat}
            msgsList={msgsList}
            inputText={inputText}
            handleInputChange={handleInputChange}
            handleKeyPress={handleKeyPress}
            sendMessage={sendMessage}
            handleImageUpload={handleImageUpload}
            user={user}
            handleFileInput={handleFileInput}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            setEmoji={setEmoji}
            closePreview={closePreview}
          />
        )}
        {/* ActionCable component from react-actioncable-provider */}
        {selectedChat && (
          <ActionCableConsumer
            channel={{
              channel: "ConversationsChannel",
              conversation_id: selectedChat?.conversation_id,
            }}
            onReceived={(res) => handleReceivedMessage(res)}
          />
        )}
      </ActionCableProvider>
    </>
  );
};

export default ChatPopup;
