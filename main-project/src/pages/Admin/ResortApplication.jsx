import React from 'react';
// import Navbar from '../../components/navbar/navbar';

import AdminSidebar from'../../components/Sidebar/AdminSidebar'
import ResortApplications from '../../components/Adminforms/ResortApplication'

function ResortApplication() {
  return (

    <div className='w-full h-full bg-green-500'>
    <AdminNavbar/>
    <div className=" w-full h-[93.1vh] bg-red-500">
     <AdminSidebar/>
      <ResortApplications/>
    </div>
     </div>
  )
}

export default ResortApplication
