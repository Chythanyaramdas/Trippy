import React from 'react'
import AddAdventures from"../../components/Staff/AddAdventure";
// import Navbar from '../../components/navbar/navbar';
import Navbar from '../../components/navbar/StaffNavbar';
import Sidebar from '../../components/Sidebar/StaffSidebar';
function AddAdventure() {
  return (
    <div>
      <Navbar/>
      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">
        <Sidebar/>
      <AddAdventures/>
      </div>
     
    </div>
  )
}

export default AddAdventure
