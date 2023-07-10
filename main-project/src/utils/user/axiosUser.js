import axios from 'axios'


 export const UserApi = axios.create({
    baseURL: 'http://localhost:3001',
 })

export const userBaseApi="http://localhost:3001"