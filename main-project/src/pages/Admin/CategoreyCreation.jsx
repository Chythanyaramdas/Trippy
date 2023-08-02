import React from "react";
import Sidebar from "../../components/Sidebar/AdminSidebar";
import  AdminNavbar from"../../components/navbar/AdminNavbar";
import CategoreyCreate from "../../components/Categorey/CategoreyUpload";

function CategoreyCreation(){
    return(
        <div>

       <AdminNavbar/>
        <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full" >
            <Sidebar/>
        <CategoreyCreate/>
        </div>
        </div>
    )
}
export default CategoreyCreation;