import React, { useState } from "react";
import consultationIcon from "../../../assets/adminDashboard/consultationIcon2.webp";
import userIcon from "../../../assets/adminDashboard/usersIcon.webp";
import doctorIcon from "../../../assets/adminDashboard/doctorIcon2.webp";
import ReactApexChart from "react-apexcharts";
import "./DashBoard.css";
import Dashboard  from "../../../pages/admin/Dashboard";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
function DashBoardComponent({
  userCount,
  doctorCount,
  consultationCount,
  pieChartOptionsDoctor,
  pieChartSeriesDoctor,
  pieChartSeriesAdmin,
  pieChartOptionsAdmin,
  linechartOptionsInitial,
  lineChartSeries,
  lineChartFrom,
  lineChartTo,
  setLineChartFrom,
  setLineChartTo
}) {
  // const [fromDate, setFromDate] = useState(new Date(lineChartFrom));
  // const [toDate,setToDate] = useState(new Date(lineChartTo))
  // const handleCalendarClose = () => console.log("Calendar closed");
  // const handleCalendarOpen = () => console.log("Calendar opened");
  // console.log(lineChartTo,'lineChartSeries');
  return (
    <div className="w-full h-auto px-5 py-5 dashboard">
      <div className="w-fll  grid grid-cols-3 h-44">
        {/* <div className="bg-slate-500 text-white w-full full"> */}
        <div className="w-96 h-full mx-auto bg-white shadow-xl shadow-slate-400 flex items-center p-2 rounded-lg ">
          <div className="w-32 h-32 via-gray-800 rounded-lg overflow-hidden ">
            <img src={userIcon} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col items-center justify-around w-64 py-2 h-full">
            <h1 className="text-xl font-semibold tracking-wider">
              Total Users
            </h1>
            <p className="text-xl font-semibold tracking-wider">{userCount}</p>
          </div>
        </div>
        {/* </div> */}
        <div className="w-96 h-full mx-auto bg-white shadow-xl shadow-slate-400 flex items-center p-2 rounded-lg ">
          <div className="w-32 h-32 via-gray-800 rounded-lg overflow-hidden ">
            <img
              src={doctorIcon}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-around w-64 py-2 h-full">
            <h1 className="text-xl font-semibold tracking-wider">
              Total Doctors
            </h1>
            <p className="text-xl font-semibold tracking-wider">
              {doctorCount}
            </p>
          </div>
        </div>
        <div className="w-96 h-full mx-auto bg-white shadow-xl shadow-slate-400 flex items-center p-2 rounded-lg ">
          <div className="w-32 h-32 via-gray-800 rounded-lg overflow-hidden ">
            <img
              src={consultationIcon}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-around w-64 py-2 h-full">
            <h1 className="text-xl font-semibold tracking-wider">
              Total Consultations
            </h1>
            <p className="text-xl font-semibold tracking-wider">
              {consultationCount}
            </p>
          </div>
        </div>
      </div>
      <section className="my-10 bg-slate-100 rounded-2xl p-5">
        <p className="text-lg font-bold ml-4 underline underline-offset-8 text-center my-5">
          Consultation Wise
        </p>
        <div className="w-full h-[50vh]  grid grid-cols-2 items-center  ">
          <div className=" flex flex-col items-center justify-center bg-white w-[80%] mx-auto h-[90%] rounded-2xl">
            <ReactApexChart
              options={pieChartOptionsDoctor}
              series={pieChartSeriesDoctor}
              type="pie"
              width={380}
            />
            <p>Doctor</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white w-[80%] mx-auto h-[90%] rounded-2xl">
            <ReactApexChart
              options={pieChartOptionsAdmin}
              series={pieChartSeriesAdmin}
              type="pie"
              width={380}
            />
            <p>Admin</p>
          </div>
        </div>
      </section>
      <section className="my-10">
        <div className="flex">
    {/* <ReactDatePicker
      selected={fromDate}
      onChange={(date) => setFromDate(date)}
      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
    />
    <ReactDatePicker
      selected={toDate}
      onChange={(date) => setToDate(date)}
      onCalendarClose={handleCalendarClose}
      onCalendarOpen={handleCalendarOpen}
    />` */}
        </div>
        <ReactApexChart
          options={linechartOptionsInitial}
          series={lineChartSeries}
          type="line"
          height={350}
        />
      </section>
    </div>
  );
}

export default DashBoardComponent;