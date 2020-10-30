import axios from 'axios';

//create a new instance of axios with a custom config.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

export default api