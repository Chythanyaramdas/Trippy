import React from 'react'
import Service from '../../components/Adminforms/Services'
import AdminNavbar from"../../components/navbar/AdminNavbar";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
function Services() {
  return (
    <div>
        <AdminNavbar/>
        <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full" >
        < AdminSidebar/>
        <Service/>
        </div>
     
    </div>
  )
}

export default Services
