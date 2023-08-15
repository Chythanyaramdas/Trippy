import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { adminApi } from "../../../helper/axios/adminAxios";
import { AdminApi } from "../../utils/admin/adminApi";

function ResortDetalis() {
  const { id } = useParams();
  const server_url = process.env.REACT_APP_BASE_URL;
  const [resort, setResort] = useState({});
  const [reject, setReject] = useState(false);
  const[reason,setReason]=useState('')
  const [success,setSuccess]= useState(false)
  // const [adventure,setAdventure] = useState([])

  const handleSubmit = () => {
    AdminApi.post(`resortRegister/${id}`,).then((responses) => {
      if (responses.data.status) {
        alert("successfull");
      }
    });
  };

  const handleReject = () => {
    AdminApi.post(`resortRegisterReject/${id}`,{reason,resortOwner:resort.resortowner._id}).then((response) => {
      if (response.data.status) {
        // alert("rejected");
        setReject(false)
        setSuccess(!success)
        setReason('')
      }
    });
  };

  useEffect(() => {
    if (id) {
      AdminApi.get(`/resortDetails?id=${id}`).then((response) => {
        if (response.data.status) {
          console.log(response.data.resort);
          setResort({ ...response.data.resort });
          // setAdventure([...response.data.resort.adventure])
        }
      });
    }
  }, [id,success]);
  console.log(success,"hhghgh");

  return (
    <div className="w-full h-5/6 shadow-lg bg-white rounded-2xl px-6	padding-left: px-4px relative ">
      <div className="w-full flex justify-center items-center h-44 ">
        <img
          src={server_url + "images/" + resort?.image?.[0]}
          alt=""
          className="h-full rounded-full"
        />
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className=" w-full flex  ">
          <p className="text-1xl font-bold"> Owner of Resort's:</p>
          <h2>{resort?.resortowner?.name}</h2>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className=" w-full-flex  ">
          <p className="text-1xl font-bold">ResortName:</p>
          <h2>{resort?.resortname}</h2>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className=" w-full-flex ">
          <p className="text-1xl font-bold"> Description:</p>
          <h2>{resort?.description}</h2>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className=" w-full-flex ">
          <p className="text-1xl font-bold">Capacity:</p>
          <h2>{resort?.capacity}</h2>
        </div>
      </div>

      {/* <div className="flex">
           <p>Counsil Name</p>
           <h2>{resort.councilName}</h2>
        </div> */}
      <div className="w-full flex flex-col mt-2">
        <div className="w-full-flex">
          <p className="text-1xl font-bold">Price per Day:</p>
          <h2>{resort?.price}</h2>
        </div>
      </div>

      <div className="w-full flex flex-col mt-2">
        <div className="w-full-flex">
          <p className="text-1xl font-bold">Category:</p>
          <h2>{resort?.category}</h2>
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

      <div className="flex gap-28">
        <button className="bg-black text-white " onClick={handleSubmit}>
          APPROVE
        </button>
        <button
          className="bg-black text-white "
          onClick={() => setReject(true)}
        >
          Reject
        </button>
      </div>

      {reject && (
        <div className="absolute top-0 left-0 h-full w-full  bg-slate-100 flex flex-col items-center justify-center">
          <p className="rotate-45 absolute top-10 right-10 text-5xl cursor-pointer" onClick={()=>setReject(prev=>!prev)}>+</p>
          <div className="w-1/2 h-60 bg-slate-500 flex flex-col justify-center items-center ">
            <label htmlFor="">Enter the reason for rejection</label>
            <input
              type="text"
            
              value={reason}
              className=" border-3 w-3/4 border-2 "
              onChange={(e)=>setReason (e.target.value)}
            />
        <button className="bg-black text-white" onClick={handleReject}>submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResortDetalis;
