import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function MyBooking() {
  const { id } = useParams();
  const [booked, setBooked] = useState([{}]);
  const [cancel, setCancel] = useState(false);
  const users = useSelector((store) => store.user);

  const formatDate = (time) => {
    let newDate = new Date(time).toLocaleString();
    return newDate;
  };

  useEffect(() => {
    if (users.id) {
      UserApi.get(`/myBooking/${users.id}`).then((response) => {
        if (response.data.status) {
          setBooked([...response.data.booked]);
        }
      });
    }
  }, [users.id, cancel]);
  console.log(booked, "book");

  const CancelBooking = (id) => {
    UserApi.get(`/cancelBooking/${id}`).then((response) => {
      if (response.data.status) {
        setCancel((prev) => !prev);
      }
    });
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="p-5 font-extrabold md:text-2xl text-center  underline-offset-8">
          My Booking Details
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
          booked?.map((resort, index) => (
            <div
              key={index}
              className="card card-side bg-transparent-400 shadow-xl"
            >
              <div className="card-body flex ">
                <h2 className="card-title">
                  Booked Resort:{resort?.resortId?.resortname}
                </h2>
                <p>Location:{resort?.resortId?.location?.district?.district}</p>

                <p>Price:{resort?.payment?.payment_amount}</p>
                {/* <p>Selected Rooms:{resort.selected_rooms}</p> */}
                {/* <p>Place:{resort.resortId.place}</p> */}
                <p>Status:{resort.status}</p>
                {/* <p>Booked Date:{new Date(resort.Booked_at).toLocaleDateString('en-US')}</p> */}
                <p className="gap-4">
                  CheckIn date:{formatDate(resort?.fromDate)} - Check OutDate:
                  {formatDate(resort?.toDate)}
                </p>
                <p>Payment Method: {resort?.payment?.payment_method}</p>
                {/* <p>Payment Status:{resort?.status}</p> */}
                <div className="card-actions justify-end">
                  {resort.status === "booked" ? (
                    <button
                      className="btn btn-error"
                      onClick={() => CancelBooking(resort._id)}
                    >
                      Cancel
                    </button>
                  ):<p className="btn btn-error " disabled>Cancelled</p>}
                  <div className="card-actions w-full flex justify-center bg-slate-500">
                  
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
