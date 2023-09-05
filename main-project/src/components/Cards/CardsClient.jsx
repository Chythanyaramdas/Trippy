import React from "react";
import "./Cards.css";
import { useNavigate } from "react-router-dom";

function Cards({ data }) {
  const server_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="bg-slate-100 py-6">
      {/* <div className="w-full h-full flex flex-col "> */}

      {/* <div className="mt-8 ms-20 flex "  >

        <p className="text-2xl text-black font-serif mt-1">Choose </p>
        <p className="text-3xl text-blue-800 font-serif ms-3"> your Stay</p>

      </div> */}

<div class="mt-8 md:ml-20 md:flex md:items-center">
    <p class="text-2xl text-black font-serif md:mt-0">Choose</p>
    <p class="text-3xl text-blue-800 font-serif md:ml-3">your Stay</p>
</div>


      <div className="flex flex-wrap mt-4">
        {data.map((datas) => (
          <div
            className="bg-white shadow-2xl p-4  w-full max-w-[352px]   mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
            key={datas.resortname}
          >
            <figure>
              <img
                src={server_url + "images/" + datas.image}
                alt="resort image"
                className="mb-1"
              />
            </figure>
            <div className="flex flex-col">
              <div className="flex items-center ">
                <div className="text-lg font-semibold">
                  {/* {datas.name}  */}
                  <p className="">{capitalizeFirstLetter(datas.name)}</p>
                </div>
              </div>

              {/* <div className="flex items-center">
                    <MdPlace className="text-lg mr-2" />
                    <div className="text-black">{data.place}</div>
                  </div> */}
              {/* <div className="flex items-center">
                    <FaRupeeSign className="text-sm" />
                    <div className="text-black">{item.price} per room</div>
                  </div> */}

              <button
                className="btn btn-primary"
                onClick={() => navigate(`/categoryPage/${datas._id}`)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}
export default Cards;
