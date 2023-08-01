import React from'react';
import BannerCreation from'../../components/Banner/BannerCreation';
import Navbar from '../../components/navbar/navbar';
import AdminSidebar from '../../components/Sidebar/AdminSidebar';


function BannerUpload(){
    return(
        <div>

        <Navbar/>
        <div className='grid grid-cols-[1fr_7fr]'>

      <AdminSidebar/>
              
            <BannerCreation/>

        </div>
         </div>
    )
}

export default BannerUpload;