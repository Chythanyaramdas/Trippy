import React from "react";
import Banner from'../../components/Banner/Banner';
import Navbar from '../../components/navbar/navbar';
import Sidebar from "../../components/Sidebar/sidebar";
function BannerPage(){
    return(
        <div>
            <Navbar/>

        <div className="flex  relative">

            <Sidebar/>
            <Banner/>
            </div>

            
        
        </div>
    )
}
export default BannerPage;