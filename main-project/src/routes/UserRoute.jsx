import React from 'react'
import { Route,Routes } from 'react-router-dom'
import RegisterPage from '../pages/user/signup';
import LoginPage from'../pages/user/LoginPage';
import  OtpPage from'../pages/user/otppage';
import  UserPage from '../pages/user/UserHome';


const UserRoute=()=>{
    return(
        <Routes>
            
            <Route exact path='/register' element={<RegisterPage/>} />
            <Route exact path='/login' element={<LoginPage/>} />
            <Route exact path='/otp' element={<OtpPage/>}/>
            <Route exact path='/' element={<UserPage/>} />

        </Routes>
    )
}
export default UserRoute