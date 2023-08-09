import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { MdPlace } from "react-icons/md";
import { UserApi } from "../../utils/user/axiosUser";

function Destination() {
    const server_url = process.env.REACT_APP_BASE_URL;
    const navigate=useNavigate()
    const[destination,setDestination]=useState([{}])

    useEffect(()=>{

        UserApi.get('/destination').then((response)=>{
            if(response.data.status){
                console.log("destination");
                console.log(response.data.destination);
                setDestination([...response.data.destination])
            }
        }) 

    },[])
  return (
    <div>
      <div className=' w-full flex h-28  justify-center items-center'>
      <h3 className=" z-10  text-3xl text-black font-serif">
              Explore 
            </h3>
            <h1 className=" z-10  text-4xl text-blue-800 font-serif ms-4">
             Destinations
            </h1>
      </div>

      <div className="grid grid-cols-3 gap-8  mt-10  px-20">
            {destination.map((data) => (
              <div className="bg-white  flex flex-col shadow-2xl p-4  w-full max-w-[600px]    mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 ">
                <figure>
                  <img
                    src={server_url + "images/" + data.image}
                    className="mb-1"
                    alt="Movie"
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
                    onClick={()=>navigate(`/destinationResort/${data._id}`)}
                  >
                    View Details
                  </button>
                </div>
             
            ))}
          </div>
      </div>
     
  )
}

export default Destination