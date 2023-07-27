import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from'../../components/Sidebar/sidebar';
import ResortApplications from '../../components/Adminforms/ResortApplication'

function ResortApplication() {
  return (

    <div>
    <Navbar/>
    <div className=" w-full">
      <Sidebar/> 
      <ResortApplications/>
    </div>
     </div>
  )
}

export default ResortApplication
