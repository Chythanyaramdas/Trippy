import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../navbar/navbar";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";
function MyBooking() {
  const { id } = useParams();
  const [booked, setBooked] = useState([{}]);
  const [cancel, setCancel] = useState(false);
  const users = useSelector((store) => store.user);
  const [filteredBooking, setFilteredBooking] = useState([]);
  const dispatch = useDispatch();

  const buttons = [
    {
      name: "Upcoming",
      active: true,
    },

    {
      name: "All booking",
      active: false,
    },
  ];

  const [activeButton, setActiveButton] = useState(buttons);

  const formatDate = (time) => {
    let newDate = new Date(time).toLocaleDateString();
    return newDate;
  };

  const handleAll = () => {
    setFilteredBooking([...booked]);
  };

  useEffect(() => {
    if (users.id) {
      dispatch(showLoading()); 
      UserApi.get(`/myBooking/${users.id}`).then((response) => {
        if (response.data.status) {
          dispatch(hideLoading());
          setBooked([...response.data.booked]);
          let currentDate = new Date();
          // alert(currentDate);
          let upComing = response.data.booked.filter(
            (obj) => new Date(obj.fromDate) >= currentDate
          );
          setFilteredBooking([...upComing]);
        }
      });
    }
  }, [users.id, cancel]);
  console.log(booked, "book");

  const CancelBooking = (id) => {
    UserApi.get(`/cancelBooking/${id}?userId=${users.id}`).then((response) => {
      if (response.data.status) {
        setCancel((prev) => !prev);
      }
    });
  };

  const handleUpcoming = (index) => {
    setActiveButton((pre) => {
      return [
        ...pre?.map((button, ind) => {
          return { ...button, ["active"]: index === ind };
        }),
      ];
    });
    if (index === 0) {
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to midnight
      let upComing = booked.filter((obj) => {
        let fromDate = new Date(obj.fromDate);
        fromDate.setHours(0, 0, 0, 0); // Set time to midnight for each fromDate
        return fromDate >= currentDate;
      });
      setFilteredBooking([...upComing]);
    } else setFilteredBooking([...booked]);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex justify-start w-full  gap-8  max-w-screen-2xl mx-auto mt-6">
        {activeButton?.map((button, index) => {
          return (
            <button
              className={`${
                button.active ? "bg-red-900" : "bg-red-300"
              }  px-3 w-48 m-0 rounded-lg font-mono`}
              onClick={() => handleUpcoming(index)}
            >
              {button.name}
            </button>
          );
        })}

        {/* <button className="bg-red-500  px-3 w-60 m-0 rounded-lg" onClick={handleUpcoming}>Upcoming...</button>

        <button className="bg-red-500 px-3 w-60 m-0 rounded-lg" onClick={handleAll}>All booking</button> */}
      </div>

      <div className="mx-auto max-w-screen-2xl">
        <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
          {/* My Booking Details */}
        </h1>

        {booked.length === 0 ? (
          <div className="flex flex-col items-center mt-5">
            <h6 className="bg-red-500 text-white w-full text-center p-3 rounded-lg">
              No bookings yet!
            </h6>
            <Link
              to="/resortlist"
              className="btn btn-success text-white w-full text-center p-3  mt-3 rounded-lg"
            >
              Go To Booking
            </Link>
          </div>
        ) : (
          filteredBooking?.map((resort, index) => (
            <div
              key={index}
              className="card card-side bg-transparent-400 shadow-xl font-popins"
            >
              <div className="card-body flex ">
                <div className="flex justify-between">
                  <div>
                    <h2 className="card-title text-3xl font-popins ">
                      {resort?.resortId?.resortname}
                    </h2>
                    <p className="text-xl mt-2 font-popins">
                      Location :{" "}
                      {resort?.resortId?.location?.district?.district}
                    </p>
                    <p className="gap-4 mt-2 mb-3 text-xl font-popins ">
                      Checkin : {formatDate(resort?.fromDate)} Checkout :
                      {formatDate(resort?.toDate)}
                    </p>

                    {/* {<span className="text-xl bg-green-500 px-3 text-white py-1 rounded-lg capitalize">{resort.status}</span>} */}
                    {/* <span
                      className={`text-xl px-3 py-1 rounded-lg capitalize ${
                        resort.status === "cancelled"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {resort.status}
                    </span> */}

                    <span
                      className={`text-xl px-3 py-1 rounded-lg capitalize`}
                      style={{
                        backgroundColor:
                          resort.status === "cancelled" ? "#ff0000" : "#00ff00",
                        color: "#ffffff",
                        fontSize: "1.5rem", // Adjust the font size for smaller screens
                        padding: "0.3rem 0.5rem", // Adjust padding for smaller screens
                      }}
                    >
                      {resort.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl font-mono">
                      ₹{resort?.payment?.payment_amount}
                    </p>

                    <p className="text-xl mt-2 mb-3 capitalize font-popins">
                      Payment Method: {resort?.payment?.payment_method}
                    </p>
                    <div className="card-actions justify-end ">
                      {resort.status === "booked" ? (
                        // <button
                        //   className="btn w-60 mt-2 btn-error font-popins"
                        //   onClick={() => CancelBooking(resort._id)}
                        // >
                        //   Cancel
                        // </button>

                        <button
                          className="btn w-full mt-2 btn-error font-popins"
                          style={{
                            maxWidth: "180px", // Adjust the maximum width for larger screens
                            margin: "0 auto", // Center-align the button
                            display: "block", // Ensure it takes the full width on smaller screens
                          }}
                          onClick={() => CancelBooking(resort._id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        // <p
                        //   className="btn w-60 mt-2 btn-error font-popins"
                        //   disabled
                        // >
                        //   Cancelled
                        // </p>
                        <button
                          className="btn w-full mt-2 btn-error font-popins"
                          style={{
                            maxWidth: "180px", // Adjust the maximum width for larger screens
                            margin: "0 auto", // Center-align the text
                            display: "block", // Ensure it takes the full width on smaller screens
                          }}
                          disabled
                        >
                          Cancelled
                        </button>
                      )}
                      <div className="card-actions w-full flex justify-center bg-slate-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBooking;
