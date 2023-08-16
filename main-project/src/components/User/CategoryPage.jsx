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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [services, setServices] = useState([{}]);

  useEffect(() => {
    if (id) {
      console.log("categoryPage single");
      UserApi.get(`/categoryPage/${id}`).then((response) => {
        if (response.data.status) {
          console.log("cat");

          console.log(response.data.category);

          setCategory([...response.data.category]);
          setServices([...response.data.services]);
        }
      });
    }
  }, [id]);

  const handleSearch = () => {
    // alert(search);
    UserApi.get(`/searchService/${id}?search=${search}`).then((response) => {
      if (response.data.status) {
        setCategory([...response.data.search]);
        console.log(response.data.search);
      } else {
        alert("search failed");
      }
    });
  };

  // const handleFilter=(e,index)=>{
  //   setServices(prev=>{
  //     return [...prev.map((service,index1)=>{
  //       if(index === index1) service['checked'] = service['checked'] ? false:true
  //       return {...service}
  //     })]
  //   })

  //   let newFilter  = []

  //   services.forEach((service)=>{
  //     if(service.checked) newFilter.push(service.title)
  //   })

  // const{value}=e.target

  // const data=filter.indexOf(value)

  // if(data>=0){
  //   setFilter((prev)=>[...prev.filter((obj)=> obj!==value)])
  // }
  // else{
  //   setFilter((prev)=>[...prev,value])
  // }
  // let newFilter = [...filter,value]

  //   UserApi.get(`/searchService/${id}?service=[${newFilter}]`).then((response)=>{

  //     if(response.data.status){
  //       setCategory([...response.data.search])

  //     }
  //   })
  // }

  const handleFilter = (e, index) => {
    setServices((prev) => {
      return prev.map((service, index1) => {
        if (index === index1) {
          service["checked"] = !service["checked"];
        }
        return { ...service };
      });
    });

    setTimeout(() => {
      let newFilter = [];

      services.forEach((service) => {
        if (service.checked) {
          newFilter.push(service.title);
        }
      });

      UserApi.get(`/searchService/${id}?service=[${newFilter}]`).then(
        (response) => {
          if (response.data.status) {
            setCategory([...response.data.search]);
          }
        }
      );
    }, 0);
  };

  return (
    <div className="">
      <div className="">
        <Navbar />
      </div>

      <div className=" w-full flex h-28  justify-center items-center overflow-hidden bg-[url(https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63452.jpg?w=1480&t=st=1692072928~exp=1692073528~hmac=00f9f78c35cdb7bbd2f8c745eab4ac739fbdddd69fb02704833d60ed27ef6874)]">
        <h3 className=" z-10  text-3xl text-black font-serif">Choose</h3>
        <h1 className=" z-10  text-4xl text-blue-800 font-serif ms-4">
          Your Stay
        </h1>
      </div>

      {/* <div className="flex justify-center">
        <p className="text-2xl font-serif">Choose Your Stay</p>
      </div> */}

      <div className="w-[99vw] min-h-[60rem]  pb-20 flex">
        <div className="w-[80%] h-full shadow-black shadow-sm rounded-xl m-5 ">
          <div className="w-full h-full flex justify-center items-center ">
            <input
              type="text"
              placeholder="please search "
              className="p-4 mt-5 text-black shadow-lg rounded-lg w-1/3 bg-slate-100 h-12  "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn join-item mx-10 mt-3 bg-slate-100"
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </button>
          </div>

          <div className="flex  flex-wrap pb-10 gap-16 mt-12 ps-6 ">
            {category?.map((data) => {
              return (
                <div className="w-[27rem] bg-sky-100  border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center   flex-wrap  ">
                  <div className="w-[80%] h-[50%] mt-6  relative">
                    <img
                      className="rounded-lg overflow-hidden hover:transform transform scale-100 hover:scale-110 transition-transform duration-300 "
                      src={server_url + "images/" + data?.image?.[0]}
                      alt=""
                    />
                  </div>
                  <div className="p-5 flex justify-center items-center flex-col">
                    <div className="p-2">
                      <p className="mt-3 text-2xl font-bold text-black">
                        {data.resortname}
                      </p>
                    </div>
                    <button
                      className="mt-2 bg-blue-700 w-28 h-10 text-sm"
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

        <div className="w-[20%] min-h-[60rem] pb-20 flex justify-center pt-5 ">
          <div className=" bg-[#a0e4fb] shadow-black shadow-md w-[90%] h-[40rem] rounded-lg">
            <div className="w-full h-[10%] bg-transparent flex justify-center items-center">
              <p className="text-2xl font-serif ">Filter</p>
            </div>
            <div className="bg-transparent w-full h-[90%]">
              {services?.map((data, index) => {
                return (
                  <div className="w-full h-10  flex justify-start items-center ps-2">
                    <input
                      type="checkbox"
                      className="w-5 me-4 capitalize"
                      name="service"
                      onChange={(e) => handleFilter(e, index)}
                      value={data.title}
                    />
                    <p>{data?.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex  flex-wrap gap-16 mt-12 ps-6 ">
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
      </div> */}
    </div>
  );
}
export default CategoryPage;
