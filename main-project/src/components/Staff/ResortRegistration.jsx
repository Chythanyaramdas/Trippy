import React, { useContext, useEffect, useState } from 'react'
import { StaffApi } from '../../utils/staff/axiosStaff'
import {staffContext} from'../../helper/context/StaffContext';

function ResortRegistration() {

    const[staff,setStaff]=useState({})
    const{id}=useContext(staffContext);
    console.log(id,"id");

   const[adventure,setAdventure]=useState([{}]);
   const[place,setPlace]=useState([{}])
  //  const[address,setAddress]=useState({})
   const[location,setLocation]=useState([{}])
   const[store,setStore]=useState([{}])
   const[filter,setFilter]=useState({})
  //  storing  the place when click on district 

const initialValues={
    id:id,
    ownerName:"",
    resortName:"",
    description:"",
    capacity:"",
    price:"",
    image:"",
    place:"",
    phone:""
};

const[formValues,setFormValues]=useState(initialValues);

const inputChange=(e)=>{
    const{name,value}=e.target;

    setFormValues({...formValues,[name]:value});
    console.log(formValues);
};


const placeFinding=(e)=>{
const {name,value}=e.target

  let newData=place.filter((obj)=> obj.district===value)
  setStore([...newData[0].places])
  
  console.log(newData[0].places,"issssyyyy");
  console.log(store);
 
}


const filterFinding=(e)=>{
  const {name,value}=e.target
  console.log(name,value);
  setFilter({...filter,[name]:value})
  

}




const addMore=()=>{
    setAdventure([...adventure,{}]);
};


const onChangeAdventure=(e,index)=>{
    const{name,value}=e.target;
    const adv=[...adventure];
    adv[index][name]=value;
    setAdventure([...adv]);
    console.log(setAdventure);
    // array

};


const imageChange = (e)=>{
  const {name} = e.target
  const image = e.target.files[0]
  setFormValues({...formValues,[name]:image})
  console.log(formValues);
}

// const onChangeAddress=(e,index)=>{
//     const{name,value}=e.target;
//     setAddress({...address,[name]:value})
//     console.log(setAddress);
//     // object
// }

// const handleSubmit=()=>{
//     alert("here is")
//     const form = new FormData()
//     form.append('formValues',formValues)
   
//     // form.append('image',formValues.image)
//     // form.append('adventure',JSON.stringify(adventure))
//     console.log(JSON.stringify(formValues));
//     StaffApi.post('/resortRegister',form).then((response)=>{

//         if(response.data.status){
//             alert(response.data.message);
//         }
//     });
// };


const handleSubmit = () => {
  alert("here is");
  const form = new FormData()
  form.append('formValues', JSON.stringify(formValues));
  // form.append('id', formValues.id);
  // form.append('placeId', formValues.placeId);
  form.append('image', formValues.image);
  // form.append('image',formValues.image)
   form.append('adventure',JSON.stringify(adventure))
  console.log(JSON.stringify(formValues));

  StaffApi.post('/resortRegister', form,{headers:{
    'Content-Type': 'multipart/form-data'
  }}).then((response) => {
    if (response.data.status) {
      alert(response.data.message);
    }
  });

//   StaffApi.post('/resortRegister',formValues).then((response)=>{
//     if(response.data.status){
//       alert(response.data.message)
//     }
//   })
// };
}


useEffect(()=>{

    StaffApi.get('/resortRegister/?id=${id}').then((response)=>{

        if(response.data.status){
            setStaff(response.data.place);
           
          //  let newData = response.data.place.map((locationdoc)=>locationdoc.district);
          //   console.log(newData);
          //  setPlace([...newData])
          setPlace([...response.data.place]);



            console.log(setPlace);
        }
    })


},[])

  return (
    
    <div className="p-10 bg-slate-200">
    <div className="mx-auto bg-white rounded-lg p-5 ">
      <div className="grid grid-cols-[2fr_8fr]">
        <div className="rounded-full overflow-hidden relative h-60 w-auto flex justify-center">
          <img
            src={formValues.image ? URL.createObjectURL(formValues.image) : ""}
            alt=""
            className="h-full  rounded-full w-full"
          />
          <div className="absolute bottom-0 left-10 rounded-full overflow-hidden">
          <input className="bg-amber-200 " name="image"  onChange={imageChange} type="file"/>

          </div>
        </div>
        <div className="flex flex-col  ml-40 w-1/2">
          <div className="flex grid grid-cols-3">
            <p>Full Name</p>
            <span>:</span>
            <p className="mb-4">
              {" "}
              {staff?.name + " " }
            </p>
          </div>
          <div className="flex grid grid-cols-3">
            <p>Phone Number</p>
            <span>:</span>
            <p className="mb-4"> {staff?.phone}</p>
          </div>
          <div className="flex grid grid-cols-3">
            <p>Email </p>
            <span>:</span>
            <p className="mb-4"> {staff?.email}</p>
          </div>
        </div>
      </div>

      <hr className="my-4" />
      <div>
        <div className="grid grid-cols-2">
          <div className="w-full">
            <div>
              <h2 className=" mb-4 underline underline-offset-8 " >Registeraton Details</h2>
              
              <div className="grid grid-cols-3">
                <label htmlFor="">Resort Owner <span className="text-red-600">*</span> </label>
                <input
                  type="text"
                  onChange={(e) => inputChange(e)}
                  value={formValues.ownerName}
                  name="ownerName"
                  className="border-2 p-1 mb-2"
                />
              </div>
            
            <div className="grid grid-cols-3">
              <label htmlFor="">Resort  Name <span className="text-red-600">*</span></label>
              <input
                type="text"
                onChange={(e) => inputChange(e)}
                value={formValues.resortName}
                name="resortName"
                className="border-2 p-1 mb-2"
              />
            </div>
            <div className="grid grid-cols-3">
              <label htmlFor="">Description<span className="text-red-600">*</span></label>
              <input
                type="text"
                onChange={(e) => inputChange(e)}
                value={formValues.description}
                name="description"
                className="border-2 p-1 mb-2 "
              />
            </div>


            <div className="grid grid-cols-3">
              <label htmlFor="">Mobile number<span className="text-red-600">*</span></label>
              <input
                type="number"
                onChange={(e) => inputChange(e)}
                value={formValues.phone}
                name="phone"
                className="border-2 p-1 mb-2 "
              />
            </div>



          </div>
          <hr className="my-4 " />

          <div className="grid grid-cols-3" >
            <label htmlFor="">Location<span className="text-red-600">*</span></label>
            <select
              name="district"
              onChange={(e) => placeFinding(e)}
              id=""
              className="border-2 p-1 mb-2 "
            >
              <option value="">Location</option>
              {place.map((Location,index) => {
                return (
                  <option key={index} value={Location.district}>

                    {Location.district}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="grid grid-cols-3" >
            <label htmlFor="">Place<span className="text-red-600">*</span></label>
           {store[0].place? <select
              name="place"
              onChange={(e) => filterFinding(e)}
              id=""
              className="border-2 p-1 mb-2 "
            >
              <option value="place">Place</option>
              {store.map((places,index) => {
                return (
                  <option key={index} value={places._id}>

                    {places.place}
                  </option>
                )
              })}
            </select>:" "}
          </div>



          <div className="grid grid-cols-3">
            <label htmlFor="">Capacity</label>
            <input
              type="number"
              onChange={(e) => inputChange(e)}
              value={formValues.capacity}
              name="capacity"
              className="border-2 p-1 mb-2 "
            />
          </div>

          <div className="grid grid-cols-3">
            <label htmlFor="">Budget</label>
            <input
              type="number"
              onChange={(e) => inputChange(e)}
              value={formValues.price}
              name="price"
              className="border-2 p-1 mb-2 "
            />
          </div>

          {/* <div className="grid grid-cols-3">
            <label htmlFor="">Age</label>
            <input
              type="number"
              onChange={(e) => inputChange(e)}
              value={formValues.Age}
              name="Age"
              className="border-2 p-1 mb-2 "
            />
          </div> */}


          {/* <div className="grid grid-cols-3">
            <label htmlFor="">Age</label>
            <input
              type="number"
              onChange={(e) => inputChange(e)}
              value={formValues.Age}
              name="Age"
              className="border-2 p-1 mb-2 "
            />
          </div> */}


          {/* <div className="grid grid-cols-3">
            <label htmlFor="">Langauges Known</label>
            <input type="text" onChange={(e) => inputChange(e)} name="languages" className="border-2 p-1 mb-2" />
          </div> */}


          <div>
            <div>
              <h2 className="mb-4 underline underline-offset-8" >Adventure</h2>
            </div>
            <div>


            </div>
            {adventure.map((ele, index) => {
              return (
                <div key={index} className="flex " >
                  <div className="">
                    <label htmlFor="">Name <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      name="name"
                      onChange={(e) => onChangeAdventure(e, index)}
                      className="border-2 p-1 mb-2 "
                      value={adventure.name}
                    />
                  </div>

                  <div className="">
                    <label htmlFor="">Description <span className="text-red-600">*</span></label>
                    <input
                      type="text"
                      name="description"
                      onChange={(e) => onChangeAdventure(e, index)}
                      className="border-2 p-1 mb-2"
                      value={adventure.description}

                    />
                  </div>
                  <div className="" >
                    <label htmlFor="">Time <span className="text-red-600">*</span></label>
                    <input
                      type="number"
                      name="time"
                      onChange={(e) => onChangeAdventure(e, index)}
                      className="border-2 p-1 mb-2"
                      value={adventure.time}
                    />
                  </div>


                  {/* <div className="" >
                    <label htmlFor="">Time <span className="text-red-600">*</span></label>
                    <input
                      type="number"
                      name="time"
                      onChange={(e) => onChangeAdventure(e, index)}
                      className="border-2 p-1 mb-2"
                    />
                  </div> */}



                </div>
              );
            })}
          </div>
        <button onClick={addMore} className="bg-lime-500 p-2" >Add More</button>

        </div>
        
      </div>
      <div className="w-full flex justify-center ">
      <button onClick={handleSubmit} className="bg-red-500 p-2">
          {" "}
          Submit{" "}
        </button>
      </div>
      
      </div>
    </div>
  </div>
  )
}

export default ResortRegistration;
