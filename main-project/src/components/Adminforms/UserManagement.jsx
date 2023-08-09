import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminApi } from "../../utils/admin/adminApi";
import { useParams } from "react-router-dom";

function UserManagement() {
  const navigate = useNavigate();
  const [user, setUser] = useState([{}]);
  const { id } = useParams();
  const [block, setBlock] = useState(false);

  const handleSubmit = (id,action) => {
  alert(id)
  alert(action)
    AdminApi.post(`/userBlock/${id}/${action}`).then((response) => {
      if (response.data.status) {
        alert("success");
        setBlock((prev) => !prev);
      }
    });
  };

  useEffect(() => {
    

      AdminApi.get("/userInfo").then((response) => {
        if (response.data.status) {
          console.log(response.data.user, "usr");
          setUser([...response.data.user]);
        }
      });

  }
    
  , [block]);
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
                  Email
                </th>
                {/* <th scope="col" className="px-6 py-3">

              Mobile number
             </th> */}
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {user.map((users, index) => {
                // console.log(user);
                return (
                  <React.Fragment key={index}>
                    <tr
                      className="bg-white border-b bg-[#a0d6db] dark:border-gray-700 "
                      key={index}
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{users.name}</td>
                      <td className="px-6 py-4">{users.email}</td>
                      {/* <td className="px-6 py-4">{users.mobileNumber}</td> */}
                      <td
                        className="px-6 py-4 cursor-pointer underline underline-offset-2"

                        //  onClick={() => navigate(`/admin/singleResort/${users._id}`)}
                      >
                        {users.isBlocked ? (
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
                        )}
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
  );
}

export default UserManagement;
