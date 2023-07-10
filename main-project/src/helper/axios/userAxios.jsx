import axios from'axios';
// import getCookies from'../getCookie';

const api = axios.create({
    baseURL:'http://localhost:3001'
})

// api.interceptors.request.use(function (config) {
//     const token = getCookies();
//     config.headers.Authorization = token['userToken'];
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   })
  export default api;