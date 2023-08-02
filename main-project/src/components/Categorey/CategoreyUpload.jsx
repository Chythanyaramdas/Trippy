import React, { useState,useEffect } from "react";
import Card from "../Cards/Cards";
import { AdminApi } from "../../utils/admin/adminApi";



function CategoreyCreation(){
    const [name, setname] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [banner,setBanner] = React.useState(false)

    const bannerSetting=(e)=>{
        setImage(e.target.files[0])
        setBanner(true) 
    }

    const handleSubmit = () => {
        const form = new FormData();
        form.append("image", image);
        form.append("name", name);
        form.append("description", description);

        AdminApi
        .post("/categoreyUpload", form, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status) {
            alert(response.data.message)
          }
        });
    
    
};

return (
  <div className="w-full h-full flex justify-center items-center bg-white">
    <div className="  bg-sky-100 p-11 rounded-3xl h-3/4 shadow-lg grid grid-cols-2 md:grid-cols-3 gap-4  ">
      <div className="flex flex-col h-full justify-center items-start">
        <input
          type="text"
          placeholder="name"
          className="p-4 mt-4 shadow-lg rounded-lg w-full "
          onChange={(e) => setname(e.target.value)}
          value={name}
        />
        <input
          type="file"
          name="image"
          className="p-2 mt-4 shadow-lg rounded-lg w-full"
          onChange={bannerSetting}
        />
        <textarea
          type="text"
          placeholder="Description"
          className="p-2 mt-4 shadow-lg h-1/3 rounded-lg w-full"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button
          className="p-2 mt-4 bg-sky-400 w-2/4 rounded-3xl mx-auto w-40"
          onClick={handleSubmit}
        >
          Upload
        </button>
      </div>
      {/* <div className="flex flex-col md:col-span-2 ">
        <div className="flex flex-col text-center justify-center border-2 mx-20 h-72 px-10 py-6 ">
        {banner && <img
          className="w-full h-full    rounded-lg  "
          src={image ? URL.createObjectURL(image) : ""}
          alt=""
        />}
      {!banner &&
      (<>
        <p>preview</p>
      <img
          className="w-full h-full    rounded-lg  "
          src={bannerPreview}
          alt=""
        /></>)}
        </div>
       
      </div> */}
    </div>
    </div>
  );
}



export default CategoreyCreation;
