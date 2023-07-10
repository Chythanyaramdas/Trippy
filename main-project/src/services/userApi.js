import { userAxiosInstance } from "../axios/instance";
export const   userlogin=(data)=>{
    return userAxiosInstance.post('/login',data)
}

export const  userverify=(data)=>{
    return userAxiosInstance.post('/login',data)
}

export const  userOtp=(data)=>{
    return userAxiosInstance.post('/userLogin',data)
}
export const  userAuth=(data)=>{
    return userAxiosInstance.post('/authUser',data)
}