import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { adminApi } from "../../../helper/axios/adminAxios";
import { AdminApi } from "../../utils/admin/adminApi";
import Navbar from '../../components/navbar/AdminNavbar';
import AdminSidebar from'../../components/Sidebar/AdminSidebar';

function SingleResort() {
  const { id } = useParams();
  const server_url = process.env.REACT_APP_BASE_URL;
  const [resort, setResort] = useState({});
  const [block, setBlock] = useState(false);
  // const [adventure,setAdventure] = useState([])

  const handleSubmit = (action) => {
    AdminApi.post(`resortPage/${id}/${action}`).then((responses) => {
      if (responses.data.status) {
        setBlock((prev) => !prev);
      }
    });
  };

  useEffect(() => {
    if (id) {
      AdminApi.get(`/singleResort?id=${id}`).then((response) => {
        if (response.data.status) {
          console.log(response.data.resort);
          setResort({ ...response.data.resort });
          // setAdventure([...response.data.resort.adventure])
        }
      });
    }
  }, [id, block]);

  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">
      < AdminSidebar/>

      <div className="w-full h-full shadow-lg bg-sky-100 rounded-2xl px-6	padding-left: px-4px  ">
      <div className="w-full flex justify-center items-center h-52 ">
        <img
          src={server_url + "images/" + resort?.image?.[0]}
          alt=""
          className="h-full rounded-full mt-8"
        />
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className=" w-full flex  ">
          {/* <p className="text-1xl font-bold"> Owner of Resort's:</p> */}
          {/* <h2>{resort.resortowner?.name}</h2> */}
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className=" w-full-flex  ">
          <p className="text-1xl font-bold">ResortName:</p>
          <h2>{resort.resortname}</h2>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className=" w-full-flex ">
          <p className="text-1xl font-bold"> Description:</p>
          <h2>{resort.description}</h2>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className=" w-full-flex ">
          <p className="text-1xl font-bold">Capacity:</p>
          <h2>{resort.capacity}</h2>
        </div>
      </div>

      {/* <div className="flex">
           <p>Counsil Name</p>
           <h2>{resort.councilName}</h2>
        </div> */}
      <div className="w-full flex flex-col mt-2">
        <div className="w-full-flex">
          <p className="text-1xl font-bold">Price per Day:</p>
          <h2>{resort.price}</h2>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className="w-full-flex">
          {/* <p className="text-1xl font-bold">Category:</p>
          <h2>{resort.category}</h2> */}
        </div>
      </div>

      {/* <div className="w-full flex flex-col mt-2">
        <div className="w-full-flex" >
          <p className="text-1xl font-bold"> Location</p>
          <h2>{resort.location.district}</h2>
          <h2>{resort.location.place}</h2>
        </div>
        </div> */}

      <div className="flex flex-col">
        {/* <p>Adventure</p> */}
        {/* <div>
            {
            adventure.map((obj)=>{
                return <div className="flex ">
                  <h1>{obj.hospital}</h1>
                  <h1>{timeConvertion(obj.from)}</h1>
                  <h1>{ timeConvertion(obj.to)}</h1>
                </div>
              })
            }
          </div> */}
      </div>

      <div>
        {resort.is_blocked ? (
          <button
            className="bg-red-500 text-white"
            onClick={() => handleSubmit("unblock")}
          >
            Unblock
          </button>
        ) : (
          <button
            className="bg-black text-white"
            onClick={() => handleSubmit("block")}
          >
            Block
          </button>
        )}
      </div>
    </div>


      </div>

    

    </div>
  );
}

export default SingleResort;
