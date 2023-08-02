import React, { useEffect, useState } from "react";
import {AdminApi} from'../../utils/admin/adminApi';
import { useNavigate } from "react-router-dom";
// import Navbar from"../navbar/navbar"
import AdminNavbar from"../../components/navbar/AdminNavbar";
import AdminSidebar from "../Sidebar/AdminSidebar"; 

function ResortApplications() {
  const navigate = useNavigate();
  const [resort, setResort] = useState([{}]);
  useEffect(() => {
    

      AdminApi.get("/resortApplications").then((response) => {
        if (response.data.status) {
          console.log(response.data.resort);
          setResort([...response.data.resort]);
        }
      });

    
    
  }, []);
  return (


    <div className="w-full h-full">
      <div className="w-full">
      <AdminNavbar/>
      </div>

      <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full" >
      <AdminSidebar/>
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
                      onClick={() => navigate(`/admin/resortApproval/${resorts._id}`)}
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
    
    </div>
  );
}

export default ResortApplications;
