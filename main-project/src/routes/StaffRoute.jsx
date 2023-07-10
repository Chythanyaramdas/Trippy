import React from 'react'
import { Route,Routes } from 'react-router-dom'
import StaffRegister from'../pages/staff/StaffSignup';
import StaffLoginPage from '../pages/staff/LoginPage';


const StaffRoute=()=>{

    return(
        <Routes>
          <Route exact path='/register' element={<StaffRegister/>} />
          <Route exact path='/staffLogin' element={<StaffLoginPage/>} />
       </Routes>
    )
}
export default StaffRoute;