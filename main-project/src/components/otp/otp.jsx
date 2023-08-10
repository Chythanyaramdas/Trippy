import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {userOtp} from'../../services/userApi';
import { Link,useNavigate } from 'react-router-dom'
import { UserApi } from '../../utils/user/axiosUser';

function Otp() {
    const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState('')

  const [otp1, setOtp1] = useState(0);
  const [otp2, setOtp2] = useState(0);
  const [otp3, setOtp3] = useState(0);
  const [otp4, setOtp4] = useState(0);
  const [otp5, setOtp5] = useState(0);
  const [otp6, setOtp6] = useState(0);
  const [enteredOtp, setEnteredOtp] = useState("");

  const submitHandle = (e) => {
  
    setOtp(''+otp1+otp2+otp3+otp4+otp5+otp6)

   UserApi.post('/verifiyNewPassword',{otp})
    .then((response)=>{

        const {success,error}=response.data;
        if(response.data.status){
            navigate('/newPassword')
        }

        else{

            console.log("error otp");
        }
    })
    .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-slate-500 w-full h-screen text-center flex flex-col justify-center ">
    <h1>ENTER OTP</h1>
    <div className="userInput">
      <input
        type="text"
        id="ist"
        maxLength="1"
        onChange={(e) => setOtp1(e.target.value)}
      />
      <input
        type="text"
        id="sec"
        maxLength="1"
        onChange={(e) => setOtp2(e.target.value)}
      />
      <input
        type="text"
        id="third"
        maxLength="1"
        onChange={(e) => setOtp3(e.target.value)}
      />
      <input
        type="text"
        id="fourth"
        maxLength="1"
        onChange={(e) => setOtp4(e.target.value)}
      />
      <input
        type="text"
        id="fifth"
        maxLength="1"
        onChange={(e) => setOtp5(e.target.value)}
      />
      <input
        type="text"
        id="sixth"
        maxLength="1"
        onChange={(e) => setOtp6(e.target.value)}
      />
    </div>
    <button onClick={submitHandle}> CONFIRM</button>
  </div>
  )
}

export default Otp