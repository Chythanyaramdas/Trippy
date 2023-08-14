import React,{useEffect,useState} from 'react'
import{useNavigate,useParams }from 'react-router-dom'
import { StaffApi } from '../../utils/staff/axiosStaff'


function BookedSingleResorts() {

    const navigate=useNavigate()
    const[book,setBook]=useState([{}])
    const { id } = useParams();

    useEffect(()=>{
        StaffApi.get(`/singlebookingManagement/${id}`).then((response)=>{
            if(response.data.status){
                console.log(response.data.book,"babaa");
                setBook([...response.data.book])
            }
        })
    },[])

    const formatDate = (time) => {
        let newDate = new Date(time).toLocaleString();
        return newDate;
      };
    

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
              Status
             </th>
             <th scope="col" className="px-6 py-3">
             Payment Method
             </th>
             {/* <th scope="col" className="px-6 py-3">
              
             </th> */}
             <th scope="col" className="px-6 py-3">
              Payment Amount
             </th>
             <th scope="col" className="px-6 py-3">
              Date
             </th>
           </tr>
         </thead>
         <tbody>
           {book.map((books,index) => {
             return (
               <>
                 <tr className="bg-white border-b bg-[#a0d6db] dark:border-gray-700 " key={index}>
                   <td className="px-6 py-4">{index+1}</td>
                
                    <td className="px-6 py-4">{books?.status}</td>
                   <td className="px-6 py-4">{books?.payment?.payment_method}</td>
                
                   <td
                     className="px-6 py-4 cursor-pointer underline underline-offset-2"
                    //  onClick={() => navigate(`/admin/singleResort/${resorts._id}`)}
                   >
                    {books?.payment?.payment_amount}
                   </td>

                   <td  className="px-6 py-4 cursor-pointer underline underline-offset-2">CheckIn date:{formatDate(books?.fromDate)} - Check OutDate:
                  {formatDate(books?.toDate)}</td>
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

export default BookedSingleResorts
