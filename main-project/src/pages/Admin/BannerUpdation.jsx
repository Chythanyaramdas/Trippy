import React from 'react'
import BannerUpdate from"../../components/Banner/BannerUpdation";
// import Navbar from"../../components/navbar/navbar";
import AdminNavbar from"../../components/navbar/AdminNavbar";
import Sidebar from"../../components/Sidebar/AdminSidebar"

function BannerUpdation() {
  return (
    <div>
        <AdminNavbar/>

        <div>
        <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full"> 
        <Sidebar/>
        <BannerUpdate/>
        </div>
        </div>
     
    </div>
  )
}

export default BannerUpdation
