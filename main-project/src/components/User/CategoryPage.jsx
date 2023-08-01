// test
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";
import Navbar from "../../components/navbar/navbar";
import Footer from "../Footer/UserFooter";

function CategoryPage() {
  const { id } = useParams();
  const server_url = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [category, setCategory] = useState([{}]);

  useEffect(() => {
    if (id) {
      console.log("categoryPage single");
      UserApi.get(`/categoryPage/${id}`).then((response) => {
        if (response.data.status) {
          console.log("cat");

          console.log(response.data.category);

          setCategory([...response.data.category]);
        }
      });
    }
  }, [id]);

  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>

      <div className="flex justify-center">
        <p className="text-2xl font-serif">Choose Your Stay</p>
      </div>

      <div className="flex  flex-wrap gap-16 mt-12 ps-6 ">
        {category?.map((data) => {
          return (
            <div className="w-1/4 bg-sky-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center   flex-wrap  ">
              <div className="w-[90%] h-[60%]   relative">
                <img
                  className="rounded-t-lg overflow-hidden hover:transform transform scale-100 hover:scale-110 transition-transform duration-300 "
                  src={server_url + "images/" + data.image}
                  alt=""
                />
              </div>
              <div className="p-5">
                <div className="p-2">
                  <p className="mt-3 text-2xl font-bold text-black">
                    {data.resortname}
                  </p>
                </div>
                <button
                  className="mt-2 bg-green-400 w-28 h-10 text-sm"
                  onClick={() => navigate(`/resort/${data._id}`)}
                >
                  Book Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CategoryPage;
