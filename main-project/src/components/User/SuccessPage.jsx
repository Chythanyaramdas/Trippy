import React,{useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { UserApi } from '../../utils/user/axiosUser';
import {Link}  from 'react-router-dom'
import { useSelector } from "react-redux";

function SuccessPage() {
    const users = useSelector((store) => store.user);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const session_id = queryParams.get("session_id");
    const resort_id = queryParams.get("resortId");
    const jwt = localStorage.getItem("myToken");
    const checkInDate=localStorage.getItem("checkinDate")
    const checkOutDate=localStorage.getItem("checkoutDate")



    useEffect(() => {
        if (session_id) {
          UserApi
            .post("/payment-succes", { paymentId: session_id,resortId:resort_id,users:users.id,checkInDate,checkOutDate})
            .then((res) => {
              // alert("success");
              localStorage.removeItem("myToken");
              localStorage.removeItem('checkinDate')
              localStorage.removeItem('checkoutDate')
            });
        }
      }, [session_id]);


  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      <div className="bg-white rounded-xl shadow-lg p-2">
       <img src='https://res.cloudinary.com/dsyln8j3g/image/upload/v1688207220/success_yutxdw.gif' className='w-144 h-96'/>
        <h2 className="text-2xl text-center font-bold my-4">Your Resort is successfully reserved</h2>
        <div className='flex justify-center align-middle mb-4'>
        <Link  to="/" className='btn btn-info mr-4'>HomePage</Link>
        {/* <button className='btn btn-warning'>Download Pdf </button> */}
        <Link to="/mybooking" className='btn btn-success'>View Booking</Link>
       </div>
      </div>
    </div>
    </div>
  )
}

export default SuccessPage