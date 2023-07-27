import React from 'react';
import Navbar from '../../components/navbar/navbar';
import Sidebar from'../../components/Sidebar/sidebar';
import ResortApplications from '../../components/Adminforms/ResortApplication'

function ResortApplication() {
  return (

    <div>
    {/* <Navbar/>
    <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">
      <Sidebar/> */}
      <ResortApplications/>
    </div>
    // </div>
  )
}

export default ResortApplication
