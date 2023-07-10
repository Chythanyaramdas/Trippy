import React from 'react'
import { Route,Routes } from 'react-router-dom'
import AdminLoginPage from '../pages/Admin/AdminLoginPage'
import BannerPage from'../pages/Admin/BannerPage';
import BannerCreation from'../pages/Admin/BannerUpload';
const AdminRoute=()=>{
    return(
        
    <Routes>
        <Route path='/adminLogin' element={<AdminLoginPage/>}/>
        <Route path='/banner' element={<BannerPage/>}/>
        <Route path='/create_banner' element={<BannerCreation/>}/>
       
    </Routes>
    

    )


}
export default AdminRoute;