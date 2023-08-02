import React from 'react'
import Dashboards from '../../components/Dashboard/Dashboard';
import Navbar from '../../components/navbar/StaffNavbar';
import Sidebar from "../../components/Sidebar/StaffSidebar";

function Dashboard() {
  return (
    <div>

        <Navbar/>

        <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full" >

        <Sidebar/>    

      <Dashboards/>

    </div>

    </div>
  )
}

export default Dashboard;
