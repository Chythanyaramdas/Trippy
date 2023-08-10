import { userLogin, userLogout} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../utils/user/axiosUser";
import { useEffect, useState } from "react";
import { FaAnglesRight } from "react-icons/fa6";

export const ProtectedRoute = ({ children, accessBy }) => {
    const user = useSelector((state) => state.user.id);
    const dispatch = useDispatch(); 
    const jwtToken=localStorage.getItem('userToken')
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(()=>{

      (function(){

        if(accessBy ==="Authorized"){
            if(user){
                setLoading(false);
            }
        else if(jwtToken){

            UserApi.get('/token_v').then((response)=>{
                if(response.data.status){
                    dispatch(userLogin(response.data.user));
                    setLoading(false);
                }
            });


        }

        else{
            window.location.href = "/"; 
        }


      }

      else if(accessBy === "non-Authorized") {
        // if (!cookie["userToken"]) {
        //   return children;
        // }
        if(user){
          
            setLoading(false)
        }
         else if ( jwtToken ) {
          UserApi.get("/token_v").then((response) => {
            if (response.data.user) {
              dispatch(userLogin(response.data.user));
              setLoading(false)
              // navigate('/')
            }
          }).catch((err)=>{
            alert("jjj")
            const expires=localStorage.removeItem('userToken')
            console.log(expires);
            
            dispatch(userLogout())

            navigate('/login')
            
          })
          // window.location.href = '/'
        }}
    }
      )()  ;

    },[])

    if (!loading && accessBy === "Authorized"){
   
        return children;
      } 
      else if(!loading && accessBy === "non-Authorized"){
        console.log(!!loading);
        console.log(accessBy === "non-Authorized");
        
        navigate('/')
      } else if(loading && accessBy === "non-Authorized"){
        return children
      }
}