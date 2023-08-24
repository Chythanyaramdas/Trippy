import React,{useState,useEffect} from 'react'
import { getUser } from '../../api/UserRequest'
const Conversation=({data,currentUserId}) =>{
   
    const[userData,setUserData]=useState(null)

    useEffect(()=>{
        const userId=data.members.find((id)=> id!==currentUserId)
        const getUserData=async()=>{
            try{

                const {data}=await getUser(userId)
                setUserData(data)
                console.log(data);
            }
            catch(error){
                console.log(error.message);
            }
       
        }
        getUserData()
    },[])
  return (
   <div className='follower conversation'>
    <div className=' w-full flex items-center gap-2 '>

        <div className='w-32 h-32 overflow-hidden rounded-full'>
            
        <img src="https://img.freepik.com/premium-vector/businessman-profile-cartoon_18591-58479.jpg?w=2000" alt=""  className='w-full h-full'/>

        </div>
        <div className='online-dot'>

        </div>

        <div className="name" style={{fontSize: "0.8rem"}}>

<span>Admin</span>
</div> 
    
    </div>
    <hr style={{width: '85%', border: '0.1px solid #ececec|' }}/>
    </div>
  )
}

export default Conversation
