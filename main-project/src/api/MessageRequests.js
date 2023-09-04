import axios from 'axios';
// const API = axios.create({baseURL: 'http://localhost:3001' })
const API = axios.create({baseURL: process.env.REACT_APP_BASE_URL})
export const getMessages = (id) => API.get(`/message/${id}`)
export const addMessage=(data)=>API.post(`/message/`,data)