import React, { useEffect, useState } from "react";
import { AdminApi } from "../../utils/admin/adminApi";
import './Location.css' ;
function Location() {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    AdminApi.get("/location").then((response) => {
      if (response.data.status) {
        let newData = response.data.Location.map((locationdoc) => locationdoc);
        setLocation([...newData]);
      }
    });
  }, []);

  return (
    <div>
      <>
        {/* Hello world */}
        {/* --------------------------------------------------------------------- */}

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block w-full  sm:px-6 lg:px-8 ">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b min-w-full bg-blue-400 font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6  py-4">
                        #
                      </th>
                      <th scope="col" className="px-6  py-4">
                        District
                      </th>
                      <th scope="col" className="px-6  py-4">
                        Place
                      </th>
                      <th scope="col" className="px-6  py-4">
                        Pincode
                      </th>
                      <th scope="col" className="px-6  py-4">
                        Actions
                      </th>
                      <th scope="col" className="px-6  py-4">
                        Actions
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
                          </td> */}

                          <td className="flex flex-col">
                            {data.places.map((places,i) => {
                              return (
                                <p className="whitespace-nowrap px-6 py-4" key={i}>
                                  {places.pinCode}
                                </p>
                              );
                            })}
                          </td>

                            <td>
                            <button className="loc w-28 h-3"> Delete </button>
                                        
                            </td>

                            <td>
                            <button className="loc w-28 h-3"> Edit </button>
                                        
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

      {/*----------------------------------------------------------------------  */}
    </div>
  );
}

export default Location;
