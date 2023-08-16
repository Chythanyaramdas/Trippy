import React, { useState, useEffect } from "react";
import Validation from "../../helper/LoginValidation";
import { UserApi } from "../../utils/user/axiosUser";
import { Navigate, useNavigate } from "react-router-dom";

function NewPassword() {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setformError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handlePassword = (e) => {
    const { name, value } = e.target;

    setFormValues((pre) => {
      return { ...pre, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    setformError(Validation(formValues, "NewPassword"));
    setSubmit(true);
    setEmail(localStorage.getItem("email"));
  };

  useEffect(() => {
    let interValId;
    if (Object.keys(formError).length === 0 && submit) {
      console.log({ ...formValues, email });
      UserApi.post("/newPassword", {
        password: formValues.password,
        email,
      })

        .then((response) => {
          if (response.data.status) {
            navigate("/login");
            // setOtp(true);
            // setOtp(!otp);
            // setId(response.data.id)
            // interValId = setInterval(() => {
            //   setTimer((preTime) => preTime - 1);
            // }, 1000);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return () => {
      clearInterval(interValId);
    };
  }, [formError]);

  return (
    //    <>
    //       <div className="flex justify-content-center items-center">

    //       <form onSubmit={handleSubmit}>
    //         <div className="form-group mb-2">
    //           <label htmlFor="password" className="form-label">
    //             New Password
    //           </label>
    //           <input
    //             type="password"
    //             name="password"
    //             className="form-control w-60"
    //             id="password"
    //             value={formValues.password}
    //             required
    //             onChange={handlePassword}

    //           />
    //           {formError.password && (
    //                     <p style={{ color: "red" }}>{formError.password}</p>
    //                   )}
    //         </div>
    //         <div className="form-group mb-2">
    //           <label htmlFor="confirmPassword" className="form-label">
    //             Confirm Password
    //           </label>
    //           <input
    //             type="password"
    //             name="confirmPassword"
    //             className="form-control w-60"
    //             id="confirmPassword"
    //             value={formValues.confirmPassword}
    //             required
    //             onChange={handlePassword}
    //           />
    //           {formError.confirmPassword && (
    //                 <p style={{ color: "red" }}>{formError.confirmPassword}</p>
    //               )}
    //         </div>
    //         <div className="form-group mb-2">
    //           <input
    //             type="submit"
    //             defaultValue="submitData"
    //             className="btn btn-dark form-control w-60"
    //           />
    //         </div>
    //       </form>
    //     </div>

    // </>

    <>
      <div
        className="flex w-screen  justify-center object-cover   bg-no-repeat items-center h-screen  "
        style={{
          backgroundImage:
            "url('https://wallpaperaccess.com/full/1431610.jpg')",
          backgroundSize: "100vw 100vh",
        }}
      >
        <form onSubmit={handleSubmit} className="w-2/4 h-2/4">
          <div className="flex justify-center items-center bg-sky-100 bg-opacity-50 rounded-md w-[100%] h-[100%] flex-col">
            <div className="form-group mb-2 ">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control w-64 rounded-lg border-2 border-stone-950 bg-slate-300 text-black font-serif text-2xl"
                id="password"
                value={formValues.password}
                required
                onChange={handlePassword}
              />
              {formError.password && (
                <p className="text-red-500">{formError.password}</p>
              )}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control w-64 rounded-lg overflow-hidden bg-slate-300 text-black font-serif text-2xl"
                id="confirmPassword"
                value={formValues.confirmPassword}
                required
                onChange={handlePassword}
              />
              {formError.confirmPassword && (
                <p className="text-red-500">{formError.confirmPassword}</p>
              )}
            </div>
            <div className="form-group mb-2 flex justify-center items-center w-full ">
              <input
                type="submit"
                value="Submit"
                className="btn btn-dark form-control w-36 bg-blue-900 text-black "
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewPassword;
