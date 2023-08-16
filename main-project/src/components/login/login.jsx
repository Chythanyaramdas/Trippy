import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/alertSlice";

import { userLogin } from "../../redux/userSlice";
import { userOtp } from "../../services/userApi";
import { userAuth } from "../../services/userApi";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserApi, userBaseApi } from "../../utils/user/axiosUser";

const UserLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setuseremail] = useState("");
  const [password, setuserpass] = useState("");

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const data = await userOtp({
      //   email: email,
      //   password: password
      // })
      console.log("heiiiii");
      console.log(email, password);
      console.log("token");
      const token = localStorage.getItem("adminToken");
      console.log(token);
      dispatch(showLoading());
      await UserApi.post(`/userLogin`, { email, password }).then((response) => {
        console.log(response);
        dispatch(hideLoading());
        const { name, _id, email } = response.data.user;

        dispatch(userLogin({ name, _id, email }));

        navigate("/");

        localStorage.setItem("userToken", response.data.token);

        navigate("/");
      });

      // if (data) {
      //   if (data.data.errors) {
      //     const { email, password } = data.data.errors;
      //     if (email) generateError(email);
      //     else if (password) generateError(password);
      //   } else {

      //     console.log("success login user");

      //   }
      // }
    } catch (error) {
      console.log(error);
      alert("User Blocked");
    }
  };
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-[url(https://wallpapercave.com/wp/wp4069431.jpg)]">
      <div className="w-full p-6 m-auto bg-green-100 bg-opacity-50	background-color: rgb(221 214 254); rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Trippy
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full input  hover:border-double border-emerald-500	border-color: rgb(16 185 129);"
              onChange={(e) => setuseremail(e.target.value)}
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
          <div className="flex flex-col">
            <a
              href="/register"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              <span className="text-base label-text">
                Not a member? Sign up now
              </span>
            </a>
            <a
              href="/resetPasswordEmail"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              <span className="text-base label-text">Forgot password? </span>
            </a>
          </div>
          <div>
            <button className="btn btn-block">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
