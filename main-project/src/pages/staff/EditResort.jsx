import React from 'react'
import ResortUpdate from"../../components/Staff/EditResort";
import Navbar from '../../components/navbar/StaffNavbar';
import Sidebar from"../../components/Sidebar/StaffSidebar";

function EditResort() {
  return (
    <div>
      <Navbar/>
      <div className='grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full'>
      <Sidebar/>
      <ResortUpdate/>
      </div>
     
    </div>
  )
}

export default EditResort
