import React from "react";
import { useNavigate } from "react-router-dom";
import {GiTatteredBanner} from 'react-icons/gi'
import {AiTwotoneHome} from 'react-icons/ai';
import{TbPlayFootball} from 'react-icons/tb';
import{MdFastfood} from'react-icons/md';
import {TbBrandBooking} from 'react-icons/tb';
function Sidebar() {
    const navigate = useNavigate();
  
    return (
      <div className="h-[93.1vh] 394867 py-4 w-full pt-16  font-serif sticky left-0 top-0 bg-[#0DB24C]">

         <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"onClick={() => navigate('/staff/dashboard')}>
          
          <GiTatteredBanner className="mr-1 "/>

          <p className="hidden md:block  "> View</p>
        </div>

        <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"onClick={() => navigate('/staff/Earnings')}>
          
          <GiTatteredBanner className="mr-1 "/>

          <p className="hidden md:block  ">Earnings</p>
        </div>


        <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"onClick={() => navigate('/staff/chat')}>
          
          <GiTatteredBanner className="mr-1 "/>

          <p className="hidden md:block  ">Chat</p>
        </div>

        <div className="h-14  flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"onClick={() => navigate('/staff/resortRegister')}>
          
          <GiTatteredBanner className="mr-1 "/>

          <p className="hidden md:block  ">Resorts</p>
        </div>
        {/* <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"  onClick={() => navigate('/staff/adventureManagement')} >
          
          <AiTwotoneHome className="mr-1"/>

          <p className="hidden md:block">Adventure</p>
        </div> */}

        <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"  onClick={() => navigate('/staff/resorts')} >
          
          <AiTwotoneHome className="mr-1"/>

          <p className="hidden md:block">Edit Resort</p>
        </div>

        <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"  onClick={() => navigate('/staff/bookingResorts')} >
          
          <AiTwotoneHome className="mr-1"/>

          <p className="hidden md:block"> Booking Management</p>
        </div>
        {/* <div className="h-14 flex items-center justify-center pl-4  md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"  >
         <TbPlayFootball className="mr-1"/>
          <p className="hidden md:block">Adventures</p>
        </div>
        <div className="h-14 flex items-center justify-center text-sm lg:text-lg pl-4 md:justify-start hover:bg-[#FFFFFF]">
          <MdFastfood className="mr-1"/>
          <p className="hidden md:block">Foods</p>
        </div>
        <div className="h-14 flex items-center justify-center  pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]">
          
          <TbBrandBooking className="mr-1"/>
          <p className="hidden md:block  ">Bookings</p>
        </div>
        <div
          className="h-14 flex items-center justify-center  pl-4 md:justify-start text-sm lg:text-lg cursor-pointer hover:bg-[#FFFFFF]"
          onClick={()=> navigate('/admin/banner')}
        >
          <p className="hidden md:block"     onClick={()=> navigate('/admin/banner')}>Resorts</p>
        </div> */}
      </div>
    );
  }
  
  export default Sidebar;
  