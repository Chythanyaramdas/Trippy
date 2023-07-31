
import React,{useState} from 'react';
import {StaffApi} from'../../utils/staff/axiosStaff';
import { useNavigate } from 'react-router-dom';
function addAdventure() {
  // function addAdventure({ adventure, onChangeAdventure, index, imageChange, formValues }
  const navigate=useNavigate();
  const [description,setDescription] = useState('')
  const [image,setImage] = useState('')
  const [title,setTitle] = useState('')
  const[time,setTime]=useState('')



  const handleSubmit=()=>{

const form=new FormData()
form.append('image',image)
form.append('title',title)
form.append('time',time)
form.append('description',description)

StaffApi.post('/adventureManagement',form,{

  headers:{
    "content-type":"multipart/form-data"
  }


}).then((response)=>{

  if(response.data.status == 201){
    console.log('success');
  
}

navigate('/staff/adventureManagement')

})


  }


  return (
    <div className="flex">
      <div className="">
        <label htmlFor="">Name <span className="text-red-600">*</span></label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 p-1 mb-2 "
          value={title}
        />
      </div>

      <div className="">
        <label htmlFor="">Description <span className="text-red-600">*</span></label>
        <input
          type="text"
          name="description"
          onChange={(e) =>setDescription(e.target.value)}
          className="border-2 p-1 mb-2"
          value={description}
        />
      </div>
      <div className="">
        <label htmlFor="">Time <span className="text-red-600">*</span></label>
        <input
          type="number"
          name="time"
          onChange={(e) => setTime(e.target.value)}
          className="border-2 p-1 mb-2"
          value={time}
        />
      </div>

      <div className="rounded-full overflow-hidden relative h-60 w-auto flex justify-center">
        <img
          src={image?URL.createObjectURL(image) : ""}
          alt=""
          className="h-full  rounded-full w-full"
        />
        <div className="absolute bottom-0 left-10 rounded-full overflow-hidden">
          <input className="bg-amber-200 " name="image" onChange={(e)=>setImage(e.target.files[0])} type="file" />
        </div>
      </div>

      {/* <button onClick={addMore} className="bg-lime-500 p-2" >Add More</button> */}


      <div className="w-full flex justify-center ">
      <button onClick={handleSubmit} className="bg-red-500 p-2">
        submit 
        </button>

        </div>

    </div>

    
  );
}

export default addAdventure;
