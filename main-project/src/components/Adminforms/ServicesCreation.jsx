import React from "react";
import { AdminApi } from "../../utils/admin/adminApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ServicesCreation() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    const form = new FormData();

    // form.append('title',title)

    AdminApi.post("/services", { title }).then((response) => {
      if (response.data.status == 201) {
        console.log("success");
      }
      
      navigate("/admin/services");
    }).catch((error)=>{
      alert(error?.response?.data?.message)
    })
  };
  return (
    <div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-3/4 bg-white p-11 rounded-3xl h-3/4 shadow-lg">
          <button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-2xl absolute right-20 top-20"
            onClick={() => navigate("/admin/services")}
          >
            Service
          </button>
          <div className="flex flex-col justify-center mt-16">
            <input
              type="text"
              placeholder="Title"
              className="p-2 mt-4 w-60"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {/* <input type="file" name="image" className='p-2 mt-4 w-60'  onChange={(e)=> setImage(e.target.files[0])} />
            <img className='w-96 p-2 mt-4' src={image?URL.createObjectURL(image):""} alt=""  />
            <input type="text" placeholder='Description' className='p-2 mt-4 w-60' onChange={(e)=> setDescription(e.target.value)} value={description } /> */}
            <button
              className="p-2 mt-4 bg-sky-400 w-40 rounded-3xl"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesCreation;
