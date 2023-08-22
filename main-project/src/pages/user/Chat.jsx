import React, { useState, useEffect } from "react";
// import Chats from '../../components/User/Chat'
import "./Chat.css";
import Conversation from "../../components/Conversation/Conversation";
import { userChats } from "../../api/ChatRequests";
import { UilSetting } from "@iconscout/react-unicons";
import ChatBox from "../../components/ChatBox/ChatBox";
import { Link } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
function Chat() {
  const [chats, setChats] = useState([]);
  const[currentChat,setCurrentChat]=useState(null)
  const users = useSelector((store) => store.user);
  console.log(users);

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
  return (
    <div className="Chat w-[100vw] flex flex-col h-[100vh]">
      <div className="w-full h-[10vh]  flex justify-between  items-center">
        {" "}
        <div>Chat</div>
        <div className="">
          <UilSetting />
        </div>
      </div>
      <div className="w-full grid grid-cols-[2fr_8fr] gap-5 h-[90vh] ">
        <div className="Left-side-chat ml-5 h-[88%] shadow-lg ">
          <div className="Chat-container ">
            <h1 className="text-black">Chats</h1>
            <div className="Chat-list">
              {chats.map((chat) => (
                <div onClick={()=>setCurrentChat(chat)}>
                  <Conversation data={chat} currentUserId={users.id} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}

        <div className="Right-side-chat ">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <div className="navIcons">
              <Link to="../home">
                <img src="" alt="" />
              </Link>

              <img src="" alt="" />
              <Link to="../chat">{/* <img src={comment} alt="" /> */}</Link>
              <div></div>
            </div>

            <ChatBox chat={currentChat} currentUser={users.id}/>
          </div>
        </div>
       
      </div>
      {/* Left Side */}
    </div>
  );
}

export default Chat;
