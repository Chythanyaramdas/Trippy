import React, { useState, useEffect } from "react";
import { AdminApi } from "../../utils/admin/adminApi";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineDelete } from "react-icons/md";

function Services() {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [confirmation, setConfirmation] = useState(false);
  const [bannerId, setBannerId] = useState("");
  const [add, setAdd] = useState(false);

  useEffect(() => {
    console.log("working");
    AdminApi.get(`/services`).then((response) => {
      if (response.data.status) {
        let newData = response.data.banners.map((bannerdoc) => bannerdoc);
        setBanners([...newData]);
      }
    }).catch((error)=>{
      alert(error?.response?.data?.message)
    })
  }, [add]);

  const handleDelete = () => {
    AdminApi.delete("/services", { data: { id: bannerId } }).then(
      (response) => {
        console.log(response.data);
        if (response.data.status) {
          alert(response.data.message);
          navigate("/admin/services");
          setAdd(!add);
        }
      }
    );

    setConfirmation(false);
  };

  const deleteClick = (id) => {
    console.log("1234567890-");
    setBannerId(id);
    setConfirmation(true);
  };

 


  return (
    <div>
      <div className="flex flex-col bg-sky-50 w-full">
        <Button content="Create" path="/admin/create_services" />

        <div className="mt-36 ml-20 flex grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {banners.map((data, index) => {
            return (
              <div
                className="rounded-xl bg-white w-full truncate p-2"
                key={index}
              >
                <p></p>
                {/* <img
          className=" bg-fit rounded-xl"
           src={`http://localhost:3001/images/${data.image}`}
          alt=""
        /> */}
                <h1>{data?.title}</h1>
                <p>{data?.title}</p>
                {/* <p>{data.description}</p> */}
                <div className="flex justify-center flex-col w-full ">
                  {/* dynamic button with functinality */}
                  {/* <Button func={deleteClick} id={data._id}  content={'Delete'}    /> */}
                  <button
                    className="bg-[#CE2625] p-2 rounded-lg mt-3 hidden sm:block"
                    onClick={() => deleteClick(data._id)}
                  >
                    Delete
                  </button>
                  {/* <button className="bg-sky-500 p-2 rounded-lg mt-3 hidden sm:block" onClick={()=>navigate(`/admin/banner_u/${data._id}`)}>Update</button> */}

                  <button className="bg-sky-500 p-2 rounded-lg mt-3 block sm:hidden flex justify-center">
                    <MdOutlineDelete />
                  </button>
                  <button className="bg-sky-500 p-2 rounded-lg mt-3 block sm:hidden flex justify-center">
                    {" "}
                    <GrUpdate />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {confirmation && (
          <div className="fixed inset-0 bg-transparent flex justify-center items-center flex-col ">
            <div className="bg-white rounded-lg p-10 flex flex-col justify-center items-center  ">
              <div>
                <h1>Delete</h1>
              </div>

              <div className="mt-3">
                <p>Are you Sure You want to delete</p>
              </div>

              <div className="mt-3">
                <button
                  className="bg-red-600 text-white rounded-lg px-4 py-2"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
                <button
                  className="bg-red-600 text-white rounded-lg px-4 py-2 ml-4"
                  onClick={() => setConfirmation(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
