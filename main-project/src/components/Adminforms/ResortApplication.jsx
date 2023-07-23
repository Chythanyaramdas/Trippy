import React, { useEffect, useState } from "react";
import {AdminApi} from'../../utils/admin/adminApi';
import { useNavigate } from "react-router-dom";

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
    <div className="p-4 mt-10">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-xl ">
          <thead className="text-xs text-white uppercase bg-[#05445E] dark:text-gray-400">
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
                    <td className="px-6 py-4">{resorts.descrip}</td>
                    <td className="px-6 py-4">{resorts.resortname}</td>
                    {/* <td className="px-6 py-4">{}</td> */}
                    <td
                      className="px-6 py-4 cursor-pointer underline underline-offset-2"
                      onClick={() => navigate(`/admin/resortApproval/${resort._id}`)}
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
  );
}

export default ResortApplications;
