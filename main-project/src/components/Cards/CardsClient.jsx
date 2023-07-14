import React from "react";
import "./Cards.css";

function Cards({data}) {
  const server_url=process.env.REACT_APP_BASE_URL;
  return (
    <div>
      <div  className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-20 mt-10 overflow-x-scroll  ">

      {data.map((data)=>{

            return(
              
        
        <div className=" rounded-lg shadow-2xl overflow-hidden  text-center">
          
          <div className="h-72">
            <img
              src={server_url + "images/" + data.image}
              alt=""
              className="h-full w-full "
            />
          </div>
          <div className="p-2">
            <p className="mt-3">{data.name}</p>
            <button className="mt-2  bg-green-400">Book Now</button>
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

export default Cards;
