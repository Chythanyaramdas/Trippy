import React, { useEffect, useState } from "react";
import AdminNavbar from "../../components/navbar/StaffNavbar";
import Sidebar from "../../components/Sidebar/StaffSidebar";
import { StaffApi } from "../../utils/staff/axiosStaff";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import DashBoardComponent from "../../components/Staff/EarningBoard";
import moment from "moment";

function Dashboard() {
  const [userCount, setUser] = useState(null);
  const [resortCount, setResortCount] = useState(null);
  const [bookingCount, setBookingCount] = useState(null);
  const [income, setIncome] = useState([]);

  const { id } = useParams();
  const staff = useSelector((store) => store.staff);
  const users = useSelector((store) => store.user);

  const initialValuesOfDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [days, setDays] = useState(initialValuesOfDays);
  const [dayWiseSales, setDayWiseSales] = useState([]);
  const [lineChartFrom, setLineChartFrom] = useState(moment());
  const [lineChartTo, setLineChartTo] = useState(moment().subtract(7, "days"));
  const [lineChartSeries, setLineChartSeries] = useState([
    {
      name: "Total Amount",
      data: [],
    },
  ]);

  const pieChartSeriesInitial = [];
  const pieChartOptionsInitial = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const linechartOptionsInitial = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Weekly Profit",
      align: "center",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: days,
    },
  };

  const [pieChartSeriesResort, setPieChartseriesResort] = useState(
    pieChartSeriesInitial
  );
  const [pieChartOptionsResort, setPieChartOptionsResort] = useState(
    pieChartOptionsInitial
  );

  // const [pieChartSeriesAdmin,setPieChartSeriesAdmin] = useState(pieChartSeriesInitial)
  // const [pieChartOptionsAdmin,setPieChartOptionsAdmin] = useState(pieChartOptionsInitial)

  const formateDate = (date) => {
    let result = moment(date).format("L");
    return result;
  };

  const [lineChartData, setLineChartData] = useState({
    options: linechartOptionsInitial, // Your initial line chart options
    series: [], // Your line chart series data
  });

  useEffect(() => {
    console.log("ppppp");
    StaffApi.get(`/dashBoardChart/${staff._id}`)
      .then((res) => {
        console.log(res,"oooooo");
        if (res.data.status) {
          setUser(res.data.userCount);
          setResortCount([res.data.resortCount]);
          setBookingCount([res.data.bookingCount]);
          setIncome([res.data.income]);

          res.data.income.forEach((data) => {
            setPieChartseriesResort((pre) => [...pre, data["payment"]]);
          });

          res.data.income.forEach((data) => {
            setPieChartOptionsResort((prev) => ({
              ...prev,
              labels: [...prev.labels, data._id], // Corrected syntax here
            }));
          });
          let weeklySalesReport = res.data.weeklySalesReport;

          // let newDaysArray = [];
          // let newArray = [];
          // for (let i = 0; i < weeklySalesReport.length; i++) {
          //   newArray.push(weeklySalesReport[i]?.totalAmount);
          //   // else newArray.push(null)
          //   console.log(i);
          // }

          // weeklySalesReport.forEach((report) => {
          //   console.log("report", report._id);
          //   let formattedDate = formateDate(report._id);
          //   console.log(formattedDate);
          //   newDaysArray.push(formattedDate);
          // });
          // setDays([...newDaysArray]);
          // console.log("---newArray-----");
          // setLineChartSeries((prev) => {
          //   return [{ ...prev[0], ["data"]: newArray }];
          // });
          // setLineChartFrom(res.data.lineChartFrom);
          // setLineChartTo(res.data.lineChartTo);

          // const lineChartSeriesData = res.data.weeklySalesReport.map(
          //   (report) => ({
          //     x: formateDate(report._id),
          //     y: report.totalAmount,
          //   })
          // );

          // // Update the line chart data
          // setLineChartData({
          //   options: linechartOptionsInitial, // You can customize your options here
          //   series: [
          //     {
          //       name: "Total Amount",
          //       data: lineChartSeriesData,
          //     },
          //   ],
          // });

          //

          const dates = [];
          const amount=[];
          res.data.weeklySalesReport.forEach((obj) => {
            const year = obj._id.year;
            const weekNumber = obj._id.week;
            
            amount.push(obj.totalSales)
            const startDate = new Date(year, 0, 1); // January is month 0
            const daysToAdd = (weekNumber - 1) * 7; // Calculate the number of days to add
            startDate.setDate(startDate.getDate() + daysToAdd);
            const reports = startDate.toDateString();
            console.log(startDate.toDateString());
            console.log(reports);
            dates.push(reports)
           
          });
          setDays([...dates]) ;
          console.log(dates,"dates");
            console.log(amount,"amount");
          setLineChartSeries(prev=>{
            return [{...prev[0],['data'] : amount} ]
          })
        }
      })
      .catch(() => {});
  }, []);
  // console.log(pieChartSeriesDoctor,'pieChartSeriesDoctorrrrr');
  // console.log(pieChartOptionsDoctor,'pieChartOptionsDoctor');
  return (
    <div className="sticky top-0 z-10 h-[12vh] ">
      <AdminNavbar />
      <div className="grid grid-cols-[1fr_7fr] md:grid-cols-[1.5fr_8.5fr] w-full sticky top-[12vh]">
        <Sidebar />
        <div className="w-full h-[88vh]  overflow-y-scroll">
          <DashBoardComponent
          
            userCount={userCount}
            resortCount={resortCount}
            bookingCount={bookingCount}
            pieChartSeriesResort={pieChartSeriesResort}
            pieChartOptionsResort={pieChartOptionsResort}
            // pieChartSeriesAdmin={pieChartSeriesAdmin}
            // pieChartOptionsAdmin={pieChartOptionsAdmin}
            lineChartData={lineChartData}
            lineChartSeries={lineChartSeries}
            linechartOptionsInitial={linechartOptionsInitial}
            lineChartFrom={lineChartFrom}
            lineCharto={lineChartTo}
            setLineChartFrom={setLineChartFrom}
            setLineChartTo={setLineChartTo}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
