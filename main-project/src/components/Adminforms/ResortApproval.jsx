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
    if(id){
    alert("ukio")
      AdminApi.get(`/resortDetails?id=${id}`).then((response) => {
        if (response.data.status) {
          console.log(response.data.resort);
          setResort({ ...response.data.resort});
          // setAdventure([...response.data.resort.adventure])
        }
      });


    }
    
  }, [id]);

  return (
    <div className="w-full h-5/6 shadow-lg bg-white rounded-2xl px-6	padding-left: px-4px">

      <div className="w-full flex justify-center items-center h-44 ">
        <img
          src={server_url+'images/'+ resort.image}
        
          
          alt=""
          className="h-full rounded-full"
        />
      </div>


      <div className="w-full flex flex-col mt-5">
        <div className=" w-full flex  ">
          <p className="text-1xl font-bold"> Owner of Resort's:</p>
          <h2>{resort.resortowner}</h2>
        </div>

        </div>



        <div className="w-full flex flex-col mt-5" >
        <div className=" w-full-flex  ">
          <p className="text-1xl font-bold">ResortName:</p>
          <h2>{resort.resortname}</h2>
        </div>
        </div>

        <div className="w-full flex flex-col mt-5">
        <div className=" w-full-flex ">
          <p className="text-1xl font-bold"> Description:</p>
          <h2>{resort. description}</h2>
        </div>
        </div>

        <div className="w-full flex flex-col mt-5">

        <div className=" w-full-flex ">
          <p className="text-1xl font-bold">Capacity:</p>
          <h2>{resort.capacity}</h2>
        </div>

        </div>
        
        
        
        {/* <div className="flex">
           <p>Counsil Name</p>
           <h2>{resort.councilName}</h2>
        </div> */}
        <div className="w-full flex flex-col mt-5">
        <div className="w-full-flex" >
          <p className="text-1xl font-bold">Price  per Day:</p>
          <h2>{resort.price}</h2>
        </div>
        </div>


        <div className="w-full flex flex-col mt-5">
        <div className="w-full-flex" >
          <p className="text-1xl font-bold">Category:</p>
          <h2>{resort.category}</h2>
        </div>
        </div>
        

        <div className="w-full flex flex-col mt-5">
        <div className="w-full-flex" >
          <p className="text-1xl font-bold"> Location</p>
          <h2>{resort.location.district}</h2>
          <h2>{resort.location.place}</h2>
        </div>
        </div>


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


      
      <button className="bg-black text-white " onClick={handleSubmit} >APPROVE</button>
    </div>
  );
}

export default ResortDetalis;
