import React, { useEffect, useState } from 'react'
import DestinationView from '../../components/User/DestinationView'
import Navbar from"../../components/navbar/navbar";
import { useParams } from 'react-router-dom';
import { UserApi } from '../../utils/user/axiosUser';

function DestinationResort() {
  const { id } = useParams();
  const[location,setLocation]=useState({})
  const server_url = process.env.REACT_APP_BASE_URL;

  useEffect(()=>{
    if(id){
        
    
    UserApi.get(`/destinationResort/${id}`).then((response)=>{
        if(response.data.status){
            console.log(response.data.resort);
           
            setLocation({...response.data.location})
        }
    
    })
}

},[id])
  return (
    <div className='w-full h-full'>
      <div
  className="w-full h-[100vh] bg-cover bg-center"
  style={{
    backgroundImage: `url(${server_url}images/${location?.image})`,
  }}
>
  <div className='h-[10vh]'>
  <Navbar/>
  </div>
     

      <div className=' h-full w-full md:w-full relative flex justify-center items-center'>
        {/*image as banner  */}
        {/* <img  src={server_url+'images/'+ location[0].image} alt="" className='w-full h-[80vh] object-cover relative' /> */}
                <h3 className=' z-10  text-6xl text-white font-bold' >{location.district}</h3>
            </div>
      </div>

      <div className=' mt-10 h-full w-full md:w-full relative flex flex-col justify-center items-center'>
        <h3 className=' z-10  text-4xl text-black font-serif'>Welcome to </h3>
        <h1 className=' z-10  text-5xl text-blue-800 font-serif'> {location.district}</h1>
      </div>

      <DestinationView/>
    </div>
  )
}

export default DestinationResort
