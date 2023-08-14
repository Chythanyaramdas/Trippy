import React from 'react'
import BookedResort from '../../components/Staff/BookedResorts'
import Navbar from '../../components/navbar/StaffNavbar';
import Sidebar from"../../components/Sidebar/StaffSidebar";
function BookedResorts() {
  return (
    <div>
      <Navbar/>
      <div className='grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full'>
      <Sidebar/>
      <BookedResort/>
      </div>
      
    </div>
  )
}

export default BookedResorts


