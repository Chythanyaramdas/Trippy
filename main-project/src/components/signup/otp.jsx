import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {userOtp} from'../../services/userApi';
import { Link,useNavigate } from 'react-router-dom'

function Otp() {
    const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState('')


  const submitHandle = (e) => {
    e.preventDefault();console.log(otp);

    userOtp(otp)
    .then((response)=>{

        const {success,error}=response.data;
        if(success){
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
    <div>
      {/*------------ */}
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-700 py-12">
        <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-3xl">

                <p>Mobile Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your Mobile Number :{location.state}</p>
              </div>
            </div>

            <div>
              <form onSubmit={submitHandle} >
                <div class="flex flex-col space-y-16">
                  <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div class="h-16">
                      <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id="" onChange={(e) => { setOtp(e.target.value) }} />
                    </div>
                  </div>
                  <div class="flex flex-col space-y-5">
                    <div>
                      <button class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Phone
                      </button>
                    </div>

                    <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* ----------- */}
    </div>
  )
}

export default Otp