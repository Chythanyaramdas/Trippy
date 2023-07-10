import React from'react';
import BannerCreation from'../../components/Banner/BannerCreation';
import Navbar from '../../components/navbar/navbar';


function BannerUpload(){
    return(
        <div>

        <Navbar/>
        <div className='flex w-full justify-center items-center bg-slate-400 h-screen'>
              
            <BannerCreation/>

        </div>
        </div>
    )
}

export default BannerUpload;