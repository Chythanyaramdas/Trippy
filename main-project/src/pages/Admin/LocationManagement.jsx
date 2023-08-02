import React from "react";
// import Navbar from "../../components/navbar/navbar";
import AdminNavbar from"../../components/navbar/AdminNavbar";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import Location from "../../components/Adminforms/Location";

function LocationManagement() {
  return (
    <div>

        <AdminNavbar/>
        
        <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">
       < AdminSidebar/>
        <Location/>
      
    </div>
    </div>
  )
}

export default LocationManagement
