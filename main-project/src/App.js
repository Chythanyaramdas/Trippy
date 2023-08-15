import React from "react";
// import UserRegister from './components/signup/UserRegister';
import UserLogin from "./components/login/login";
// import Navbar from './components/navbar';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import StaffRoute from "./routes/StaffRoute";
import AdminRoute from "./routes/AdminRoute";
import { useSelector } from "react-redux";
// import UserRegister from './components/signup/UserRegister';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
  <>
    {loading && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div class="rounded-md h-24 w-24 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
      </div>
    )}
    <Routes>
      
      <Route exact path="/*" element={<UserRoute />} />
      <Route exact path="/staff/*" element={<StaffRoute />} />
      <Route exact path="/admin/*" element={<AdminRoute />} />
    </Routes>
    </>
  );
}

export default App;
