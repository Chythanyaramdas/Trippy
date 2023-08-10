import React, { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserApi } from "../../utils/user/axiosUser";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UserRegister.css";
import validation from "../../helper/FormValidation";

const UserRegister = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    otp: "",
  };
  const [formVlues, setFormValues] = useState(initialValues);
  const [message, setMessage] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formError, setformError] = useState({});
  const [submit, setSubmit] = useState(false);

  const [otp1, setOtp1] = useState(0);
  const [otp2, setOtp2] = useState(0);
  const [otp3, setOtp3] = useState(0);
  const [otp4, setOtp4] = useState(0);
  const [otp5, setOtp5] = useState(0);
  const [otp6, setOtp6] = useState(0);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [otp, setOtp] = useState(false);
  const navigate = useNavigate();

  // const navigate = useNavigate()

  const generateError = (err) => {
    toast.error(err, {
      position: "top-center",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setformError(validation(formVlues, "signUp"));
    setSubmit(true);

    // if(password!==repassword){
    //   console.log(generateError,"yyyyyyyyyy")
    //   generateError('Password not match Try again later')
    //   setformError(validation(formVlues));optional
    //     setSubmit(true);

    // const trimmedName = name.trim();
    // if (trimmedName === "") {
    //   generateError("Please enter your name");
    // } else {
    //   try {
        
    //     const data = {
    //       name: name,
    //       email: email,
    //       phone: phone,
    //       password: password,
    //     };
    //     setFormValues(data);
    //     if (data) {
    //       console.log(data, "data of user");
    //       UserApi.post("/register", data);
    //       if (data.errors) {
    //         const { name, email, phone, password } = data.errors;
    //         if (name) generateError(name);
    //         else if (email) generateError(email);
    //         else if (password) generateError(password);
    //         else if (phone) generateError(phone);
    //       } else {
    //         setMessage("Account activated, check your email");
            
    //         setOtp(true);
    //       }
    //     }
    //   } catch (error) {
    //     console.log(error, "register error problem");
    //   }
    // }
  };

  const handleConfirm = () => {
    const result = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

    console.log(formVlues);
    UserApi.post("/verify_otp", { ...formVlues, result }).then((response) => {
      console.log(response);
      if (response.data.message === "Authenticated") {

        navigate("/login");
      } else {
        console.log("invalid otp");
      }
    })
  };

  const handleChange=(e)=>{
    const {name,value} = e.target
    setFormValues(prev=>{
      return {
        ...prev,[name]:value
      }
    })
  }


  useEffect(() => {
    let interValId;
    if (Object.keys(formError).length === 0 && submit) {
      UserApi
        .post("/register", {
          ...formVlues,
          country_code: formVlues.country_code,
        })
        .then((response) => {
          if (response.data.status) {
            setOtp(true);
            // setOtp(!otp);
            // setId(response.data.id)
            // interValId = setInterval(() => {
            //   setTimer((preTime) => preTime - 1);
            // }, 1000);
          }
        })
        .catch((error)=>{
      console.log('error');
      alert('Already existed')
    })
    }

    return () => {
      clearInterval(interValId);
    };
  }, [formError]);

  return (
    <>
      {!otp && (
        <div
          className="  flex items-center justify-center min-h-screen"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dsyln8j3g/image/upload/v1687606220/hermansyah-7uXn7nudorc-unsplash_1_udk8xq.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <div
            className="w-full max-w-md bg-white-200 rounded-lg shadow-md p-8"
            style={{ opacity: 0.9 }}
          >
            <h2 className="text-2xl font-bold mb-1 text-center text-black">
              User Signup
            </h2>
            {message && (
              <div className="flex items-center font-bold text-center text-yellow-500 mb-4">
                <svg
                  className="w-6 h-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formVlues.name}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />

                {formError.name && (
                <p style={{ color: "red" }}>{formError.name}</p>
              )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formVlues.email}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />

                {formError.email && (
                <p style={{ color: "red" }}>{formError.email}</p>
              )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-black text-sm font-bold mb-2"
                  placeholder="+91-"
                >
                  Phone
                </label>

                <input
                  type="number"
                  id="phone"
                  name="phone"
                  maxLength={10}
                  minLength={10}
                  value={formVlues.phone}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+91-"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  minLength={6}
                  value={formVlues.password}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />

                {formError.password && (
                    <p style={{ color: "red" }}>{formError.password}</p>
                  )} 
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="confirmPassword"
                  value={formVlues.confirmPassword}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter confirm password"
                  onChange={handleChange}
                  required
                />

                {formError.confirmPassword && (
                <p style={{ color: "red" }}>{formError.confirmPassword}</p>
              )}
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-black font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  Register
                </button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      )}

      {otp && (
        <div className="bg-slate-500 w-full h-screen text-center flex flex-col justify-center ">
          <h1>ENTER OTP</h1>
          <div className="userInput">
            <input
              type="text"
              id="ist"
              maxLength="1"
              onChange={(e) => setOtp1(e.target.value)}
            />
            <input
              type="text"
              id="sec"
              maxLength="1"
              onChange={(e) => setOtp2(e.target.value)}
            />
            <input
              type="text"
              id="third"
              maxLength="1"
              onChange={(e) => setOtp3(e.target.value)}
            />
            <input
              type="text"
              id="fourth"
              maxLength="1"
              onChange={(e) => setOtp4(e.target.value)}
            />
            <input
              type="text"
              id="fifth"
              maxLength="1"
              onChange={(e) => setOtp5(e.target.value)}
            />
            <input
              type="text"
              id="sixth"
              maxLength="1"
              onChange={(e) => setOtp6(e.target.value)}
            />
          </div>
          <button onClick={handleConfirm}> CONFIRM</button>
        </div>
      )}
    </>
  );
};

export default UserRegister;
