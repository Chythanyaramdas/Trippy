import React from 'react'
import Navbar from '../../components/navbar/StaffNavbar';
import Sidebar from"../../components/Sidebar/StaffSidebar";
import  Resort from'../../components/Staff/ResortRegistration';
function ResortPage() {
  return (
    <div>
        
      <Navbar/>
      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full" >
      <Sidebar/>
      
        <Resort/>
      
    </div>
    </div>
   
  )
}

export default ResortPage
