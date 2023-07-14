import React from 'react'
import AdminLocation from '../../components/Adminforms/AdminLocation'
import Sidebar from '../../components/Sidebar/sidebar';
import Navbar from '../../components/navbar/navbar';

function AddLocation() {
  return (
    <div>

  <Navbar/>
  <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">

    <Sidebar/>
    
    <AdminLocation/>

     
      
    </div>
    </div>
  )
}

export default AddLocation;
