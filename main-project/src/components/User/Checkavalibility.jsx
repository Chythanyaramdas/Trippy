import React, { useState,useEffect } from "react";
import { MdPlace } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import{UserApi} from"../../utils/user/axiosUser";



function Checkavalibility() {
    const server_url = process.env.REACT_APP_BASE_URL;
  const [resort, setResort] = useState([]);
  const[place,setPlace]=useState([])
  const[record,setRecord]=useState([])
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [filteredResorts, setFilteredResorts] = useState([]);
  

     
  
    useEffect(()=>{

        UserApi.get('/resortInfo').then((response)=>{
            if(response.data.status){
                setPlace([...response.data.place])
                setRecord([...response.data.record])
            }
        })

    },[])

    

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    if (date < checkInDate) {
      setCheckOutDate(checkInDate);
    } else {
      setCheckOutDate(date);
    }
  };

  


  const handleSearch=()=>{

    UserApi.post('/search',{selectedPlace,checkOutDate,checkInDate}).then((response)=>{
        if(response.data.status){
            setFilteredResorts([...response.data.date]) 

        }
    })
  }


  const today = new Date();
  const uniquePlaces = [...new Set(resort.map((item) => item.place))];

  return (
    <div>
      <div className="mx-auto max-w-screen-2xl">
        <div className="px-[30px] py-4 w-full  mx-auto flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-md rounded-lg ">
          <select
            className="w-64 h-10 max-w-xs"
            name="place"
         
            onChange={(e) => setSelectedPlace(e.target.value)} 
          >
            <option  >
              Select your Stay
            </option >
            {place.map((places, index) => (
              <option key={index} value={places._id}>{places.district}</option>
            ))}
          </select>

          <div className="ml-2">
            <DatePicker
              selected={checkInDate}
              dateFormat="dd MMMM yyyy"
              onChange={handleCheckInDateChange}
              placeholderText="Check-in"
              className="w-64 h-10 max-w-xs"
              minDate={today}
            />
          </div>

          <div className="ml-4">
            <DatePicker
              selected={checkOutDate}
              dateFormat="dd MMMM yyyy"
              onChange={handleCheckOutDateChange}
              placeholderText="Check-out"
              className="w-64 h-10 max-w-xs"
              minDate={checkInDate ? new Date(checkInDate) : null}
            />
          </div>

          <button
            className="btn join-item my-1"
              onClick={() => {
                // console.log("searching working....");
                handleSearch();
              }}
          >
            Search
          </button>
        </div>

        <div className='flex gap-4'>
              {checkInDate && checkOutDate && selectedPlace ?  filteredResorts.length > 0 ? (
        filteredResorts.map((item) => (
          <div
            className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
            key={item.resortname}
          >
            <figure>
              <img
                src={server_url + "images/" + item.image}
                alt="images_resort"
                className="rounded-tl-[20px] mb-8"
              />
            </figure>
            <div className="mb-4 flex flex-col">
              <div className="flex items-center mb-2">
                <BiHomeAlt className="text-lg mr-2" />
                <div className="text-lg font-semibold">
                  {item.resortname}
                </div>
              </div>

              <div className="flex items-center">
                <MdPlace className="text-lg mr-2" />
                <div className="text-black">
                  {item.location.district?.district}
                </div>
              </div>

              <div className="flex items-center">
                <FaBed className="text-lg mr-2" />
                <div className="text-lg font-semibold">
                  {item.capacity}
                </div>
              </div>

              <button
                // onClick={() => handleView(item._id)}
                className="btn btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-2xl mx-auto">
          <img
            src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1689588227/new_nf8utw.gif"
            alt="images_resort"
          />
        </div>
      ) :record.map((item) => (
        <div
          className="shadow-2xl p-5 rounded-tl-[20px] w-full max-w-[384px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
          key={item.resortname}
        >
          <figure>
            <img
              src={server_url + "images/" + item.image}
              alt="images_resort"
              className="rounded-tl-[20px] mb-8"
            />
          </figure>
          <div className="mb-4 flex flex-col">
            <div className="flex items-center mb-2">
              <BiHomeAlt className="text-lg mr-2" />
              <div className="text-lg font-semibold">
                {item.resortname}
              </div>
            </div>

            <div className="flex items-center">
              <MdPlace className="text-lg mr-2" />
              <div className="text-black">
                {item.location.district?.district}
              </div>
            </div>

            <div className="flex items-center">
              <FaBed className="text-lg mr-2" />
              <div className="text-lg font-semibold">
                {item.capacity}
              </div>
            </div>

            <button
              // onClick={() => handleView(item._id)}
              className="btn btn-primary"
            >
              View Details
            </button>
          </div>
        </div>
      )) }

      {/* {filteredResorts.length > 0 ? (
        filteredResorts.map((item) => (
          <div
            className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
            key={item.resortname}
          >
            <figure>
              <img
                src={server_url + "images/" + item.image}
                alt="images_resort"
                className="rounded-tl-[20px] mb-8"
              />
            </figure>
            <div className="mb-4 flex flex-col">
              <div className="flex items-center mb-2">
                <BiHomeAlt className="text-lg mr-2" />
                <div className="text-lg font-semibold">
                  {item.resortname}
                </div>
              </div>

              <div className="flex items-center">
                <MdPlace className="text-lg mr-2" />
                <div className="text-black">
                  {item.location.district?.district}
                </div>
              </div>

              <div className="flex items-center">
                <FaBed className="text-lg mr-2" />
                <div className="text-lg font-semibold">
                  {item.capacity}
                </div>
              </div>

              <button
                // onClick={() => handleView(item._id)}
                className="btn btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-2xl mx-auto">
          <img
            src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1689588227/new_nf8utw.gif"
            alt="images_resort"
          />
        </div>
      )} */}

      {/* { !filteredResorts && record.map((item) => (
        <div
          className="shadow-2xl p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
          key={item.resortname}
        >
          <figure>
            <img
              src={server_url + "images/" + item.image}
              alt="images_resort"
              className="rounded-tl-[20px] mb-8"
            />
          </figure>
          <div className="mb-4 flex flex-col">
            <div className="flex items-center mb-2">
              <BiHomeAlt className="text-lg mr-2" />
              <div className="text-lg font-semibold">
                {item.resortname}
              </div>
            </div>

            <div className="flex items-center">
              <MdPlace className="text-lg mr-2" />
              <div className="text-black">
                {item.location.district?.district}
              </div>
            </div>

            <div className="flex items-center">
              <FaBed className="text-lg mr-2" />
              <div className="text-lg font-semibold">
                {item.capacity}
              </div>
            </div>

            <button
              // onClick={() => handleView(item._id)}
              className="btn btn-primary"
            >
              View Details
            </button>
          </div>
        </div>
      ))} */}
    </div>


    </div>
    </div>
    
  );
}

export default Checkavalibility;
