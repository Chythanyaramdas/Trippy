import React from "react";
import "./Cards.css";
import { useNavigate } from "react-router-dom";

function CardsResort({data}) {
  const server_url=process.env.REACT_APP_BASE_URL;
  const navigate=useNavigate()
  return (
    <div>
      <div className="mt-10 ms-20">
        <p className="text-2xl text-black font-bold italic"> Our Resorts</p>
      </div>
      <div  className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 mt-10 overflow-x-scroll  ">

      {data.map((data)=>{

            return(
              
        
        <div className=" rounded-lg shadow-2xl overflow-hidden  bg-sky-300 bg-opacity-20  text-center " style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}} >
          
          <div className="h-72 bg-green-300 bg-opacity-25  flex justify-center items-center">
          <div className="w-[90%] h-[90%] bg-violet-700 relative">
            <img
              src={server_url + "images/" + data.image}
              alt=""
              className="h-full w-full w-full hover:transform transform scale-100 hover:scale-125 transition-transform duration-300"
            />
          </div>
          </div>
          <div className="p-2">
            <p className="mt-3">{data.resortname}</p>
            <button className="mt-2  bg-green-400 w-28 h-10 text-sm" onClick={()=>navigate(`/resort/${data._id}`)}>Book Now</button>
          </div>
        </div>

        /* <div className=" rounded-lg shadow-2xl overflow-hidden  text-center">
          <div>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg"
              alt=""
              className=""
            />
          </div>
          <div className="p-2">
            <p className="mt-3">hello</p>
            <button className="mt-2  bg-green-400">Book Now</button>
          </div>
        </div>
        <div className=" rounded-lg shadow-2xl overflow-hidden  text-center">
          <div>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg"
              alt=""
              className=""
            />
          </div>
          <div className="p-2">
            <p className="mt-3">hello</p>
            <button className="mt-2  bg-green-400">Book Now</button>
          </div>
        </div>
        <div className=" rounded-lg shadow-2xl overflow-hidden  text-center">
          <div>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg"
              alt=""
              className=""
            />
          </div>
          <div className="p-2">
            <p className="mt-3">hello</p>
            <button className="mt-2  bg-green-400">Book Now</button>
          </div>
        </div>
        <div className=" rounded-lg shadow-2xl overflow-hidden  text-center">
          <div>
            <img
              src="https://c4.wallpaperflare.com/wallpaper/624/380/1000/life-resort-hotel-resort-hotel-wallpaper-preview.jpg"
              alt=""
              className=""
            />
          </div>
          <div className="p-2">
            <p className="mt-3">hello</p>
            <button className="mt-2  bg-green-400">Book Now</button>
          </div>
        </div> */

            );

      })}

      </div>
    </div>
  );
}

export default CardsResort;
