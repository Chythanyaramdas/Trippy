import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserApi } from "../../utils/user/axiosUser";
import { FaBed } from "react-icons/fa";
// import {FaSackDollar} from"react-icons/fa6"
import { AiFillDollarCircle } from "react-icons/ai";
import { MdReduceCapacity } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import Footer from "../Footer/UserFooter";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { FaRegStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import { hideLoading, showLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";
function Resorters() {
  const { id } = useParams();
  const navigate = useNavigate();
  const server_url = process.env.REACT_APP_BASE_URL;
  const [resort, setResort] = useState({});
  const [images, setImages] = useState([{}]);
  const [cities, setCities] = useState([{}]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [filteredResorts, setFilteredResorts] = useState([]);
  const [booked, setBooked] = useState([]);
  const [allDates, setallDates] = useState([]);
  const [buttonDisabale, setButtonDisabale] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [bookCount, setBookedCount] = useState(null);
  const [reviewCount, setReviewCount] = useState([]);
  const [reviewUpdate, setReviewUpdate] = useState(false);
  const [update, setUpdate] = useState(false);
  console.log(bookCount, "kkkkkkkkk");
  const handlebookedDate = () => {
    let newDates = booked.map((booking) => {
      let dates = [];
      let inStamp = new Date(booking.fromDate).getTime();
      let outStamp = new Date(booking.toDate).getTime();
      for (let i = inStamp; i <= outStamp; i + 24 * 60 * 60 * 1000) {
        dates.push(new Date(i));
      }
      return dates;
    });
    console.log(newDates, "----sdsdsdsdsdsdsdsdsdsdsdsd-------");
  };

  useEffect(() => {
    if (id) {
      dispatch(showLoading());
      console.log("arunnbhai");
      UserApi.get(`/singlePage?id=${id}&userId=${users.id}`).then(
        (response) => {
          if (response.data.status) {
            dispatch(hideLoading());
            setBookedCount(response.data.bookingCount);
            console.log(
              setBookedCount,
              "setbookedcount-----------------------------"
            );

            setReviewCount(response.data.resort.reviews);
            console.log(reviewCount, "revie-wq---------------------");
            setImages([
              ...response.data.resort?.image?.map((image, index) => ({
                id: index + 1,
                src: `${server_url}images/${image}`,
                isLarge: index === 0,
              })),
            ]);

            setCities([
              ...response.data.resort?.location?.district?.places?.map(
                (place, index) => place
              ),
            ]);

            // above befer error   ...response.data.resort[0]?.image?.map((image, index) => ({
            console.log("arunn");
            // console.log(response.data.resort[0],"answer");
            console.log(response.data.booked, "-----------");
            setResort({ ...response.data.resort });
            console.log(setResort, "tree hut");
            setBooked([...response.data.booked]);

            let newDates = response.data.booked.map((booking) => {
              let dates = [];
              let inStamp = new Date(booking.fromDate).getTime();
              let outStamp = new Date(booking.toDate).getTime();
              for (let i = inStamp; i <= outStamp; i += 24 * 60 * 60 * 1000) {
                dates.push(new Date(i).toLocaleString());
              }
              // console.log('-------dates--',dates);
              return dates;
            });
            console.log(newDates.flat(), "--------sdsdsdsdsd---");
            setallDates([...newDates.flat()]);
          }
        }
      );
    }
  }, [id, reviewUpdate, update]);

  useEffect(() => {
    console.log(reviewCount, "review Count");
    reviewCount.map((review) => {
      console.log(
        review.userId,
        "rrrrrrrrrrrrr--------------------------------------------"
      );
      if (review.userId._id === users.id) {
        console.log(
          "scccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
        );
        setButtonDisabale(true);
        return;
      }
    });
  }, [reviewCount]);

  const submitReview = () => {
    try {
      console.log("clicked");
      UserApi.post(
        `/reviewSubmit/${resort._id}/${users.id}/${rating}/${comment}`
      ).then((response) => {
        if (response.data.status) {
          setReviewUpdate(true);
        }
      });

      // Refresh the reviews after submitting a new one
      // You might want to fetch the reviews from the server again and update the state
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  console.log("----allDates---", allDates);
  // const handleCheckInDateChange = (date) => {
  //   alert(date);
  //   setCheckInDate(date);
  // };

  // const handleCheckOutDateChange = (date) => {
  //   if (date < checkInDate) {
  //     setCheckOutDate(checkInDate);
  //   } else {
  //     setCheckOutDate(date);
  //   }
  // };

  const handleCheckInDateChange = (date) => {
    if (checkOutDate && date >= checkOutDate) {
      alert("select a valid date");
    } else {
      setCheckInDate(date);
    }
  };

  const handleCheckOutDateChange = (date) => {
    if (date >= checkInDate) {
      setCheckOutDate(date);
    }
  };

  const today = new Date();

  const getPlace = (e) => {
    let newData = cities.filter((obj) => obj._id === e);
    console.log(newData);

    return newData[0].place;
  };

  const handleSearch = () => {
    alert(checkInDate);
    UserApi.get(
      `/searchSingleResort/${checkInDate}/${checkOutDate}/${resort._id}`
    ).then((response) => {
      if (response.data.status) {
        alert("Resorts are available,please book your stay");
        // setFilteredResorts([...response.data.date])
      } else {
        alert("Resorts are unavailable");
      }
    });
  };

  useEffect(() => {
    if (checkInDate) {
      console.log(checkInDate, "CD");
      // localStorage.setItem("checkinDate", checkInDate.toISOString());
      localStorage.setItem("checkinDate", checkInDate);
    } else {
      localStorage.removeItem("checkinDate");
    }
  }, [checkInDate]);

  useEffect(() => {
    if (checkOutDate) {
      // localStorage.setItem("checkoutDate", checkOutDate.toISOString());
      localStorage.setItem("checkoutDate", checkOutDate);
      const dddd = checkOutDate.toISOString();
      console.log("checkOutDate normal", checkOutDate);
      console.log("checkOutDate with iso log", dddd);
    } else {
      localStorage.removeItem("checkoutDate");
    }
  }, [checkOutDate]);

  const star = [
    {
      name: 1,

      active: false,
    },
    {
      name: 2,

      active: false,
    },
    {
      name: 3,

      active: false,
    },
    {
      name: 4,

      active: false,
    },
    {
      name: 5,

      active: false,
    },
  ];

  const [stars, setStars] = useState(star);

  const handleStarClick = (index) => {
    setRating(index + 1);
    setStars((prev) => {
      return [
        ...prev.map((star, index1) => {
          if (index1 <= index) {
            star["active"] = true;
          } else {
            star["active"] = false;
          }
          console.log(star);
          return { ...star };
        }),
      ];
    });
  };

  const formatDate = (time) => {
    let newDate = new Date(time).toLocaleDateString();
    return newDate;
  };

  const EditReview = async () => {
    console.log("Clickeddd");
    UserApi.post(`/editReview`, {
      userId: users.id,
      resortId: resort._id,
      rating: rating,
      comment: comment,
    }).then((response) => {
      if (response.data.status) {
        setUpdate((pre) => !pre);
      }
    });
  };

  const handleChat = () => {
    alert("findChat");

    UserApi.get(`/findChat/${resort.resortowner._id}/${users.id}`).then(
      (response) => {
        if (response.data.status) {
          alert("vann chat");
          navigate("/chat");
        }
      }
    );
  };

  const handleBook = () => {
    if (users.id) {
      navigate(`/booking/${resort._id}`);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-3/4 h-[50rem] px-10 py-10 ">
        <div className=" w-full grid grid-rows-3 grid-flow-col gap-4 rounded-xl overflow-hidden">
          <div className=" w-full row-span-3 col-span-2 h-full overflow-hidden">
            <img
              src={images[0]?.src}
              className="w-full h-full mx-auto object-cover"
            />
          </div>
          <div class=" ...">
            <img
              src={images[1]?.src}
              className="w-full h-full mx-auto object-cover"
            />
          </div>
          <div class="  ...">
            <img
              src={images[2]?.src}
              className="w-full h-full mx-auto object-cover"
            />
          </div>
          <div class="  ...">
            <img
              src={images[0]?.src}
              className="w-full h-full mx-auto object-cover"
            />
          </div>
        </div>
      </div>
      {/* description */}

      <div className="w-full h-[30rem] flex bg-transparent">
        <div className="w-[50%] h-full ">
          <div className="  w-full flex h-28  items-center ps-16 mt-5">
            <h3 className=" z-10  text-3xl text-black font-popins">
              Welcome to{" "}
            </h3>
            <h1 className=" z-10  text-4xl text-blue-800 font-popins ms-4">
              {resort.resortname}{" "}
            </h1>
          </div>

          <div className="w-[90%] h-64 ps-14 flex justify-center items-start text-lg">
            <div className="w-[60rem]   rounded-md h-64">
              {resort.description}
            </div>
          </div>
        </div>
        <div className=" mt-16 w-[50%] h-auto  flex flex-col gap-4 bg-slate-100 mr-10">
          <div className="w-full h-[20%]  flex justify-center ">
            <h3 className="mt-4 text-2xl font-serif">Our stay...</h3>
          </div>
          <div className="w-full h-[80%] flex justify-evenly">
            <div className="w-60 h-[80%] ">
              <div className="flex flex-wrap mt-4  ">
                <div className="bg-white shadow-2xl p-4  w-full max-w-[300px] h-64  rounded-lg  mx-auto cursor-pointer  ">
                  <figure className="h-[90%]">
                    <img
                      src="https://img.freepik.com/free-vector/indian-rupee-money-bag_23-2147996715.jpg?w=2000"
                      className="mb-1 h-full "
                      alt="Movie"
                    />
                  </figure>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <FaRupeeSign className="text-sm" />
                      <div className="text-lg font-semibold">
                        {resort.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-60 h-[80%] ">
              <div className="flex flex-wrap mt-4 ">
                <div className="bg-white shadow-2xl p-4  w-full max-w-[300px] h-64  rounded-lg mx-auto cursor-pointer  ">
                  <figure className="h-[90%] overflow-hidden">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkfj5k9-h0cIcNaOwBLOFNlOLpuO72zh7YDJ1z_tT_MCMyTnpuaXYUhGRgPG7FUEIYOS4&usqp=CAU"
                      className="mb-1  h-full"
                      alt="Movie"
                    />
                  </figure>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <MdReduceCapacity className="text-sm" />

                      <div className="text-lg font-semibold">
                        {resort.capacity}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-60 h-[80%]  ">
              <div className="flex flex-wrap mt-4 ">
                <div className="bg-white shadow-2xl p-4  w-full max-w-[300px] h-64 rounded-lg  mx-auto cursor-pointer  ">
                  <figure className="h-[90%] overflow-hidden">
                    <img
                      src="https://www.shutterstock.com/shutterstock/videos/1039519187/thumb/9.jpg?ip=x480"
                      className="mb-1  h-full object-cover"
                      alt="Movie"
                    />
                  </figure>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <MdPlace className="text-sm" />

                      <div className="text-lg font-semibold">
                        {resort?.location?.district?.district},
                        {getPlace(resort?.location?.place)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-44 w-[100%] h-96  flex flex-col gap-4 bg-slate-100  ">
        <div className="w-full h-[80%] flex justify-between px-16  mt-10 ">
          <div className="w-[50%] h-[100%] bg-sky-100 ">
            {/* <div className="w-full  h-full flex  items-center ps-12 mr-3 "> */}
            <div className="w-full h-15 bg-transparent mt-3 ps-10 ">
              <p className=" z-10  text-3xl text-blue-600 font-bold">
                Book your stay
              </p>
            </div>
            {/*  */}
            <div className="w-full h-20 bg-transparent flex items-center justify-evenly mt-10">
              {/* <div className="ml-2">
                <DatePicker
                  selected={checkInDate}
                  dateFormat="dd MMMM yyyy"
                  onChange={handleCheckInDateChange}
                  placeholderText="Check-in"
                  className="w-64 h-10 max-w-xs bg-slate-300"
                  minDate={today}
                  excludeDates={allDates?.map((date) => new Date(date))}
                />
              </div> */}
              <div className="ml-2 sm:w-full md:w-1/2 lg:w-1/3">
                <DatePicker
                  selected={checkInDate}
                  dateFormat="dd MMMM yyyy"
                  onChange={handleCheckInDateChange}
                  placeholderText="Check-in"
                  className="w-full h-10 max-w-xs bg-slate-300"
                  minDate={today}
                  excludeDates={allDates?.map((date) => new Date(date))}
                />
              </div>

              {/* <div className="ml-4">
                <DatePicker
                  selected={checkOutDate}
                  dateFormat="dd MMMM yyyy"
                  onChange={handleCheckOutDateChange}
                  placeholderText="Check-out"
                  className="w-64 h-10 max-w-xs bg-slate-300"
                  minDate={checkInDate ? new Date(checkInDate) : null}
                  excludeDates={allDates?.map((date) => new Date(date))}
                />
              </div> */}

              <div className="ml-4 sm:w-full md:w-1/2 lg:w-1/3">
                <DatePicker
                  selected={checkOutDate}
                  dateFormat="dd MMMM yyyy"
                  onChange={handleCheckOutDateChange}
                  placeholderText="Check-out"
                  className="w-full h-10 max-w-xs bg-slate-300"
                  minDate={checkInDate ? new Date(checkInDate) : null}
                  excludeDates={allDates?.map((date) => new Date(date))}
                />
              </div>

              {/* <button
                className="btn join-item my-1 bg-slate-300"
                onClick={() => {
                  handleSearch();
                }}
              >
                Search
              </button> */}
              <button
                className="btn join-item my-1 bg-slate-300 sm:w-full md:w-1/2 lg:w-1/4"
                onClick={() => {
                  handleSearch();
                }}
              >
                Search
              </button>
            </div>

            {/*  */}

            <div className="w-full h-[8.7rem] bg-transparent flex justify-end items-end pe-20 pb-5">
              <button
                className="bg-blue-600 m-0 w-28 h-10 text-sm font-serif"
                onClick={() => handleBook()}
              >
                Book
              </button>
            </div>

            {/* </div> */}
          </div>

          <div className="w-[50%] h-[100%] flex flex-col gap-5 justify-center items-center ">
            <img
              src="https://book.zostel.com/static/media/gray-zobu.018014d9.svg"
              alt="image"
              className="w-[80%] h-[60%] m-0"
            />
            <p className=" font-serif text-2xl ">
              {" "}
              Do you have any queries?{resort?.resortowner?.name}{" "}
            </p>
            <button
              className="bg-blue-600 m-0 w-36 h-10 text-sm font-serif p-3"
              onClick={() => {
                handleChat();
              }}
            >
              Chat Now..
            </button>
          </div>
        </div>
      </div>

      <div className=" mt-16 w-[100%] h-96  flex flex-col gap-4 bg-slate-100 ">
        <div className="w-[100%] h-[80%] flex gap-4 justify-between  px-16  mt-10  ">
          <div className="w-[50%] h-full bg-sky-100 flex  ">
            <div className="w-full ">
              <div>
                <p className=" z-10  text-3xl text-blue-600 font-bold ml-8 mt-6">
                  Rating
                </p>
              </div>
              <div className="flex w-full bg-sky-100 justify-center items-center h-20 ">
                {stars.map((star, index) => {
                  return (
                    <div
                      className="w-auto h-auto "
                      key={index}
                      onClick={() => handleStarClick(index)}
                    >
                      {" "}
                      <span
                        className={`${
                          star.active ? "text-yellow-500 " : "text-gray-500"
                        } fa fa-star text-2xl mx-1 `}
                      ></span>
                    </div>
                  );
                })}
              </div>

              <div className="flex w-full bg-sky-100 justify-center  h-36  flex-col items-center ">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-44 bg-slate-300"
                />
                {bookCount > 0 ? (
                  !buttonDisabale ? (
                    <button className="bg-red-900 w-38" onClick={submitReview}>
                      Submit
                    </button>
                  ) : (
                    <button className="bg-red-900 w-38" onClick={EditReview}>
                      Edit
                    </button>
                  )
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="w-[50%] h-[100%] bg-sky-100 ">
            <h3 className="mt-4 text-2xl font-serif text-center  underline underline-offset-[9px]">
              Reviews...
            </h3>

            {/* <div className="bg-transparent w-full h-[90%]"> */}
            <div className="w-full h-[80%] flex justify-evenly">
              <div className="w-[60%] bg-slate-100 h-[80%] overflow-Y-scroll">
                {reviewCount?.map((data, index) => {
                  return (
                    <div className="w-full h-10 flex flex-col justify-start items-center ps-2">
                      <div className="flex justify-start w-full  ">
                        {/* <VscAccount className="text-2xl  mt-2" />  */}
                        <img
                          src="https://pbs.twimg.com/media/FtsxswzaUAAZXJj.jpg:large"
                          alt=""
                          className="w-10 h-10 rounded-full mt-1"
                        />
                        <p className="ms-2 mt-3 ml-2 capitalize font-bold">
                          {data?.userId?.name}
                        </p>
                        <p className="mt-3 ms-3">
                          {formatDate(data?.createdDate)}
                        </p>
                      </div>
                      <div className="flex w-full flex-col justify-between items-start mt-5  ">
                        {" "}
                        {/* Use flex-col and items-start for neat alignment */}
                        <p
                          className={`${
                            data?.userReview
                              ? "text-slate-950"
                              : "text-slate-400"
                          } ml-2`}
                        >
                          {data?.userReview || "no comment"}
                        </p>
                        <div className="flex justify-end w-full gap-1">
                          {Array.from({ length: data?.rating }).map((_, i) => (
                            <img
                              className="w-5 mr-1"
                              key={i}
                              src="https://img.icons8.com/?size=512&id=8ggStxqyboK5&format=png"
                              alt="Star"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Resorters;
