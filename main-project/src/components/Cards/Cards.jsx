import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";


function Card({ data , updatePath }) {
  const navigate = useNavigate();
  const truncateString = (string,length)=>{
    if(string.length <= length){
        return string
    }else{
        return string.substring(0,length)+'...'
    }
  }
  return (
    <>
      <div className="rounded-xl h-25 bg-white w-full  p-2 shadow-lg flex flex-col ">
        <img
          className=" bg-fit rounded-xl h-full object-cover "
          src={`http://localhost:3001/images/${data.image}`}
          alt=""
        />

        <h1>{data.name}</h1>
        <p>{truncateString(data.description,28)}</p>
        <div className="flex justify-center flex-col w-full ">
          <button
            className="bg-sky-500 p-2 rounded-lg mt-3 hidden sm:block text-white"
            // onClick={() => deleteClick(data._id)}
          >
            Delete
          </button>
          <button
            className="bg-sky-500 p-2 rounded-lg mt-3 hidden sm:block"
            onClick={() => navigate(updatePath)}
          >
            Update
          </button>
          <button className="bg-sky-500 p-2 rounded-lg mt-3 block sm:hidden flex justify-center">
            <MdOutlineDelete />
          </button>
          <button className="bg-sky-500 p-2 rounded-lg mt-3 block sm:hidden flex justify-center">
            {" "}
            <GrUpdate />
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;
