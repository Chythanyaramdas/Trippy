import React from 'react';
import ResortList from"../../components/Adminforms/ResortManagement";
import AdminNavbar from"../../components/navbar/AdminNavbar";
import AdminSidebar from'../../components/Sidebar/AdminSidebar'

function ResortManagement() {
  return (
    <div>
      <AdminNavbar/>
      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full ">
      <AdminSidebar/>
      <ResortList/>
      </div>
        
      
    </div>
  )
}

export default ResortManagement
