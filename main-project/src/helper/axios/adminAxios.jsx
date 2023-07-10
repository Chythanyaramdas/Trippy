import axios from "axios";
// import getCookies from "../getCookie";

export const adminApi = axios.create({
  baseURL: "http://localhost:3001/admin",
});


// adminApi.interceptors.request.use(
//   function (config) {
//     const token = getCookies();
//     config.headers.Authorization = token["userToken"];
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );