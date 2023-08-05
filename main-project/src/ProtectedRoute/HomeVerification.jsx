import { useDispatch, useSelector } from "react-redux"
import { userLogin} from "../redux/userSlice";
import { UserApi } from "../utils/user/axiosUser";
import { useEffect, useState } from "react"

export const HomeVerification = ({children})=>{
    const user = useSelector((store)=> store.user)
    const dispatch = useDispatch()
    const jwtToken=localStorage.getItem('userToken')
    console.log(jwtToken,"jwtHomeVerification");

    const [loading,setLoading] = useState(true)


    useEffect(()=>{
        (function(){
            if(user.id){
       
                return setLoading(false)
            }
            else if(jwtToken){
               
                UserApi.get('/token_v').then((response)=>{
                    if(response.data.user){
                        
                        console.log('----------',response.data.user);
                        dispatch(userLogin(response.data.user))
                        return setLoading(false)
                    }else if(response.status == 401) console.log(response);
                })
            }       
        })()
    },[])

    if(!loading) return children
    else return null;

}