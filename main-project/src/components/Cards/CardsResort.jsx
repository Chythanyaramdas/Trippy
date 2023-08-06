import React from "react";
import "./Cards.css";
import { useNavigate } from "react-router-dom";

function CardsResort({data}) {
  const server_url=process.env.REACT_APP_BASE_URL;
  const navigate=useNavigate()
  return (
    <div className="bg-slate-100">
      <div className="mt-10 ms-20">
        <p className="text-2xl text-black font-bold italic"> Our Stay...</p>
      </div>

      <div className="flex flex-wrap mt-4 ">
            {data.map((data) => (
              <div className="bg-white shadow-2xl p-4  w-full max-w-[352px]  mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 ">
                <figure>
                  <img
                    src={server_url + "images/" + data.image}
                    className="mb-1"
                    alt="Movie"
                  />
                </figure>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="text-lg font-semibold">{data.resortname}</div>
                  </div>
                  {/* <div className="flex items-center">
                    <MdPlace className="text-lg mr-2" />
                    <div className="text-lg font-semibold">{item.place}</div>
                  </div> */}

                  <button
                    className="btn btn-primary"
                    onClick={()=>navigate(`/resort/${data._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
      
      </div>
  )
}
export default CardsResort;