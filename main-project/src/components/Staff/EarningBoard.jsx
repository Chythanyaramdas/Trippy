import React, { useState } from "react";
// import consultationIcon from "../../../assets/adminDashboard/consultationIcon2.webp";
// import userIcon from "../../../assets/adminDashboard/usersIcon.webp";
// import doctorIcon from "../../../assets/adminDashboard/doctorIcon2.webp";
import ReactApexChart from "react-apexcharts";
// import "./DashBoard.css";
import Earnings from"../../pages/staff/EarningBoard";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
function EarningBoard({
  userCount,
  resortCount,
  bookingCount,
  pieChartOptionsResort,
  pieChartSeriesResort,

  // pieChartSeriesAdmin,
  // pieChartOptionsAdmin,
  lineChartData,
  linechartOptionsInitial,
  lineChartSeries,
 

  // lineChartFrom,
  // lineChartTo,
  // setLineChartFrom,
  // setLineChartTo
}) 


{
  // const [fromDate, setFromDate] = useState(new Date(lineChartFrom));
  // const [toDate,setToDate] = useState(new Date(lineChartTo))
  // const handleCalendarClose = () => console.log("Calendar closed");
  // const handleCalendarOpen = () => console.log("Calendar opened");
  // console.log(lineChartTo,'lineChartSeries');
  // console.log(lineChartData);
console.log(linechartOptionsInitial);
console.log(lineChartSeries);
console.log(resortCount,"llllllllllll");
  return (
    <div className="w-full h-auto px-5 py-5 dashboard">
      <div className="w-fll  grid grid-cols-2 h-44">
        {/* <div className="bg-slate-500 text-white w-full full">
        <div className="w-96 h-full mx-auto bg-white shadow-xl shadow-slate-400 flex items-center p-2 rounded-lg ">
          <div className="w-32 h-32 via-gray-800 rounded-lg overflow-hidden ">
            <img src="" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col items-center justify-around w-64 py-2 h-full">
            <h1 className="text-xl font-semibold tracking-wider">
              Total Users
            </h1>
            <p className="text-xl font-semibold tracking-wider">{userCount}</p>
          </div>
        </div>
        </div> */}
        <div className="w-96 h-full mx-auto bg-white shadow-xl shadow-slate-400 flex items-center p-2 rounded-lg ">
          <div className="w-32 h-32 via-gray-800 rounded-lg overflow-hidden ">
            <img
              src="https://img.freepik.com/free-vector/luxury-resort-hotel-swimming-pool_107791-12071.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-around w-64 py-2 h-full">
            <h1 className="text-xl font-semibold tracking-wider text-black">
              Total Resort
            </h1>
            <p className="text-xl font-semibold tracking-wider">
              {resortCount}
            </p>
          </div>
        </div>
        <div className="w-96 h-full mx-auto bg-white shadow-xl shadow-slate-400 flex items-center p-2 rounded-lg ">
          <div className="w-32 h-32 via-gray-800 rounded-lg overflow-hidden ">
            <img
              src="https://previews.123rf.com/images/vladwel/vladwel1905/vladwel190500021/124726777-hotel-booking-online-using-computer-vector-illustration-flat-cartoon-laptop-with-city-hotel-and.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-around w-64 py-2 h-full">
            <h1 className="text-xl font-semibold tracking-wider text-black">
              Total Bookings
            </h1>
            <p className="text-xl font-semibold tracking-wider">
              {bookingCount}
            </p>
          </div>
        </div>
      </div>
      <section className="my-10 bg-slate-100 rounded-2xl p-5">
        <p className="text-lg font-bold ml-4 underline underline-offset-8 text-center my-5">
          Earning Wise
        </p>
        <div className="w-full h-[50vh]   items-center  ">
          <div className=" flex flex-col items-center justify-center bg-white w-[80%] mx-auto h-[90%] rounded-2xl">
            <ReactApexChart
              options={pieChartOptionsResort}
              series={pieChartSeriesResort}
              type="pie"
              width={380}
            />
            <p>Resorts</p>
          </div>
          {/* <div className="flex flex-col items-center justify-center bg-white w-[80%] mx-auto h-[90%] rounded-2xl">
            <ReactApexChart
              options={pieChartOptionsAdmin}
              series={pieChartSeriesAdmin}
              type="pie"
              width={380}
            />
            <p>Admin</p>
          </div> */}
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

export default EarningBoard;