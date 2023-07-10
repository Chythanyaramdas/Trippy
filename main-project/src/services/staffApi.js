import { staffAxiosInstance } from "../axios/instance";
export const  userOtp=(data)=>{
    return staffAxiosInstance.post('/staff_Login',data);
}