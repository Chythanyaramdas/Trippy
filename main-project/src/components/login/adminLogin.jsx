import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';
import axios from 'axios';

//  import {admin} from'../../services/adminApi';
 import { useNavigate } from 'react-router-dom';
 import { AdminApi } from '../../utils/admin/adminApi';
import { useEffect, useState } from 'react';



const  AdminLogin=()=>{

const navigate = useNavigate();
  const [email, setuseremail] = useState('');
  const [password, setuserpass] = useState('');

  const generateError = (err) => {
    toast.error(err, {
      position: 'top-center'
    });
  };

  const handleSubmit= async (e) => {
    e.preventDefault();

    try {
      // const data = await admin({
      //   email: email,
      //   password: password
      // })
      console.log("heiiiii");
      console.log(email,password);
      await AdminApi.post(`/adminLogin`,{email,password}).then((response)=>{
      //  axios.post(`http://localhost:3001/admin/adminLogin`,{email,password}).then((response)=>{
        console.log(response);
        if(response.data.status){
          console.log("succes dashboard");

          localStorage.setItem("adminToken",response.data.token);

          navigate("/admin/banner")
        }
        
       
      })
    

      // if (data) {
      //   if (data.data.errors) {
      //     const { email, password } = data.data.errors;
      //     if (email) generateError(email);
      //     else if (password) generateError(password);
      //   } else {
          
      //     console.log();
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return(
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-[url(https://i.pinimg.com/originals/d8/22/20/d822205ab35e56560a848a76b0d33a58.jpg)]">
    hello
    <div className="w-full p-6 m-auto bg-violet-200	background-color: rgb(221 214 254); rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-700">
        Trippy
      </h1>
      <form  onSubmit={handleSubmit}className="space-y-4">
        <div>
          <label className="label">
            <span className="text-base label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            className="w-full input  hover:border-double border-emerald-500	border-color: rgb(16 185 129);"
            onChange={(e) => setuseremail( e.target.value )}
            required

          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input 
            type="password"
            placeholder="Enter Password"
            id="password"
            className="w-full input  hover:border-double border-emerald-500	border-color: rgb(16 185 129);"
            onChange={(e) => setuserpass(e.target.value)}
            required
          />
        </div>
        <a
          href="/register"
          className="text-xs text-gray-600 hover:underline hover:text-blue-600"
        >
                      <span className="text-base label-text">Not a member? Sign up now</span>
        </a>
        <div>
          <button className="btn btn-block">Login</button>
        </div>
      </form>
    </div>
  </div>
    




  )


}
export default AdminLogin;
