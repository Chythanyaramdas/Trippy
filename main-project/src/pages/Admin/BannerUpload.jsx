import React from'react';
import BannerCreation from'../../components/Banner/BannerCreation';

import AdminNavbar from"../../components/navbar/AdminNavbar"
import AdminSidebar from '../../components/Sidebar/AdminSidebar';


function BannerUpload(){
    return(
        <div>

        <AdminNavbar/>

        <div className='grid grid-cols-[1fr_7fr]'>

      <AdminSidebar/>
              
            <BannerCreation/>

        </div>
         </div>
    )
}

export default BannerUpload;