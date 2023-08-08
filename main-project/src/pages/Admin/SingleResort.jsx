import React from 'react';
import AdminSidebar from'../../components/Sidebar/AdminSidebar';
import Navbar from '../../components/navbar/navbar';
import SingleResort from"../../components/Adminforms/SingleResort";


function SingleResort() {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">
      < AdminSidebar/>
      <SingleResort/>
    </div>
    </div>
  )
}

export default SingleResort
