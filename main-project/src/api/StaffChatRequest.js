import axios from 'axios';
// const API = axios.create({baseURL: 'http://localhost:3001/staff' })
const API = axios.create({baseURL: process.env.REACT_APP_STAFF_URL})
export const staffChats = (id) => API.get(`/staffChats/${id}`)