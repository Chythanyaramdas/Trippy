import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserApi } from '../../utils/user/axiosUser';


function ResortPage() {

const {id}=useParams();
const server_url=process.env.REACT_APP_BASE_URL;
const[resort,setResort]=useState({})

useEffect(()=>{

    if(id){
      console.log("arunn");
        UserApi.get(`/singlePage?id=${id}`).then((response)=>{

            if(response.data.status){
              console.log("arunn");
                console.log(response.data.resort);
                setResort({...response.data.resort})
            }
        });

    }

    

},[id])


const images = resort?.image?.map((image, index) => ({
  id: index + 1,
  src: `${image}`,
  isLarge: index === 0,
}));

  return (
    <div>
      {/* <Header /> */}
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* <h2 className="text-2xl font-semibold">{resort.resortname}</h2> */}
            {/* <h2 className="text-2xl font-semibold">Arun</h2> */}


            <p>arun</p>
            
            {/* <h3 className="text-lg mb-4">{resort.location}</h3> */}
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            {/* <button
              className="btn btn-info"
              onClick={() => {
                handleSendIds(users.id, resortdata?.resortowner?._id);
              }}
            >
              Chat
            </button> */}

            {/* <div className="text-2xl font-semibold text-sky-300">
              <span>
                <FaRupeeSign className="inline" />
              </span>
              <span className="inline" onChange={priceChange}>
              
                {price}
              </span>

              <button
                className="btn btn-info ml-4 text-black"
                onClick={(e) => {
                  handleBookView(resortdata,price);
                  console.log(price, "full detials..");
                }}
              >
                Book Now
              </button>
            </div> */}
          </div>
        </div>
        {/* <div className="flex flex-col items-start  lg:flex-col ">
          <div className="max-w-[768px]">
            <div className="mb-8">
              {images &&
                images.map((image, index) => (
                  <figure key={image.id}>
                    <img  src={image.src} alt={`Image ${image.id}`} className="flex flex-col"/>
                  </figure>
                ))}
            </div>
            <div>
              <div>
                <div className="flex gap-x-6">
                <FaBed className="text-2xl"/>
                <div>
                {resortdata.number_room}
                </div>
                </div>
                <div>
                  Services: {resortdata.service ? resortdata.service.join(', ') : ''}</div>
                <div>{resortdata.description}</div>
                
                
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col items-start lg:flex-row">
          <div className="max-w-full">
            <div className="carousel">
              {images?.map((image) => (
                <div
                  id={`slide${image?.id}`}
                  key={image?.id}
                  className="carousel-item relative w-full"
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
            {/* <div className="mb-8 grid grid-cols-2 gap-11">
              {images && images.length > 0 ? (
                <figure>
                  <img
                    src={images[0].src}
                    alt={`Image ${images[0].id}`}
                    className="h-96"
                  />
                </figure>
              ) : null}

              <div className="col-span-1 grid grid-rows-2 gap-4">
                {images && images.length > 1
                  ? images.slice(1).map((image) => (
                      <figure key={image.id}>
                        <img
                          src={image.src}
                          alt={`Image ${image.id}`}
                          className="h-28"
                        />
                      </figure>
                    ))
                  : null}
              </div>
            </div> */}
            {/* <div>
              <div>
                <div className="flex gap-x-6 font-bold">
                  Total Rooms :
                  <FaBed className="text-2xl" />
                  <div>{resortdata.number_room}</div>
                </div>
                <div className="font-bold">how many rooms you need?</div> */}


                {/* <div>
                  <button
                    onClick={decrement}
                    className=" btn-info btn-md rounded-3xl mr-2"
                  >
                    -
                  </button>
                  {rooms}
                  <button
                    onClick={increment}
                    className="btn-info btn-md rounded-3xl ml-2"
                  >
                    +
                  </button>
                </div> */}
                {/* <div className="font-semibold">
                  Services:{" "}
                  {resortdata.service ? resortdata.service.join(", ") : ""}
                </div>
                <div className="text-justify font-serif">
                  {resortdata.description}
                </div> */}


                {/* <div>
                  <h3 className="text-2xl">Hotel Policies</h3>
                  <ul>
                    <li>Check In Time is 12 PM.</li>
                    <li>Check Out time is 11 AM.</li>
                    <li>No smoking in rooms or public areas.</li>
                  </ul>

                </div> */}
              </div>
            </div>
          </div>

          {/* <div className="flex-1 bg-sky-100 w-full mb-8 border border-gray-300 rounded-lg px-6 py-8">
            <h4 className="font-extrabold">Resort Owner</h4>
            <div className="flex items-center gap-x-4 mb-8">
              <div className="w-20 h-20  p-1 border border-gray-300 rounded-none">
                <img
                  src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1687521072/bij_dbcv5b.jpg"
                  alt="owner_profile"
                />
              </div>
            </div>
            <div className="font-bold text-lg">
              {resortdata?.resortowner?.name}
            </div>
            <div className="text-gray-600 mt-2">
              Iam 12 years experienced with this platform if you need any help
              select any one of the button given below
            </div>
            <button className="btn btn-outline btn-info">Chat</button>
            <button className="btn btn-outline btn-info ml-4">Video Call</button>
          </div> */}

{/*           
        </div>
      </div> */}

      {/* <div className="container mt-5">
        <div className="card lg:card-side bg-sky-300 mt-9 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Resort Owner Details</h2>
            <p>{resortdata?.resortowner?.name}</p>
            <p>{resortdata?.resortowner?.email}</p>
            <p>{resortdata?.resortowner?.phone}</p>
          </div>
        </div>
      </div> */}
      {/* <Footer /> */}
    </div>
  )
}

export default ResortPage
