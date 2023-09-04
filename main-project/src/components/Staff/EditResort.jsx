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
    const[services,setServices]=useState([])
    const [fields, setFields] = useState([{  }]);
    const {id} = useParams()

    const initialValues={
        resortname:"",
        description:"",
        image:[],
        price:"",
        capacity:"",
        services:[]
    };

    const[formValues,setFormValues]=useState(initialValues);
    const server_url=process.env.REACT_APP_STAFF_URL

    useEffect(()=>{
        if(id){


            StaffApi.get(`/resort_u/${id}`).then((response)=>{
                if(response.data.status){
                    setResortname(response.data.banner.resortname)
                    setDescription(response.data.banner.description)
                    setImage(response.data.banner.image)
                    setPrice(response.data.banner.price)
                    setCapacity(response.data.banner.capacity)
                    setServices(response.data.banner.services)
                    
                }
            })

        }

        

    },[id])


    const Services=(index,e)=>{

      const{name,value}=e.target;
      const updatedFields=[...services];
      updatedFields[index]=value;
      setServices(updatedFields)

    }


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
        form.append('services',services)
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
    <div className="w-4/5 h-auto bg-sky-100 p-11 rounded-3xl shadow-lg grid grid-cols-2 md:grid-cols-3 gap-4  ">
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

      
      <div className="flex flex-col  items-center md:col-span-2 ">
        <div className="flex flex-col text-center justify-center border-2 mx-20 h-72 px-10 py-6 ">
        {banner && <img
          className="w-full h-full    rounded-lg  "
          src={`${server_url}images/${image[0]}`}
          alt=""
        />}
      {!banner &&
      (<>
        <p>preview</p>
      <img
          className="w-full h-full    rounded-lg  "
          src={`${server_url}images/${image[0]}`}
          alt=""
        /></>)}
        </div>

        <div className=''>

        <div>
          <p>Services</p>
        </div>
       
        <div className='flex flex-col'>
        {services.map((service,index)=>{
          return(

            <input
            type="text"
            placeholder="service"
            className="p-4 mt-8 shadow-lg rounded-lg w-60 "
            value={service}
            onChange={(e)=> Services(index,e)}
            
         
          />

          )
        })}

</div>

</div>

        
       
       
      </div>
    </div>
    </div>
    
    </div>
  )
}

export default EditResort
