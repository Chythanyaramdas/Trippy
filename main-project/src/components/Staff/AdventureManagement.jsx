import React,{useEffect,useState,useContext} from 'react'
import { StaffApi } from '../../utils/staff/axiosStaff';
import {staffContext} from'../../helper/context/StaffContext';
import { useNavigate ,useParams} from 'react-router-dom';
import Button from '../Button/Button';

function AdventureManagement() {
const navigate=useNavigate()
// const {id} =useParams();
const{id}=useContext(staffContext);
console.log(id,"idv");
const server_url = process.env.REACT_APP_BASE_URL;
const[resort,setResort]=useState([{}])
const[singleResort,setSingleResort]=useState({})
const[adventure,setAdventure]=useState([{}])
const[del,setDel]=useState('')
const [confirmation,setConfirmation] = useState(false)
const [add,setAdd]=useState(false);



const handleDelete = ()=>{
    
  StaffApi.delete('/adventureManagement',{data:{id:del}}).then((response)=>{
    console.log(response.data);
    if(response.data.status){
      alert(response.data.message)
      navigate('/admin/adventureManagement')
      add ? setAdd(false): setAdd(true)

    }
  })

  setConfirmation(false)
  

}





const initialValues={
  id:id
}

const[formValues,setFormValues]=useState(initialValues)



const resortFinding=(e)=>{
  const{name,value}=e.target
  let newData=resort.filter((obj)=>obj._id===value)
  console.log(newData,"neww");
  setSingleResort({...newData[0]})
  console.log(resort,"singleresort");
}

useEffect(()=>{

  console.log("ids",id);

    
      console.log("chythanya ramdas");

        StaffApi.get('/adventureManagement/?64ad9f37972741f1f7b2f4e0=${64ad9f37972741f1f7b2f4e0}').then((response)=>{

            if(response.data.status){

                console.log("mat");
                console.log(response.data.resort,"miio");
                setResort([...response.data.resort])
                
            }

        })
    

    
},[])


  return (
    <div>

<div className="flex flex-col items-center justify-center gap-4 w-full">
<div className="flex flex-col items-center mt-56 w-full">
    <label htmlFor="">Resort<span className="text-red-600">*</span></label>
    <select
      name="district"
      onChange={(e) => resortFinding(e)}
      className="border-2 p-1 mb-2"
    >
      <option value="">Resort list</option>
      {resort.map((Resorts, index) => {
        return (
          <option key={index} value={Resorts._id}>
            {Resorts.resortname}
          </option>
   
        );
      })}

</select>
<div className="flex justify-center w-full">
    {/* <Button content="Adventure" path="/staff/adventureCreation/${resort._id" /> */}
    <Button content="Adventure" path={`/staff/adventureCreation/${singleResort._id}`}></Button>
  </div>
    
   </div>
</div>


 <div className="mt-36 ml-20 flex grid grid-cols-2 md:grid-cols-4 gap-4 text-center w-full">
        {singleResort?.adventure?.map((data, index) => {
          return (
            <div
              className="rounded-xl bg-white w-full truncate p-2"
              key={index}
            >
              <p>Adventure</p>
              <img
                className=" bg-fit rounded-xl"
                 src={`http://localhost:3001/images/${data.image}`}
                alt=""
              />
              <h1>{data.name}</h1>
              <p>{data.description}</p>
              <div className="flex justify-center flex-col w-full ">
                         
                {/* <Button func={deleteClick} id={data._id}  content={'Delete'}    /> */}
                {/* <button className="bg-[#CE2625] p-2 rounded-lg mt-3 hidden sm:block" onClick={()=>deleteClick(data._id)}>Delete</button> */}
                {/* <button className="bg-sky-500 p-2 rounded-lg mt-3 hidden sm:block">Update</button> */}

                {/* <button  className="bg-sky-500 p-2 rounded-lg mt-3 block sm:hidden flex justify-center"><MdOutlineDelete /></button> */}
                {/* <button className="bg-sky-500 p-2 rounded-lg mt-3 block sm:hidden flex justify-center"> <GrUpdate /></button> */}
              </div>
            </div>
          );
        })}
      </div>

      
    </div>
  )
}

export default AdventureManagement
