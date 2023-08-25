import axios from 'axios'



//  export const UserApi = axios.create({
//     baseURL: 'http://localhost:3001',
//  })

 export const UserApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
 })

 UserApi.interceptors.request.use(
   function (config) {
      const token=localStorage.getItem("userToken")
      console.log(token);
      config.headers.Authorization=`Bearer ${token}`
      // Do something before request is sent
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
 )

