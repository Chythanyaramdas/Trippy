import React, { useEffect, useState } from "react";
import{useNavigate} from'react-router-dom';
import { AdminApi } from "../../utils/admin/adminApi";



function ResortManagement() {
const navigate=useNavigate()
    const [resort,setResort]=useState([{}])

    useEffect(()=>{
        AdminApi.get("/resortList").then((response)=>{
            if(response.data.status){

                console.log(response.data.resort,"rdr");

                setResort([...response.data.resort])
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
             {/* <th scope="col" className="px-6 py-3">
              
             </th> */}
             <th scope="col" className="px-6 py-3">
               view
             </th>
           </tr>
         </thead>
         <tbody>
           {resort.map((resorts,index) => {
             return (
               <>
                 <tr className="bg-white border-b bg-[#a0d6db] dark:border-gray-700 " key={index}>
                   <td className="px-6 py-4">{index+1}</td>
                   <td className="px-6 py-4">{resorts.resortowner?.name}</td>
                   <td className="px-6 py-4">{resorts.resortname}</td>
                   {/* <td className="px-6 py-4">{}</td> */}
                   <td
                     className="px-6 py-4 cursor-pointer underline underline-offset-2"
                     onClick={() => navigate(`/admin/singleResort/${resorts._id}`)}
                   >
                     More
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

export default ResortManagement
