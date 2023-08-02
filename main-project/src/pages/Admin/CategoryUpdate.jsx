import React from 'react'
import Update from"../../components/Categorey/CategoryUpdation";
import Sidebar from "../../components/Sidebar/AdminSidebar";
import AdminNavabar from"../../components/navbar/AdminNavbar";
function CategoryUpdate() {
  return (
    <div>
      <AdminNavabar/>

      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">

     <Sidebar/>
      <Update/>
    </div>
    </div>
  )
}

export default CategoryUpdate
