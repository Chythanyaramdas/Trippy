import React,{  useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminApi } from "../../utils/admin/adminApi";



function BannerUpdation() {

    const navigate = useNavigate()    
    const [banner,setBanner] = useState(false)
    const [name,setname] = useState('')
    const [description,setDescription] = useState('')
    const [image,setImage] = useState('')
    const [newImage,setNewImage] = useState("")
    const {id} = useParams()
    const server_url=process.env.REACT_APP_ADMIN_URL

    const initialValues = {
        name:"",
        description:"",
        image:"",
    }

    useEffect(()=>{
        if(id){
            AdminApi.get(`/banner_u/${id}`).then((response)=>{
                console.log(response,"lllll");
                if(response.data.status){
                    setname(response.data.banner.title)
                    setDescription(response.data.banner.description)
                 setImage(response.data.banner.image)
                }
            })

        }
        
    },[id])


    const uploadImage=(e)=>{
        console.log("heiii");
        if(e.target.files&&e.target.files[0]){
          console.log("hello");
          const file = e?.target?.files?.[0]
          setNewImage(file)
        }
      }


      const handleSubmit = async()=>{
        console.log(newImage,"kgahg")
        console.log("------------",name);;
        const form = new FormData()
        form.append('name',name)
        form.append('description',description)
        if(newImage===''){
          console.log("newImage is not here");
          
        }
        else{
          form.append('image',newImage)
        }
        console.log(form,"kgkgkgk");
          form.append('id',id)
          console.log(form.get("image"),"image");
          await AdminApi.post(`banner_ud/${id}`,form,{
            headers: {
              "content-Type": "multipart/form-data",
            },
          }).then((response)=>{
            if(response.data.status){
                alert('Successfully Updated')
                navigate('/admin/banner')
            }
          })
    }


  return (
    
    <div className='w-full h-full flex justify-center items-center'>
    <div className="w-3/4 bg-white p-11 rounded-3xl h-3/4 shadow-lg grid grid-cols-2 md:grid-cols-3 gap-4  ">
      <div className="flex flex-col justify-center items-center h-full ps-5">
        <input
          type="text"
          placeholder="name"
          className="p-4 mt-4 shadow-lg rounded-lg w-60 "
          value={name}
          onChange={(e)=> setname(e.target.value)}
       
        />
        <input
          type="file"
          name="image"
          className="p-2 mt-4 shadow-lg rounded-lg w-60 "
          onChange={uploadImage}
          
        />
        <textarea
          type="text"
          placeholder="Description"
          className="p-2 mt-4 shadow-lg h-1/3 rounded-lg w-60"
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
        />
        <button
          className="p-2 mt-4 bg-sky-400 w-2/4 rounded-3xl mx-auto"  
          onClick={handleSubmit}
        >
          Update
        </button>
      </div>

      
      <div className="flex flex-col justify-center items-center md:col-span-2 ">
        <div className="flex flex-col text-center justify-center border-2 mx-20 h-72 px-10 py-6 ">
        {banner && <img
          className="w-full h-full    rounded-lg  "
          src={`${server_url}+images/${image}`}
          alt=""
        />}
      {!banner &&
      (<>
        <p>preview</p>
      <img
          className="w-full h-full    rounded-lg  "
          src={`${server_url}+images/${image}`}
          alt=""
        /></>)}
        </div>
       
      </div>
    </div>
    </div>
  )
}

export default BannerUpdation;
