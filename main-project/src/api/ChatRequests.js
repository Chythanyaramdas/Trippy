import axios from 'axios';
// const API = axios.create({baseURL: 'http://localhost:3001' })
const API = axios.create({baseURL: process.env.REACT_APP_BASE_URL} )
export const userChats = (id) => API.get(`/userChats/${id}`)