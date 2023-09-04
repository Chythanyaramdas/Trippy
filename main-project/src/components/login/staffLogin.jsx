import React, { useState, useEffect,useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link} from 'react-router-dom';
import axios from 'axios';
import {staffContext} from'../../helper/context/StaffContext';


import { staffLogin } from '../../redux/staffSlice';
import { userOtp } from '../../services/staffApi';


import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 import {  staffBaseApi } from '../../utils/staff/axiosStaff';
import { StaffApi} from '../../utils/staff/axiosStaff';



const StaffLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setuseremail] = useState('');
  const [password, setuserpass] = useState('');

  const{setStaff,setApproved,setId}=useContext(staffContext)

  

  const generateError = (err) => {
    toast.error(err, {
      position: 'top-center'
    });
  };

  const handleSubmit= async (e) => {
    e.preventDefault();

    try {
      // const data = await userOtp({
      //   email: email,
      //   password: password
      // })
      console.log("heiiiii");
      console.log(email,password);
      console.log('token');
      const token=localStorage.getItem('staffToken')
      console.log(token);
      await StaffApi.post(`/staff_Login`,{email,password}).then((response)=>{
        console.log(response);

        localStorage.setItem("staffToken",response.data.token);

        const{name,_id,email,approved}=response.data.staff;


        setStaff(name)
        setApproved(approved)
        setId(_id)


        dispatch(staffLogin({name,_id}))

        navigate("/staff/dashboard");

      }) 

      // await axios.post(`${staffBaseApi}staff_Login`,{email,password}).then((response)=>{
      //   console.log(response);
      //   navigate("/")
      // })
    

      // if (data) {
      //   if (data.data.errors) {
      //     const { email, password } = data.data.errors;
      //     if (email) generateError(email);
      //     else if (password) generateError(password);
      //   } else {
      //     console.log('hello');
      //     console.log('chay');
      //     // navigate("/")
          
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };
return (



<div className="relative flex flex-col justify-center h-screen overflow-hidden bg-[url(https://i.pinimg.com/originals/d8/22/20/d822205ab35e56560a848a76b0d33a58.jpg)]">
    <div className="w-full p-6 m-auto bg-transparent backdrop-blur-md rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
      <h1 className="text-3xl font-semibold text-center text-white">
        Trippy
      </h1>
      <form  onSubmit={handleSubmit}className="space-y-4">
        <div>
          <label className="label">
            <span className="text-base label-text text-white">Email</span>
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
            <span className="text-base label-text text-white">Password</span>
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
                      <span className="text-base label-text text-white">Not a member? Sign up now</span>
        </a>
        <div>
          <button className="btn btn-block">Login</button>
        </div>
      </form>
    </div>
  </div>
    

  );
};

export default  StaffLogin;
