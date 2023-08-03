import React from 'react';
import ResortList from"../../components/Adminforms/ResortManagement";
import AdminNavbar from"../../components/navbar/AdminNavbar"

function ResortManagement() {
  return (
    <div>
      <AdminNavbar/>
        <ResortList/>
      
    </div>
  )
}

export default ResortManagement
