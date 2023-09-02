import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdPlace } from "react-icons/md";
import { UserApi } from "../../utils/user/axiosUser";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";

function Destination() {
  const server_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [destination, setDestination] = useState([{}]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoading());
    UserApi.get("/destination").then((response) => {
      if (response.data.status) {
        console.log("destination");
        console.log(response.data.destination);
        dispatch(hideLoading());
        setDestination([...response.data.destination]);
      }
    });
  }, []);
  return (
    
    <div>
      <div className="w-full flex h-28 justify-center items-center overflow-hidden bg-[url(https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63452.jpg?w=1480&t=st=1692072928~exp=1692073528~hmac=00f9f78c35cdb7bbd2f8c745eab4ac739fbdddd69fb02704833d60ed27ef6874)]">
        <h3 className="z-10 text-3xl text-black font-serif">Explore</h3>
        <h1 className="z-10 text-4xl text-blue-800 font-serif ms-4">
          Destinations
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 mx-4 sm:mx-10 md:mx-20">
        {destination.map((data) => (
          <div className="bg-white flex flex-col shadow-2xl p-4 w-full max-w-[600px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105">
            <figure>
              <img
                src={server_url + "images/" + data.image}
                className="mb-1"
                alt="Destination"
              />
            </figure>
            <div className="flex flex-col">
              <div className="flex items-center">
                <MdPlace className="text-lg mr-2" />
                <div className="text-lg font-semibold">{data.district}</div>
              </div>
            </div>
            <button
              className="btn btn-primary mx-auto w-60"
              onClick={() => navigate(`/destinationResort/${data._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destination;
