import React,{  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { StaffApi } from "../../utils/staff/axiosStaff";



function EditResort() {
    const navigate = useNavigate()    
    const [banner,setBanner] = useState(false)
    const [resortname,setResortname] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState([])
    const [newImage,setNewImage] = useState([])
    const[price,setPrice]=useState("")
    const[capacity,setCapacity]=useState("")
    const {id} = useParams()

    const initialValues={
        resortname:"",
        description:"",
        image:[],
        price:"",
        capacity:""
    };

    const[formValues,setFormValues]=useState(initialValues);

    useEffect(()=>{
        if(id){


            StaffApi.get(`/resort_u/${id}`).then((response)=>{
                if(response.data.status){
                    setResortname(response.data.banner.resortname)
                    setDescription(response.data.banner.description)
                    setImage(response.data.banner.image)
                    setPrice(response.data.banner.price)
                    setCapacity(response.data.banner.capacity)
                    
                }
            })

        }

        

    },[id])


    const uploadImage=(e)=>{
        alert('image')
        console.log("heiii");
        if(e.target.files){
          console.log("hello");
          const file =   Array.from(e.target.files);
          setNewImage([...file])
        }
      }



      const handleSubmit = async()=>{
        console.log(newImage,"kgahg")
        console.log("------------",resortname);;
        const form = new FormData()
        form.append('resortname',resortname)
        form.append('description',description)
        form.append('price',price)
        form.append('capacity',capacity)
        console.log(newImage.length,"kgahg2")
        
        if(!newImage.length){
          console.log("newImage is not here");
          
        }
        else{
            
            for(const img of newImage){
                form.append('image',img)
            }
        console.log(form.get('image'));
        }
       
          console.log(form.get("image"),"image");
          await StaffApi.post(`resort_ud/${id}`,form,{
            headers: {
              "content-Type": "multipart/form-data",
            },
          }).then((response)=>{
            if(response.data.status){
                alert('Successfully Updated')
                navigate('/staff/dashboard')
            }
          })
    }



  return (
    <div>
      <div className='w-full h-full flex justify-center items-center'>
    <div className="w-3/4 bg-white p-11 rounded-3xl h-3/4 shadow-lg grid grid-cols-2 md:grid-cols-3 gap-4  ">
      <div className="flex flex-col justify-center items-center h-full ps-5">
        <input
          type="text"
          placeholder="name"
          className="p-4 mt-4 shadow-lg rounded-lg w-60 "
          value={resortname}
          onChange={(e)=> setResortname(e.target.value)}
       
        />


        <input
          type="text"
          placeholder="name"
          className="p-4 mt-8 shadow-lg rounded-lg w-60 "
          value={price}
          onChange={(e)=> setPrice(e.target.value)}
       
        />


        <input
          type="text"
          placeholder="name"
          className="p-4 mt-8 shadow-lg rounded-lg w-60 "
          value={capacity}
          onChange={(e)=> setCapacity(e.target.value)}
          
       
        />


        <input
          type="file"
          multiple
          name="image"
          className="p-2 mt-8 shadow-lg rounded-lg w-64 h-40 "
          onChange={uploadImage}
          
        />
        <textarea
          type="text"
          placeholder="Description"
          className="p-2 mt-20 shadow-lg h-1/3 rounded-lg w-80"
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
        />
        <button
          className="p-2 mt-8 bg-sky-400 w-2/4 rounded-3xl mx-auto"  
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>

      
      <div className="flex flex-col justify-center items-center md:col-span-2 ">
        <div className="flex flex-col text-center justify-center border-2 mx-20 h-72 px-10 py-6 ">
        {banner && <img
          className="w-full h-full    rounded-lg  "
          src={`http://localhost:3001/images/${image}`}
          alt=""
        />}
      {!banner &&
      (<>
        <p>preview</p>
      <img
          className="w-full h-full    rounded-lg  "
          src={`http://localhost:3001/images/${image}`}
          alt=""
        /></>)}
        </div>
       
      </div>
    </div>
    </div>
    
    </div>
  )
}

export default EditResort
