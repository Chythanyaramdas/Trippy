import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import{MdOutlineDangerous} from "react-icons/md";

function Dashboard() {
    const navigate = useNavigate()
    const {notification}=useSelector((store)=>store.staff)
  return (

    <div className='w-full h-full flex  flex-col font-serif' >
     <div className='w-full flex justify-center'>
     
     {notification.map((data)=>(
      <div className='flex justify-center w-full'>
     {/* <img src="https://rukminim1.flixcart.com/image/850/1000/kcnp8y80/emergency-sign/v/z/m/danger-logo-imbue-original-imaftqg6ta7stfwf.jpeg?q=20" alt="" className='h-10 w-14 mt-2' /> */}
     
     <MdOutlineDangerous className="mr-1 w-14 h-10 mt-3 "/>
      <p className='text-lg mt-5' >{data.message}</p>
      </div>
       
      ))}
     </div>
      <div  className='w-full h-full  flex justify-center items-center flex-col  font-serif mt-0'>
        <p className='text-sky-700'> Please click here for registeration </p>
      <p className='text-sky-700 underline cursor-pointer' onClick={()=> navigate('/staff/resortRegister')} >Click here </p>
      
      </div>
      

    </div>
  )
}

export default Dashboard;
