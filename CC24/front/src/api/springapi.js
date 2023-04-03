import axios from 'axios';

axios.defaults.withCredentials = false;

export default axios.create({
  // baseURL: 'http://localhost:3324/api/spring/',
  baseURL: process.env.SPRING_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
  },
});
