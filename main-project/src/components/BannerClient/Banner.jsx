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
            {/* <img  src={server_url+'images/'+ banner.image} alt="" className='w-full h-[80vh] object-cover relative' /> */}
            <img  src="https://free4kwallpapers.com/uploads/originals/2017/03/13/beach-resort-wallpaper.jpg"alt="" className='w-full h-[80vh] object-cover relative' />

            <div className=' h-full w-full md:w-full flex  justify-center items-center'>

            <h3 className='z-10  text-6xl text-white font-serif  ps-3 absolute top-96' > Live it. Now</h3>

            </div>
                
            </div>
        </div>
      )

}

export default Banner;
