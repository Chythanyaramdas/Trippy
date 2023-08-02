import React from 'react'
import AdminLocation from '../../components/Adminforms/AdminLocation'
// import Sidebar from '../../components/Sidebar/AdminSidebar';
import AdminSidebar from"../../components/Sidebar/AdminSidebar";
// import Navbar from '../../components/navbar/navbar';
import AdminNavbar from"../../components/navbar/AdminNavbar"

function AddLocation() {
  return (
    <div>

 <AdminNavbar/>
  <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">

    {/* <Sidebar/> */}

    <AdminSidebar/>
    
    <AdminLocation/>

     
      
    </div>
    </div>
  )
}

export default AddLocation;
