import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { adminApi } from "../../../helper/axios/adminAxios";
import { AdminApi } from "../../utils/admin/adminApi";

function ResortDetalis() {

  const { id } = useParams();
  const server_url=process.env.REACT_APP_BASE_URL;
  const [resort, setResort] = useState({});
  // const [adventure,setAdventure] = useState([])

//   const timeConvertion = (time)=>{
//     const Time = new Date(time)
//     const options = {month:'long',day:'numeric',year:'numeric'}
//     const newTime = Time.toLocaleDateString(undefined,options)
//     console.log(newTime);
//     return newTime

//   }

  const handleSubmit = ()=>{
    
    AdminApi.post(`resortRegister/${id}`).then((responses)=>{
      if(responses.data.status){
        alert('successfull')
      }
    })
  }
  
  useEffect(() => {
    AdminApi.get(`/resortDetails?id=${id}`).then((response) => {
      if (response.data.status) {
        console.log(response.data.resort);
        setResort({ ...response.data.resort});
        // setAdventure([...response.data.resort.adventure])
      }
    });
  }, []);

  return (
    <div className="w-10/12 h-5/6 shadow-lg bg-white rounded-2xl">
      <div className="w-full flex justify-center items-center h-44 ">
        <img
          src={server_url+'images/'+ resort.image}
        
          
          alt=""
          className="h-full rounded-full"
        />
      </div>
      <div className="w-full flex flex-col">
        <div className=" w-full flex  ">
          <p>owner Name</p>
          <h2>{resort.ownerName}</h2>
        </div>
        <div className=" flex  ">
          <p>resortName</p>
          <h2>{resort.resortName}</h2>
        </div>
        <div className=" flex ">
          <p> Description</p>
          <h2>{resort. description}</h2>
        </div>
        <div className=" flex ">
          <p>capacity</p>
          <h2>{resort.capacity}</h2>
        </div>
        
        <div className="flex">
           <p>Counsil Name</p>
           <h2>{resort.councilName}</h2>
        </div>
        <div className="flex" >
          <p>price</p>
          <h2>{resort.price}</h2>
        </div>
        <div className="flex flex-col">
          <p>Adventure</p>
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


      </div>
      <button className="bg-black text-white " onClick={handleSubmit} >APPROVE</button>
    </div>
  );
}

export default ResortDetalis;
