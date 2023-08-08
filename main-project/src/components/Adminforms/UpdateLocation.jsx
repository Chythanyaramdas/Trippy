import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminApi } from "../../utils/admin/adminApi";
import Navbar from "../navbar/navbar";
import Sidebar from "../Sidebar/AdminSidebar";

function UpdateLocation() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(false);
  const [district, setDistrict] = useState("");
  const [places, setPlaces] = useState([{}]);
  const [image,setImage] = useState({})
  const [newImage,setNewImage] = useState('')
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // alert("ammmmmm")
      AdminApi.get(`/location_u/${id}`).then((response) => {
        if (response.data.status) {
          setDistrict(response.data.location.district);
          setPlaces([...response.data.location.places]);
        }
      });
    }
  }, [id]);

  const placeFinding = (e, index) => {
    const { name, value } = e.target;
    let newData = places.map((loc, pos) => {
      if (index === pos) {
        loc[name] = value;
      }
      return loc;
    });
    console.log(newData);
    setPlaces([...newData]);
  };


  const uploadImage=(e)=>{
    alert('image')
    console.log("heiii");
    if(e.target.files){
      console.log(e.target.files[0]);
      // const file =   Array.from(e.target.files);
      const file = e?.target?.files?.[0]
      setNewImage(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    const form = new FormData();
    form.append("district", district);
    form.append("places", JSON.stringify(places));
    form.append("districtId", id);
    console.log(newImage,"kgahg2")
        
        if(newImage){
          form.append('image',newImage)
            
          console.log(form.get('image'));
          
        }
        else{
            console.log('not');
            
                
        }
       
          console.log(form.get("image"),"image");

    AdminApi.post(`/location_ud/${id}`,form).then((response) => {
      if (response.data.status) {
        alert("successfullyUpdate");
        navigate("/admin/location");
      }
    });
  };

  return (
    <div>
     
      <div>
        <div className="grid grid-cols-[1fr_7fr] sm:grid-cols-[1.5fr_8.5fr] w-full">
          <Sidebar />

          <div className="w-full  flex justify-center items-center  ">
            <div className="w-3/4  bg-white p-11 rounded-3xl h-3/4 shadow-lg grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex flex-col h-auto w-auto justify-start bg-sky-200 mt-3">
            <div className=" ">
            <input
              type="text"
              placeholder="name"
              className="p-4 mt-2 shadow-lg rounded-lg w-52 flex   "
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            </div>


            <input
          type="file"
      
          name="image"
          className="p-2 mt-8 shadow-lg rounded-lg w-64 h-40 "
          onChange={uploadImage}
          
        />

            <div>

            {places.map((location, index) => {
              return (
                <>
                  <input
                    type="text"
                    placeholder="name"
                    name="place"
                    className="p-4 mt-2 shadow-lg rounded-lg w-52 "
                    value={location.place}
                    onChange={(e) => placeFinding(e, index)}
                  />
                  

                  <input
                    type="text"
                    placeholder="name"
                    name="pinCode"
                    className="p-4 mt-2 shadow-lg rounded-lg w-52"
                    value={location.pinCode}
                    onChange={(e) => placeFinding(e, index)}
                  />
                </>
              );
            })}

</div>

            <div className="flex justify-start bg-red-700">

            </div>
            <div className="flex justify-center mt-4">

            <button
              className= "p-4   bg-sky-400 w-32 rounded-2xl flex justify-center items-center"
              
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
        </div>
        </div>
        </div>
        </div>

        
      </div>
    
  );
}

export default UpdateLocation;
