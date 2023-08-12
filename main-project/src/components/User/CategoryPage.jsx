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
  const[search,setSearch]=useState('')

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

  const handleSearch=()=>{
    alert(search)
    UserApi.get(`/searchService/${search}`).then((response)=>{
      if(response.data.status){
        alert("search success")
      }
      else{
        alert("search failed")
      }
    })

  }

  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>


      <div className="w-full h-full flex justify-center items-center bg-slate-200  ">
      <input
          type="text"
          placeholder="please search "
          className="p-4 my-5 text-black shadow-lg rounded-lg w-1/3 bg-slate-300 h-12  "
        
         value={search}
         onChange={(e)=>setSearch(e.target.value)}
       
        />

          <button
            className="btn join-item mx-10 my-auto bg-slate-300"
              onClick={() => {
               
                handleSearch();
              }}
          >
            Search
          </button>



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
                  src={server_url + "images/" + data?.image?.[0]}
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
