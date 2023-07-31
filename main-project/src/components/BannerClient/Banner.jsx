import React, { useEffect,useState } from'react';
import api from "../../helper/axios/userAxios";

function Banner(){
    const [banner,setBanner]=useState({})

    const server_url=process.env.REACT_APP_BASE_URL;

    useEffect(()=>{
        api.get('/').then((response)=>{

            if(response.data.status){

                setBanner({...response.data.banners[0]})

                console.log("bannerss");
            }
        })
    },[])

    return (
        <div className="mt-0 flex justify-center w-full  ">
                
            
            <div   className=' md:h-auto w-full md:w-full relative h-[70vh]'>
            <img  src={server_url+'images/'+ banner.image} alt="" className='w-full h-[80vh] object-cover relative' />
                <h3 className='absolute top-1/2 left-1/2 z-10  text-6xl text-white' ></h3>
            </div>
        </div>
      )

}

export default Banner;
