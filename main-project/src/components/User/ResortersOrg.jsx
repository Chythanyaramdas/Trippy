import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";
import { FaBed } from "react-icons/fa";
// import {FaSackDollar} from"react-icons/fa6"
import {AiFillDollarCircle} from"react-icons/ai"
import {FaRupeeSign } from"react-icons/fa";
import Footer from"../Footer/UserFooter";
import { useNavigate } from "react-router-dom";

function Resorters() {
  const { id } = useParams();
  const navigate=useNavigate()
  const server_url = process.env.REACT_APP_BASE_URL;
  const [resort, setResort] = useState({});
  const [images, setImages] = useState([{}]);
  const[cities,setCities]=useState([{}])

  useEffect(() => {
    if (id) {
      console.log("arunnbhai");
      UserApi.get(`/singlePage?id=${id}`).then((response) => {
        if (response.data.status) {
          setImages([
            ...response.data.resort?.image?.map((image, index) => ({   

              id: index + 1,
              src: `${server_url}images/${image}`,
              isLarge: index === 0,
            })),
          ]);


          setCities([...response.data.resort?.location?.district?.places?.map((place,index)=>place)])


// above befer error   ...response.data.resort[0]?.image?.map((image, index) => ({ 
          console.log("arunn");
          // console.log(response.data.resort[0],"answer");
          console.log(response.data.resort);
          setResort({ ...response.data.resort});
           console.log(setResort,"tree hut");
        }
      });
    }
  }, [id]);


  const getPlace=(e)=>{
    // const {name,value}=e.target 
    let newData=cities.filter((obj)=> obj._id===e)
    console.log(newData);
    
      return newData[0].place
      
    
  }
  


 
    
    

  // const images = resort?.image?.map((image, index) => ({
  //     id: index + 1,
  //     src: `${server_url}+images/+ ${image}`,
  //     isLarge: index === 0,
  //   }));

  return (
    <div className="container max-w-full h-full flex flex-col ">
      <div className="bg-white flex items-center justify-between">
        <div>
        <h2 className="text-3xl font-bold text-black">{resort.resortname}</h2>

       

        <div>
        <h2 className="text-2xl font-bold text-black">{resort?.location?.district?.district},{getPlace(resort?.location?.place)}</h2>
        {/* <h2 className="text-2xl font-bold text-black">{getPlace(resort?.location?.place)}</h2> */}
        {/* <h2 className="text-2xl font-bold text-black">{resort?.location?.place}</h2>  */}
        </div>
        </div>

<div>
      
    <button className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% gap-6" onClick={()=>navigate(`/booking/${resort._id}`)}>Book Nowm</button>
    <button className=" bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ml-20">Chat</button>
    </div>
  </div>
      

      <div className="justify-center bg-white">
        <div className="carousel w-full   mt-20 ">
          {images?.map((image) => (
            <div
              id={`slide${image?.id}`}
              key={image?.id}
              className="carousel-item relative w-full  "
            >
              <img src={image?.src} className="w-96 h-60 mx-auto" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a
                  href={`#slide${
                    image?.id === 1 ? images?.length : image?.id - 1
                  }`}
                  className="btn btn-circle btn-ghost"
                >
                  ❮
                </a>
                <a
                  href={`#slide${
                    image?.id === images?.length ? 1 : image?.id + 1
                  }`}
                  className="btn btn-circle btn-ghost"
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container max-w-full h-full flex flex-col  bg-white">
      <div className="bg-white">
      <div className="flex  font-bold mt-20  ">
                  Capacity :
                  <FaBed className="text-2xl" />
                  <div>{resort.capacity}</div>
                </div>

                <div className="flex  font-bold bg-white ">
                  Budget per day:
                  <AiFillDollarCircle className="text-2xl" />
                  <div>{resort.price}</div>
                </div>
                </div>

                </div>
                

     <div className="container max-w-full h-full flex flex-col  bg-white">
     <div className="bg-white">
      <h3  className="text-2xl font-bold mt-20"> Our Stay...</h3>
     
        <div className="text-justify font-serif  bg-white ">
          {resort.description}A a place to which people frequently or generally go for relaxation or pleasure, especially one providing rest and recreation facilities for vacationers
          A a place to which people frequently or generally go for relaxation or pleasure, especially one providing rest and recreation facilities for vacationers
          A a place to which people frequently or generally go for relaxation or pleasure, especially one providing rest and recreation facilities for vacationers
          A a place to which people frequently or generally go for relaxation or pleasure, especially one providing rest and recreation facilities for vacationers
        </div>

        </div>
     
        </div>

        <div className=" bg-white">
          <div className="mt-48">
          <Footer/>
          </div>
         
        </div>


    </div>








    

  );
}

export default Resorters;
