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
import Destinations from '../pages/user/Destination';
import DestinationResort from '../pages/user/DestinationResort';
import ResetEmail from '../pages/Admin/ResetEmail';
import NewPassword from '../pages/user/NewPassword';
import SuccessPage from '../pages/user/SuccessPage';
import Mybooking from '../pages/user/Mybooking';
import Chat from '../pages/user/Chat';
import Error from"../pages/user/ErrorPage";
import {ProtectedRoute} from"../ProtectedRoute/userProtected";
import {HomeVerification} from '../ProtectedRoute/HomeVerification';

const UserRoute=()=>{
    return(
        <Routes>
            
            <Route exact path='/register' element={<RegisterPage/>} />
            <Route exact path='/login' element={<LoginPage/>} />
            <Route exact path='/otp' element={<OtpPage/>}/>
            <Route exact path='/resetPasswordEmail' element={<ResetEmail/>}/>
            <Route exact path='/newPassword' element={<NewPassword/>}/>
            <Route exact path='/' element={<HomeVerification><UserPage/></HomeVerification>} />
            <Route exact path='/resort/:id' element={<HomeVerification><ResortPage/></HomeVerification> }/>
            {/* <Route exact path='/categoryPage/:id' element={< ProtectedRoute accessBy = {"non-Authorized"}><CategoryPages/></ProtectedRoute>} /> */}
            <Route exact path='/categoryPage/:id' element={ <HomeVerification><CategoryPages/></HomeVerification>}/>
            <Route exact path='/destination' element={ <HomeVerification><Destinations/></HomeVerification>}/>
            <Route exact path='/destinationResort/:id' element={ <HomeVerification><DestinationResort/></HomeVerification>}/>
            <Route exact path='/avalibility' element={< ProtectedRoute accessBy = {"Authorized"}><Checkavaliablitys/></ProtectedRoute>} />
            <Route exact path='/booking/:id' element={< ProtectedRoute accessBy = {"Authorized"}><Booking/></ ProtectedRoute>}/>
            <Route exact path='/successPage' element={< ProtectedRoute accessBy = {"Authorized"}><SuccessPage/></ ProtectedRoute>}/>
            <Route exact path='/myBooking' element={< ProtectedRoute accessBy = {"Authorized"}><Mybooking/></ ProtectedRoute>}/>
            <Route exact path='/chat' element={< ProtectedRoute accessBy = {"Authorized"}><Chat/></ ProtectedRoute>}/>
            <Route exact path='/*' element={<Error/>}/>
        </Routes>
    )
}
export default UserRoute