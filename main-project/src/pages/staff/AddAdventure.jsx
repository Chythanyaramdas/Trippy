import React from 'react'
import AddAdventures from"../../components/Staff/AddAdventure";
import Navbar from '../../components/navbar/navbar';
import Sidebar from '../../components/Sidebar/sidebar';
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
