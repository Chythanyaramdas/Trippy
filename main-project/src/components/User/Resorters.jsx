import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";
import { FaBed } from "react-icons/fa";
// import {FaSackDollar} from"react-icons/fa6"
import { AiFillDollarCircle } from "react-icons/ai";
import{MdReduceCapacity} from"react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Footer from "../Footer/UserFooter";
import { useNavigate } from "react-router-dom";


function Resorters() {
  const { id } = useParams();
  const navigate = useNavigate();
  const server_url = process.env.REACT_APP_BASE_URL;
  const [resort, setResort] = useState({});
  const [images, setImages] = useState([{}]);
  const [cities, setCities] = useState([{}]);

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

          setCities([
            ...response.data.resort?.location?.district?.places?.map(
              (place, index) => place
            ),
          ]);

          // above befer error   ...response.data.resort[0]?.image?.map((image, index) => ({
          console.log("arunn");
          // console.log(response.data.resort[0],"answer");
          console.log(response.data.resort);
          setResort({ ...response.data.resort });
          console.log(setResort, "tree hut");
        }
      });
    }
  }, [id]);

  const getPlace = (e) => {
    let newData = cities.filter((obj) => obj._id === e);
    console.log(newData);

    return newData[0].place;
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-3/4 h-[50rem] px-10 py-10 ">
        <div className=" w-full grid grid-rows-3 grid-flow-col gap-4 rounded-xl overflow-hidden">
          <div className=" w-full row-span-3 col-span-2 h-full overflow-hidden">
            <img src={images[0]?.src} className="w-full h-full mx-auto object-cover" />
          </div>
          <div class=" ...">
            <img src={images[1]?.src} className="w-full h-full mx-auto object-cover" />
          </div>
          <div class="  ...">
            <img src={images[2]?.src} className="w-full h-full mx-auto object-cover" />
          </div>
          <div class="  ...">
            <img src={images[0]?.src} className="w-full h-full mx-auto object-cover" />
          </div>
        </div>
      </div>
      {/* description */}

      <div className="w-full h-[30rem] flex bg-transparent">
        <div className="w-[50%] h-full ">
          <div className="  w-full flex h-28  items-center ps-16 mt-5">
            <h3 className=" z-10  text-3xl text-black font-serif">
              Welcome to{" "}
            </h3>
            <h1 className=" z-10  text-4xl text-blue-800 font-serif ms-4">
              {resort.resortname}{" "}
            </h1>
          </div>
          
        <div className="w-[90%] h-64 ps-14 flex justify-center items-start">
        <div className="w-[60rem]   rounded-md h-64">
            {resort.description}
        </div>
        
    </div>
        </div>
        <div className=" mt-16 w-[50%] h-auto  flex flex-col gap-4 bg-slate-100 mr-10">
           <div className="w-full h-[20%]  flex justify-center ">
            <h3 className="mt-4 text-2xl font-serif">Our stay...</h3>
           </div>
           <div className="w-full h-[80%] flex justify-evenly">

            <div className="w-60 h-[80%] ">

            <div className="flex flex-wrap mt-4  ">
           
              <div className="bg-white shadow-2xl p-4  w-full max-w-[300px] h-64  mx-auto cursor-pointer  ">
                <figure className="h-[95%]">
                  

                  <img
                    src='https://img.freepik.com/free-vector/indian-rupee-money-bag_23-2147996715.jpg?w=2000'
                    className="mb-1 h-full "
                    alt="Movie"
                  />

                </figure>
                <div className="flex flex-col">
                  <div className="flex items-center">
                  <FaRupeeSign className="text-sm" />
                    <div className="text-lg font-semibold">
                        {resort.price}
                        </div>
                  </div>
                 
                </div>
              </div>
           
          </div>

            </div>

            <div className="w-60 h-[80%] ">



            <div className="flex flex-wrap mt-4 ">
           
           <div className="bg-white shadow-2xl p-4  w-full max-w-[300px] h-64  mx-auto cursor-pointer  ">
             <figure className="h-[95%] overflow-hidden">
               

               <img
                 src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkfj5k9-h0cIcNaOwBLOFNlOLpuO72zh7YDJ1z_tT_MCMyTnpuaXYUhGRgPG7FUEIYOS4&usqp=CAU'
                 className="mb-1  h-full"
                 alt="Movie"
               />

             </figure>
             <div className="flex flex-col">
               <div className="flex items-center">
               <MdReduceCapacity className="text-sm" /> 
               
                 <div className="text-lg font-semibold">
                     {resort.capacity}
                     </div>
               </div>
              
             </div>
           </div>
        
       </div>
            </div>


            <div className="w-60 h-[80%]  ">


            <div className="flex flex-wrap mt-4 ">
           
           <div className="bg-white shadow-2xl p-4  w-full max-w-[300px] h-64  mx-auto cursor-pointer  ">
             <figure className="h-[95%] overflow-hidden">
               

               <img
                 src='https://www.shutterstock.com/shutterstock/videos/1039519187/thumb/9.jpg?ip=x480'
                 className="mb-1  h-full object-cover"
                 alt="Movie"
               />

             </figure>
             <div className="flex flex-col">
               <div className="flex items-center">
               < MdPlace className="text-sm" /> 
               
                 <div className="text-lg font-semibold">
                 {resort?.location?.district?.district},{getPlace(resort?.location?.place)}
                     </div>
               </div>
              
             </div>
           </div>
        
       </div>

            </div>
           </div>
        </div>

      </div>

      <div className="mt-16 w-[100%] h-96  flex flex-col gap-4 bg-green-500 mr-10">
      <div className="w-full h-[80%] flex justify-evenly ">
        <div>
        <p>iueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        guyyyyyyyyyyyyyyyyyyyyyy
        hgjuyyyyyuuuuuuuuuuuuuuuu
      </p>
        </div>
      
      

      <div className="w-80 h-[80%] bg-black ">
      <p>iueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        guyyyyyyyyyyyyyyyyyyyyyy
        hgjuyyyyyuuuuuuuuuuuuuuuu
      </p>

        </div>
      </div>
    </div>


    </div>
  );
}
export default Resorters;
