import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";
import { MdPlace } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import{AiOutlineHome} from"react-icons/ai";


function DestinationView() {
    const { id } = useParams();
    const server_url = process.env.REACT_APP_BASE_URL;
    const navigate=useNavigate()
    const[resort,setResort]=useState([{}]);


    useEffect(()=>{
        if(id){
            
        
        UserApi.get(`/destinationResort/${id}`).then((response)=>{
            if(response.data.status){
                console.log(response.data.resort);
                setResort([...response.data.resort])
            }
        
        })
    }

    },[id])
  return (
    <div>
      <div>
        <p></p>
      </div>

    <div className=' md:h-auto w-full md:w-full relative h-[70vh]'>
        {/*image as banner  */}
        <img  src={server_url+'images/'+ resort?.location?.image} alt="" className='w-full h-[80vh] object-cover relative' />
                <h3 className='absolute top-1/2 left-1/2 z-10  text-6xl text-white' ></h3>
            </div>
        

    <div className="flex flex-wrap mt-10 ">
            {resort.map((data) => (
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
                  <MdPlace className="text-lg mr-2" />
                    <div className="text-lg font-semibold">{data?.location?.district?.district}</div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center">
                  <AiOutlineHome className="text-lg mr-2" />
                  
                    <div className="text-lg font-semibold">{data.resortname}</div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center">
                  {/* <MdPlace className="text-lg mr-2" /> */}
                  <FaRupeeSign className="text-sm" />
                    <div className="text-lg font-semibold">{data.price}</div>
                  </div>
                </div>
                
                    <button
                    className="btn btn-primary"
                    // onClick={()=>navigate(`/destinationResort/${data._id}`)}
                  >
                    View Details
                  </button>
                </div>
             
            ))}
          </div>

    </div>
  )
}

export default DestinationView
