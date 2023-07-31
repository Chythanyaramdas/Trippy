import React, { useEffect, useState } from "react";
import CreateButton from "../Button/Button";
import { AdminApi } from "../../utils/admin/adminApi";
import { useNavigate } from "react-router-dom";
import Card from "../Cards/Cards";

function Categorey() {
  const navigate = useNavigate();
  // const updatePath = "/admin/categoreyUpload";
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [caterId, setCaterId] = useState("");

  const [confirmation, setConfirmation] = useState(false);

  const handleDelete = () => {
    AdminApi.delete("/categoryManagement", { data: { id: caterId } }).then(
      (response) => {
        console.log(response.data);
        if (response.data.status) {
          alert(response.data.message);
          navigate("/admin/categoryManagement");
          // add ? setAdd(false): setAdd(true)
          setAdd(!add);
        }
      }
    );

    setConfirmation(false);
  };

  const deleteClick = (id) => {
    console.log("1234567890-");
    setCaterId(id);
    setConfirmation(true);
  };

  useEffect(() => {
    AdminApi.get("/categoryManagement").then((response) => {
      console.log("hello");
      if (response.data.status) {
        console.log("hello");
        console.log(response.data.categorey);
        setData(response.data.Categorys);
      }
    });
  }, [add]);

  return (
    <div>
      <div className="flex flex-col h-full bg-sky-50 w-full relative">
        <CreateButton content="resort" path="/admin/categoreyUpload" />
        <div className="mt-36 mx-20 flex grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {data.length > 0 ? (
            data.map((data, index) => (
              <Card
                key={index}
                data={data}
                updatePath={"/admin/categoryManagement_u"}
                deleteClick={deleteClick}
              />
            ))
          ) : (
            <p>No content</p>
          )}
        </div>
      </div>

      {confirmation && (
        <div className="fixed inset-0 bg-transparent  backdrop-blur-sm  flex justify-center items-center flex-col ">
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
                className="bg-green-700 text-white rounded-lg px-4 py-2 ml-4"
                onClick={() => setConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Categorey;
