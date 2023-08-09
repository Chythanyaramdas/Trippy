import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";


function ResetEmail() {
    const navigate = useNavigate();
    const[email,setEmail]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault()
        localStorage.setItem("email",email)
        UserApi.post('/resetPasswordOtp',{email:email}).then((response)=>{
            console.log(response);
            if(response.data.status){

                navigate('/otp')
            }
            else{
                alert("No User Found")
            }
        }).catch((error)=>{
            alert(error.response.data.message)
            console.log(error.response.data.message);
        })

    }

  return (
    <div>
      
      <div className="flex justify-content-center items-center" style={{ minHeight: "100vh" }}>
  <div className="card text-center mx-auto" style={{ maxWidth: 800 }}>
    <form onSubmit={handleSubmit} className="p-4">
      <div className="card-header h5 text-white bg-primary">Password Reset</div>
      <div className="card-body">
        <p className="card-text py-3">
          Enter your email address and we'll send you an email with instructions to reset your password.
        </p>
        <div className="form-group mb-3">
          <label htmlFor="typeEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="typeEmail"
            name="email"
            className="form-control w-full"
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Reset password
        </button>
        <div className="d-flex justify-content-center mt-4">
          <a href="#">Login</a>
        </div>
      </div>
    </form>
  </div>
</div>


    </div>
  )
}

export default ResetEmail
