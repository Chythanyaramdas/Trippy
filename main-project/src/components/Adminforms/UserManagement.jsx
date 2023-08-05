import React,{useEffect,useState} from"react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../../utils/admin/adminApi";
import { useParams } from "react-router-dom";



function UserManagement() {

    const navigate=useNavigate()
    const[user,setUser]=useState([{}])
    const {id}=useParams()

    const handleSubmit=(id)=>{
      alert(id)
      AdminApi.post(`/userBlock/${id}`).then((response)=>{
        if(response.data.status){
          alert("success")
        }
      })
    }


    useEffect(()=>{
        AdminApi.get('/userInfo').then((response)=>{
            if(response.data.status){
                console.log(response.data.user,'usr');
                setUser([...response.data.user])
            }
        })
    },[])
  return (
    <div>
      <div className="w-full ">
     
     <div className="relative overflow-x-auto w-full ">
       <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-red-500 shadow-xl ">
         <thead className="text-xs text-white uppercase  bg-sky-600 dark:text-gray-400">
           <tr>
             <th scope="col" className="px-6 py-3">
               SI No
             </th>
             <th scope="col" className="px-6 py-3">
               OwnerName
             </th>
             <th scope="col" className="px-6 py-3">
               ResortName
             </th>
             <th scope="col" className="px-6 py-3">

              Mobile number
             </th>
             <th scope="col" className="px-6 py-3">
               view
             </th>
           </tr>
         </thead>
         <tbody>
           {user.map((users,index) => {
            // console.log(user);
             return (
               <>
                 <tr className="bg-white border-b bg-[#a0d6db] dark:border-gray-700 " key={index}>
                   <td className="px-6 py-4">{index+1}</td>
                   <td className="px-6 py-4">{users.name}</td>
                   <td className="px-6 py-4">{users.email}</td>
                   <td className="px-6 py-4">{users.mobileNumber}</td>
                   <td
                     className="px-6 py-4 cursor-pointer underline underline-offset-2"
                     
                    //  onClick={() => navigate(`/admin/singleResort/${users._id}`)}
                   >
                     <button className="bg-black text-white " onClick={()=>handleSubmit(users._id)}>Block</button>
                   </td>
                 </tr>
               </>
             );
           })}
         </tbody>
       </table>
     </div>
   </div>
    </div>
  )
}

export default UserManagement;
