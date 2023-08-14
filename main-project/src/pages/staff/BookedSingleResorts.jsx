import React from 'react'
import BookedSingleResort from '../../components/Staff/BookedSingleResorts'
import Navbar from '../../components/navbar/StaffNavbar';
import Sidebar from"../../components/Sidebar/StaffSidebar";
function BookedSingleResorts() {
  return (
    <div>
        <Navbar/>
        <div className='grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full'>
        <Sidebar/>
        <BookedSingleResort/>
            </div> 
  
    </div>
  )
}

export default BookedSingleResorts
