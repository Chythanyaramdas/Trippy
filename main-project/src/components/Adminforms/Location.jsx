import React, { useEffect, useState } from "react";
import{useNavigate} from'react-router-dom';
import { AdminApi } from "../../utils/admin/adminApi";
import './Location.css' ;

function Location() {

  const navigate=useNavigate();
  const [location, setLocation] = useState([]);
  const[locationId,setLocationId]=useState('')
  const [confirmation,setConfirmation] = useState(false)
  const [add,setAdd]=useState(false); 
  const server_url = process.env.REACT_APP_BASE_URL;

  const handleDelete=()=>{

    AdminApi.delete('/location',{data:{id:locationId}}).then((response)=>{

      if(response.data.status){
        alert(response.data.message)
        navigate('/admin/location')
        add ? setAdd(false): setAdd(true)
      }

    })

    setConfirmation(false)
  }


  const deleteClick=(id)=>{

    console.log('1234567890-');
    setLocationId(id)
    setConfirmation(true)

  }

  useEffect(() => {
    AdminApi.get("/location").then((response) => {
      if (response.data.status) {
        let newData = response.data.Location.map((locationdoc) => locationdoc);
        setLocation([...newData]);
        

      }
    });

  }, [add]);

  

  return (
    <div>
      <>
        {/* Hello world */}
        {/* --------------------------------------------------------------------- */}

        <div className="flex flex-col w-full">
          <div className="overflow-x-auto">
            {/* <div className="inline-block w-full  sm:px-6 lg:px-8 "> */}
            <div>
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b min-w-full bg-blue-400 font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6  py-4">
                        #
                      </th>
                      <th scope="col" className="px-6  py-4">
                          Cities
                      </th>

                      <th scope="col" className="px-6  py-4">
                          Places
                      </th>

                      <th scope="col" className="px-6  py-4">
                          Pincode
                      </th>
                      
                      
                      
                      <th scope="col" className="px-6  py-4">
                        Actions
                      </th>
                      <th scope="col" className="px-6  py-4 gap-96" >
                        Actions
                      </th>
                      <th scope="col" className="px-6  py-4">
                         Image
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {location.map((data, index) => {
                      return (
                        <tr
                          className="border-b dark:border-neutral-500 w-full"
                          key={index}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {index + 1}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {data.district}
                          </td>



                          <td>
                            {data.places.map((places,i) => {
                              return (
                                <p className="whitespace-nowrap px-6 py-4" key={i}>
                                  {places.place}
                                </p>
                              );
                            })}
                          </td>

                           {/* <td className="whitespace-nowrap px-6 py-4">
                            {data.pinCode}
                          </td>  */}
                         

                         <td className="flex flex-col">
                            {data.places.map((places,i) => {
                              return (
                                <p className="whitespace-nowrap px-6 py-4" key={i}>
                                  {places.pinCode}
                                </p>
                              );
                            })}
                          </td> 

                           <td className="">

                           <button className="mt-2 bg-green-400 w-28 h-10 text-sm" onClick={()=>deleteClick(data._id)}> Delete </button>
                            
                          </td> 

                            

                            <td>
                            <button className="mt-2 bg-green-400 w-28 h-10 text-sm" onClick={()=>navigate(`/admin/location_u/${data._id}`)}> Edit </button>
                                        
                            </td>

                            <td>
                            <img
                    src={server_url + "images/" + data.image}
                    alt="resort image"
                    className="mb-1 w-20 h-20"
                  />
                            </td>

                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>



      {confirmation &&<div className="fixed inset-0 bg-transparent flex justify-center items-center flex-col ">
        <div className="bg-white rounded-lg p-10 flex flex-col justify-center items-center  ">
          <div >
          <h1>Delete</h1>
          </div>

          <div className="mt-3">
            <p>Are you Sure You want to delete</p>
          </div>

          <div className="mt-3">
            <button className="bg-red-600 text-white rounded-lg px-4 py-2" onClick={handleDelete}>Confirm</button>
            <button className="bg-red-600 text-white rounded-lg px-4 py-2 ml-4" onClick={()=> setConfirmation(false)} >Cancel</button>
          </div>
          
        </div>
      </div>}
    

      {/*----------------------------------------------------------------------  */}
    </div>
  );
}

export default Location;
