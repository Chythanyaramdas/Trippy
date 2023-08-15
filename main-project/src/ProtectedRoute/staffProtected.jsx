import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {StaffApi} from"../utils/staff/axiosStaff";
import { staffLogin} from "../redux/staffSlice";

function StaffAuthentication({children,accessBy}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const jwtToken=localStorage.getItem('staffToken')
    const {id} = useSelector(store=> store.staff)

    useEffect(()=>{
        const verification = async()=>{
            
            if(accessBy === 'Authorized'){
                if(id) setLoading(false)
                else if(jwtToken){
                    const response = await StaffApi.get('/token_v')
                    if(response.data.status){
                        console.log('all done');
                        
                        console.log(response.data.staff);
                        dispatch(staffLogin(response.data.staff))
                        setLoading(false)
                    }
                }
                
            }else if(accessBy = 'non-Authorized'){
                if(id) setLoading(false)
                else if(jwtToken){
                    const response = await StaffApi.get('/token_v')
                    if(response.data.status){
                        console.log(response.data.staff);
                        dispatch(staffLogin(response.data.staff))
                        setLoading(false)
                    }
                }
            }
        }
        verification()
    },[])

    if(accessBy === "Authorized" && loading){
        return null
    }
    else if(accessBy === "non-Authorized" && !loading ){
        return navigate('/staff/dashboard')
    }

    return children

}

export default StaffAuthentication;

