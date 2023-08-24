import React, { useState, useEffect } from "react";
import {getStaff} from "../../api/StaffRequest";
import "./ChatBox.css";
import { getMessages } from "../../api/StaffMessageRequest";
import { addMessage } from "../../api/StaffMessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser, setSendMessage, recieveMessage }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  useEffect(() => {
    const staffId= chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getStaff(staffId);
        console.log(data);
        setUserData(data.chat);
        console.log(data, "hhhh");
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    if (chat) {
      const fetchMessages = async () => {
        try {
          const { data } = await getMessages(chat._id);
          console.log("jjj");
          console.log(data);
          setMessages(data);
        } catch (error) {
          console.log(error.message);
        }
      };
      if (chat !== null) fetchMessages();
    }
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.log(error.message);
    }
    //   const receiverId=chat.members.find((id)=>id!==currentUser)
    //   setSendMessage({...message, receiverId})
  };

  useEffect(() => {
    console.log("Message Arrived: ", recieveMessage);
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage]);
    }
  }, [recieveMessage]);

  return (
    <>
      <div className="ChatBox-container h-screen">
        {chat ? (
          <div className="chat-header">
            <div className="follower">{/* Your header content */}</div>
          </div>
        ) : (
          <span className="chatbox-empty-message">Tap on conversation...</span>
        )}

        {/* Messages */}
        <div className="chat-body bg-slate-100 overflow-y-scroll">
          {messages?.map((message) => (
            <div
              className={`
                    ${
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    } 
                    flex flex-col w-auto h-auto p-4 rounded-lg mr-3
                  `}
              key={message.id} // Add a unique key if messages have unique IDs
            >
              <span className="text-2xl text-white">{message.text}</span>
              <span className="text-sm text-white">
                {format(message.createdAt)}
              </span>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="chat-sender">
          {chat && (
            <>
              {" "}
              <div className="w-[80%]">
                <InputEmoji value={newMessage} onChange={handleChange} />
              </div>
              <div
                className="send-button button bg-blue-800 rounded-lg w-20"
                onClick={handleSend}
              >
                Send
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
