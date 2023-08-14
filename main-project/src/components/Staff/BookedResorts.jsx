import React,{useEffect,useState,useContext} from 'react'
import { StaffApi } from '../../utils/staff/axiosStaff';
import { useSelector } from "react-redux";
import { useNavigate ,useParams} from 'react-router-dom';
import Button from '../Button/Button';

function BookedResorts() {

    const navigate=useNavigate()
    const{id}= useParams();
    console.log(id,"iD");
    const server_url = process.env.REACT_APP_BASE_URL;
    const[resort,setResort]=useState([{}])
    const[singleResort,setSingleResort]=useState({})
    const[Booked,setBooked]=useState([{}])
    const[del,setDel]=useState('')
    const [confirmation,setConfirmation] = useState(false)
    const [add,setAdd]=useState(false);
    const staff = useSelector((store) => store.staff);


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
      
              StaffApi.get(`/bookingResort/${staff._id}`).then((response)=>{
      
                  if(response.data.status){
      
                      console.log("mat");
                      console.log(response.data.resort,"miio");
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
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                 view
                </th>
                {/* <th scope="col" className="px-6 py-3">

              Mobile number
             </th> */}
                {/* <th scope="col" className="px-6 py-3">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody>
              { resort.map((Resorts, index)=> {
                // console.log(user);
                return (
                  <React.Fragment key={index}>
                    <tr
                      className="bg-white border-b bg-[#a0d6db] dark:border-gray-700 "
                      key={index}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className='px-6 py-4 value={Resorts._id}'>{Resorts.resortname}</td>
                      <td
                        className="px-6 py-4 cursor-pointer underline underline-offset-2"

                         onClick={() => navigate(`/staff/bookingSingleResorts/${Resorts._id}`)}

                         
                      >

                        more
                        {/* {users.isBlocked ? (
                          <button
                            className="bg-green-400 w-36 p-2  text-white "
                            onClick={() => handleSubmit(users._id,"unblock")}
                          >
                            UnBlock
                          </button>
                        ) : (
                          <button
                            className="bg-green-400 w-36 p-2 text-white "
                            onClick={() => handleSubmit(users._id,"block")}
                          >
                            Block
                          </button>
                        )} */}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BookedResorts

