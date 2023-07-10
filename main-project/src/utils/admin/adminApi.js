import axios from 'axios'


 export const StaffApi = axios.create({
    baseURL: 'http://localhost:3001/staff/',
 })
 export const adminBaseApi="http://localhost:3001/admin/"