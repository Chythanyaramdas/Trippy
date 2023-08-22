import React ,{useState,useEffect} from 'react'
// import Chats from '../../components/User/Chat'
import './Chat.css';
import {userChats} from '../../api/ChatRequests';
import { UseSelector, useSelector } from 'react-redux';
function Chat() {
const[chats,setChats]=useState([])
  const users = useSelector((store) => store.user);
  console.log(users);

  useEffect(() => {
    if(users){

      const getChats = async () => {
        console.log("come");
        try {
          const {data} = await userChats(users.id);
          // setChats(data);
          console.log('kjhgfds');
          console.log(data.chat,"data");
        } catch (error) {
          console.log(error);
        }
      };
      getChats();

    }
    
  }, [users]);
  return (
    
    <div className="Chat flex items-center h-[100vh]">
    {/* Left Side */}
    <div className="Left-side-chat ml-5 shadow-lg bg-slate-100">
   
      <div className="Chat-container ">
        <h1 className='text-black'>Chats</h1>
        {/* <div className="Chat-list">
          {chats.map((chat) => (
            <div
              onClick={() => {
                setCurrentChat(chat);
              }}
            >
              <Conversation
                // data={chat}
                // currentUser={user._id}
                // online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div> */}
      </div>
    </div>

    {/* Right Side */}

    <div className="Right-side-chat">
      <div style={{ width: "20rem", alignSelf: "flex-end" }}>
        {/* <NavIcons /> */}
      </div>
      {/* <ChatBox
        chat={currentChat}
        currentUser={user._id}
        setSendMessage={setSendMessage}
        receivedMessage={receivedMessage}
      /> */}
    </div>
  </div>
  );
};

export default Chat
