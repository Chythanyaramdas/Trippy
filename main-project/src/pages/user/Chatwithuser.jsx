import React, { useState, useEffect } from "react";
// import Chats from '../../components/User/Chat'
import "./Chat.css";
import Conversation from "../../components/Conversation/Conversation";
import { userChats } from "../../api/ChatRequests";
import { UilSetting } from "@iconscout/react-unicons";
import ChatBox from "../../components/ChatBox/ChatBox";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useRef } from "react";

function Chat() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const users = useSelector((store) => store.user);
  const socket = useRef();

  useEffect(() => {
    if (users) {
      const getChats = async () => {
        console.log("come");
        try {
          const { data } = await userChats(users.id);
          setChats(data.chat);
          console.log("kjhgfds");
          console.log(data, "data");
        } catch (error) {
          console.log(error);
        }
      };
      getChats();
    }
  }, [users]);

  // useEffect(()=>{

  //   if(sendMessage!==null){
  //     socket.current.emit('send-message',sendMessage)
  //   }

  // },[sendMessage])

  useEffect(() => {
    socket.current = io("http://localhost:3001");
    socket.current.emit("new-user-add", users.id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      
      console.log(onlineUsers,"kkkii");
    });
    
  }, [users]);

  console.log(users);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("Data Received in parent Chat.jsx", data);
      setRecieveMessage(data);
    });
  }, []);

  return (
    <div className="Chat w-full flex flex-col m-0 p-0">
      <div className="w-full   flex justify-between  items-center"></div>
      <div className="w-full grid grid-cols-[2fr_8fr] gap-5 ">
        <div className="Left-side-chat ml-5  shadow-lg ">
          <div className="Chat-container overflow-y-scroll ">
            <h1 className="text-black"></h1>
            <div className="Chat-list">
              {chats.map((chat) => (
                <div onClick={() => setCurrentChat(chat)}>
                  <Conversation data={chat} currentUser={users.id} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat">
          {/* <div className='w-32 h-32 overflow-hidden rounded-full  '>
            
            <img src="https://img.freepik.com/premium-vector/businessman-profile-cartoon_18591-58479.jpg?w=2000" alt=""  className='w-full h-full '/>
    
            </div> */}

          <div className="">
            <div className="navIcons">
              <Link to="../home">
                <img src="" alt="" />
              </Link>

              <img src="" alt="" />
              <Link to="../chat">{/* <img src={comment} alt="" /> */}</Link>
              <div></div>
            </div>

            <ChatBox
              chat={currentChat}
              currentUser={users.id}
              setSendMessage={setSendMessage}
              recieveMessage={recieveMessage}
            />
          </div>
        </div>
      </div>
      {/* Left Side */}
    </div>
  );
}

export default Chat;
