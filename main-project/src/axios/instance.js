import axios from "axios";
import {baseUrl,staffUrl,adminUrl} from '../files/file'


const createAxiosClient = (baseURL) => {
    const client = axios.create({
      baseURL,
      timeout: 5000,
      timeoutErrorMessage: "Request timeout... Please Try Again!!!"
    })
    return client
  }
  const attachToken = (req,tokenName ="usertoken") => {
    let authToken = localStorage.getItem(tokenName)
    if (authToken) {
      // console.log(authToken,"authentication working...")
      req.headers.Authorization = `Bearer ${authToken}`
      // console.log(req.headers.Authorization,"ttttttt")

    }
    return req
  }
  
const staffAxiosInstance = createAxiosClient(staffUrl)
staffAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "stafftoken")
  return modifiedReq;
})

const userAxiosInstance = createAxiosClient(baseUrl)

userAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "usertoken")
  return modifiedReq
})


const adminAxiosInstance = createAxiosClient(adminUrl)
adminAxiosInstance.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, "admintoken")
  return modifiedReq
})

export { staffAxiosInstance, userAxiosInstance, adminAxiosInstance }