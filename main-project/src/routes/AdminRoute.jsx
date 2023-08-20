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
import CategoryUpdate from"../pages/Admin/CategoryUpdate";
import UpdateLocation from '../components/Adminforms/UpdateLocation';
import LocationUpdation from '../pages/Admin/LocationUpdation';
import BannerUpdate from"../pages/Admin/BannerUpdation";
import ResortManagement from '../pages/Admin/ResortManagement';
import SingleResort from '../components/Adminforms/SingleResort';
import UserManagement from '../pages/Admin/UserManagement';
import Services from '../pages/Admin/Services';
import ServiceCreation from '../pages/Admin/ServiceCreation';




const AdminRoute=()=>{
    return(
        
    <Routes>
        <Route path='/adminLogin' element={<AdminLoginPage/>}/>
        <Route path='/banner' element={<BannerPage/>}/>
        <Route path='/create_banner' element={<BannerCreation/>}/>
        <Route path='/banner_u/:id' element={<BannerUpdate/>}/>

        <Route path='/services' element={<Services/>}/>
        <Route path='/create_services' element={<ServiceCreation/>}/>
        

        <Route path='/categoreyUpload' element={<CategoreyCreation/>}/>
        <Route path='/categoryManagement' element={<CategoreyPage/>}/>
        <Route path='/categoryManagement_u/:id' element={<CategoryUpdate/>}/>

        <Route path='/addLocation' element={<AddLocation/>}/>
        <Route path='/location' element={<Location/>}/>
        <Route path='/location_u/:id' element={<LocationUpdation />}/>


        <Route path='/resortApplications' element={<ResortApplications/>}/>
        <Route path='/resortApproval/:id' element={<ResortApproval/>}/>
        <Route path='/resortManagement' element={<ResortManagement/>}/>
        <Route path='/singleResort/:id' element={< SingleResort/>}/>

        <Route path='/userInfo' element={<UserManagement/>}/>
        

    </Routes>
    

    )


}
export default AdminRoute;