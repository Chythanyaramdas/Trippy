import React,{useState,useEffect} from 'react'
import { StaffApi } from '../../utils/staff/axiosStaff'
import {GrUpdate} from'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import{MdOutlineDelete} from'react-icons/md';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from '../Button/Button';



function Resorts() {
    const staff=useSelector((store)=>store.staff._id)
   
    const navigate=useNavigate();
    const [data, setData] = useState([]);
    const [confirmation,setConfirmation] = useState(false)
      const [bannerId,setBannerId] = useState('')
      const [add,setAdd]=useState(false);
      const server_url=process.env.REACT_APP_BASE_URL

      const handleDelete = ()=>{
    
        StaffApi.delete('/resortManagement_d',{data:{id:bannerId}}).then((response)=>{
          console.log(response.data);
          if(response.data.status){
            alert(response.data.message)
            navigate('/staff/dashboard')
            add ? setAdd(false): setAdd(true)
    
          }
        })
    
        setConfirmation(false)
        
    
      }

      const deleteClick = (id)=>{
        console.log('1234567890-');
        setBannerId(id)
        setConfirmation(true)
      }
    

      useEffect(() => {
        StaffApi.get(`/resortManagement/${staff}`).then((response) => {
          console.log("hello");
          if (response.data.status) {
            console.log("hello");
            console.log(response.data.resort);
            setData(response.data.resort);
          }
        });
      }, [add]);

  return (
    
      
      
      <div className="flex flex-col bg-sky-50 w-full">

      {/* < Button content='banner' path="/admin/create_banner"  /> */}


<div className="mt-36 ml-20 flex grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
  {data.map((data, index) => {
    return (
      <div
        className="rounded-xl bg-white w-full truncate p-2"
        key={index}
      >
        <p></p>
        <img
          className=" bg-fit rounded-xl"
           src={`${server_url}images/${data?.image[0]}`}
          alt=""
        />
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <div className="flex justify-center flex-col w-full ">
                   {/* dynamic button with functinality */}
          {/* <Button func={deleteClick} id={data._id}  content={'Delete'}    /> */}
          <button className="bg-[#CE2625] p-2 rounded-lg mt-3 hidden sm:block" onClick={()=>deleteClick(data?._id)}>Delete</button>
          <button className="bg-sky-500 p-2 rounded-lg mt-3 hidden sm:block" onClick={()=>navigate(`/staff/editResort_u/${data?._id}`)}>Update</button>

          <button  className="bg-sky-500 p-2 rounded-lg mt-3 block sm:hidden flex justify-center"><MdOutlineDelete /></button>
          <button className="bg-sky-500 p-2 rounded-lg mt-3 block sm:hidden flex justify-center"> <GrUpdate /></button>
        </div>
      </div>
    );
  })}
</div>
{confirmation &&<div className="fixed inset-0 bg-transparent flex justify-center items-center flex-col ">
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
</div>}
</div>




      




   
  )
}

export default Resorts

