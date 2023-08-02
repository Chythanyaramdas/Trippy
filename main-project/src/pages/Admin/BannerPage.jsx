import React from "react";
import Banner from'../../components/Banner/Banner';
// import Navbar from '../../components/navbar/navbar';
import  AdminNavbar from"../../components/navbar/AdminNavbar";
// import Sidebar from "../../components/Sidebar/sidebar";
import Sidebar from"../../components/Sidebar/AdminSidebar";
function BannerPage(){
    return(
        <div>
            {/* <Navbar/> */}

            <AdminNavbar/>

            <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full" >

            <Sidebar/>
            <Banner/>
            </div>

            
        
        </div>
    )
}
export default BannerPage;