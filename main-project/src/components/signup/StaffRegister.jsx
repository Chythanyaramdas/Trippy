import React,{useState,useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validation from "../../helper/FormValidation";
import {StaffApi} from'../../utils/staff/axiosStaff';
import { useNavigate } from 'react-router-dom';


const StaffRegister=()=>{

    const initialValues={
        name:'',
        email:'',
        phone:'',
        password:'',
        repassword:'',
        otp:''
      };
      const[formVlues,setFormValues]=useState(initialValues);
      const [message, setMessage] = useState('');
      const [name,setname]=useState('')
      const [email,setemail]=useState('')
      const [phone,setphone]=useState('')
      const [password,setpassword]=useState('')
      // const [repassword, setrepassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState("");

      const [formError, setformError] = useState({});
      const [submit, setSubmit] = useState(false);


        const [otp1,setOtp1]=useState(0)
        const [otp2,setOtp2]=useState(0)
        const [otp3,setOtp3]=useState(0)
        const [otp4,setOtp4]=useState(0)
        const [otp5,setOtp5]=useState(0)
        const [otp6,setOtp6]=useState(0)
        const [enteredOtp,setEnteredOtp]=useState("")
      const[otp,setOtp]=useState(false)
      const navigate = useNavigate();

      const generateError = (err) => {
        toast.error(err, {
          position: 'top-center'
        });
      };
      // console.log(password,"pass",repassword);


      const handleChange=(e)=>{
        const {name,value} = e.target
        setFormValues(prev=>{
          return {
            ...prev,[name]:value
          }
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault();

        
        setformError(validation(formVlues, "signUp"));
        setSubmit(true);
        // const trimmedName=name.trim();
        // if(trimmedName ===''){

        //   generateError('Please enter your name')
        // }


        // else{
        //   try {
            
            
        //     const data={
        //       name:name,
        //       email:email,
        //       phone:phone,
        //       password:password,
              
        //     }
        //     setFormValues(data)
        //     if (data) {
        //       console.log(data,"data of user")

        //     StaffApi.post('/register',data)

        //       if (data.errors) {
        //         const { name, email, phone, password } = data.errors;
        //         if (name) generateError(name);
        //         else if (email) generateError(email);
        //         else if (password) generateError(password);
        //         else if (phone) generateError(phone);
        //       } else {
        //         setMessage('Account activated, check your email');
        //         // navigate('/emailverify');
        //         setOtp(true);
        //       }
        //     }
        //   } catch (error) {
        //     console.log(error, 'register error problem');
        //   }
        // }
       
      };



      const handleConfirm=()=>{
        const result =otp1+otp2+otp3+otp4+otp5+otp6
       
     console.log(formVlues);
     StaffApi.post('/verify_staff',{...formVlues,result}).then((response)=>{
        console.log(response);
          if(response.data.message==="Authenticated"){

            navigate('/staff/staffLogin')
          }
          else{
            console.log("invalid otp");
          }
        })
       
        }


        useEffect(() => {
          let interValId;
          if (Object.keys(formError).length === 0 && submit) {
            alert('start')
              StaffApi.post("/register", {
                ...formVlues,
                country_code: formVlues.country_code,
              })
              .then((response) => {
                if (response.data.status) {

                 alert('fff')
                  setOtp(true);
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


return(

    <>

    {!otp &&< div
  className="relative flex flex-col justify-center h-screen overflow-hidden bg-cover bg-center ..."
  style={{
    backgroundImage: 'url(https://images.pexels.com/photos/237272/pexels-photo-237272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
  }}>
    <div className="w-4/5	width: 80%; min-h-0	min-height: 0px;  p-6 m-auto rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl" style={{ opacity: 0.9 }}>
      <h1 className="text-2xl font-bold text-center text-black">
        Trippy
      </h1>
      <form  onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label  block text-black text-sm font-bold mb-2">
            {/* <span className="text-base label-text ">Name</span> */}
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formVlues.name}
            placeholder="Name"
            // onChange={(e)=> setname(e.target.value)}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />

          {formError.name && (
                <p style={{ color: "red" }}>{formError.name}</p>
              )}
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text  text-black text-sm font-bold mb-2 ">Email</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formVlues.email}
            placeholder="Email Address"
            // onChange={(e)=> setemail(e.target.value)}
            onChange={handleChange}
            className="w-full input input-bordered"
          />
          {formError.email && (
                <p style={{ color: "red" }}>{formError.email}</p>
              )}
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text  text-black text-sm font-bold mb-2">Enter mobile</span>
          </label>
          <input
            type="number"
            id="phone"
            name="phone"
            placeholder="Enter mobile"
            // onChange={(e) => {
            //     const phoneNumber = e.target.value.replace(/[^0-9]/g, "")
            //     if (phoneNumber.length <= 10) {
            //       setphone(phoneNumber);
            //     }
            //   }}
            onChange={handleChange}
              required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label className="label">
            <span className="text-base label-text  text-black text-sm font-bold mb-2"> Password</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
              minLength={6}
            placeholder="Enter Password"
            value={formVlues.password}
            // onChange={(e) =>  setpassword( e.target.value )}
            onChange={handleChange}
                  required
            className="w-full input input-bordered"
          />
          {formError.password && (
                    <p style={{ color: "red" }}>{formError.password}</p>
                  )} 
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text  text-black text-sm font-bold mb-2">Confirm Password</span>
          </label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            value={formVlues.confirmPassword}
            placeholder="Confirm Password"
            // onChange={(e) =>  setrepassword( e.target.value )}
            onChange={handleChange}
                  required
            className="w-full input input-bordered"
          />
           {formError.confirmPassword && (
                <p style={{ color: "red" }}>{formError.confirmPassword}</p>
              )}
        </div>


        <div>
          <button className="btn btn-block  text-black text-sm font-bold mb-2">Sign Up</button>
        </div>
        <span className=" text-black text-sm font-bold mb-2">
          Already have an account ?
          <a
            href=""
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Login
          </a>
        </span>
      </form>
      <ToastContainer/>
    </div>
  </div>}


{otp&& <div className="bg-slate-500 w-full h-screen text-center flex flex-col justify-center ">
        <h1>ENTER OTP</h1>
        <div className="userInput">
        <input type="text" id="ist" maxLength="1" onChange={(e) => setOtp1(e.target.value)} />
  <input type="text" id="sec" maxLength="1" onChange={(e) => setOtp2(e.target.value)} />
  <input type="text" id="third" maxLength="1" onChange={(e) => setOtp3(e.target.value)} />
  <input type="text" id="fourth" maxLength="1" onChange={(e) => setOtp4(e.target.value)} />
  <input type="text" id="fifth" maxLength="1" onChange={(e) => setOtp5(e.target.value)} />
  <input type="text" id="sixth" maxLength="1" onChange={(e) => setOtp6(e.target.value)} />  
        </div>
        <button onClick={handleConfirm}> CONFIRM</button>
    </div>}



   

      </>








)

}
export default StaffRegister;
