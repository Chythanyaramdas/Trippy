import React from 'react'
import { Route,Routes } from 'react-router-dom'
import RegisterPage from '../pages/user/signup';
import LoginPage from'../pages/user/LoginPage';
import  OtpPage from'../pages/user/otppage';
import  UserPage from '../pages/user/UserHome';
import ResortPage from'../pages/user/ResortPage'
import CategoryPages from '../components/User/CategoryPage';
import Checkavaliablitys from"../pages/user/Checkavaliablity";
import Booking from"../pages/user/ResortBooking";
import {ProtectedRoute} from"../ProtectedRoute/userProtected";
const UserRoute=()=>{
    return(
        <Routes>
            
            <Route exact path='/register' element={<RegisterPage/>} />
            <Route exact path='/login' element={<LoginPage/>} />
            <Route exact path='/otp' element={<OtpPage/>}/>
            <Route exact path='/' element={<UserPage/>} />
            <Route exact path='/resort/:id' element={<ResortPage/>} />
            <Route exact path='/categoryPage/:id' element={<CategoryPages/>} />
            <Route exact path='/avalibility' element={<Checkavaliablitys/>} />
            <Route exact path='/Booking/:id' element={< ProtectedRoute accessBy = {"Authorized"}><Booking/></ ProtectedRoute>}/>

        </Routes>
    )
}
export default UserRoute