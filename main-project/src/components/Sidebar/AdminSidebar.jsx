import React from "react";
import { useNavigate } from "react-router-dom";
import {GiTatteredBanner} from 'react-icons/gi'
import {AiTwotoneHome} from 'react-icons/ai';
import{TbPlayFootball} from 'react-icons/tb';
import{MdFastfood} from'react-icons/md';
import {TbBrandBooking} from 'react-icons/tb';
function AdminSidebar() {
    const navigate = useNavigate();
  
    return (
      <div className="h-[93.1vh] 394867 py-4 w-full pt-16  font-serif sticky left-0 top-0 bg-[#0DB24C]">
        <div className="h-14  flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"  onClick={() => navigate('/admin/banner')}>
          
          <GiTatteredBanner className="mr-1 "/>

          <p className="hidden md:block  ">Banner</p>
        </div>

        <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"  onClick={() => navigate('/admin/services')}>
          
          <GiTatteredBanner className="mr-1 "/>

          <p className="hidden md:block  ">Services</p>
        </div>
        <div className="h-14 flex items-center justify-center pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"onClick={() => navigate('/admin/categoryManagement')} >
          
          <AiTwotoneHome className="mr-1"/>

          <p className="hidden md:block">Category Management</p>
        </div>
        <div className="h-14 flex items-center justify-center pl-4  md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]"  onClick={() => navigate('/admin/location')}  >
         <TbPlayFootball className="mr-1"/>
          <p className="hidden md:block">Location Management</p>
        </div>
        <div className="h-14 flex items-center justify-center text-sm lg:text-lg pl-4 md:justify-start hover:bg-[#FFFFFF]" onClick={() => navigate('/admin/resortApplications')} >
          <MdFastfood className="mr-1"/>
          <p className="hidden md:block">Resort Applications</p>
        </div>
        <div className="h-14 flex items-center justify-center  pl-4 md:justify-start text-sm lg:text-lg hover:bg-[#FFFFFF]" onClick={()=> navigate('/admin/addLocation')} >
          
          <TbBrandBooking className="mr-1"/>
          <p className="hidden md:block  ">Add Location</p>
        </div>
        <div
          className="h-14 flex items-center justify-center  pl-4 md:justify-start text-sm lg:text-lg cursor-pointer hover:bg-[#FFFFFF]"
          
        >
           <MdFastfood className="mr-1"/>
          <p className="hidden md:block"     onClick={()=> navigate('/admin/resortManagement')}>Resort Management</p>
        </div>
        <div
          className="h-14 flex items-center justify-center  pl-4 md:justify-start text-sm lg:text-lg cursor-pointer hover:bg-[#FFFFFF]"
          
        >
           <MdFastfood className="mr-1"/>
          <p className="hidden md:block"     onClick={()=> navigate('/admin/userInfo')}>User Management</p>
        </div>
      </div>
    );
  }
  
  export default AdminSidebar;
  