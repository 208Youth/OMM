import axios from 'axios';

axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: 'http://localhost:5000/api/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    withCredentials: true,
  },
});
