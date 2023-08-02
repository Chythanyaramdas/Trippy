import React from 'react';
import Adventure from"../../components/Staff/AdventureManagement";
import Navbar from"../../components/navbar/StaffNavbar";
import Sidebar from '../../components/Sidebar/StaffSidebar';
function AdventureManagement() {
  return (
    <div>
    <Navbar/>
    <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full" >
      <Sidebar/>
      <Adventure/>
    </div>
    </div>
  )
}

export default AdventureManagement
