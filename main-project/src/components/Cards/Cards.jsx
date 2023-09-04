import React,{useState} from "react";
import { MdOutlineDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AdminApi } from '../../utils/admin/adminApi';
// import { useNavigate } from 'react-router-dom';

function Card({ data , updatePath,deleteClick  }) {
  const navigate = useNavigate();
  const server_url=process.env.REACT_APP_BASE_URL
  
  const truncateString = (string,length)=>{
    if(string.length <= length){
        return string
    }else{
        return string.substring(0,length)+'...'
    }
  }

  // const handleDelete = ()=>{
    
  //   AdminApi.delete('/categoryManagement',{data:{id:caterId}}).then((response)=>{
  //     console.log(response.data);
  //     if(response.data.status){
  //       alert(response.data.message)
  //       // navigate('/admin/categoryManagement')
  //       // add ? setAdd(false): setAdd(true)

  //       setAdd(!add)
  //     }
  //   })

  //   setConfirmation(false)
    

  // }


  // const deleteClick = (id)=>{
  //   console.log('1234567890-');
  //   setCaterId(id)
  //   setConfirmation(true)
  // }



  return (
    <>
      <div className="rounded-xl h-25 bg-white w-full  p-2 shadow-lg flex flex-col ">
        <img
          className=" bg-fit rounded-xl h-full object-cover "
          src={`${server_url}images/${data.image}`}
          alt=""
        />

        <h1>{data.name}</h1>
        <p>{truncateString(data.name,28)}</p>
        <div className="flex justify-center flex-col w-full ">
          <button
            className="bg-sky-500 p-2 rounded-lg mt-3 hidden sm:block text-white"
            onClick={() => deleteClick(data._id)}
          >
            Deletes
          </button>
          <button
            className="bg-sky-500 p-2 rounded-lg mt-3 hidden sm:block"
            onClick={() => navigate(`${updatePath}/${data.name}`)}
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

      {/* {confirmation &&<div className="fixed inset-0 bg-transparent flex justify-center items-center flex-col ">
        <div className="bg-white rounded-lg p-10 flex flex-col justify-center items-center  ">
          <div >
          <h1>Delete</h1>
          </div>

          <div className="mt-3">
            <p>Are you Sure You want to delete</p>
          </div>

          <div className="mt-3">
            <button className="bg-red-600 text-white rounded-lg px-4 py-2" onClick={handleDelete}>Confirm</button>
            <button className="bg-red-600 text-white rounded-lg px-4 py-2 ml-4" onClick={()=> setConfirmation(false)} >Cancel</button>
          </div>
          
        </div>
      </div>} */}
    </>
  );
}

export default Card;
