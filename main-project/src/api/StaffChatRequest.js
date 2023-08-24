import axios from 'axios';
const API = axios.create({baseURL: 'http://localhost:3001/staff' })
export const staffChats = (id) => API.get(`/staffChats/${id}`)