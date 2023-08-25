import axios from 'axios'


//  export const AdminApi = axios.create({
//     baseURL: 'http://localhost:3001/admin/',
//  })

export const AdminApi = axios.create({
  baseURL:process.env.REACT_APP_ADMIN_URL,
})

 AdminApi.interceptors.request.use(
   function (config) {
      const token=localStorage.getItem("adminToken")
      console.log(token);
      config.headers.Authorization=`Bearer ${token}`
      // Do something before request is sent
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
 )



//  export const adminBaseApi="http://localhost:3001/admin/"