import React,{useState,useEffect} from 'react'
import { getUser } from '../../api/UserRequest'
import { getMessages } from '../../api/MessageRequests'
const  ChatBox=({chat,currentUser})=> {
    const[userData,setUserData]=useState(null)
    const[messages,setMessages]=useState([])
    useEffect(()=>{
       const userId=chat?.members?.find((id)=>id!==currentUser) 
       const getUserData = async() => {
        try {
        const { data} = await getUser(userId);
        console.log(data);
        setUserData (data.chat);
        console.log(data,"hhhh");
        } catch (error) {
        console.log(error);
        }
        };
       if(chat!==null)getUserData()
    },[chat,currentUser])

    useEffect(()=>{
        if(chat){

            const fetchMessages=async()=>{
                try {
    
                    const {data}=await getMessages(chat._id)
                    console.log(data);
                    setMessages(data)
                    
                } catch (error) {
                    console.log(error.message);
                    
                }
            }
            if(chat !==null) fetchMessages()
        }
       

        

    },[chat])
  return (
    <>
    <div className='ChatBox-container'>
    <>
    <div className='chat-header'>
    <div className='follower'>
    <div className='w-32 h-32 overflow-hidden rounded-full  '>
            
            <img src="https://img.freepik.com/premium-vector/businessman-profile-cartoon_18591-58479.jpg?w=2000" alt=""  className='w-full h-full '/>
    
            </div>
    </div>
    </div>
    </>
    </div>
    <hr style={{width: '85%', border: '0.1px solid #ececec|' }}/>

    {/* messages */}

    <div className='chat-body'>
    {messages.map((message)=>{
        return(
        <>
        <div className= {`
            ${message.senderId ===currentUser?"message own":"message"} flex flex-col w-auto h-auto p-4 rounded-lg mr-3 bg-cyan-300
        `}
        >
            <span className='text-2xl text-white'>{message.text}</span>
            <span className='text-sm text-white'>{message.createdAt}</span>
        </div>
        </>
        )
    })}
    
    </div>

    </>
  )
}

export default ChatBox