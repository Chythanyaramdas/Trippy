import React from 'react'
import ServicesCreation from '../../components/Adminforms/ServicesCreation'
import AdminNavbar from"../../components/navbar/AdminNavbar";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
function ServiceCreation() {
  return (
    <div>
      <AdminNavbar/>
      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">
      < AdminSidebar/>
      <ServicesCreation/>
      </div>
     
    </div>
  )
}

export default ServiceCreation
