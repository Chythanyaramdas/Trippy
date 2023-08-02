import React from "react";
import { StaffApi } from "../../utils/staff/axiosStaff";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

function AddAdventure() {
  // function addAdventure({ adventure, onChangeAdventure, index, imageChange, formValues }
  const { id } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [names, setNames] = useState("");
  // const[time,setTime]=useState('')

  const handleSubmit = () => {
    const form = new FormData();

    form.append("names", names);
    console.log("names", names);
    form.append("description", description);
    console.log("description", description);
    // form.append('time',time)
    // console.log("time",time);
    form.append("image", image);
    console.log("iamge", image);
    form.append("id", id);
    console.log("id", id);

    StaffApi.post(`/adventureManagement/${id}`, form, {
      headers: {
        "content-type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.data.status == 201) {
        console.log("success");
      }

      navigate("/staff/adventureManagement");
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mt-20">
        <div className="ps-14">
          <label htmlFor="">
            Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="names"
            onChange={(e) => setNames(e.target.value)}
            className="border-2 p-1 mb-2 mt-1 w-96 "
            value={names}
          />
        </div>

        <div className="ps-12">
          <label htmlFor="">
            Description <span className="text-red-600 ">*</span>
          </label>
          <input
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 p-1 mb-2 w-96"
            value={description}
          />
        </div>

        <div className="ps-14">
          <label htmlFor="">
            Image <span className="text-red-600">*</span>
          </label>
          <div className="rounded-full overflow-hidden relative h-60 w-full flex justify-center">
            
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt=""
              className="h-full  rounded-full w-96"
            />
            <div className="absolute bottom-0 left-10 rounded-full overflow-hidden">
              <input
                className="bg-amber-200 w-full"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
              />
            </div>
          </div>
        </div>

        {/* <div>
  <label htmlFor="">Time <span className="text-red-600">*</span></label>
  <input
    type="number"
    name="time"
    onChange={(e) => setTime(e.target.value)}
    className="border-2 p-1 mb-2 w-auto"
    value={time}
  />
</div> */}
      </div>

      <div className="w-full flex justify-center">
        <button onClick={handleSubmit} className="bg-red-500 p-2">
          submit
        </button>
      </div>
    </div>
  );
}

export default AddAdventure;
