import React from 'react';
import AdminSidebar from'../../components/Sidebar/AdminSidebar';
import Navbar from '../../components/navbar/navbar';
import ResortApprovals from'../../components/Adminforms/ResortApproval';

function ResortApproval() {
  return (
    <div>
      <Navbar/>
      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">
       < AdminSidebar/>
      <ResortApprovals/>
    </div>
    </div>
  )
}

export default ResortApproval;
