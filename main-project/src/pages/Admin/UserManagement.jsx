import React from 'react'
import UserManagements from '../../components/Adminforms/UserManagement'
import AdminNavbar from"../../components/navbar/AdminNavbar";
import AdminSidebar from'../../components/Sidebar/AdminSidebar'

function UserManagement() {
  return (
    <div>
      <AdminNavbar/>
      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full ">
      <AdminSidebar/>
      <UserManagements/>
    </div>
    </div>
  )
}

export default UserManagement
