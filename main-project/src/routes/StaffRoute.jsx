import React from 'react'
import { Route,Routes } from 'react-router-dom'
import StaffRegister from'../pages/staff/StaffSignup';
import StaffLoginPage from '../pages/staff/LoginPage';
import Dashboards from'../pages/staff/Dashboard';
import ResortPage from '../pages/staff/ResortPage';
import AdventureManagement from"../pages/staff/AdventureManagement";
import AddAdventure from '../pages/staff/AddAdventure';
import ResortUpdate from"../pages/staff/EditResort";
import Resorts from"../pages/staff/ResortManagement";
import BookingManagement from '../pages/staff/BookingManagement';
import  ProtectedRoute from '../ProtectedRoute/staffProtected';




const StaffRoute=()=>{

    return(
        <Routes>
          <Route exact path='/register' element={<StaffRegister/>} />
          <Route exact path='/staffLogin' element={<StaffLoginPage/>} />
          <Route exact path='/dashboard' element={<ProtectedRoute accessBy ={ 'Authorized'}><Dashboards/></ProtectedRoute>} />
          <Route exact path='/resortRegister' element={<ProtectedRoute accessBy ={ 'Authorized'}><ResortPage/></ProtectedRoute>}/>
          <Route exact path='/adventureManagement' element={<AdventureManagement/>} />
          <Route exact path='/adventureCreation/:id' element={<AddAdventure/>} />
          <Route exact path='/resorts' element={<ProtectedRoute accessBy ={ 'Authorized'}><Resorts/></ProtectedRoute>} />
          <Route exact path='/editResort_u/:id' element={<ProtectedRoute accessBy ={ 'Authorized'}><ResortUpdate/></ProtectedRoute>}/>
          <Route exact path='/bookingManagement/:id' element={<ProtectedRoute accessBy ={ 'Authorized'}><BookingManagement/></ProtectedRoute>}/>

       </Routes>
    )
}
export default StaffRoute;