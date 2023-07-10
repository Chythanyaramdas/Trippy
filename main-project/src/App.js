import React from "react";
// import UserRegister from './components/signup/UserRegister';
import UserLogin from "./components/login/login";
// import Navbar from './components/navbar';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import StaffRoute from "./routes/StaffRoute";
import AdminRoute from "./routes/AdminRoute";
// import UserRegister from './components/signup/UserRegister';

function App() {
  return (
    <Routes>
      <Route exact path="/*" element={<UserRoute />} />
      <Route exact path="/staff/*" element={<StaffRoute />} />
      <Route exact path="/admin/*" element={<AdminRoute />} />
    </Routes>
  );
}

export default App;
