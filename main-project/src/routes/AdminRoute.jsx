import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import BannerPage from'../pages/Admin/BannerPage';
import BannerCreation from'../pages/Admin/BannerUpload';
import CategoreyCreation from'../pages/Admin/CategoreyCreation';
import CategoreyPage from'../pages/Admin/CategoryPage';
import AddLocation from '../pages/Admin/AddLocation';
import Location from'../pages/Admin/LocationManagement';
import ResortApplications from '../components/Adminforms/ResortApplication';
import ResortApproval from '../pages/Admin/ResortApproval';
import CategoryUpdate from"../pages/Admin/CategoryUpdate"

// import CategoreyManagement 
const AdminRoute=()=>{
    return(
        
    <Routes>
        <Route path='/adminLogin' element={<AdminLoginPage/>}/>
        <Route path='/banner' element={<BannerPage/>}/>
        <Route path='/create_banner' element={<BannerCreation/>}/>
        <Route path='/categoreyUpload' element={<CategoreyCreation/>}/>
        <Route path='/categoryManagement' element={<CategoreyPage/>}/>
        <Route path='/categoryManagement_u/:id' element={<CategoryUpdate/>}/>
        <Route path='/addLocation' element={<AddLocation/>}/>
        <Route path='/location' element={<Location/>}/>
        <Route path='/resortApplications' element={<ResortApplications/>}/>
        <Route path='/resortApproval/:id' element={<ResortApproval/>}/>
    </Routes>
    

    )


}
export default AdminRoute;