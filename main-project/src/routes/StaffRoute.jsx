import React from 'react'
import { Route,Routes } from 'react-router-dom'
import StaffRegister from'../pages/staff/StaffSignup';
import StaffLoginPage from '../pages/staff/LoginPage';
import Dashboards from'../pages/staff/Dashboard';
import ResortPage from '../pages/staff/ResortPage';
import AdventureManagement from"../pages/staff/AdventureManagement";
import AddAdventure from '../pages/staff/AddAdventure';


const StaffRoute=()=>{

    return(
        <Routes>
          <Route exact path='/register' element={<StaffRegister/>} />
          <Route exact path='/staffLogin' element={<StaffLoginPage/>} />
          <Route exact path='/dashboard' element={<Dashboards/>} />
          <Route exact path='/resortRegister' element={<ResortPage/>} />
          <Route exact path='/adventureManagement' element={<AdventureManagement/>} />
          <Route exact path='/adventureCreation/:id' element={<AddAdventure/>} />
         

       </Routes>
    )
}
export default StaffRoute;